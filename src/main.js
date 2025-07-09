import { HomePage } from "./pages/HomePage.js";
import { getCategories, getProducts } from "./api/productApi.js";
import { ProductCard } from "./pages/components/ProductCard.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

let state = {
  products: [],
  total: 0,
  loading: false,
  limit: 20,
  sort: "price_asc",
  isFirstLoad: true, // 첫 로드 여부
};

function render() {
  const path = window.location.pathname;
  console.log("현재 경로:", path);

  const root = document.getElementById("root");
  // if (path === "/") {
  root.innerHTML = HomePage({
    ...state, // 상태를 HomePage에 전달
    selectedCategory, // 선택된 카테고리 상태 전달
  });

  attachEvents(); // ✅ 이벤트 연결
  searchProductsEvent(); // 검색 이벤트 연결
}
//}

let selectedCategory = {
  category1: "",
  category2: "",
};

export const categoryMap = {
  "생활/건강": ["생활용품", "주방용품", "문구/사무용품"],
  "디지털/가전": ["태블릿PC", "노트북"],
};

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

//이벤트 연결 함수
function attachEvents() {
  const limitSelect = document.querySelector("#limit-select");
  const sortSelect = document.getElementById("sort-select");

  if (limitSelect) {
    limitSelect.addEventListener("change", async (e) => {
      console.log("limitSelect 이벤트 발생", e.target.value);

      state.limit = parseInt(e.target.value);
      state.loading = true;
      //renderLoadingUI(); // 또는 로딩 표시 (선택)

      const data = await getProducts({
        limit: state.limit,
        sort: state.sort,
      });

      state.products = data.products;
      state.total = data.pagination.total;
      state.loading = false;

      renderProductList(); // ✅ 전체가 아닌 목록만 다시 그림
      console.log("limitSelect 이벤트 발생 후 상태", state);

      // state.loading = true;
      // render();
      // console.log("limitSelect 이벤트 발생 후 상태", state);

      // const data = await getProducts({
      //   limit: state.limit,
      //   sort: state.sort,
      // });

      // state.products = data.products;
      // state.total = data.pagination.total;
      // state.loading = false;
      // render();
      // console.log("limitSelect 이벤트 발생 후 상태", state);
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", async (e) => {
      state.sort = e.target.value;
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

  document.querySelectorAll(".category1-filter-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      selectedCategory.category1 = btn.dataset.category1;
      selectedCategory.category2 = "";
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
}

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
  state = {
    ...state,
    products,
    total,
    loading: false,
    isFirstLoad: false,
  };
  render();
}
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

function searchProductsEvent() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
      console.log("검색어 입력:", searchInput.value);
      const query = searchInput.value;

      state.loading = true;
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

async function main() {
  // state.isFirstLoad = true;
  // state.loading = true;
  // render();
  // state.isFirstLoad = false;
  // console.log("렌더링 완료1", state);
  // const data = await getProducts({
  //   limit: state.limit,
  //   sort: state.sort,
  //   ...selectedCategory,
  // });

  // state.products = data.products;
  // state.total = data.pagination.total;
  // state.loading = false;
  // render();
  // console.log("렌더링 완료2", state);

  // window.addEventListener("popstate", () => {
  //   // 앱 상태 초기화
  //   state = {
  //     products: [],
  //     total: 0,
  //     loading: false,
  //     limit: 20,
  //     sort: "price_asc",
  //     isFirstLoad: true,
  //   };
  // });

  state.isFirstLoad = true;
  render();
  fetchAndRender();

  await getCategories().then((categories) => {
    console.log("카테고리 데이터:", categories);
  });

  // popstate 이벤트 리스너 추가 (브라우저 뒤로가기/앞으로가기 및 테스트에서 사용)
  window.addEventListener("popstate", () => {
    // 앱 상태 초기화
    state = {
      products: [],
      total: 0,
      categories: [],
      limit: 20,
      sort: "price_asc",
      search: "",
      loading: false,
      page: 1,
      hasMore: true,
      isFirstLoad: true,
    };
    selectedCategory = {
      category1: "",
      category2: "",
    };
    fetchAndRender();
  });
  setupInfiniteScroll(); // 무한 스크롤 설정
  //attachEvents(); // 👈 꼭 호출!
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
