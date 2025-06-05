// import { useGetProductListQuery } from "../redux/APIs/productDataApi";
// import { ShimmerPostList } from "react-shimmer-effects";
import { useSelector, useDispatch } from "react-redux";
import { setProductList } from "../redux/slices/productDataSlice";
import { productArray } from "../data/ProductArray";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import ProductLink from "./ProductLink";

const ProductCard = () => {
  // const {
  //   data: products,
  //   isLoading,
  //   error,
  // } = useGetProductListQuery("products");
  // console.log(useGetProductListQuery("products"));
  // console.log(products)

  const { cartItems, productList } = useSelector((state) => state.productData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductList(productArray));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productList]);

  return (
    <div className="mx-auto min-h-[calc(100vh-328px-80px)] pt-5 md:max-w-3xl lg:max-w-5xl">
      <Toaster position="top-right" reverseOrder={false} />

      {/* {isLoading && (
        <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={20} />
      )} */}

      {productList?.length > 0 && (
        <div className="grid gap-4 p-2 md:grid-cols-2 md:p-10 lg:grid-cols-3">
          {productList.map((product) => (
            <ProductLink prop={{ product }} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
