import { Suspense } from "react";
import ProductsComponent from "@/Components/ProductComponents/ProductsComponent";

function Categories() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsComponent />
    </Suspense>
  );
}

export default Categories;