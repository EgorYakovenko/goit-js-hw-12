import{a as L,S as b,i as m}from"./assets/vendor-f67ecabd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const u=document.querySelector(".gallery"),S=document.querySelector(".search-form");document.querySelector(".loader");const d=document.querySelector(".search"),a=document.querySelector(".load-btn"),l=document.querySelector(".js-text");document.querySelector(".photo-card");const v="https://pixabay.com/api/",C="41296916-da04ab2f63441e92262fae4bb";S.addEventListener("submit",E);a.addEventListener("click",B);let f=1,c=0;function x(){d.classList.add("loader"),d.textContent=""}function w(){d.classList.remove("loader"),d.textContent="Search"}function q(){a.classList.add("loader"),a.textContent=""}function O(){a.classList.remove("loader"),a.textContent="Load more"}async function B(){f+=1,q();const t=localStorage.getItem("inputValue"),e=JSON.parse(t),r=await p(e);h(r),O()}async function E(t){t.preventDefault(),a.classList.add("load-hidden"),l.textContent="",x(),g();const e=t.currentTarget,r=e.elements.query.value;localStorage.setItem("inputValue",JSON.stringify(r));const s=await p(r);h(s),e.reset(),w()}async function p(t){try{return(await L.get(v,{params:{key:C,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:f}})).data}catch(e){k(e)}}async function h(t){if(c+=t.hits.length,c>t.totalHits||c===t.totalHits?(a.classList.add("load-hidden"),l.textContent="We're sorry, but you've reached the end of search results."):(a.classList.remove("load-hidden"),l.textContent=""),t.total===0)l.textContent="",$();else{const e=await M(t.hits);u.insertAdjacentHTML("beforeend",e),new b(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}if(c>40){const{height:e}=u.firstElementChild.getBoundingClientRect();console.log(e),window.scrollBy({top:e*2,behavior:"smooth"})}}function M(t){return t.map(({webformatURL:e,largeImageURL:r,tags:s,likes:o,views:n,comments:i,downloads:y})=>`
          <div class="photo-card .shadow-drop-2-center">
              <a class="gallery__link" href="${r}">
                <img src="${e}" alt="${s}" loading="lazy" />
              </a>
              <div class="info">
                <p class="info-item">
                  <b>Likes: ${o}</b>
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
            </div>`).join("")}function $(){m.warning({title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!"}),g()}function k(t){m.error({title:"Error",message:`${t.message}`})}function g(){u.innerHTML="",c=0,f=1}
//# sourceMappingURL=commonHelpers.js.map
