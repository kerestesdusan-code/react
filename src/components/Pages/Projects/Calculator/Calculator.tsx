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
        <div className="text-center justify-center w-fit border-4 border-solid bg-stone-200 font-mono" >
            <h1 className="text-lime-950 text-center">
                Calculator
            </h1>
            <div className="justify-center">
                <table className="">
                    <tr>
                        <th colSpan={4}>
                            <div className=" bg-green-500 p-3 border-4 border-solid ">
                                <h1 className="text-lg text-right text-3xl">
                                    {display}
                                </h1>
                            </div>
                        </th>
                    </tr>
                    {buttons.map((row, rowNumber) => {
                        return (<tr>
                            {
                                buttons[rowNumber].map((button) => {
                                    return (
                                        <td>
                                            <CalculatorButton value={button.toString()} handleButtonClick={handleButtonClick} />
                                        </td>
                                    )
                                })
                            }
                        </tr>)

                    })}
                </table>
            </div>
        </div>
    );
}

export default Calculator;