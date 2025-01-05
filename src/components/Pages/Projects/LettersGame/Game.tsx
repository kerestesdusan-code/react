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
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-4">
      <div className="absolute left-0 top1-/2 transform-translate-y-1/2 w-96 bg-amber-100 p-10 rounded-lg border border-gray-300 shadow-md">
        <p className="text-bg text-gray-800 leading-relaxed">
          <strong>Falling Letters</strong> is a fun and interactive game created to demonstrate the
          <span className="text-blue-500 font-semibold"> capabilities of React </span>
          and its component-based structure. The game combines dynamic rendering and user interaction to create an engaging experience.
        </p>
        <p className="mt-4 text-gray-600">
          Your goal is to prevent the letters from piling up too high by catching or eliminating them.
          Explore the speed controls and challenge yourself to get the highest score!
        </p>
      </div>
      <h1 className="text-4xl font-bold text-blue-500 mb-6">Falling Letters</h1>
      <div className="flex flex-col items-center">
        <div className="relative border-4 border-gray-700 rounded-lg">
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
        <div className="mt-4 w-full text-center">
          <div className="text-lg font-semibold text-gray-300">
            <p>
              <span className="text-blue-400">Score:</span>{" "}
              <span className="text-green-400">{score}</span>
            </p>
            <p>
              <span className="text-blue-400">Speed:</span>{" "}
              <span className="text-yellow-400">{100 - speed}</span>
            </p>
            <p>
              <span className="text-blue-400">Fallen Letters:</span>{" "}
              <span className="text-red-400">({fallenLetters.length})</span>
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-4">
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
        </div>
      </div>
      <FallenLetters />
    </div>
  );
}
