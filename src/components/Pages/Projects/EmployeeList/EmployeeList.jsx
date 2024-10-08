import { useState } from "react";
import EmployeeCart from "./EmployeeCart";

function EmployeeList(){
    const [role, setRole] = useState('dev');
    const showEmployees = true; 
    
    return (
       <div>
            {showEmployees ? (
                <>
                    <input 
                    type="text"
                    onChange={(e) =>{
                        console.log(e.target.value);
                        setRole(e.target.value);
                    }}
                    />
                    <EmployeeCart name="Caleb" role="intern" />
                    <EmployeeCart name="Jacob" role={role} />
                    <EmployeeCart name="Anton" />
                </>
            ) : (
                <p>
                    You cannot see the employees
                </p>
            )}
       </div>
    );
}

export default EmployeeList; 