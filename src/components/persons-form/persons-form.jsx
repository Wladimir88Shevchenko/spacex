import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import GETALLUSERS from "../../services/query";
import UserContext from "../../services/userContext";
import "./persons-form.css";

const PersonsForm = (props) => {
    const { userAction, actionType = "Add", initialPerson = {} } = props;
    let { initialDate } = props;

    const { toogleShowAddPersonPanel } = useContext(UserContext);
    const [validText, setValidText] = useState();
    const [startDate, setStartDate] = useState(initialDate);
    const [person, setPerson] = useState(initialPerson);

    const handleChange = (event) => {
        setPerson((oldvalue) => ({
            ...oldvalue,
            [event.target.name]: event.target.value,
        }));
    };

    const validationForm = (person) => {
        const { name = "", rocket = "", twitter = "" } = person;

        let errorText;

        if (name.length < 3) {
            errorText = "Name should be longer";
        } else if (!rocket.length) {
            errorText = "Choose name for the Rocket";
        } else if (!twitter.length) {
            errorText = "Twitter is empty";
        } else {
            errorText = "";
        }

        if (errorText) {
            setValidText(errorText);
            return false;
        } else {
            return true;
        }
    };

    const { name, rocket, timestamp, twitter, id } = person;

    const sbmt = (e) => {
        e.preventDefault();
        const valid = validationForm(person);
        if (valid) {
            if (actionType === "Add") {

                userAction({
                    variables: {
                        insertUsersObjects: [
                            {
                                ...person,
                            },
                        ],
                    },
                    optimisticResponse: {
                        insert_users: {
                            __typename: "users_mutation_response",
                            returning: [{
                                __typename: "users",
                                id: "-1",
                                name,
                                rocket,
                                timestamp,
                                twitter,
                            }],
                    },
                    },

                    update(cache, { data: { insert_users } }) {
                        if (!insert_users) {
                            return;
                        }

                        const oldPersons = cache.readQuery({
                            query: GETALLUSERS,
                        });

                        let newPerson = insert_users.returning[0];

                        cache.writeQuery({
                            query: GETALLUSERS,
                            data: {
                                users: [...oldPersons.users, newPerson],
                            },
                        });
                    },
                });
                setPerson({});
                toogleShowAddPersonPanel();
            } else if (actionType === "Edit") {
                userAction({
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
            }
        }
    };

    return (
        <form onSubmit={(e) => sbmt(e)}>
            <label>
                <input
                    name="name"
                    placeholder="Type name for new person"
                    value={name || ""}
                    onChange={handleChange}
                />
                <span>Name</span>

                <input
                    name="rocket"
                    placeholder="Type rocket for new person"
                    value={rocket || ""}
                    onChange={handleChange}
                />
                <span>Rocket</span>

                <DatePicker
                    showTimeSelect
                    dateFormat="Pp"
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        setPerson((oldValue) => ({
                            ...oldValue,
                            timestamp: date,
                        }));
                    }}
                />
                <span>Timestamp</span>

                <input
                    name="twitter"
                    placeholder="Type twitter for new person"
                    value={twitter || ""}
                    onChange={handleChange}
                />
                <span>Twitter</span>

                <br />
                {validText && <h5>{validText}</h5>}
                <br />
                <button className="buttonStyle" type="submit">
                    {actionType} Person
                </button>
                {actionType === "Edit" && (
                    <Link to="/">
                        <button className="buttonStyle">Home Page</button>
                    </Link>
                )}
            </label>
        </form>
    );
};

export default PersonsForm;
