import { useState, useEffect } from "react";
import React from "react";
import Display from "./Display";
import Letter, { LetterProps } from "./Letter";

export default function Game() {
  const [letters, setLetters] = useState<LetterProps[]>([]);
  const [fallenLetters, setFallenLetters] = useState<LetterProps[]>([]);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(100);
  const screenWidth = 800;
  const screenHeight = 600;
  const [tick, setTick] = useState(0);
  // Game Ticker
  useEffect(() => {
    //Main game processing function
    function process(tick: number) {
      if (fallenLetters.length >= 30 || paused) return;

      const pulledLetters: LetterProps[] = letters.map(
        (letter: LetterProps) => {
          let pulledLetter: LetterProps = letter;
          pulledLetter.positionY = letter.positionY + letter.size / 10;
          return pulledLetter;
        }
      );

      const lettersOut = pulledLetters.filter((letter) => {
        return letter.positionY + letter.size > screenHeight;
      });
      const lettersIn = pulledLetters.filter(
        (letter) => letter.positionY + letter.size < screenHeight
      );

      setFallenLetters([...fallenLetters, ...lettersOut]);
      if (tick % Math.floor(Math.random() * 10 + 1) === 0) {
        setLetters([...lettersIn, generateLetter()]);
      } else {
        setLetters([...lettersIn]);
      }
      if (tick % 10 === 0 && speed > 7) setSpeed(speed - 5);
    }

    const id = setInterval(() => {
      setTick(tick + 1);
      if (!paused) process(tick);
    }, speed);
    return () => clearInterval(id);
  }, [tick, letters, paused, fallenLetters, speed]);

  function generateLetter() {
    const alphabet = "WASD";
    const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const letterSize = Math.floor(Math.random() * 50) + 25;
    const letter = {
      letter: randomCharacter,
      size: letterSize,
      positionX: Math.floor(Math.random() * (screenWidth - letterSize)),
      positionY: -letterSize,
      backgroundColor: "#" + ((1 << 24) * Math.random() | 0).toString(16),
      rotationSpeed: Math.random() * 10 + 1,
    };
    return letter;
  }




  function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    removeLetters(event.key.toUpperCase());
  }

  function removeLetters(key: string) {
    if (paused || fallenLetters.length >= 20) return;
    let removedCount = 0;
    const newLetters: LetterProps[] = letters.filter((letter) => {
      if (letter.letter === key) removedCount++;
      return letter.letter !== key;
    });
    if (removedCount >= 2) {
      setLetters(newLetters);
      setScore(score + removedCount);
    }
  }

  function Letters() {
    const ret = letters.map((letter, index) => {
      return <Letter key={"letter" + index} {...letter} />;
    });
    return <div>{ret}</div>;
  }
  function restart() {
    setScore(0);
    setFallenLetters([]);
    setLetters([]);
    setSpeed(100);
  }
  function FallenLetters() {
    const ret = fallenLetters.map((letter, index) => {
      return (
        <Letter
          key={"fallen-letter" + index}
          {...{ ...letter, positionY: 0 }}
        />
      );
    });
    return <div style={{ position: "relative" }}>{ret}</div>;
  }

  return (
    <div style={{
      fontFamily: "chilanka",
    }}>
      <h1>Falling Letters</h1>
      <div
      >
        <div >
          <Display
            handleKeyPress={handleKeyPress}
            width={screenWidth}
            height={screenHeight}
          >
            {fallenLetters.length >= 30 && (
              <div
                style={{

                }}
              >
                Game Over!
              </div>
            )}
            <Letters />
          </Display>
        </div>
        <div >
          <div >
            <div >Stats:</div>
            <br></br>
            <b className="">
              Score:</b>
            <span
            >
              {score}
            </span>
            <b>Speed:</b>
            {100 - speed}
            <h3>Fallen Letters: ({fallenLetters.length})</h3>
            <button
              onClick={() => setPaused(!paused)}>
              {" "}
              {paused ? "Run" : "Pause"}{" "}
            </button>
            <button
              onClick={restart}> Restart </button>
          </div>
        </div>
      </div>
      <FallenLetters />
    </div>
  );
}
