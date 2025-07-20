import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import ProductCard from '../Common/ProductCard';
import './Products.css'; // Import the CSS file

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch categories
        const categoriesResponse = await api.get('/categories');
        setCategories(categoriesResponse.data);
        
        // Fetch products with filters
        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (selectedSubcategory) params.subcategory = selectedSubcategory;
        
        const productsResponse = await api.get('/products', { params });
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory('');
    
    const params = {};
    if (category) params.category = category;
    setSearchParams(params);
  };

  const handleSubcategoryChange = (e) => {
    const subcategory = e.target.value;
    setSelectedSubcategory(subcategory);
    
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (subcategory) params.subcategory = subcategory;
    setSearchParams(params);
  };

  const getSubcategories = () => {
    if (!selectedCategory) return [];
    const category = categories.find(cat => cat._id === selectedCategory);
    return category?.subcategories || [];
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Our Products</h1>
      
      {/* Filters */}
      <div className="filters-container">
        <h2 className="filters-title">Filter Products</h2>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="category" className="filter-label">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* <div className="filter-group">
            <label htmlFor="subcategory" className="filter-label">
              Subcategory
            </label>
            <select
              id="subcategory"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              disabled={!selectedCategory}
              className="filter-select"
            >
              <option value="">All Subcategories</option>
              {getSubcategories().map(subcategory => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </div>
      
      {/* Products Grid */}
      {isLoading ? (
        <div className="products-grid loading">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="product-card-skeleton"></div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} hideDescription={true} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Products;