import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Use the first image or a default image if none are available
  const displayImage =
    images && images.length > 0 ? images[0] : "path/to/default/image.png"; // Replace with your default image path

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={displayImage}
          alt={name} // Use name as alt text for better accessibility
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price.toFixed(2)} {/* Format price to two decimal places */}
      </p>
    </Link>
  );
};

export default ProductItem;
