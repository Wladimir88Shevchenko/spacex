import { /* gql, */ useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import ADD_USERS from "../../services/mutation-add-person";
import UserContext from "../../services/userContext";
import { v4 as uuidv4 } from "uuid";
import "./adding-users.css";
//import STANDARD_FIELDS from "../../services/fragment-fields";
import GETALLUSERS from "../../services/query";
import Loader from "../loader";

const AddingUsers = () => {
    const { toogleShowAddPersonPanel } = useContext(UserContext);
    const [validText, setValidText] = useState("You have empty fields");

    const [addUser, { loading, error }] = useMutation(ADD_USERS, {
        refetchQueries: [GETALLUSERS, "GetlAllUsers"],
    });

    /*        const [addUser, { loading, error }] = useMutation(ADD_USERS,  {
        update(cache, { data: { addUser } }) {
            cache.modify({
                fields: {
                    users(existingPerson = []) {
                        console.log(123);
                        const newPersonRef = cache.writeFragment({
                            data: addUser,
                            fragment: gql`
                                fragment NewPerson on users {
                                    id
                                    name
                                    rocket
                                    timestamp
                                    twitter
                                }
                            `,
                        });
                        
                        return [...existingPerson, newPersonRef];
                    },
                },
            });
        },
    } ); */

    const [newPerson, setNewPerson] = useState({});

    const handleChange = (event) => {
        setNewPerson((oldvalue) => ({
            ...oldvalue,
            [event.target.name]: event.target.value,
        }));
        //validationForm(newPerson);
    };

    const validationForm = (person) => {
        const { name = "", rocket = "", timestamp = "", twitter = "" } = person;
        
        let errorText;

        if (name.length < 3) {
            errorText = "Name should be longer";
        } else if (!rocket.length) {
            errorText = "Choose name for the Rocket";
        } else if (!timestamp.length) {
            errorText = "Timestamp is empty";
        }  else if(!twitter.length){
            errorText = "Twitter is empty";
        } else {
            errorText = "";
        }

        if (errorText) {
            setValidText(errorText);
            return(false);
        } else {
            return(true);
        }
    };

    const sbmt = (e) => {
        debugger;
        e.preventDefault();
        const valid = validationForm(newPerson);
        if (valid) {
            addUser({
                variables: {
                    insertUsersObjects: [
                        {
                            ...newPerson,
                            id: uuidv4(),
                        },
                    ],
                },
            });
            setNewPerson({});
            toogleShowAddPersonPanel();
        }
    };

    const { name = "", rocket = "", timestamp = "", twitter = "" } = newPerson;

    if (error) return <h2>we have error {error.message}</h2>;

    if (loading) return <Loader />;

    return (
        <div>
            <i
                onClick={toogleShowAddPersonPanel}
                className="closeBtn material-icons"
            >
                close
            </i>
            <form onSubmit={(e) => sbmt(e)}>
                <label>
                    <input
                        name="name"
                        placeholder="Type name for new person"
                        value={name}
                        onChange={handleChange}
                    />
                    <span>Name</span>

                    <input
                        name="rocket"
                        placeholder="Type rocket for new person"
                        value={rocket}
                        onChange={handleChange}
                    />
                    <span>Rocket</span>

                    <input
                        name="timestamp"
                        placeholder="Type timestamp for new person"
                        value={timestamp}
                        onChange={handleChange}
                    />
                    <span>Timestamp</span>

                    <input
                        name="twitter"
                        placeholder="Type twitter for new person"
                        value={twitter}
                        onChange={handleChange}
                    />
                    <span>Twitter</span>

                    <br />
                    {validText && <h5>{validText}</h5>}
                    <br />
                    <button className="buttonStyle" type="submit">
                        Add new Person
                    </button>
                </label>
            </form>
        </div>
    );
};

export default AddingUsers;
