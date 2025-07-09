import React from 'react';
import './WhatsAppButton.css'; // Import the CSS file

const WhatsAppButton = ({ productName, productPrice, productImage }) => {
  const phoneNumber = '+917694071317';

  // Use the Cloudinary URL directly or fallback
  const imageUrl = productImage?.startsWith('http')
    ? productImage
    : 'https://example.com/placeholder-product.jpg';

  const message = `
🛍️ *${productName}*
💰 ₹${productPrice.toFixed(2)}

I'm interested in purchasing this product. Please provide more details.

🖼️ View Image:
${imageUrl}
`;

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button onClick={handleClick} className="whatsapp-button">
      <svg className="whatsapp-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.88 11.88 0 0012.07.02C5.78.17.61 5.3.5 11.59a11.9 11.9 0 001.6 6.01L.02 24l6.58-2.06a11.94 11.94 0 0017.29-9.97 11.9 11.9 0 00-3.37-8.49zM12.1 21.17a9.58 9.58 0 01-4.84-1.33l-.35-.21-3.91 1.23 1.27-3.82-.23-.39a9.56 9.56 0 01-1.49-5.15c.1-5.26 4.35-9.52 9.61-9.58h.09a9.58 9.58 0 017.02 16.3 9.52 9.52 0 01-7.17 3.95zm5.3-7.29c-.29-.15-1.7-.84-1.97-.94s-.46-.15-.65.14-.75.94-.92 1.13-.34.22-.63.07a7.75 7.75 0 01-2.28-1.41 8.51 8.51 0 01-1.57-1.94c-.16-.29-.02-.44.12-.59.13-.13.29-.33.43-.49a1.99 1.99 0 00.28-.47.53.53 0 00-.03-.5c-.08-.14-.65-1.56-.89-2.13s-.47-.48-.65-.49h-.55a1.06 1.06 0 00-.76.36 3.19 3.19 0 00-.99 2.36 5.55 5.55 0 001.18 2.85 12.93 12.93 0 004.9 4.72c.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12a3 3 0 001.96-1.38 2.43 2.43 0 00.17-1.38c-.07-.13-.26-.2-.54-.34z" />
      </svg>
      <span>Order via WhatsApp</span>
    </button>
  );
};

export default WhatsAppButton;
