import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact_us_container_main">
      <div className="contact_us_container">
      
        <div className="contact_us_greeting">
          <h2>meet our team</h2>
        </div>       

        <div className="contact_us_grid_container">
          <div className="contact_us_column">
            <div className="contact_us_image_container">
              <img src={require("../../assets/contactus/olga.jpg")} alt=""></img>
            </div>
            <div className="contact_us_name">
              <p>Olga Bessonova</p>
            </div>
            <div className="contact_us_role">
              <p>fullstack developer</p>
            </div>
            <div className="social_links">
              <div>
                <a className = 'github-link' target="_blank" rel="noopener noreferrer" href="https://github.com/olga-bessonova/">
                  <i className="fa-brands fa-github fa-2x"></i>
                </a>
              </div>
              <div>
                <a className = 'linkedin-link' target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/olga-borovikova/">
                  <i className="fa-brands fa-linkedin-in fa-2x"></i>
                </a>
              </div>

            </div>
          </div>

          <div className="contact_us_column">
            <div className="contact_us_image_container">
              <img src={require("../../assets/contactus/slava.jpg")} alt=""></img>
            </div>
            <div className="contact_us_name">
              <p>Stanislau Hekht</p>
            </div>
            <div className="contact_us_role">
              <p>fullstack developer</p>
            </div>
            <div className="social_links">
              <div>
                <a className = 'github-link' target="_blank" rel="noopener noreferrer" href="https://github.com/zeisen33">
                  <i className="fa-brands fa-github fa-2x"></i>
                </a>
              </div>
              <div>
                <a className = 'linkedin-link' target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/zane-eisen-121856bb/">
                  <i className="fa-brands fa-linkedin-in fa-2x"></i>
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>

  )
};

export default ContactUs;