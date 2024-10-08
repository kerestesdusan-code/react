import React from "react";

export type LetterProps = {
  letter: string;
  size: number;
  positionX: number;
  positionY: number;
  backgroundColor: string;
  color?: string;
  rotationSpeed: number;
};

const Letter: React.FC<LetterProps> = ({
  letter,
  size,
  positionX,
  positionY,
  backgroundColor,
  color,
  rotationSpeed
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "absolute",
        left: positionX,
        top: positionY,
        backgroundColor: backgroundColor,
        color: color || "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
      }}
    >
      {letter}
    </div>
  );
};


export default Letter;
