type calculatorButtonProps = {
    handleButtonClick: (button: string) => void;
    value: string;
}
function CalculatorButton({ handleButtonClick, value }: calculatorButtonProps) {
    return (
        <div className="space-x-4">
            <button className={"px-6 py-2 text-black " +
                (value === "AC" ? "bg-red-500 " :
                    (value === "=" ? "bg-green-500"
                        : "bg-blue-500")
                ) +
                " border-2 rounded-lg "}
                onClick={() => handleButtonClick(value)}>{value}</button>
        </div>
    )
}

export default CalculatorButton;