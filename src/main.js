import { HomePage } from "./pages/HomePage.js";
import { getProducts } from "./api/productApi.js";
//import { ProductCard } from "./pages/components/ProductCard.js";

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
  sort: "price_asc", // 페이지당 상품 수
};

function render() {
  const root = document.body.querySelector("#root");
  //const visibleProducts = state.products.slice(0, state.limit);
  root.innerHTML = HomePage({
    ...state,
  });
  console.log("렌더링 완료", state);
  attachEvents(); // ✅ 이벤트 연결
}

function attachEvents() {
  const limitSelect = document.getElementById("limit-select");
  const sortSelect = document.getElementById("sort-select");

  if (limitSelect) {
    limitSelect.addEventListener("change", async (e) => {
      state.limit = parseInt(e.target.value);
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
      state.total = data.pagination.total;
      state.loading = false;
      isFetching = false;

      render();

      window.scrollTo(0, prevScrollY); // 이전 스크롤 위치로 복원
    }
  });
}
async function main() {
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

  attachEvents(); // 👈 꼭 호출!
  setupInfiniteScroll(); // 무한 스크롤 설정
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
