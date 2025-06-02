import { useSelector, useDispatch } from "react-redux";
import { addToCart, setProductList } from "../redux/slices/productDataSlice";
import toast, { Toaster } from "react-hot-toast";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartSVG from "./SVGs/CartSVG";

export const ProductsByCategories = () => {
  const { cartItems, productList } = useSelector((state) => state.productData);
  const [pageTitle, setPageTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductList(productList));
    setPageTitle(productList?.[0]?.category?.name || "Products");
  }, [productList]);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[productList]);
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
       
            <img src="/images/new/lto.png" alt="" />

      {pageTitle && <div className="text-2xl font-semibold bg-gradient-to-r from-sky-600 to-sky-200 to-65% text-white p-2">{pageTitle}</div>}

      {productList?.length > 0 && (
        <div className="grid gap-4 p-2 pt-6 md:grid-cols-2 md:p-10 lg:grid-cols-3">
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
