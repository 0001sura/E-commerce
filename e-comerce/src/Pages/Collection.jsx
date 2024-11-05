import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";
import SearchBar from "../Components/SearchBar";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products);
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    if (value !== "") {
      setCategories([value]); // Keep only the selected category
    } else {
      setCategories([]); // Clear categories if no selection
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categories.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        categories.includes(item.category)
      );
    }

    // Sorting logic
    if (sortOption === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [categories, sortOption, search, showSearch, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t w-full">
      {/* Filter option */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2">
          Filters
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Dropdown menu for filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }`}>
          {/* Categories Dropdown */}
          <p className="mb-3 text-sm font-medium">Categories</p>
          <select
            className="border-2 border-gray-300 text-sm px-3 py-2 w-full rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            value={selectedCategory}
            onChange={toggleCategory}>
            <option value="">Select a category</option>
            {[
              "computer and peripherals",
              "mobile and accessories",
              "gaming and console",
              "home electronic",
              "photography and video",
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort options */}
          <p className="mb-3 text-sm font-medium mt-4">Sort by</p>
          <select
            className="border-2 border-gray-300 text-sm px-3 py-2 w-full rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}>
            <option value="relevant">Relevant</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>
      </div>

      <div className={`flex-1 ${showFilter ? "max-w-full" : "w-full"}`}>
        <SearchBar />
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
        </div>

        {/* Map products */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ${
            showFilter ? "max-w-full" : "w-full"
          }`}>
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
