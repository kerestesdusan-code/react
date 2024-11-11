import EditEmployee from "./EditEmployee";

interface EmployeeCartProps {
    name: string;
    role: string;
    img: string;
    id: string;
    updateEmployee: (id: string, name: string, role: string, img: string) => void;
}

function EmployeeCart({ name, role, img, updateEmployee, id }: EmployeeCartProps) {
    return (
        <div className="min-w-[350px] max-w-[3500px] py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <img
                className="object-cover rounded-full h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                alt=""
                src={img}
            />
            <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                        {name}
                    </p>
                    <p className="text-slate-500 font-medium">
                        {role}
                    </p>
                </div>
                <EditEmployee
                    name={name}
                    role={role}
                    img={img}
                    updateEmployee={(newName, newRole, newImg) => updateEmployee(id, newName, newRole, newImg)}
                />
            </div>
        </div>
    );
}

export default EmployeeCart;
