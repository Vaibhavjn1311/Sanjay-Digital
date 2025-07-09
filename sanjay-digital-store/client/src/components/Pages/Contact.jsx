import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <div className="contact-grid">
        <div className="contact-form-container">
          <h2>Get in Touch</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="form-textarea"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="submit-button"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div className="contact-info-container">
          <h2>Our Information</h2>
          <div className="info-section">
            <div className="info-group">
              <h3>Address</h3>
              <address>
                22, Shri Navkar, Pin,  
                Laxmi Bai Marg, Jhabua,<br />
                Madhya Pradesh 457661<br />
                Inida
              </address>
            </div>
            
            <div className="info-group">
              <h3>Contact Details</h3>
              <ul className="info-list">
                <li>Phone: 7694071317 ,9425192481 ,8319692794 ,9407422114</li>
                <li>Email: sanjaydigitaljhabua@gmail.com</li>
                <li>WhatsApp: 7694071317</li>
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