import "./App.css";
import { useState, useEffect, useRef } from "react";
import { PlayerIcon, CpuIcon } from "./createIcon";

const PLAYERS = ["player", "cpu"];

const CHOICES = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

const ICON_MAPPER = {
  0: "Rock",
  1: "Paper",
  2: "Scissors",
  3: "Lizard",
  4: "Spock",
};

const getRandomIcon = () => Math.floor(Math.random() * 5);

export const GameContainer = () => {
  let firstRender = useRef(true);
  const [score, setScore] = useState({ player: 0, cpu: 0 });
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [reset, setReset] = useState(false);
  const [actionText, setActionText] = useState("Let's Play !");
  const [currentWinner, setCurrentWinner] = useState(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const randomIdx = getRandomIcon();
    const icon1 = choiceOne.toLowerCase();
    const icon2 = ICON_MAPPER[randomIdx].toLowerCase();
    const cpuChoiceTimeOut = setTimeout(() => {
      setChoiceTwo(randomIdx);
    }, 150);
    const winner = getTheWinner(icon1, icon2);
    const setWinnerTimeOut = setTimeout(() => {
      setTheWinner(winner);
    }, 150);
    
    return () => {
      clearTimeout(cpuChoiceTimeOut);
      clearTimeout(setWinnerTimeOut);
    };
  }, [choiceOne]);

  const getTheWinner = (val1, val2) => {
    const result1 = CHOICES[val1].defeats.indexOf(val2);
    const result2 = CHOICES[val2].defeats.indexOf(val1);
    const finalResult = result1 === result2 ? "tie" : result1 > -1 ? "player" : "cpu";
    setCurrentWinner(finalResult);
    return finalResult;
  };

  const setTheWinner = (result) => {
    if (result) {
      setScore((persisted) => {
        const i = persisted[result];
        return { ...persisted, [result]: i + 1 };
      });
    }
  };

  const resetHandler = () => {
    setReset(val => !val);
    setCurrentWinner(null);
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (currentWinner === "tie") {
        setActionText("Tie !");
      }
      else if (currentWinner === "player") {
        setActionText("You won =)");
      }
      else if (currentWinner === "cpu") {
        setActionText("Computer won >_<");
      }
      else {
        setActionText("Let's play !");
      }
    }, 150)

    return () => clearTimeout(timeOut);
  }, [currentWinner]);

  return (
    <div className="game-container">
      <div className="header">
        <h1>Rock Paper Scissors Lizard Spock</h1>
      </div>
      <PlayerIcon
        who={PLAYERS[0]}
        getChoice={setChoiceOne}
        showScore={score.player}
        reset={reset}
      />
      <CpuIcon
        who={PLAYERS[1]}
        getChoice={choiceTwo}
        showScore={score.cpu}
        reset={reset}
      />
      <i
        className="fas fa-sync-alt reset-icon"
        title="Reset"
        onClick={resetHandler}
      ><span className="play-again">Play again</span></i>
      <div className="result-container">
        <h3 className="result-text" id="resultText">
          {actionText}
        </h3>
      </div>
    </div>
  );
};
