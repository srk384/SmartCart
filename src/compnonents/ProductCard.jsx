import { useGetProductListQuery } from "../redux/APIs/productDataApi";
import { ShimmerPostList } from "react-shimmer-effects";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  setProductList,
  updateCart,
} from "../redux/slices/productDataSlice";
import { productArray } from "../data/ProductArray";
import toast, { Toaster } from "react-hot-toast";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CartSVG from "./SVGs/CartSVG";

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
  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(setProductList(productArray));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productList]);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     const getLS = JSON.parse(localStorage.getItem("cart"))
  //     if(getLS){
  //       dispatch(addToCart(...getLS));
  //       isFirstRender.current = false;
  //       return;
  //     }

  //   }
  //   localStorage.setItem("cart", JSON.stringify(cartItems));

  // }, [cartItems]);



  const handleAdd2Cart = (product) => {
    dispatch(addToCart(product));

    toast.success("Added to Cart!", {
      style: {
        border: "1px solid #fe5156",
        padding: "8px 10px",
        color: "#fe5156",
        fontWeight: "bold",
      },
      iconTheme: {
        primary: "#fe5156",
        secondary: "#FFF",
      },
    });
  };
  const handleRatings = (count) => {
    if (typeof count !== "number" || isNaN(count) || count < 0 || count > 5)
      return [];

    const floorCount = Math.floor(count);
    const hasHalf = count % 1 !== 0;

    const stars = [];

    for (let i = 0; i < floorCount; i++) {
      stars.push(<IoMdStar key={`star-full-${i}`} />);
    }

    if (hasHalf) {
      stars.push(<IoMdStarHalf key="star-half" />);
    }

    return stars;
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-328px-80px)] pt-5 md:max-w-3xl lg:max-w-5xl">
      <Toaster position="top-right" reverseOrder={false} />

      {/* {isLoading && (
        <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={20} />
      )} */}

      {/* {pageTitle && <div className="text-2xl font-bold">{pageTitle}</div>} */}

      {productList?.length > 0 && (
        <div className="grid gap-4 p-2 md:grid-cols-2 md:p-10 lg:grid-cols-3">
          {productList.map((product) => (
            <Link to="/product" state={product} key={product.id}>
              <div className="card group mx-auto mb-5 flex w-[300px] flex-col justify-between rounded transition hover:cursor-pointer hover:bg-white hover:shadow-xl md:w-full">
                <div className="relative h-[304px]">
                  <img
                    className="mx-auto h-full rounded-t object-contain"
                    src={product.images?.[0]}
                    alt={product.title}
                    onError={(e) => {
                      e.currentTarget.src = "/images/noimage2.jpeg";
                    }}
                  />
                  {product.tag && (
                    <div
                      className={`tag absolute right-2 bottom-2 rounded px-3 py-1 text-xs font-semibold text-white ${
                        product.tag === "New" ? "bg-red-500" : "bg-amber-500"
                      }`}
                    >
                      {product.tag}
                    </div>
                  )}
                </div>
                <div className="flex h-full flex-col justify-between p-4">
                  <h4 className="font-semibold">{product.title}</h4>
                  <div className="rating flex text-amber-600">
                    {handleRatings(product.ratings)}
                  </div>
                  <p className="mb-2 font-semibold text-neutral-600">
                    Rs. {product.price}
                  </p>
                  <button
                    className="mx-auto flex cursor-pointer items-center justify-center gap-2 rounded border-2 border-[#fe5156] p-1 px-2 font-semibold text-[#fe5156] transition hover:bg-[#fe5156] hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAdd2Cart(product);
                    }}
                  >
                    <CartSVG />
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
