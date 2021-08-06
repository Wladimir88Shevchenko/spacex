import React, { useContext } from "react";
import UserContext from "../../services/userContext";
import "./user-list.css";

const UserList = () => {
    const { data, changePerson, choosenPerson } = useContext(UserContext);

    let userList = [];

    data.users.forEach(({ id, name, rocket }) => {
        let spanStyle = "";
        if (name) {
            if (choosenPerson) {
                if (id === choosenPerson.id) {
                    spanStyle += " choosen";
                }
            }

            userList.push(
                <li className="collection-item" key={id}>
                    <span
                        className={spanStyle}
                        onClick={() => changePerson(id)}
                    >
                        {name} (Rocket: {rocket})
                    </span>
                </li>
            );
        }
    });

    return <ul className="collection conllectionWrapper">{userList}</ul>;
};

export default UserList;
