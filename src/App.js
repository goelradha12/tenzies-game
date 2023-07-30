import React from "react";
import Card from "./Card.js";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(updateArray);
  const [ifWinner, setIfWinner] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [gameEnd, setGameEnd] = React.useState(false);
  const [countRoll, setCountRoll] = React.useState(0);
  function getRandomValues() {
    return Math.floor(Math.random() * 6 + 1);
  }
  
  const [timer, setTimer] = React.useState("00:00")
  React.useEffect(()=>{
    var minutes = 0;
    var seconds = 0;
    if(gameEnd) return;
    const interval = setInterval(() => {
      seconds++;
      if(seconds>60)
      {
        seconds = 0;
        minutes++;
      }
      setTimer(`${minutes>9? "":`0`}${minutes}:${seconds>9? "":`0`}${seconds}`)
    }, 1000);
  
    return () => {
      clearInterval(interval)};
  }, [gameEnd]);
  
  

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld) {
      setGameEnd(true);
      if (allSameValue) {
        setIfWinner(true);
        setMessage(`You won with ${countRoll} Rolls Champion! Time Taken: ${timer}`);
      } else {
        setMessage(`You lose with ${countRoll} Rolls. Time Taken: ${timer} `);
      }
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: getRandomValues(),
      isHeld: false,
      id: nanoid(),
    };
  }

  // to update array everytime button is clicked.
  function updateArray() {
    const array = [];
    for (var i = 0; i < 10; i++) {
      array.push(generateNewDie());
    }
    return array;
  }

  // getting an array of components to render directly on DOM

  function rollDice() {
    setCountRoll(count=>count+1)
    setDice((prevData) =>
      prevData.map((data) => {
        return data.isHeld ? data : generateNewDie();
      })
    );
  }

  function onCardClick(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function resetGame() {
    setIfWinner(false);
    setMessage("");
    setDice(updateArray());
    setGameEnd(false);
    setCountRoll(0);
    setTimer("00:00")
  }

  const allCards = dice.map((data) => (
    <Card
      key={data.id}
      value={data.value}
      onCardClick={() => onCardClick(data.id)}
      isHeld={data.isHeld}
    />
  ));

  return (
    <>
      <div className="game-container">
        <div className="inside-game-container">
          <div>
            <h1>Tenzies</h1>
            <p>
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </p>
            <hr/>
            <br/>
            <span><b>Timer</b>: {timer}</span> &nbsp;
            <span><b>Rolls: </b>{countRoll}</span>
          </div>
          <div className="cards-container">
            {allCards}
          </div>
          <div>
            {gameEnd ? (
              <p>{message}</p>
            ) : (
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  rollDice();
                }}
              >
                Roll
              </button>
            )}

            <button className="btn" onClick={resetGame}>
              {gameEnd? "Restart":"Reset"}
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}
