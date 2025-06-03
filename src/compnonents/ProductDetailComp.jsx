import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, setProductList } from "../redux/slices/productDataSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import { productArray } from "../data/ProductArray";
import toast, { Toaster } from "react-hot-toast";
import CartSVG from "./SVGs/CartSVG";
import BuySVG from "./SVGs/BuySVG";
import { HandleRatings } from "./HandleRatings";

const ProductDetailComp = ({prop}) => {

  const id = prop.id
  const { cartItems, productList } = useSelector((state) => state.productData);
  // const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const imgRef = useRef();
  const [isAdded2Cart, setIsAdded2Cart] = useState(false);
  const [productById, setProductById] = useState(false);

  useEffect(() => {
    if (id && productList.length > 0) {
      const filtered = productList.find((item) => item._id === id);
      setProductById(filtered);
    } else {
      dispatch(setProductList(productArray));
    }
  }, [id, productList]);

  const product = productById || location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

    const getSimilarProducts = (category = product.category.name) => {
    const similarProducts = productList.filter(
      (item) => item.category.name === category,
    );
    return similarProducts;
  };

  const handleAdd2Cart = (product) => {
    dispatch(addToCart(product));
    setIsAdded2Cart(true);

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

  if (!product) {
    return (
      <div className="flex min-h-[calc(100vh-328px-80px)] items-center justify-center text-4xl font-bold text-neutral-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-4 pt-12">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>

      {/* Main product details */}
      <div className="lg:flex lg:gap-10">
        {/* Images */}
        <div className="mb-6 w-full lg:w-1/2">
          <img
            src={product.images[0]}
            alt={product.title}
            ref={imgRef}
            className="w-full rounded-lg object-contain"
          />
          <div className="mt-4 flex gap-2">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Thumbnail"
                className="h-20 w-20 rounded object-cover"
                onClick={(e) => (imgRef.current.src = e.target.src)}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="w-full lg:w-1/2">
          <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
          <div className="mb-4 flex items-center text-amber-600">
            <HandleRatings stars={product.ratings} />
            <span className="pl-1 text-sm text-gray-500">(76 reviews)</span>
          </div>
          <p className="mb-4 text-lg text-gray-700">{product.description}</p>
          <p className="mb-4 text-2xl font-semibold text-green-600">
            ₹{product.price}
          </p>

          {/* --size selector-- */}

          <div className="size mb-8 text-sm">
            <span className="m-1 border border-neutral-300 p-1 px-2 active:bg-red-300">
              S
            </span>
            <span className="m-1 border border-neutral-300 p-1 px-2 active:bg-red-300">
              M
            </span>
            <span className="m-1 border border-neutral-300 p-1 px-2 active:bg-red-300">
              L
            </span>
            <span className="m-1 border border-neutral-300 p-1 px-2 active:bg-red-300">
              Xl
            </span>
            <span className="m-1 border border-neutral-300 p-1 px-2 active:bg-red-300">
              XXl
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {isAdded2Cart ? (
              <Link to="/cart">
                <button className="flex cursor-pointer items-center justify-center gap-2 rounded border border-neutral-300 p-1 px-2 font-semibold text-neutral-600 transition">
                  <CartSVG />
                  Go to Cart
                </button>
              </Link>
            ) : (
              <button
                className="flex cursor-pointer items-center justify-center gap-2 rounded border border-neutral-300 p-1 px-2 font-semibold text-neutral-600 transition"
                onClick={() => handleAdd2Cart(product)}
              >
                <CartSVG />
                Add to Cart
              </button>
            )}
            <Link to="/confirmation">
              <button className="flex cursor-pointer items-center justify-center gap-2 rounded border-2 border-[#fe5156] bg-[#fe5156] p-1 px-2 font-semibold text-white transition">
                <BuySVG />
                Buy Now
              </button>
            </Link>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 text-sm text-gray-600">
            🚚 Free delivery within 3–5 business days. <br />
            🔄 Easy 7-day returns.
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="my-16 w-full md:w-5xl">
        <h2 className="text-2xl font-semibold">Explore Similar Products</h2>
        <div className="flex flex-nowrap gap-2 overflow-x-auto py-8 md:gap-4">
          {getSimilarProducts().map((product) => (
            <Link to="/product" state={product} key={product.id}>
              <div className="card flex w-42 flex-col justify-between rounded transition hover:cursor-pointer hover:bg-white hover:shadow-xl">
                <div className="relative h-42">
                  <img
                    className="mx-auto h-full w-full rounded-t object-contain"
                    src={product.images[0]}
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
                <div className="flex h-full flex-col justify-between p-2">
                  <h4 className="truncate font-semibold">{product.title}</h4>
                  <div className="rating flex text-amber-600">
                    <HandleRatings stars={product.ratings} />
                  </div>
                  <p className="font-semibold text-neutral-600">
                    Rs. {product.price}
                  </p>
                  <button
                    className="mx-auto mt-3 mb-1.5 flex cursor-pointer items-center justify-center gap-1 rounded border-1 border-[#fe5156] p-1 px-2 font-semibold text-[#fe5156] transition hover:bg-[#fe5156] hover:text-white"
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
      </div>
    </div>
  );
};

export default ProductDetailComp;
