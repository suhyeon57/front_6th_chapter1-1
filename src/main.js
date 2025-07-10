import { HomePage } from "./pages/HomePage.js";
import { getCategories, getProducts } from "./api/productApi.js";
import { ProductCard } from "./pages/components/ProductCard.js";
import { PageRouter } from "./pages/route/PageRouter.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

// 초기 상태 설정
let state = {
  products: [],
  total: 0,
  loading: false,
  limit: 20,
  sort: "price_asc",
  isFirstLoad: true, // 첫 로드 여부
  categories: [],
  search: "",
  cartSelect: false, // 장바구니 선택 상태
  cartItmes: [], // 장바구니 아이템 목록
};

// 페이지 렌더링 함수
function render() {
  const path = window.location.pathname;
  console.log("현재 경로:", path);
  console.log("render을 통해 렌더링 상태", state);
  const root = document.getElementById("root");
  const saveSort = localStorage.getItem("sort");
  if (saveSort) {
    state.sort = saveSort; // 로컬 스토리지에서 정렬 상태 불러오기
  }
  // if (path === "/") {
  root.innerHTML = HomePage({
    ...state, // 상태를 HomePage에 전달
    selectedCategory, // 선택된 카테고리 상태 전달
  });

  attachEvents(); // ✅ 이벤트 연결
  searchProductsEvent(); // 검색 이벤트 연결
}

// 카테고리 선택 상태
let selectedCategory = {
  category1: "",
  category2: "",
};

//limit 변경 시 상품 목록만 다시 렌더링
function renderProductList() {
  const productContainer = document.getElementById("products-grid"); // 상품 목록 감싸는 div
  if (!productContainer) return;

  const visibleProducts = state.products.slice(0, state.limit);
  console.log("렌더링할 상품 목록:", visibleProducts);
  productContainer.innerHTML = visibleProducts
    .map((p) => ProductCard(p))
    .concat(state.loading ? `<div class="text-center text-gray-500">로딩 중...</div>` : "")
    .join("");
}

//버튼, limit, sort 클릭 시 동작
function attachEvents() {
  const limitSelect = document.querySelector("#limit-select");
  const sortSelect = document.getElementById("sort-select");

  if (limitSelect) {
    limitSelect.addEventListener("change", async (e) => {
      console.log("limitSelect 이벤트 발생", e.target.value);

      state.limit = parseInt(e.target.value);
      state.loading = true;

      const data = await getProducts({
        limit: state.limit,
        sort: state.sort,
      });

      state.products = data.products;
      state.total = data.pagination.total;
      state.loading = false;

      renderProductList(); // ✅ 전체가 아닌 목록만 다시 그림
      console.log("limitSelect 이벤트 발생 후 상태", state);
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", async (e) => {
      state.sort = e.target.value;
      localStorage.setItem("sort", state.sort); // 정렬 상태를 로컬 스토리지에 저장
      state.loading = true;
      render();

      const data = await getProducts({
        limit: state.limit,
        sort: state.sort,
      });

      state.products = data.products;
      state.total = data.pagination.total;
      state.loading = false;
      render();
    });
  }

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("장바구니 담기 버튼 클릭됨", e.target.dataset.productId);
      const productId = e.target.dataset.productId;
      state.cartItems = state.products.find((p) => p.productId === productId);
      if (!state.cartItems) {
        console.error("장바구니에 담을 상품을 찾을 수 없습니다.");
        return;
      }

      state.cartSelect = true; // 장바구니 선택 상태 업데이트
      render(); // 장바구니 선택 상태 반영
      setTimeout(() => {
        state.cartSelect = false; // 2초 후 장바구니 선택 상태 초기화
        render(); // 장바구니 선택 상태 반영
      }, 2000); // 2초 후 초기화
      // 장바구니에
    });
  });

  document.querySelectorAll(".category1-filter-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      selectedCategory.category1 = btn.dataset.category1;
      selectedCategory.category2 = "";
      state.loading = true;
      console.log("카테고리1 선택됨:", selectedCategory.category1);
      render();

      const data = await getProducts({
        ...selectedCategory,
        sort: state.sort,
        limit: state.limit,
      });

      state.products = data.products;
      state.total = data.pagination.total;
      state.loading = false;
      state.categories = await getCategories(); // 카테고리 데이터 fetch
      render(); // 👉 여기서 2depth 버튼 생김
    });
  });

  document.querySelectorAll(".category2-filter-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      selectedCategory.category2 = btn.dataset.category2;
      state.loading = true;
      render();

      const data = await getProducts({
        ...selectedCategory,
        sort: state.sort,
        limit: state.limit,
      });

      state.products = data.products;
      state.total = data.pagination.total;
      state.loading = false;
      render(); // 👉 선택된 버튼 색상 반영
    });
  });

  const resetBtn = document.querySelector("[data-breadcrumb='reset']");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      selectedCategory = { category1: "", category2: "" };
      state.loading = true;
      render();

      const data = await getProducts({
        sort: state.sort,
        limit: state.limit,
      });

      state.products = data.products;
      state.total = data.pagination.total;
      state.loading = false;
      render();
    });
  }

  // SPA 라우팅 처리 예시
  document.body.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (anchor && anchor.getAttribute("href")?.startsWith("/product/")) {
      //removeInfiniteScroll(); // SPA 라우팅 시 무한 스크롤 제거
      e.preventDefault();
      history.pushState({}, "", anchor.getAttribute("href"));
      PageRouter(); // 라우터 함수 호출
    }
  });
}

// 데이터 fetch 및 렌더링 함수
async function fetchAndRender() {
  state.loading = true;
  state.total = 0; // 로딩 시작 시 0으로 초기화
  render();
  // 데이터 fetch
  const [
    {
      products,
      pagination: { total },
    },
  ] = await Promise.all([
    getProducts({
      page: state.page,
      limit: state.limit,
      sort: state.sort,
      search: state.search,
    }),
  ]);

  const categories = await getCategories(); // 카테고리 데이터 fetch
  state.categories = categories; // 상태에 저장

  state = {
    ...state,
    products,
    total,
    loading: false,
    isFirstLoad: false,
    //categories: [], // 카테고리 데이터 초기화
  };
  console.log("fetchAndRender 사용 :: 상품 데이터 로드 완료", state);
  render();
}

// 무한 스크롤 설정
// let isFetching = false;
// let infiniteScrollHandler = null;

// function setupInfiniteScroll() {
//   if (infiniteScrollHandler) return;

//   infiniteScrollHandler = async function () {
//     if (
//       window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
//       !isFetching &&
//       !state.loading &&
//       state.products.length < state.total
//     ) {
//       isFetching = true;
//       state.loading = true;
//       //fetchAndRender(); // fetchAndRender() 호출로 데이터 로드
//       // 로딩 UI는 필요하다면 별도 처리

//       const nextPage = Math.floor(state.products.length / state.limit) + 1;
//       const data = await getProducts({
//         page: nextPage,
//         limit: state.limit,
//         sort: state.sort,
//       });

//       state.products = [...state.products, ...data.products];
//       state.total = data.pagination.total;
//       state.loading = false;
//       isFetching = false;

//       render(); // 전체 render() 대신 이 함수만 호출
//       if (state.products.length >= state.total) {
//         removeInfiniteScroll();
//       }
//     }
//   };

//   window.addEventListener("scroll", infiniteScrollHandler);
// }
// function removeInfiniteScroll() {
//   if (infiniteScrollHandler) {
//     window.scrollTo(0, 0); // 페이지 이동 시 스크롤 위치 초기화
//     window.removeEventListener("scroll", infiniteScrollHandler);
//     infiniteScrollHandler = null;
//   }
// }
let isFetching = false;
function setupInfiniteScroll() {
  window.addEventListener("scroll", async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetching && !state.loading) {
      isFetching = true;
      state.loading = true;
      const prevScrollY = window.scrollY; // 현재 스크롤 위치 저장
      render();
      const nextPage = Math.floor(state.products.length / state.limit) + 1;
      const data = await getProducts({
        limit: state.limit,
        sort: state.sort,
        page: nextPage, // <-- 페이지 단위 요청
      });
      state.products = [...state.products, ...data.products];
      console.log("상품", state.products);
      state.total = data.pagination.total;
      state.loading = false;
      isFetching = false;
      console.log("무한 스크롤 데이터 로드 완료", {
        nextPage,
        totalProducts: state.products.length,
        total: state.total,
      });
      if (state.products.length >= state.total) {
        console.log("모든 상품을 불러왔습니다.");
        window.removeEventListener("scroll", setupInfiniteScroll); // 무한 스크롤 이벤트 제거
      } else {
        //console.log("추가 상품 로드 완료, 현재 상품 수:", state.products.length);
        render();
      }
      window.scrollTo(0, prevScrollY); // 이전 스크롤 위치로 복원
    }
  });
}

// 검색 이벤트 설정
function searchProductsEvent() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
      console.log("검색어 입력:", searchInput.value);
      const query = searchInput.value;

      state.loading = true;
      state.search = query; // 검색어 상태 업데이트
      render();

      const data = await getProducts({
        limit: state.limit,
        sort: state.sort,
        search: query, // ✅ 검색어 필터 적용
      });

      state.products = data.products;
      state.total = data.pagination.total;
      state.loading = false;
      render();
    } else if (e.key === "Escape") {
      console.log("검색어 초기화");
      searchInput.value = "";
      state.loading = true;

      const data = await getProducts({
        limit: state.limit,
        sort: state.sort,
      });

      state.products = data.products;
      state.total = data.pagination.total;
      state.loading = false;
      render();
    }
  });
}

// 애플리케이션 시작
async function main() {
  state.isFirstLoad = true;

  if (window.location.pathname === "/") {
    setupInfiniteScroll();
  }
  render();
  fetchAndRender();

  window.addEventListener("popstate", () => {
    if (window.location.pathname === "/") {
      state = {
        products: [],
        total: 0,
        limit: 20,
        sort: "price_asc",
        search: "",
        loading: false,
        page: 1,
        isFirstLoad: true,
        categories: [],
      };
      selectedCategory = {
        category1: "",
        category2: "",
      };
      setupInfiniteScroll();
      fetchAndRender();
    } else {
      //removeInfiniteScroll();
      PageRouter();
    }
  });
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
