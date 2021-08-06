import React from 'react';
import './footer.css';

const Footer = () => {

    return(
        <footer className="page-footer footerWrapper">
          <div className="footer-copyright">
            <div className="container">
            © 2021 HS-Soft
            <a className="grey-text text-lighten-4 right" href="https://api.spacex.land/graphql/">Api</a>
            </div>
          </div>
        </footer>
    )
}

export default Footer;