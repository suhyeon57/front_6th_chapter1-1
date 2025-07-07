import { HomePage } from "./pages/HomePage.js";
import { getProducts } from "./api/productApi.js";

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
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
