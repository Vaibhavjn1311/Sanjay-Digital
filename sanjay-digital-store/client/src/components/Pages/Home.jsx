import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import ProductCard from "../Common/ProductCard";
import "./Home.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get("/products?limit=4");
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Photo Studio & Gift Shop</h1>
          <p className="hero-subtitle">
            Capture memories and find the perfect gifts for your loved ones
          </p>
          <Link to="/products" className="cta-button">
            Browse Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-container">
          <h2>Featured Products</h2>
          {isLoading ? (
            <div className="products-grid loading">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="product-card-skeleton"></div>
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  hideDescription={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
