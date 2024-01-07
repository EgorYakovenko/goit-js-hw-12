import{a as L,S as b,i as m}from"./assets/vendor-f67ecabd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();const d=document.querySelector(".gallery"),S=document.querySelector(".search-form");document.querySelector(".loader");const l=document.querySelector(".search"),a=document.querySelector(".load-btn"),u=document.querySelector(".js-text");document.querySelector(".photo-card");const v="https://pixabay.com/api/",C="41296916-da04ab2f63441e92262fae4bb";S.addEventListener("submit",E);a.addEventListener("click",B);let f=1,c=0;function w(){l.classList.add("loader"),l.textContent=""}function x(){l.classList.remove("loader"),l.textContent="Search"}function q(){a.classList.add("loader"),a.textContent=""}function O(){a.classList.remove("loader"),a.textContent="Load more"}async function B(){f+=1,q();const o=localStorage.getItem("inputValue"),e=JSON.parse(o),r=await p(e);h(r),O()}async function E(o){o.preventDefault(),a.classList.add("load-hidden"),u.textContent="",w(),g();const e=o.currentTarget,r=e.elements.query.value;localStorage.setItem("inputValue",JSON.stringify(r));const s=await p(r);h(s),e.reset(),x()}async function p(o){try{return(await L.get(v,{params:{key:C,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:f}})).data}catch(e){k(e)}}async function h(o){if(c+=o.hits.length,c>o.totalHits?(a.classList.add("load-hidden"),u.textContent="We're sorry, but you've reached the end of search results."):(a.classList.remove("load-hidden"),u.textContent=""),o.total===0)$();else{const e=await M(o.hits);d.insertAdjacentHTML("beforeend",e),new b(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}if(c>40){const{height:e}=d.firstElementChild.getBoundingClientRect();console.log(e),window.scrollBy({top:e*2,behavior:"smooth"})}}function M(o){return o.map(({webformatURL:e,largeImageURL:r,tags:s,likes:t,views:n,comments:i,downloads:y})=>`
          <div class="photo-card .shadow-drop-2-center">
              <a class="gallery__link" href="${r}">
                <img src="${e}" alt="${s}" loading="lazy" />
              </a>
              <div class="info">
                <p class="info-item">
                  <b>Likes: ${t}</b>
                </p>
                <p class="info-item">
                  <b>Views: ${n}</b>
                </p>
                <p class="info-item">
                  <b>Comments: ${i}</b>
                </p>
                <p class="info-item">
                  <b>Downloads: ${y}</b>
                </p>
              </div>
            </div>`).join("")}function $(){m.warning({title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!"}),g()}function k(o){m.error({title:"Error",message:`${o.message}`})}function g(){d.innerHTML="",c=0,f=1}
//# sourceMappingURL=commonHelpers.js.map
