import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Navbar() {
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", dark);
  }, [dark]);
  return (
    <nav style={{
      padding: "15px",
      background: "#007bff",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <div>
        <Link to="/" style={{ color: "white", marginRight: "15px" }}>Home</Link>
        <Link to="/products" style={{ color: "white" }}>Products</Link>
      </div>

      <button onClick={() => setDark(!dark)}>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}
