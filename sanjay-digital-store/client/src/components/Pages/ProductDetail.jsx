import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import WhatsAppButton from '../Common/WhatsAppButton';
import './ProductDetail.css'; // Import the CSS file

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="product-detail-container">
        <div className="product-detail-card loading">
          <div className="loading-pulse">
            <div className="loading-title"></div>
            <div className="product-detail-grid">
              <div>
                <div className="loading-image"></div>
                <div className="loading-thumbnails">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="loading-thumbnail"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="loading-price"></div>
                <div className="loading-text"></div>
                <div className="loading-text medium"></div>
                <div className="loading-text short"></div>
                <div className="loading-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-detail-card not-found">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <h1 className="product-title">{product.name}</h1>

        <div className="product-detail-grid">
          {/* Product Images */}
          <div className="product-images-section">
            <div className="product-main-image-container">
              <img
                src={product.images[selectedImage] || '/placeholder-product.jpg'}
                alt={product.name}
                className="product-main-image"
              />
            </div>

            {product.images.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`thumbnail-button ${selectedImage === index ? 'active' : ''}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="product-info-section">
            <div className="product-price-container">
              <span className="product-price">₹{product.price.toFixed(2)}</span>
            </div>

            <div className="product-description">
              <h2>Description</h2>
              <p title={product.description} className="break-words">
                {product.description || 'No description available.'}
              </p>
            </div>


            <div className="product-details">
              <h2>Details</h2>
              <ul className="details-list">
                <li><span className="detail-label">Category:</span> {product.category?.name || 'N/A'}</li>
                {/* <li><span className="detail-label">Subcategory:</span> {product.subcategory?.name || 'N/A'}</li> */}
              </ul>
            </div>

            <div className="whatsapp-button-container">
              <WhatsAppButton
                productName={product.name}
                productPrice={product.price}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;