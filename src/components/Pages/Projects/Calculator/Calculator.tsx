import { useState } from "react";
import CalculatorButton from "./CalculatorButton";

function Calculator() {
    const [display, setDisplay] = useState("0");
    const [A, setA] = useState("0");
    const [operation, setOperation] = useState("");

    const buttons = [
        [1, 2, 3, "+"],
        [4, 5, 6, "-"],
        [7, 8, 9, "*"],
        [".", "0", "(-)", "/"],
        ["AC", "PI", "SQR", "="]
    ];

    const handleButtonClick = (button: string) => {
        switch (button) {
            case "0":
                if (parseFloat(display) > 0) setDisplay(display + "0");
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case ".":
                console.log(button, " - ", display);
                setDisplay(display + button);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                operate(button);
                break;
            case "=":
                let result = calculate(parseInt(A), parseInt(display), operation)!.toString();
                setDisplay(result);
                if (result) setA(result);
                else setA("0");
                break;
            case "AC":
                setA("0");
                setOperation("");
                setDisplay("0");
                break;
            case "PI":
                setDisplay(Math.PI.toString());
                break;
            case "SQR":
                setDisplay(Math.sqrt(parseFloat(display)).toString());
                break;
            case "(-)":
                setDisplay((0 - parseFloat(display)).toString());
                break;
            default:
                break;
        }
    }
    const calculate = (a: number, b: number, operation: string) => {
        switch (operation) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
        }
    }
    function operate(operator: string) {
        setA(display);
        setDisplay("0");
        setOperation(operator);
    }

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-white">
            <div className="flex space-x-6 items-start">
                <div className="w-96 bg-white p-6 rounded-xl shadow-lg border-black border-4">
                    <h1 className="text-center text-xl text-lime-950 mb-4">Calculator</h1>
                    <div className="mb-4">
                        <div className="bg-green-500 p-4 rounded-lg border-4 border-solid">
                            <h1 className="text-3xl text-right">{display}</h1>
                        </div>
                    </div>
                    <table className="w-full">
                        {buttons.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((button) => (
                                    <td key={button} className="p-2">
                                        <CalculatorButton
                                            value={button.toString()}
                                            handleButtonClick={handleButtonClick}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Calculator;