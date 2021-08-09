import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import DELETE_USERS from "../../services/mutation-delete-person";
import GETALLUSERS from "../../services/query";
import UserContext from "../../services/userContext";
import "./user-list.css";

const UserList = () => {
    const { data, changePerson, choosenPerson } = useContext(UserContext);
    const [deleteUser , {loading, error}] = useMutation(DELETE_USERS,
        {
            refetchQueries: [
                GETALLUSERS,
              'GetlAllUsers'
            ],
          });

    let userList = [];

    if(loading) return(
        <h5>loading...</h5>
    )

    if(error) return(
        <h5>error :(</h5>
    )

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
                    <i
                        className="material-icons deleteBtn"
                        onClick={() =>
                            deleteUser({
                                variables: {
                                    deleteUsersWhere: {
                                        id: {
                                            _eq: id,
                                        },
                                    },
                                },
                                
                            })
                        }
                    >
                        close
                    </i>
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
