import { getProduct } from "../../api/productApi.js";
import { HomePage } from "../HomePage.js";
import { ProductDetailPage } from "../ProductDetailPage.js";

export async function PageRouter() {
  const root = document.getElementById("root");
  const path = window.location.pathname;

  const productDetailMatch = path.match(/^\/product\/(\d+)/);
  if (productDetailMatch) {
    console.log("상품 상세 페이지로 이동:", productDetailMatch[1]);
    const productId = productDetailMatch[1];

    // 서버에서 상품 상세 정보 가져오기
    const product = await getProduct(productId);

    root.innerHTML = ProductDetailPage({ product });
    return;
  }

  // 기본(홈) 페이지
  root.innerHTML = HomePage(/* ...필요한 props */);
}
