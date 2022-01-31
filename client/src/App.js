import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState("");
    const [employeeList, setEmployeeList] = useState([]);

    const [newWage, setNewWage] = useState("");
    const [newAge, setNewAge] = useState("");

    // Get initial data from db on load of the app and display
    useEffect(() => {
        getEmployees();
    }, []);

    const addEmployee = () => {
        Axios.post("http://localhost:3001/create", {
            name,
            age,
            country,
            position,
            wage,
        }).then(() => {
            // This updates employees on page after insert automatically
            // setEmployeeList([
            //     ...employeeList,
            //     {
            //         name,
            //         age,
            //         country,
            //         position,
            //         wage,
            //     },
            // ]);
            getEmployees();
            setName("");
            setAge("");
            setCountry("");
            setWage("");
            setPosition("");
        });
    };

    const getEmployees = () => {
        Axios.get("http://localhost:3001/employees").then((response) => {
            setEmployeeList(response.data);
        });
    };

    const updateEmployeeWage = (id) => {
        Axios.put("http://localhost:3001/updateWage", {
            wage: newWage,
            id: id,
        }).then((response) => {
            // This was used in tutorial, left for reference
            // But calling getEmployees seems cleaner.
            // setEmployeeList(
            //     employeeList.map((val) => {
            //         return val.id == id
            //             ? {
            //                   id: val.id,
            //                   age: val.age,
            //                   name: val.name,
            //                   country: val.country,
            //                   position: val.position,
            //                   wage: newWage,
            //               }
            //             : val;
            //     })
            // );
            getEmployees();
            setNewWage("");
        });
    };

    const updateEmployeeAge = (id) => {
        Axios.put("http://localhost:3001/updateAge", {
            age: newAge,
            id: id,
        }).then((response) => {
            // This was used in tutorial, left for reference
            // But calling getEmployees seems cleaner.
            // setEmployeeList(
            //     employeeList.map((val) => {
            //         return val.id == id
            //             ? {
            //                   id: val.id,
            //                   age: newAge,
            //                   name: val.name,
            //                   country: val.country,
            //                   position: val.position,
            //                   wage: val.wage,
            //               }
            //             : val;
            //     })
            // );
            getEmployees();
            setNewAge("");
        });
    };

    const deleteEmployee = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
            getEmployees();
        });
    };

    return (
        <div className="App">
            <div className="information">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(event) => {
                        setAge(event.target.value);
                    }}
                />
                <label>Country:</label>
                <input
                    type="text"
                    value={country}
                    onChange={(event) => {
                        setCountry(event.target.value);
                    }}
                />
                <label>Position:</label>
                <input
                    type="text"
                    value={position}
                    onChange={(event) => {
                        setPosition(event.target.value);
                    }}
                />
                <label>Wage (year):</label>
                <input
                    type="number"
                    value={wage}
                    onChange={(event) => {
                        setWage(event.target.value);
                    }}
                />
                <button onClick={addEmployee}>Add Employee</button>
            </div>

            <div className="employees">
                <button onClick={getEmployees}>Show Employees</button>

                {employeeList.map((val, key) => {
                    return (
                        <div key={key} className="employee">
                            <div>
                                <h3 key={uuidv4()}>Name: {val.name}</h3>
                                <h3 key={uuidv4()}>Age: {val.age}</h3>
                                <h3 key={uuidv4()}>Country: {val.country}</h3>
                                <h3 key={uuidv4()}>Position: {val.position}</h3>
                                <h3 key={uuidv4()}>Wage: {val.wage}</h3>
                            </div>
                            <div>
                                <input
                                    value={newWage}
                                    type="text"
                                    placeholder="Enter new Wage..."
                                    onChange={(event) => {
                                        setNewWage(event.target.value);
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        updateEmployeeWage(val.id);
                                    }}
                                >
                                    Update Wage
                                </button>

                                <input
                                    value={newAge}
                                    type="text"
                                    placeholder="Enter New Age..."
                                    onChange={(event) => {
                                        setNewAge(event.target.value);
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        updateEmployeeAge(val.id);
                                    }}
                                >
                                    Update Age
                                </button>
                                <button
                                    onClick={() => {
                                        deleteEmployee(val.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
