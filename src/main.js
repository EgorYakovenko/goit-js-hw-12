import axios from "axios";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryWrapperEl= document.querySelector('.gallery')
const inputValue = document.querySelector('.search-form');
const loader = document.querySelector('.loader')
const search = document.querySelector('.search')
const loadMoreBtn = document.querySelector('.load-btn')
const jsText = document.querySelector('.js-text')
const photoCard = document.querySelector('.photo-card')


const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '41296916-da04ab2f63441e92262fae4bb'

inputValue.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);


let page = 1;
let totalHits = 0;


function changeTitleOnBtn() {
  search.classList.add('loader')
  search.textContent = '';
};


function removeClassOnBtn() {
  search.classList.remove('loader');
  search.textContent = 'Search';
};

function changeTitleOnLoadeMoreBtn() {
  loadMoreBtn.classList.add('loader')
  loadMoreBtn.textContent = '';

};

function removeClassOnLoadeMoreBtn() {
  loadMoreBtn.classList.remove('loader');
  loadMoreBtn.textContent = 'Load more';
};

async function onClickLoadMoreBtn() { 
  page += 1;
  changeTitleOnLoadeMoreBtn()
  const localStorageData = localStorage.getItem('inputValue');
  const formData = JSON.parse(localStorageData)
  const post = await fetchPicture(formData);

  renderCard(post);
  removeClassOnLoadeMoreBtn()
};

async function onSearch(event) {
  event.preventDefault(); 
  loadMoreBtn.classList.add('load-hidden');
  jsText.textContent = '';
  changeTitleOnBtn();
  clearMarcup()
  
  const form = event.currentTarget;
  const searchQuery = form.elements.query.value;
  localStorage.setItem('inputValue', JSON.stringify(searchQuery)); 
  const post = await fetchPicture(searchQuery);

  renderCard(post)
  form.reset()
  removeClassOnBtn();
  
};

async function fetchPicture(search) {
  try {
    const response = await axios.get(BASE_URL, {
    params: {
        key: API_KEY,
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
    },
}) 
  return response.data;
  } catch (error) {
    onError(error)
  }
};

async function renderCard(res) { 
  totalHits += res.hits.length;
  if (totalHits > res.totalHits || totalHits === res.totalHits) {
    loadMoreBtn.classList.add('load-hidden');
    jsText.textContent = "We're sorry, but you've reached the end of search results.";
  } else {
    loadMoreBtn.classList.remove('load-hidden');
    jsText.textContent = '';
  }

  if (res.total === 0) {
    jsText.textContent = '';
    onWarning()
  } else {
    const markup = await createMarkup(res.hits);
  galleryWrapperEl.insertAdjacentHTML('beforeend', markup)
    
  const lightbox = new SimpleLightbox('.gallery a', { 
          captions: true,
          captionsData: 'alt',
          captionPosition: 'bottom',
          captionDelay: 250,
        })
          .refresh(); 
  };

if (totalHits > 40) {
        const { height: cardHeight } =
          galleryWrapperEl.firstElementChild.getBoundingClientRect();
          console.log(cardHeight);
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }

};


function createMarkup(arr) {
return arr
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `
          <div class="photo-card .shadow-drop-2-center">
              <a class="gallery__link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              </a>
              <div class="info">
                <p class="info-item">
                  <b>Likes: ${likes}</b>
                </p>
                <p class="info-item">
                  <b>Views: ${views}</b>
                </p>
                <p class="info-item">
                  <b>Comments: ${comments}</b>
                </p>
                <p class="info-item">
                  <b>Downloads: ${downloads}</b>
                </p>
              </div>
            </div>`;
        }
      )
      .join('');
  
    
};

function onWarning() {
    iziToast.warning({
    title: 'Caution',
      message: "Sorry, there are no images matching your search query. Please try again!",
    
    });
  clearMarcup()
};

function onError(error) {
  iziToast.error({
    title: 'Error',
    message: `${error.message}`,
});
}

function clearMarcup() {
  galleryWrapperEl.innerHTML = '';
  totalHits = 0;
  page = 1;
};


 
// function fetchPicture(search) {
//   return fetch(`${BASE_URL}?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true`)
//     .then((response) => {
//       return response.json()
//     })
//     .catch(error => {
//       console.log('error');
//     });
        
// };

 

// function renderCard(res) {
  
//   // const respHits =res.data;
//   console.log(res);
//   if (res.total === 0) {
//     onWarning()
//   } else {
//    const markup = createMarkup(res.hits )
//   galleryWrapperEl.innerHTML = markup;}
  
//   const lightbox = new SimpleLightbox('.gallery a', {
//           captions: true,
//           captionsData: 'alt',
//           captionPosition: 'bottom',
//           captionDelay: 250,
//         })
//           .refresh();
       
// };

// function onSerch(event) {
//     event.preventDefault(); 
//     changeTitleOnBtn()
//     clearMarcup
//     const form = event.currentTarget;
//     const searchQuery = form.elements.query.value;
//   fetchPicture(searchQuery)
//     .then(renderCard)
//     .finally(() => form.reset()).then(() => { removeClassOnBtn() });

// };