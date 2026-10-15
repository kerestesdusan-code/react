import React, { ReactNode } from "react";

interface DisplayProps {
  handleKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
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
  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyPress}
      onKeyUp={handleKeyPress}
      style={{
        position: "relative",
        border: "1px solid silver",
        overflow: "hidden",
        width: `${width}px`,
        height: `${height}px`,
        margin: 0,
      }}
    >
      {children}
    </div>
  );
}
