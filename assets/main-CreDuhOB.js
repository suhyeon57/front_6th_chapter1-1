(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``,l=!!a;if(l)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let u=document.createElement(`link`);if(u.rel=o?`stylesheet`:e,o||(u.as=`script`),u.crossOrigin=``,u.href=i,c&&u.setAttribute(`nonce`,c),document.head.appendChild(u),o)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};function i(){return`
    <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
    </footer>
`}function a(e){return console.log(`Header 컴포넌트 렌더링`,e),`
    <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-900">
                <a href="/" data-link="">쇼핑몰</a>
            </h1>
            <div class="flex items-center space-x-2">
                <!-- 장바구니 아이콘 -->
                <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
                ${e.length>0?`<span
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${e.length}</span>`:``}
                
                </button>
            </div>
            </div>
        </div>
    </header>
  `}function o(e){return`
    <!-- 상품 그리드 -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
            data-product-id=${e.productId}>
      <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
     
      <img src="${e.image}"
              alt="${e.title}"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              loading="lazy">
      
      </div>
      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            ${e.title}
          </h3>
          <p class="text-xs text-gray-500 mb-2">${e.brand}</p>
          <p class="text-lg font-bold text-gray-900">
            ${Number(e.lprice).toLocaleString()}원
          </p>
        </div>
        <!-- 장바구니 버튼 -->
        <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
              hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id=${e.productId}>
          장바구니 담기
        </button>
      </div>
    </div>
  `}function s(e,t,n){let r=t.category1,i=t.category2,a=`
    <div class="flex items-center gap-2">
      <label class="text-sm text-gray-600">카테고리:</label>
      <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
      ${r?`<span class="text-xs text-gray-500">&gt;</span>
        <button data-breadcrumb="category1" data-category1="${r}" class="text-xs hover:text-blue-800 hover:underline">${r}</button>`:``}
      ${i?`<span class="text-xs text-gray-500">&gt;</span>
        <span class="text-xs text-gray-600 cursor-default">${i}</span>`:``}
    </div>
  `,o=r?``:`
    <div class="flex flex-wrap gap-2">
      ${Object.keys(n).map(e=>`
          <button data-category1="${e}" class="category1-filter-btn px-3 py-2 text-sm rounded-md border
            bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
            ${e}
          </button>
        `).join(``)}
    </div>
  `,s=r&&n[r]?`
      <div class="flex flex-wrap gap-2">
        ${Object.keys(n[r]).map(e=>`
              <button data-category1="${r}" data-category2="${e}" class="category2-filter-btn px-3 py-2 text-sm rounded-md border
                ${e===i?`bg-blue-100 border-blue-300 text-blue-800`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`}">
                ${e}
              </button>
            `).join(``)}
      </div>
    `:``;return`
    <div class="space-y-2">
      ${a}
      ${e?`<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`:o}
      ${s?`<div class="space-y-2">${s}</div>`:``}
    </div>
  `}function c(){return`
    <div id="cart-toast"
      style="
        position: fixed;
        left: 50%;
        bottom: 32px;
        transform: translateX(-50%);
        z-index: 9999;
        width: fit-content;
        pointer-events: auto;
      "
      class="flex flex-col gap-2 items-center justify-center mx-auto"
    >
      <div class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p class="text-sm font-medium">장바구니에 추가되었습니다</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  `}const l=`
 <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div class="aspect-square bg-gray-200"></div>
      <div class="p-3">
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div class="h-8 bg-gray-200 rounded"></div>
      </div>
  </div>
`,u=l.repeat(2),d=`
        <div class="text-center py-4">
          <div class="inline-flex items-center">
            <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
          </div>
        </div>
      `,f=e=>`
        <div class="mb-4 text-sm text-gray-600">
              총 <span class="font-medium text-gray-900">${e}개</span>의 상품
        </div>
    `,p=({search:e,isFirstLoad:t,products:n,total:r,loading:l,limit:p,sort:m,selectedCategory:h,categories:g,cartSelect:_,cartItems:v})=>`
    <div class="min-h-screen bg-gray-50">
      ${a(v)}
      <main class="max-w-md mx-auto px-4 py-4">

        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">

          <!-- 검색창 -->
          <div class="mb-4">
            <div class="relative">
              <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="${e}" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">
              ${s(t,h,g)}

              <!-- 1depth 카테고리 -->

              <!-- 2depth 카테고리 -->
            </div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">
              <!-- 페이지당 상품 수 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">개수:</label>
                <select id="limit-select" class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="10" ${p===10?`selected`:``}>10개</option>
                  <option value="20" ${p===20?`selected`:``}>20개</option>
                  <option value="50" ${p===50?`selected`:``}>50개</option>
                  <option value="100" ${p===100?`selected`:``}>100개</option>
                </select>
              </div>
              <!-- 정렬 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">정렬:</label>
                <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="price_asc" ${m===`price_asc`?`selected`:``}>가격 낮은순</option>
                  <option value="price_desc" ${m===`price_desc`?`selected`:``}>가격 높은순</option>
                  <option value="name_asc" ${m===`name_asc`?`selected`:``}>이름순</option>
                  <option value="name_desc" ${m===`name_desc`?`selected`:``}>이름 역순</option>
                </select>
              </div>
            </div>
          </div>
          </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
          ${t?``:f(r)}
            <!-- 상품 그리드 -->
            <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
              <!-- 로딩 스켈레톤 -->
              ${l?u:n.map(o).join(``)}
              ${l?d:``}
          </div>
        </div>
        ${_?c():``}
      </main>
    </div>
    ${i()}
  `;async function m(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function h(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function g(){let e=await fetch(`/api/categories`);return await e.json()}function _({product:e,relatedProducts:t,loading:n}){return n?`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="py-20 bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">상품 정보를 불러오는 중...</p>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `:`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <nav class="mb-4">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <button class="breadcrumb-link" data-category1="생활/건강">
              생활/건강
            </button>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <button class="breadcrumb-link" data-category2="생활용품">
              생활용품
            </button>
          </div>
        </nav>
        <!-- 상품 상세 정보 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <!-- 상품 이미지 -->
          <div class="p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover product-detail-image">
            </div>
            <!-- 상품 정보 -->
            <div>
              <p class="text-sm text-gray-600 mb-1">${e.brand}</p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">${e.title}</h1>
              <!-- 평점 및 리뷰 -->
              <div class="flex items-center mb-3">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <span class="ml-2 text-sm text-gray-600">4.0 (749개 리뷰)</span>
              </div>
              <!-- 가격 -->
              <div class="mb-4">
                <span class="text-2xl font-bold text-blue-600">220원</span>
              </div>
              <!-- 재고 -->
              <div class="text-sm text-gray-600 mb-4">
                재고 107개
              </div>
              <!-- 설명 -->
              <div class="text-sm text-gray-700 leading-relaxed mb-6">
                PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장에 대한 상세 설명입니다. 브랜드의 우수한 품질을 자랑하는 상품으로, 고객 만족도가 높은 제품입니다.
              </div>
            </div>
          </div>
          <!-- 수량 선택 및 액션 -->
          <div class="border-t border-gray-200 p-4">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-gray-900">수량</span>
              <div class="flex items-center">
                <button id="quantity-decrease" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-l-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <input type="number" id="quantity-input" value="1" min="1" max="107" class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <button id="quantity-increase" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-r-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
            <!-- 액션 버튼 -->
            <button id="add-to-cart-btn" data-product-id="85067212996" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium">
              장바구니 담기
            </button>
          </div>
        </div>
        <!-- 상품 목록으로 이동 -->
        <div class="mb-6">
          <button class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
            hover:bg-gray-200 transition-colors go-to-product-list">
            상품 목록으로 돌아가기
          </button>
        </div>
        <!-- 관련 상품 -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
            <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 gap-3 responsive-grid">
              ${t.length>0?t.map(e=>`
                <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="${e.productId}">
                  <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                    <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover" loading="lazy">
                  </div>
                  <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${e.title}</h3>
                  <p class="text-sm font-bold text-blue-600">${e.lprice}원</p>
                </div>
                `).join(``):`<div class="text-gray-400 text-center col-span-2">관련 상품이 없습니다.</div>`}
              
            </div>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `}function v(){return`
    <main class="max-w-md mx-auto px-4 py-4">
      <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
          </linearGradient>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
          </filter>
        </defs>
        
        <!-- 404 Numbers -->
        <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
        
        <!-- Icon decoration -->
        <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
        <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
        <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
        <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
        
        <!-- Message -->
        <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
        
        <!-- Subtle bottom accent -->
        <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
      </svg>
      
      <a href="/" data-link class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
    </div>
    </main>
  `}const y=`/front_6th_chapter1-1`,b=(e=window.location.pathname)=>e.startsWith(y)?e.slice(21)||`/`:e;async function x(){let e=document.getElementById(`root`),t=b(),n=t.match(/^\/product\/(\d+)/);if(n){let t=n[1],r=await h(t),i=await A(r);e.innerHTML=_({product:r,relatedProducts:i}),O();return}if(t===`/non-existent-page`){e.innerHTML=v();return}t===`/front_6th_chapter1-1/`&&(e.innerHTML=p({}))}const S=()=>r(async()=>{let{worker:e}=await import(`./browser-vWTd4VZR.js`);return{worker:e}},[]).then(({worker:e})=>e.start({onUnhandledRequest:`bypass`}));let C={products:[],total:0,loading:!1,limit:20,sort:`price_asc`,isFirstLoad:!0,categories:[],search:``,cartSelect:!1,cartItmes:[]};function w(){let e=window.location.pathname;console.log(`현재 경로:`,e),console.log(`render을 통해 렌더링 상태`,C);let t=document.getElementById(`root`),n=localStorage.getItem(`sort`);n&&(C.sort=n);let r=localStorage.getItem(`cartItems`);r?C.cartItems=JSON.parse(r):C.cartItems=[];let i=localStorage.getItem(`search`);i&&(C.search=i);let a=localStorage.getItem(`limit`);a&&(C.limit=parseInt(a,10)),t.innerHTML=p({...C,selectedCategory:E}),O(),F()}function T(){let e=`/`;return C.search&&(e+=`search=${encodeURIComponent(C.search)}/`),C.limit&&(e+=`limit=${C.limit}/`),C.sort&&(e+=`sort=${C.sort}/`),e}let E={category1:``,category2:``};function D(){let e=document.getElementById(`products-grid`);if(!e)return;let t=C.products.slice(0,C.limit);console.log(`렌더링할 상품 목록:`,t),e.innerHTML=t.map(e=>o(e)).concat(C.loading?`<div class="text-center text-gray-500">로딩 중...</div>`:``).join(``)}function O(){console.log(`attachEvents 호출됨`);let e=document.querySelector(`#limit-select`),t=document.getElementById(`sort-select`);e&&e.addEventListener(`change`,async e=>{console.log(`limitSelect 이벤트 발생`,e.target.value),C.limit=parseInt(e.target.value),history.pushState({},``,T()),localStorage.setItem(`limit`,C.limit),C.loading=!0;let t=await m({limit:C.limit,sort:C.sort,search:C.search});C.products=t.products,C.total=t.pagination.total,C.loading=!1,D(),console.log(`limitSelect 이벤트 발생 후 상태`,C)}),t&&t.addEventListener(`change`,async e=>{C.sort=e.target.value,history.pushState({},``,T()),localStorage.setItem(`sort`,C.sort),C.loading=!0,w();let t=await m({limit:C.limit,sort:C.sort,search:C.search});C.products=t.products,C.total=t.pagination.total,C.loading=!1,w()});let n=C.cartItems;document.querySelectorAll(`.add-to-cart-btn`).forEach(e=>{e.addEventListener(`click`,e=>{console.log(`장바구니 담기 버튼 클릭됨`,e.target.dataset.productId);let t=e.target.dataset.productId;if(console.log(`장바구니 현황:`,t),n.length===0)n.push(t),console.log(`장바구니가 비어 있어서 추가:`,t);else{let e=!1;n.map(n=>{if(console.log(`장바구니 아이템 확인:`,n),console.log(`현재 상품 ID:`,t),n===t){console.log(`이미 장바구니에 담긴 상품입니다:`,t),e=!0;return}}),e||(n.push(t),console.log(`존재하지 않는 상품 장바구니에 상품 추가됨:`,t))}console.log(`장바구니에 담긴 상품 ID:`,n),C.cartItems=n,console.log(`장바구니에 담긴 상품 ID:`,C.cartItems.length),localStorage.setItem(`cartItems`,JSON.stringify(n)),C.cartSelect=!0,w(),setTimeout(()=>{C.cartSelect=!1,w()},2e3)})}),document.querySelectorAll(`.product-image`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=e.target.closest(`.product-card`).dataset.productId;console.log(`이동할 productId:`,t),history.pushState({},``,`/product/${t}`),await x(),P()})}),document.querySelectorAll(`.category1-filter-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{E.category1=e.dataset.category1,E.category2=``,C.loading=!0,console.log(`카테고리1 선택됨:`,E.category1),w();let t=await m({...E,sort:C.sort,limit:C.limit});C.products=t.products,C.total=t.pagination.total,C.loading=!1,C.categories=await g(),w()})}),document.querySelectorAll(`.category2-filter-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{E.category2=e.dataset.category2,C.loading=!0,w();let t=await m({...E,sort:C.sort,limit:C.limit});C.products=t.products,C.total=t.pagination.total,C.loading=!1,w()})});let r=document.querySelector(`[data-breadcrumb='reset']`);r&&r.addEventListener(`click`,async()=>{E={category1:``,category2:``},C.loading=!0,w();let e=await m({sort:C.sort,limit:C.limit});C.products=e.products,C.total=e.pagination.total,C.loading=!1,w()})}document.addEventListener(`click`,e=>{if(e.target.closest(`#quantity-increase`)){let e=document.getElementById(`quantity-input`),t=parseInt(e.max,10)||9999,n=parseInt(e.value,10)||1;n<t&&(e.value=n+1)}if(e.target.closest(`#quantity-decrease`)){let e=document.getElementById(`quantity-input`),t=parseInt(e.value,10)||1;t>1&&(e.value=t-1)}}),document.addEventListener(`click`,async e=>{let t=e.target.closest(`.related-product-card`);if(t){let e=t.dataset.productId;console.log(`✅ 이동할 productId:`,e),history.pushState({},``,`/product/${e}`),await x(),P()}});async function k(){C.loading=!0,C.total=0,w();let[{products:e,pagination:{total:t}}]=await Promise.all([m({page:C.page,limit:C.limit,sort:C.sort,search:C.search})]),n=await g();C.categories=n,C={...C,products:e,total:t,loading:!1,isFirstLoad:!1},console.log(`fetchAndRender 사용 ::: 상품 데이터 로드 완료`,C),w()}async function A(e){let t=[];console.log(`getRelatedProducts 호출`,e);let{category1:n,category2:r,productId:i}=e,a=await m({category1:n,category2:r,limit:10});return console.log(`getRelatedProducts 데이터`,a),t=a.products.filter(e=>e.productId!==i),console.log(`getRelatedProducts 결과`,t),t}let j=!1,M=null;function N(){M=async function(){if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100&&!j&&!C.loading){j=!0,C.loading=!0;let e=window.scrollY;w();let t=Math.floor(C.products.length/C.limit)+1,n=await m({limit:C.limit,sort:C.sort,page:t});C.products=[...C.products,...n.products],C.total=n.pagination.total,C.loading=!1,j=!1,C.products.length>=C.total?P():w(),window.scrollTo(0,e)}},window.addEventListener(`scroll`,M)}function P(){M&&(window.scrollTo(0,0),window.removeEventListener(`scroll`,M),M=null)}function F(){let e=document.getElementById(`search-input`);e.addEventListener(`keyup`,async t=>{if(t.key===`Enter`){console.log(`검색어 입력:`,e.value);let t=e.value;C.search=t,history.pushState({},``,T()),localStorage.setItem(`search`,t),C.loading=!0,w();let n=await m({limit:C.limit,sort:C.sort,search:t});C.products=n.products,C.total=n.pagination.total,C.loading=!1,w()}else if(t.key===`Escape`){console.log(`검색어 초기화`),e.value=``,C.loading=!0,history.pushState({},``,`/`);let t=await m({limit:C.limit,sort:C.sort});C.products=t.products,C.total=t.pagination.total,C.loading=!1,w()}})}function I(){let e=new URLSearchParams(window.location.search);e.has(`limit`)&&(C.limit=parseInt(e.get(`limit`),10)),e.has(`search`)&&(C.search=e.get(`search`)),e.has(`sort`)&&(C.sort=e.get(`sort`))}async function L(){I(),C.isFirstLoad=!0,window.location.pathname===`/`?(N(),w(),k()):/^\/product\/\d+/.test(window.location.pathname)?await x():window.location.pathname===`/non-existent-page`?x():(w(),k()),window.addEventListener(`popstate`,async()=>{I(),window.location.pathname===`/`?(C={products:[],total:0,limit:20,sort:`price_asc`,search:``,loading:!1,page:1,isFirstLoad:!0,categories:[]},E={category1:``,category2:``},N(),k()):/^\/product\/\d+/.test(window.location.pathname)?(P(),await x()):(P(),k())})}S().then(L);