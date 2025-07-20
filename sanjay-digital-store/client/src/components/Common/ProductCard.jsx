import { Link } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import './ProductCard.css'; // Import the CSS file

const ProductCard = ({ product, hideDescription = false }) => {
  // Use the first image URL directly (Cloudinary) or fallback to placeholder
  const productImage = product.images?.[0] || '/placeholder-product.jpg';

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-link">
        <div className="product-image-container">
          <img
            className="product-image-body"
            src={productImage}
            alt={product.name}
            loading="lazy"
          />
        </div>
        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>
          {!hideDescription && (
            <p className="product-description">
              {product.description}
            </p>
          )}
          <div className="product-price-container">
            <span className="product-price">₹{product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      <div className="whatsapp-button-container">
        <WhatsAppButton
          productName={product.name}
          productPrice={product.price}
          productImage={productImage}
        />
      </div>
    </div>
  );
};

export default ProductCard;
