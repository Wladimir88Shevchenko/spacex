import React, { useState } from "react";
import UserList from "../user-list";
import "./app.css";
import Header from "../header";
import UserProps from "../user-props";
import { useQuery } from "@apollo/client";
import GETALLUSERS from "../../services/query";
import UserContext from "../../services/userContext";
import Footer from "../footer";
import AddingUsers from "../adding-users";
import "../../main-styles.css";
import Loader from "../loader";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
    const { loading, error, data } = useQuery(GETALLUSERS);

    const [isAddPersonPanelVisible, setIsAddPersonPanelVisible] =
        useState(false);

    if (loading) return <Loader />;
    if (error) return <p>Error :(</p>;

    const toogleShowAddPersonPanel = () => {
        setIsAddPersonPanelVisible((oldValue) => !oldValue);
    };

    const contextValue = {
        data,
        isAddPersonPanelVisible,
        toogleShowAddPersonPanel,
    };

    return (
        <div>
            <Router>
                <UserContext.Provider value={contextValue}>
                    <Header />
                    <div className="mainContent">
                        <div className="usersData">
                            <Route exact path="/">
                                <div className="leftColumn">
                                    <UserList />
                                </div>
                            </Route>
                            <Route
                                path="/:id"
                                render={({ match }) => {
                                    const {id} = match.params;
                                    return (
                                        <div className="leftColimn">
                                            <UserProps
                                                choosenPerson={id}
                                            />
                                        </div>
                                    );
                                }}
                            />
                        </div>
                        {isAddPersonPanelVisible && (
                            <div className="addingForm">
                                <AddingUsers />
                            </div>
                        )}
                    </div>
                    <Footer />
                </UserContext.Provider>
            </Router>
        </div>
    );
};

export default App;
