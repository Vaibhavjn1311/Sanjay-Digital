import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?limit=10');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <Link to="/admin/products/new" className="add-product-btn">
          Add New Product
        </Link>
      </div>

      <div className="manage-categories-link">
        <Link to="/admin/categories">Manage Categories →</Link>
      </div>

      <div className="products-table-container">
        <div className="table-responsive">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="loading-message">Loading...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-message">No products found.</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product._id}>
                    <td>
                      <div className="product-info">
                        <div className="product-image">
                          <img
                            src={
                              product.images?.[0]
                                ? product.images[0]
                                : '/placeholder-product.jpg'
                            }
                            alt={product.name}
                            loading="lazy"
                          />
                        </div>
                        <div className="product-name">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="category-info">
                        {product.category?.name || '-'} 
                         {/* {product.subcategory?.name || '-'} */}
                      </div>
                    </td>
                    <td>
                      <div className="product-price">
                        ₹{product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="action-buttons">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
