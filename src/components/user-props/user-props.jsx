import React, { useContext } from "react";
import UserContext from "../../services/userContext";
import "./user-props.css";

const UserProps = () => {
    const { choosenPerson, setChoosenPerson } = useContext(UserContext);

    if (!choosenPerson) {
        return <h4>Choose person from list for more information about him</h4>;
    }

    const handleChange = (event) => {
        setChoosenPerson((oldvalue) => ({
            ...oldvalue,
            [event.target.name]: event.target.value,
        }));
    };

    const { name, rocket, timestamp, twitter } = choosenPerson;

    return (
        <div>
            <form>
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
                
                <button type="submit">Add changes</button>
            </form>
        </div>
    );
};

export default UserProps;
