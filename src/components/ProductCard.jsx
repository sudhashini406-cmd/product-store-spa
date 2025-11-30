import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductCard({ product }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const favList = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFav(favList.includes(product.id));
  }, []);

  const toggleFav = () => {
    let favList = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (fav) {
      favList = favList.filter((id) => id !== product.id);
    } else {
      favList.push(product.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favList));
    setFav(!fav);
  };

  return (
    <div className="card">
      <img src={product.image} alt="" />

      <h4>{product.title.slice(0, 30)}...</h4>
      <p>${product.price}</p>

      <button onClick={toggleFav} style={{ background: fav ? "red" : "#007bff" }}>
        {fav ? "❤️ Remove" : "🤍 Add Fav"}
      </button>

      <Link to={`/products/${product.id}`}>
        <button style={{ width: "100%", marginTop: "10px" }}>View Details</button>
      </Link>
    </div>
  );
}
