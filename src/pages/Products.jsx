import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Pagination from "../components/Pagination";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6); 

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let temp = [...products];

    if (debouncedSearch.trim())
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase().trim())
      );

    if (category) temp = temp.filter((p) => p.category === category);

    if (maxPrice && !isNaN(maxPrice))
      temp = temp.filter((p) => p.price <= parseFloat(maxPrice));

    if (rating && !isNaN(rating))
      temp = temp.filter((p) => p.rating.rate >= parseFloat(rating));

    setFiltered(temp);
    setPage(1);
  }, [debouncedSearch, category, maxPrice, rating, products]);

  if (loading) return <Loader />;
  if (error) return <Error message="Failed to load products" />;

  const pageData = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      {/* Inline Filters - Single Row */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
        {/* Search with clear button */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 min-w-[150px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
        </select>

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="flex-1 min-w-[140px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Rating */}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="flex-1 min-w-[100px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Rating</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      {/* Products Grid or No Results */}
      {filtered.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No results found.</p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {pageData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Show total count */}
          <p className="text-sm text-gray-600 mb-4 text-center">
            Showing {(page - 1) * perPage + 1} to{" "}
            {Math.min(page * perPage, filtered.length)} of {filtered.length}{" "}
            products
          </p>
        </>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          perPage={perPage}
          setPerPage={setPerPage}
          setPage={setPage}
        />
      )}
    </div>
  );
}
