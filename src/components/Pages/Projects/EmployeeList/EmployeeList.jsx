import { useState } from "react";
import EmployeeCart from "./EmployeeCart";
import { v4 as uuidv4 } from 'uuid';
import AddEmployee from "./AddEmploye";

function EmployeeList() {
    const [employees, setEmployees] = useState([
        {
            id: uuidv4(),
            name: "Caleb",
            role: "Developer",
            img: "https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg",
        },
        {
            id: uuidv4(),
            name: "Sal",
            role: "Manager",
            img: "https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg",
        },
        {
            id: uuidv4(),
            name: "Corey",
            role: "The Devops Guy",
            img: "https://images.pexels.com/photos/2232981/pexels-photo-2232981.jpeg",
        },
        {
            id: uuidv4(),
            name: "John",
            role: "Director of Eng.",
            img: "https://images.pexels.com/photos/2743754/pexels-photo-2743754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: uuidv4(),
            name: "Melanie",
            role: "Software Engineer",
            img: "https://images.pexels.com/photos/732425/pexels-photo-732425.jpeg",
        },
        {
            id: uuidv4(),
            name: "Jake",
            role: "Senior Intern",
            img: "https://images.pexels.com/photos/2071881/pexels-photo-2071881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }
    ]);

    function updateEmployee(id, newName, newRole, newImg) {
        setEmployees((prevEmployees) => {
            return prevEmployees.map((employee) => {
                if (employee.id === id) {
                    return { ...employee, name: newName, role: newRole, img: newImg };
                }
                return employee;
            });
        });
    }

    return (
        <div>
            <div className="flex flex-wrap justify-center">
                {employees.map((employee) => {
                    return (
                        <EmployeeCart
                            key={employee.id}
                            id={employee.id}
                            name={employee.name}
                            role={employee.role}    
                            img={employee.img}
                            updateEmployee={updateEmployee}
                            
                        />
                    );
                })}
            </div>
            <AddEmployee />
            <div className="mt-8 mx-auto max-w-xl bg-amber-100 p-6 rounded-lg border border-gray-300 shadow-md">
            <p className="text-center text-lg text-gray-700 leading-relaxed">
                This section demonstrates the ability to dynamically manage employee data with React components.
                Feel free to add, edit, or interact with employees in this interface.
            </p>
        </div>
        </div>
    );
}

export default EmployeeList;
