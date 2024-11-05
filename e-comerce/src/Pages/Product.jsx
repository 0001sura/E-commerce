import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";
import Rating from "../Components/Rating"; // Import the StarRating component

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null); // Changed initial state to null
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [rating, setRating] = useState(0); // State for rating

  // Fetch product data based on productId
  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
      setRating(foundProduct.rating || 0); // Set initial rating from product data

      setLoading(false); // Set loading to false once data is fetched
    } else {
      setLoading(false); // Set loading to false if no product found
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (loading) {
    return <div>Loading...</div>; // Loading message
  }

  if (!productData) {
    return <div>Product not found.</div>; // Handle case where product is not found
  }

  // Destructure productData for easier access
  const { name, price, description, image: productImages } = productData;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productImages.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-full sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Image of ${name}`} // Improved accessibility
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={image}
              alt={`Main image of ${name}`}
            />{" "}
            {/* Improved accessibility */}
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <Rating currentRating={rating} onRatingChange={setRating} />
            ))}

            <p className="pl-2">(154)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {price}
          </p>
          <p className="mt-5 text-gray-500 md:w4/5">{description}</p>

          <button
            onClick={() => addToCart(productData._id)}
            className="bg-black text-white px-8 py-3 mt-3 text-sm active:bg-gray-700">
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original</p>
            <p>7 days money back garanty</p>
          </div>
        </div>
      </div>
      {/*display related products*/}
      <RelatedProducts
        category={productData.category}
        currentProductId={productData._id}
      />
    </div>
  );
};

export default Product;
