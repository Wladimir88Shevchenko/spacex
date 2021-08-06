import React, {useState} from "react";
import UserList from "../user-list";
import "./app.css";
import Header from "../header";
import UserProps from "../user-props";
import { useQuery } from "@apollo/client";
import GETALLUSERS from "../../services/query";
import UserContext from "../../services/userContext";
import Footer from "../footer";

const App = () => {
    const { loading, error, data } = useQuery(GETALLUSERS);

    const [choosenPerson, setChoosenPerson] = useState(null);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const changePerson = (id) => {
      let choosenPerson;
      data.users.forEach(prs => {
        if(prs.id === id){
          choosenPerson = prs
        }
      });
      setChoosenPerson(choosenPerson);
    }

    const contextValue = {
        data,
        choosenPerson,
        changePerson,
        setChoosenPerson,
    };

    return (
        <div>
            <UserContext.Provider value={contextValue}>
                <Header />
                <div className="usersData">
                    <div className="leftColumn">
                        <UserList />
                    </div>
                    <div className="rightColumn">
                        <UserProps />
                    </div>
                </div>
                <Footer />
            </UserContext.Provider>
        </div>
    );
};

export default App;
