import { useSelector, useDispatch } from "react-redux";
import { addToCart, setProductList } from "../redux/slices/productDataSlice";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ProductLink from "./ProductLink";
import { productArray } from "../data/ProductArray";
import { useParams } from "react-router";

export const ProductsByCategories = () => {
  const { cartItems, productList } = useSelector((state) => state.productData);
  const [pageTitle, setPageTitle] = useState("");
  const [listByCategory, setListByCategory] = useState([]);
  const dispatch = useDispatch();

  const { category } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productList]);

  useEffect(() => {
    if (category && productList.length > 0) {
      const filtered = productList.filter(
        (item) => item.category.name === category,
      );
      setListByCategory(filtered);
      setPageTitle(category);
    } else {
      dispatch(setProductList(productArray));
    }
  }, [category, productList]);

  return (
    <div className="mx-auto min-h-[calc(100vh-328px-80px)] pt-5 md:max-w-3xl lg:max-w-5xl">
      <Toaster position="top-right" reverseOrder={false} />

      <img src="/images/new/lto.png" alt="" />

      {pageTitle && (
        <div className="bg-gradient-to-r from-sky-600 to-sky-200 to-65% p-2 text-2xl font-semibold text-white">
          {pageTitle}
        </div>
      )}

      {listByCategory?.length > 0 && (
        <div className="grid gap-4 p-2 pt-6 md:grid-cols-2 md:p-10 lg:grid-cols-3">
          {listByCategory.map((product) => (
            <ProductLink prop={{ product }} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};
