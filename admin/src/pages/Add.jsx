import React, { useState } from "react";
import { assets } from "../assets/assets"; // Ensure this path is correct
import axios from "axios";
import { backendUrl } from "../App"; // Ensure this path is correct
import { toast } from "react-toastify";

const categories = [
  { id: 1, name: "computer and peripherals" },
  { id: 2, name: "mobile and accessories" },
  { id: 3, name: "gaming and console" },
  { id: 4, name: "home electronic" },
  { id: 5, name: "photography and video" },
];

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0].id);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!name.trim()) {
      return toast.error("Product name must be a non-empty string.");
    }
    if (!description.trim()) {
      return toast.error("Description must be a non-empty string.");
    }
    if (!price || isNaN(price) || price <= 0) {
      return toast.error("Price must be a positive number.");
    }
    if (!stock || isNaN(stock) || stock < 0) {
      return toast.error("Stock cannot be less than 0.");
    }

    try {
      // Prepare the product data as a JSON object
      const productData = {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        categoryId,
        images: images.filter((img) => img !== null), // Filter out any null images
      };

      // Send POST request to create product
      const response = await axios.post(
        `${backendUrl}product/create`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in header
            "Content-Type": "application/json", // Set Content-Type to application/json
          },
        }
      );
      console.log(reader.result); // Log the Base64 string after conversion.
      toast.success(response.data.message);

      // Reset form fields
      setName("");
      setDescription("");
      setImages([null, null, null, null]);
      setPrice("");
      setStock("");
      setCategoryId(categories[0].id);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Error adding product:", errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3">
      {/* Image Upload Section */}
      <div>
        <p className="mb-2">Upload images</p>
        <div className="flex gap-2">
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={!image ? assets.upload_area : image}
                alt={`Upload ${index + 1}`}
              />
              <input
                onChange={(e) => {
                  const imgFile = e.target.files[0];
                  if (imgFile) {
                    const updatedImages = [...images];

                    // Convert image file to Base64
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updatedImages[index] = reader.result; // Store the Base64 string
                      setImages(updatedImages);
                    };
                    reader.readAsDataURL(imgFile); // Convert to Base64
                  }
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name Input */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[300px] px-3 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description Input */}
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[300px] px-3 py-2 border border-gray-300 rounded"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Category, Price, and Stock Inputs */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategoryId(Number(e.target.value))}
            value={categoryId}
            className="w-full px-3 py-2 border border-gray-300 rounded">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Product price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border border-gray-300 rounded sm:w-[120px]"
            type="number"
            placeholder="0"
            required
          />
        </div>

        <div>
          <p className="mb-2">Stock</p>
          <input
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            className="w-full px-3 py-2 border border-gray-300 rounded sm:w-[120px]"
            type="number"
            placeholder="0"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-emerald-700 text-white hover:bg-emerald-950 rounded">
        Add Product
      </button>
    </form>
  );
};

export default Add;
