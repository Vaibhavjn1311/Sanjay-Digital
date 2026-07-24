import "./Contact.css";
import homeCoverImg from "./HomeCover.jpeg";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-grid">
        <div className="contact-form-container about-section-contact">
          {/* <h2>About Us</h2> */}
          <div className="about-content">
            <div className="about-text">
              <p>
                We are a professional photo studio specializing in portrait
                photography, event coverage, and creative photo shoots. Our team
                of experienced photographers will help you capture your most
                precious moments.
              </p>
              <p>
                Our gift shop offers a carefully curated selection of unique
                items that make perfect presents for any occasion. From
                personalized photo frames to custom-made albums, we have
                something special for everyone.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <img
                  className="home-cover-img"
                  src={homeCoverImg}
                  alt="Home cover banner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem', maxHeight: '300px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="contact-info-container">
          <h2>Our Information</h2>
          <div className="info-section">
            <div className="info-group">
              <h3>Address</h3>
              <address>
                22, Shri Navkar, Pin, Laxmi Bai Marg, Jhabua,
                <br />
                Madhya Pradesh 457661
                <br />
                Inida
              </address>
            </div>

            <div className="info-group">
              <h3>Contact Details</h3>
              <ul className="info-list">
                <li>Phone: <br />
                  7694071317 <br /> 9425192481 <br /> 8319692794 <br /> 9407422114</li>
                <li>Email: sanjaydigitaljhabua@gmail.com</li>
                <li>WhatsApp: <br />
                  7694071317</li>
              </ul>
            </div>

            <div className="info-group">
              <h3>Business Hours</h3>
              <ul className="info-list">
                <li>Monday - Sunday: 8:00 AM - 9:00 PM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
