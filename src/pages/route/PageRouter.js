import { getProduct } from "../../api/productApi.js";
import { HomePage } from "../HomePage.js";
import { ProductDetailPage } from "../ProductDetailPage.js";
import { attachEvents } from "../../main.js";
import { getRelatedProducts } from "../../main.js";

export async function PageRouter() {
  const root = document.getElementById("root");
  const path = window.location.pathname;

  const productDetailMatch = path.match(/^\/product\/(\d+)/);
  if (productDetailMatch) {
    const productId = productDetailMatch[1];
    const product = await getProduct(productId);
    const relatedProducts = await getRelatedProducts(product);
    console.log("relatedProducts", relatedProducts);
    root.innerHTML = ProductDetailPage({ product, relatedProducts });
    attachEvents(); // ProductDetailPage 렌더 후에만 attachEvents 호출
    return;
  }

  // 기본(홈) 페이지
  root.innerHTML = HomePage({
    // ...state,
    // selectedCategory,
  });

  // //attachEvents();
}
