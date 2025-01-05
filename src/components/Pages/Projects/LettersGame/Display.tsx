import React, { ReactNode, useState } from "react";
interface DisplayProps {
  handleKeyPress: Function;
  width: number;
  height: number;
  children: ReactNode;
}

export default function Display({
  handleKeyPress,
  children,
  width,
  height,
}: DisplayProps) {
  const [state] = useState(true);
  return (
    <div
      tabIndex={0}
      onKeyDown={(event) => handleKeyPress(event)}
      onKeyUp={(event) => handleKeyPress(event)}
      style={{
        position: "relative",
        border: "1px solid silver",
        overflow: "hidden",
        width: width + "px",
        height: height + "px",
        margin: 0,
      }}
    >
      {children}
    </div>
  );
}
