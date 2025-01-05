import { useCallback, useRef, useState } from "react";

interface EmployeeEditProps {
    name: string;
    role: string;
    img: string;
    updateEmployee: (name: string, role: string, img: string) => void;
}

export default function AddEmployee({ name, role, img, updateEmployee }: EmployeeEditProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    const [employeeName, setEmployeeName] = useState('');
    const [employeeRole, setEmployeeRole] = useState('');
    const [employeeImg, setEmployeeImg] = useState('');

    const handleShow = useCallback(() => {
        modalRef.current?.showModal();
    }, []);

    const handleClose = useCallback(() => {
        modalRef.current?.close();
    }, []);
    const handleUpdate = () => {
        updateEmployee(employeeName, employeeRole, employeeImg);
        handleClose();
    };

    return (
        <>
            <button
                className="block m-2 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                onClick={handleShow}
            >
                + Add Employee
            </button>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Employee</h3>
                    <div className="mt-4">
                        <label className="block mb-2">
                            Image:
                            <input
                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                                type="text"
                                value={employeeImg}
                                onChange={(e) => setEmployeeImg(e.target.value)}
                            />
                        </label>
                        <label className="block mb-2">
                            Full Name:
                            <input
                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                                type="text"
                                value={employeeName}
                                onChange={(e) => setEmployeeName(e.target.value)}
                            />
                        </label>
                        <label className="block mb-4">
                            Role:
                            <input
                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                                id="role"
                                type="text"
                                value={employeeRole}
                                onChange={(e) => setEmployeeRole(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="modal-action">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                            type="button"
                            onClick={handleUpdate}
                        >
                            Add
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                            type="button"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
