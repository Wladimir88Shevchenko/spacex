import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import DELETE_USERS from "../../services/mutation-delete-person";
import GETALLUSERS from "../../services/query";
import UserContext from "../../services/userContext";
import Loader from "../loader";
import { withRouter } from "react-router";
import "./user-list.css";

const UserList = ({ history }) => {
    const { data, isAddPersonPanelVisible, toogleShowAddPersonPanel } =
        useContext(UserContext);
    /*
    //first vaiant how we can update our local state

        const [deleteUser, { loading, error }] = useMutation(DELETE_USERS, {
        refetchQueries: [GETALLUSERS, "GetlAllUsers"],
    }); */

    
    //second vaiant how we can update our local state
    
    const [deleteUser, { loading, error }] = useMutation(DELETE_USERS, 
        {
            update(cache, { data: { delete_users } }) {
                const oldPersons = cache.readQuery({
                    query: GETALLUSERS,
                });
    
                const deletedPersonId = delete_users.returning[0].id;
                const newPersonsList = oldPersons.users.filter(pers => pers.id !== deletedPersonId);
    
                cache.writeQuery({
                    query: GETALLUSERS,
                    data: {
                        users: [...newPersonsList],
                    },
                });
            },
        });

    let userList = [];

    if (loading)
        return (
            <div>
                <Loader />
            </div>
        );

    if (error) return <h5>error :(</h5>;

    data.users.forEach(({ id, name, rocket }) => {
        userList.push(
            <li className="collection-item personLabel" key={id}>
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

                <span onClick={() => history.push(`/${id}`)}>
                    {name} (Rocket: {rocket})
                </span>
            </li>
        );
    });

    return (
        <div>
            <ul className="collection conllectionWrapper">{userList}</ul>
            {!isAddPersonPanelVisible && (
                <button
                    onClick={toogleShowAddPersonPanel}
                    className="buttonStyle"
                >
                    Add new Person
                </button>
            )}
        </div>
    );
};

export default withRouter(UserList);
