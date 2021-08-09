import { /* gql , */ useMutation } from "@apollo/client";
import React, { useContext } from "react";
import ADD_USERS from "../../services/mutation-add-person";
import UserContext from "../../services/userContext";
import { v4 as uuidv4 } from "uuid";
import "./adding-users.css";
//import STANDARD_FIELDS from "../../services/fragment-fields";
import GETALLUSERS from "../../services/query";

const AddingUsers = () => {


        const [addUser, { loading, error}] = useMutation(ADD_USERS, {
        refetchQueries: [
            GETALLUSERS,
          'GetlAllUsers'
        ],
      });


    /* const [addUser, { loading, error }] = useMutation(ADD_USERS,  {
        update(cache, { data: { addUser } }) {
            cache.modify({
                fields: {
                    users(existingPerson = []) {
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
    } );*/

    const { newPerson = {}, setNewPerson } = useContext(UserContext);

    const handleChange = (event) => {
        setNewPerson((oldvalue) => ({
            ...oldvalue,
            [event.target.name]: event.target.value,
        }));
    };

    const { name = "", rocket = "", timestamp = "", twitter = "" } = newPerson;

    if (error) return <h2>we have error {error.message}</h2>;

    if (loading) return <h2>loading...</h2>;

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
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
                }}
            >
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
                    <br />
                    <button type="submit">Add new Person</button>
                </label>
            </form>
        </div>
    );
};

export default AddingUsers;
