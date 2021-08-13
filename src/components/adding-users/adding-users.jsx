import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import ADD_USERS from "../../services/mutation-add-person";
import UserContext from "../../services/userContext";
import "./adding-users.css";
import GETALLUSERS from "../../services/query";
import Loader from "../loader";
import "react-datepicker/dist/react-datepicker.css";
import PersonsForm from "../persons-form/persons-form";

// OLD VARIANT

/* 
const AddingUsers = () => {
    const { toogleShowAddPersonPanel } = useContext(UserContext);
    const [validText, setValidText] = useState();
    const [startDate, setStartDate] = useState(new Date());

    //const [addUser, { loading, error }] = useMutation(ADD_USERS, {
    //    refetchQueries: [GETALLUSERS, "GetlAllUsers"],
    //}); 

    const [addUser, { loading, error }] = useMutation(ADD_USERS, {
        update(cache, { data: { insert_users } }) {
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

    const [newPerson, setNewPerson] = useState({});

    const handleChange = (event) => {
        setNewPerson((oldvalue) => ({
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

    const sbmt = (e) => {
        e.preventDefault();
        const valid = validationForm(newPerson);
        if (valid) {
            addUser({
                variables: {
                    insertUsersObjects: [
                        {
                            ...newPerson,
                        },
                    ],
                },
            });
            setNewPerson({});
            toogleShowAddPersonPanel();
        }
    };

    const { name = "", rocket = "", twitter = "" } = newPerson;

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

                    <DatePicker
                        showTimeSelect
                        dateFormat="Pp"
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            setNewPerson((oldValue) => ({
                                ...oldValue,
                                timestamp: date,
                            }));
                        }}
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
 */

// NEW VARIANT

const AddingUsers = () => {

    const { toogleShowAddPersonPanel } = useContext(UserContext);

    const [addUser, { loading, error }] = useMutation(ADD_USERS, {
        update(cache, { data: { insert_users } }) {
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
            
            <PersonsForm 
            initialDate={() => new Date()}
            userAction={addUser}
            actionType="Add"
            />

        </div>
    );
};

export default AddingUsers;
