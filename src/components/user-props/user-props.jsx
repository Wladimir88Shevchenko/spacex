import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import EDIT_USERS from "../../services/mutation-edit-person";
import GETALLUSERS from "../../services/query";
import UserContext from "../../services/userContext";
import Loader from "../loader";
import "./user-props.css";
import "react-datepicker/dist/react-datepicker.css";
import PersonsForm from "../persons-form/persons-form";

/* const UserProps = ({ choosenPerson }) => {
    const { data } = useContext(UserContext);
    //    const [edditUser, { loading, error }] = useMutation(EDIT_USERS, {
    //    refetchQueries: [GETALLUSERS, "GetlAllUsers"],
    //}); 

    const [edditUser, { loading, error }] = useMutation(EDIT_USERS, {
        update(cache, { data: { update_users } }) {
            const oldPersons = cache.readQuery({
                query: GETALLUSERS,
            });

            const updatedPersonId = update_users.returning[0];
            let newPersonsList = oldPersons.users.filter(
                (pers) => pers.id !== updatedPersonId.id
            );

            newPersonsList = [...newPersonsList, updatedPersonId];

            cache.writeQuery({
                query: GETALLUSERS,
                data: {
                    users: [...newPersonsList],
                },
            });
        },
    });

    const [editedPerson, setEditedPerson] = useState();
    const [loadingPerson, setLoadingPerson] = useState(true);
    let personForWork;

    data.users.forEach((user) => {
        if (user.id === choosenPerson) {
            personForWork = user;
        }
    });

    const dataForDate = personForWork ? personForWork.timestamp : "";

    const [startDate, setStartDate] = useState(new Date(dataForDate));

    let visibleData;

    useEffect(() => {
        setLoadingPerson(true);
        setEditedPerson(personForWork);
        setLoadingPerson(false);
    }, [choosenPerson, data.users, personForWork]);

    if (!editedPerson) {
        return (
            <>
                <h4>
                    This page has not been created yet. You can of course wait
                    while we create it, but you'd better go to our main page.
                </h4>
                <Link to="/">
                    <button className="buttonStyle">Home Page</button>
                </Link>
            </>
        );
    }

    const handleChange = (event) => {
        setEditedPerson((oldvalue) => ({
            ...oldvalue,
            [event.target.name]: event.target.value,
        }));
    };

    if (loading) return <Loader />;

    if (error) return <h5>Error :(</h5>;

    const { name, rocket, twitter, id } = editedPerson;
    let { timestamp } = editedPerson;

    if (loadingPerson) {
        visibleData = <Loader />;
    } else {
        visibleData = (
            <>
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
                        <DatePicker
                            showTimeSelect
                            dateFormat="Pp"
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                                setEditedPerson((oldValue) => ({
                                    ...oldValue,
                                    timestamp: date,
                                }));
                            }}
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
                </form>
                <Link to="/">
                    <button className="buttonStyle">Home Page</button>
                </Link>
            </>
        );
    }

    return (
        <div>
            {visibleData}
        </div>
    );
}; */

//NEW VARIANT

const UserProps = ({ choosenPerson }) => {
    const { data } = useContext(UserContext);

    const [edditUser, { loading, error }] = useMutation(EDIT_USERS, {
        update(cache, { data: { update_users } }) {
            const oldPersons = cache.readQuery({
                query: GETALLUSERS,
            });

            const updatedPersonId = update_users.returning[0];
            let newPersonsList = oldPersons.users.filter(
                (pers) => pers.id !== updatedPersonId.id
            );

            newPersonsList = [...newPersonsList, updatedPersonId];

            cache.writeQuery({
                query: GETALLUSERS,
                data: {
                    users: [...newPersonsList],
                },
            });
        },
    });

    let personForWork;

    data.users.forEach((user) => {
        if (user.id === choosenPerson) {
            personForWork = user;
        }
    });

    // OLD STYLE
    // const dataForDate = personForWork ? personForWork.timestamp : "";

    // OTIONAL CHAINING
    const dataForDate = personForWork?.timestamp;

    if (!personForWork) {
        return (
            <>
                <h4>
                    This page has not been created yet. You can of course wait
                    while we create it, but you'd better go to our main page.
                </h4>
                <Link to="/">
                    <button className="buttonStyle">Home Page</button>
                </Link>
            </>
        );
    }

    if (loading) return <Loader />;

    if (error) return <h5>Error :(</h5>;

    return (
        <div>
            <PersonsForm
                userAction={edditUser}
                actionType="Edit"
                initialPerson={personForWork}
                initialDate={new Date(dataForDate)}
            />
        </div>
    );
};

export default UserProps;
