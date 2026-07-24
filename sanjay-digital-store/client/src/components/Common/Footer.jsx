import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-heading">Sanjay Digital Studio</h3>
            <p className="footer-text">
              Your one-stop shop for beautiful photographs and unique gifts.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="footer-link">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <address className="footer-address">
              22, Shri Navkar, Pin, Laxmi Bai Marg, Jhabua,
              <br />
              Madhya Pradesh 457661
              <br />
              Inida
              <p>Phone: 7694071317 ,9425192481 ,8319692794 ,9407422114</p>
              <p>Email: sanjaydigitaljhabua@gmail.com</p>
            </address>
          </div>
        </div>
        <div className="footer-copyright">
          <p>
            &copy; {new Date().getFullYear()} Sanjay Digital Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
