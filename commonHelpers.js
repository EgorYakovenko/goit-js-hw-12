import{a as b,S,i as p}from"./assets/vendor-f67ecabd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const u=document.querySelector(".gallery"),L=document.querySelector(".search-form");document.querySelector(".loader");const c=document.querySelector(".search"),l=document.querySelector(".load-btn"),d=document.querySelector(".js-text");document.querySelector(".photo-card");const v="https://pixabay.com/api/",w="41296916-da04ab2f63441e92262fae4bb";L.addEventListener("submit",E);l.addEventListener("click",x);let f=1,i=0;function C(){c.classList.add("loader"),c.textContent=""}function q(){c.classList.remove("loader"),c.textContent="Search"}async function x(){f+=1;const o=localStorage.getItem("inputValue"),e=JSON.parse(o),n=await m(e);h(n)}async function E(o){o.preventDefault(),l.classList.add("load-hidden"),d.textContent="",C(),y();const e=o.currentTarget,n=e.elements.query.value;localStorage.setItem("inputValue",JSON.stringify(n));const a=await m(n);h(a),e.reset(),q()}async function m(o){try{return(await b.get(v,{params:{key:w,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:f}})).data}catch(e){k(e)}}async function h(o){if(i+=o.hits.length,i>o.totalHits?(l.classList.add("load-hidden"),d.textContent="We're sorry, but you've reached the end of search results."):(l.classList.remove("load-hidden"),d.textContent=""),o.total===0)$();else{const e=await O(o.hits);u.insertAdjacentHTML("beforeend",e),new S(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}if(i>40){const{height:e}=u.firstElementChild.getBoundingClientRect();console.log(e),window.scrollBy({top:e*2,behavior:"smooth"})}}function O(o){return o.map(({webformatURL:e,largeImageURL:n,tags:a,likes:t,views:r,comments:s,downloads:g})=>`
          <div class="photo-card .shadow-drop-2-center">
              <a class="gallery__link" href="${n}">
                <img src="${e}" alt="${a}" loading="lazy" />
              </a>
              <div class="info">
                <p class="info-item">
                  <b>Likes: ${t}</b>
                </p>
                <p class="info-item">
                  <b>Views: ${r}</b>
                </p>
                <p class="info-item">
                  <b>Comments: ${s}</b>
                </p>
                <p class="info-item">
                  <b>Downloads: ${g}</b>
                </p>
              </div>
            </div>`).join("")}function $(){p.warning({title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!"}),y()}function k(o){p.error({title:"Error",message:`${o.message}`})}function y(){u.innerHTML="",i=0,f=1}
//# sourceMappingURL=commonHelpers.js.map
