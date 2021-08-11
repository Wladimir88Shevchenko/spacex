import { useMutation } from "@apollo/client";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import EDIT_USERS from "../../services/mutation-edit-person";
import GETALLUSERS from "../../services/query";
import UserContext from "../../services/userContext";
import Loader from "../loader";
import "./user-props.css";

const UserProps = ({ choosenPerson }) => {
    const { data } = useContext(UserContext);
    const [edditUser, { loading, error }] = useMutation(EDIT_USERS, {
        refetchQueries: [GETALLUSERS, "GetlAllUsers"],
    });

    const [editedPerson, setEditedPerson] = useState();
    const [loadingPerson, setLoadingPerson] = useState(true);

    let visibleData;

    useEffect(() => {
        setLoadingPerson(true);
        let personForWork;
        data.users.forEach((user) => {
            if (user.id === choosenPerson) {
                personForWork = user;
            }
        });
        setEditedPerson(personForWork);
        setLoadingPerson(false);
    }, [choosenPerson, data.users]);

    if (!editedPerson) {
        return <h4>Choose person from list for more information about him</h4>;
    }

    const handleChange = (event) => {
        setEditedPerson((oldvalue) => ({
            ...oldvalue,
            [event.target.name]: event.target.value,
        }));
    };

    if (loading) return <Loader />;

    if (error) return <h5>Error :(</h5>;

    const { name, rocket, timestamp, twitter, id } = editedPerson;

    if (loadingPerson) {
        visibleData = <Loader />;
    } else {
        visibleData = (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    edditUser({
                        variables: {
                            updateUsersSet: {
                                name,
                                rocket,
                                timestamp,
                                twitter,
                            },
                            updateUsersWhere: {
                                id: {
                                    _eq: id,
                                },
                            },
                        },
                    });
                }}
            >
                <label>
                    <input
                        name="name"
                        placeholder="Type name for this person"
                        value={name}
                        onChange={handleChange}
                    />
                    <span>Name</span>
                </label>

                <label>
                    <input
                        name="rocket"
                        placeholder="Type rocket for this person"
                        value={rocket ? rocket : "-"}
                        onChange={handleChange}
                    />
                    <span>Rocket</span>
                </label>

                <label>
                    <input
                        name="timestamp"
                        placeholder="Type timestamp for this person"
                        value={timestamp ? timestamp : "-"}
                        onChange={handleChange}
                    />
                    <span>Timestamp</span>
                </label>

                <label>
                    <input
                        name="twitter"
                        placeholder="Type twitter for this person"
                        value={twitter ? twitter : "-"}
                        onChange={handleChange}
                    />
                    <span>Twitter</span>
                </label>
                <br />
                <br />

                <button className="buttonStyle" type="submit">
                    Add changes
                </button>
                <Link to="/">
                    <button className="buttonStyle">Home Page</button>
                </Link>
            </form>
        );
    }

    return (
        <div>
            test message
            {visibleData}
        </div>
    );
};

export default UserProps;
