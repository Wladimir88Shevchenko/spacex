import React from "react";
import "./header.css";

const Header = () => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper navWrapper">
                    <a href="!#" className="brand-logo brandLogo">
                        User List 🚀
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <a href="https://api.spacex.land/graphql/">Api</a>
                        </li>
                        <li>
                            <a href="https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fapi.spacex.land%2Fgraphql%2F">Sandbox</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
