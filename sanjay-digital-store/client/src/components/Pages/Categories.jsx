import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      <h1 className="categories-title">Our Categories</h1>
      
      {isLoading ? (
        <div className="categories-grid loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="category-card-skeleton"></div>
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category._id} className="category-card">
              <div className="category-image-placeholder">
                <span className="category-placeholder-text">{category.name}</span>
              </div>
              <div className="category-content">
                <h2 className="category-name">{category.name}</h2>
                {category.subcategories?.length > 0 && (
                  <div className="subcategories-section">
                    <h3 className="subcategories-title">Subcategories:</h3>
                    <div className="subcategories-list">
                      {category.subcategories.map(subcategory => (
                        <Link 
                          key={subcategory._id} 
                          to={`/products?category=${category._id}&subcategory=${subcategory._id}`}
                          className="subcategory-tag"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <Link 
                  to={`/products?category=${category._id}`}
                  className="view-products-link"
                >
                  View all products →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-categories-message">
          <p>No categories found.</p>
        </div>
      )}
    </div>
  );
};

export default Categories;