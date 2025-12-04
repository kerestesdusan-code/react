import React, { useState, useEffect } from "react";
import Display from "./Display";
import Letter, { LetterProps } from "./Letter";

export default function Game() {
  const [letters, setLetters] = useState<LetterProps[]>([]);
  const [fallenLetters, setFallenLetters] = useState<LetterProps[]>([]);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [tick, setTick] = useState(0);

  const screenWidth = 820;
  const screenHeight = 420;

  useEffect(() => {
    function process(currentTick: number) {
      if (fallenLetters.length >= 30 || paused) return;

      const pulledLetters: LetterProps[] = letters.map((letter) => {
        const pulledLetter: LetterProps = { ...letter };
        pulledLetter.positionY = letter.positionY + letter.size / 10;
        return pulledLetter;
      });

      const lettersOut = pulledLetters.filter(
        (letter) => letter.positionY + letter.size > screenHeight
      );
      const lettersIn = pulledLetters.filter(
        (letter) => letter.positionY + letter.size <= screenHeight
      );

      setFallenLetters([...fallenLetters, ...lettersOut]);

      if (currentTick % Math.floor(Math.random() * 10 + 1) === 0) {
        setLetters([...lettersIn, generateLetter()]);
      } else {
        setLetters([...lettersIn]);
      }

      if (currentTick % 10 === 0 && speed > 7) {
        setSpeed(speed - 5);
      }
    }

    const id = setInterval(() => {
      setTick((prev) => prev + 1);
      if (!paused) {
        process(tick);
      }
    }, speed);

    return () => clearInterval(id);
  }, [tick, letters, paused, fallenLetters, speed]);

  function generateLetter(): LetterProps {
    const alphabet = "WASD";
    const randomCharacter =
      alphabet[Math.floor(Math.random() * alphabet.length)];
    const letterSize = Math.floor(Math.random() * 50) + 25;

    return {
      letter: randomCharacter,
      size: letterSize,
      positionX: Math.floor(Math.random() * (screenWidth - letterSize)),
      positionY: -letterSize,
      backgroundColor: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      rotationSpeed: Math.random() * 10 + 1,
    };
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
    return (
      <>
        {letters.map((letter, index) => (
          <Letter key={"letter" + index} {...letter} />
        ))}
      </>
    );
  }

  function FallenLetters() {
    return (
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {fallenLetters.map((letter, index) => (
          <Letter
            key={"fallen-letter" + index}
            {...{ ...letter, positionY: 0 }}
          />
        ))}
      </div>
    );
  }

  function restart() {
    setScore(0);
    setFallenLetters([]);
    setLetters([]);
    setSpeed(100);
    setTick(0);
    setPaused(false);
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-500">
        Falling Letters
      </h1>

      <div className="flex flex-col items-center gap-4 w-full">
        <div className="relative border-4 border-gray-700 rounded-lg bg-slate-900 shadow-inner">
          <Display
            handleKeyPress={handleKeyPress}
            width={screenWidth}
            height={screenHeight}
          >
            {fallenLetters.length >= 30 && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-red-500 text-2xl font-bold">
                Game Over!
              </div>
            )}
            <Letters />
          </Display>
        </div>

        <div className="w-full max-w-md text-center space-y-3">
          <div className="text-lg font-semibold text-gray-700">
            <p>
              <span className="text-blue-500">Score:</span>{" "}
              <span className="text-green-500">{score}</span>
            </p>
            <p>
              <span className="text-blue-500">Speed:</span>{" "}
              <span className="text-yellow-500">{100 - speed}</span>
            </p>
            <p>
              <span className="text-blue-500">Fallen Letters:</span>{" "}
              <span className="text-red-500">({fallenLetters.length})</span>
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setPaused(!paused)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md transition"
            >
              {paused ? "Run" : "Pause"}
            </button>
            <button
              onClick={restart}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md shadow-md transition"
            >
              Restart
            </button>
          </div>

          <FallenLetters />
        </div>
      </div>
    </div>
  );
}
