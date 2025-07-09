import { useEffect, useState } from 'react';
import api from '../../services/api';
import ProductCard from '../Common/ProductCard';
import homeCoverImg from "./HomeCover.jpeg";
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products?limit=4');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
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
          <p className="hero-subtitle">Capture memories and find the perfect gifts for your loved ones</p>
          <a href="/products" className="cta-button">
            Browse Products
          </a>
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
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-container">
          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                We are a professional photo studio specializing in portrait photography, event coverage, 
                and creative photo shoots. Our team of experienced photographers will help you capture 
                your most precious moments.
              </p>
              <p>
                Our gift shop offers a carefully curated selection of unique items that make perfect 
                presents for any occasion. From personalized photo frames to custom-made albums, we have 
                something special for everyone.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <img className='home-cover-img' src={homeCoverImg} placeholder="Home Cover not found" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;