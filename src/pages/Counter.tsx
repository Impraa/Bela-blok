import React, { useEffect, useRef } from "react";
import "../styles/pages/Counter.scss";
import { useState } from "react";
import { Cards, Teams, Callings } from "../utils/Interfaces";

function Counter() {
  const [active, setActive] = useState<string>("1");
  const [color, setColor] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const [firstTeamScore, setFirstTeamScore] = useState<Teams[]>([]);
  const [secondTeamScore, setSecondTeamScore] = useState<Teams[]>([]);
  const [firstTeamTotal, setFirstTeamTotal] = useState<number>(0);
  const [secondTeamTotal, setSecondTeamTotal] = useState<number>(0);

  useEffect(() => {
    checkScore();
  }, [firstTeamTotal, secondTeamTotal]);

  const colorOptions: Cards[] = [
    { id: "Herc", label: "♥", className: "heart" },
    { id: "Kara", label: "♦", className: "karo" },
    { id: "Pik", label: "♠", className: "spade" },
    { id: "Tref", label: "♣", className: "club" },
  ];

  const callingOptions: Callings[] = [
    { id: "20", text: "3 zaredom / Bela" },
    { id: "50", text: "4 zaredom" },
    { id: "100", text: "5 zaredom" },
    { id: "100", text: "4 iste" },
    { id: "150", text: "4 deve" },
    { id: "200", text: "4 decka" },
    { id: "1001", text: "Belot" },
  ];

  const handleClickButton = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  const updateActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    let id = event.currentTarget.id;
    const value = id === "first-btn" ? "1" : "2";
    setActive(value);
  };

  const updateColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    let id = event.currentTarget.id;
    setColor(id);
  };

  function handleDeleteBonusPoint(i: number, index: number) {
    if (active === "1") {
      const updatedFirstTeamScore = [...firstTeamScore];
      updatedFirstTeamScore[index].bonusPoints.splice(i, 1);
      setFirstTeamScore(updatedFirstTeamScore);
    } else {
      const updatedSecondTeamScore = [...secondTeamScore];
      updatedSecondTeamScore[index].bonusPoints.splice(i, 1);
      setSecondTeamScore(updatedSecondTeamScore);
    }
  }

  const checkScore = () => {
    if (firstTeamTotal > 1001 && secondTeamTotal > 1001) {
      if (firstTeamTotal > secondTeamTotal) {
        resetGame();
        console.log("Prvi team je pobjedio");
      } else {
        resetGame();
        console.log("Drugi team je pobjedio");
      }
    } else if (firstTeamTotal > 1001) {
      resetGame();
      console.log("Prvi team je pobjedio");
    } else if (secondTeamTotal > 1001) {
      resetGame();
      console.log("Drugi team je pobjedio");
    }
  };

  const resetGame = () => {
    setFirstTeamScore([]);
    setFirstTeamTotal(0);
    setSecondTeamScore([]);
    setSecondTeamTotal(0);
    setCounter(0);
  };

  const updateTeamScore = (number: React.RefObject<HTMLInputElement>) => {
    const num = Number(number.current!.value);
    const isFirstTeam = active === "1";
    const setTeamScore = isFirstTeam ? setFirstTeamScore : setSecondTeamScore;
    const setOtherTeamScore = isFirstTeam
      ? setSecondTeamScore
      : setFirstTeamScore;
    const teamTotal = isFirstTeam ? firstTeamTotal : secondTeamTotal;
    const setTeamTotal = isFirstTeam ? setFirstTeamTotal : setSecondTeamTotal;
    const otherTeamTotal = isFirstTeam ? secondTeamTotal : firstTeamTotal;
    const setOtherTeamTotal = isFirstTeam
      ? setSecondTeamTotal
      : setFirstTeamTotal;

    setTeamScore((prevTeam) => {
      const updatedTeam = [...prevTeam];
      if (updatedTeam[counter]) {
        updatedTeam[counter].score = num === 162 ? num + 90 : num;
        setTeamTotal(
          updatedTeam[counter].score +
            updatedTeam[counter].bonusPoints.reduce((a, b) => a + b, 0) +
            teamTotal
        );
      } else {
        updatedTeam.push({
          score: num === 162 ? num + 90 : num,
          bonusPoints: [],
        });
        setTeamTotal(num === 162 ? num + 90 : num + teamTotal);
      }
      return updatedTeam;
    });

    setOtherTeamScore((prevTeam) => {
      const updatedTeam = [...prevTeam];
      if (updatedTeam[counter]) {
        updatedTeam[counter].score = num + 162 === 162 ? num + 252 : 162 - num;
        setOtherTeamTotal(
          updatedTeam[counter].score +
            updatedTeam[counter].bonusPoints.reduce((a, b) => a + b, 0) +
            otherTeamTotal
        );
      } else {
        updatedTeam.push({
          score: num + 162 === 162 ? num + 252 : 162 - num,
          bonusPoints: [],
        });
        setOtherTeamTotal(updatedTeam[counter].score + otherTeamTotal);
      }
      number.current!.value = "";
      setColor("");
      return updatedTeam;
    });
    checkScore();
    setCounter(counter + 1);
  };

  const updateTeamCallings = (number: number) => {
    const [, setTeamScore] =
      active === "1"
        ? [firstTeamScore, setFirstTeamScore]
        : [secondTeamScore, setSecondTeamScore];

    setTeamScore((prevTeam) => {
      const updatedTeam = [...prevTeam];
      if (updatedTeam[counter]) {
        updatedTeam[counter].bonusPoints.push(number);
      } else {
        updatedTeam.push({
          score: 0,
          bonusPoints: [number],
        });
      }
      return updatedTeam;
    });
  };

  return (
    <div className="counter">
      {showMessage && (
        <p className="flash-message">
          Broj nemoze biti veći od 162, ni manji od 0
        </p>
      )}
      <div className="team-btns">
        <button
          className={active === "1" ? "active" : "first-team-btn"}
          id={"first-btn"}
          onClick={(event) => {
            updateActive(event);
          }}
        >
          Prvi team-Mi
        </button>
        <button
          className={active === "2" ? "active" : "second-team-btn"}
          id={"second-btn"}
          onClick={(event) => {
            updateActive(event);
          }}
        >
          Drugi team-Vi
        </button>
      </div>
      <div className="board">
        <div className="options">
          <p className="team-name">
            {active === "1" ? "Prvi" : "Drugi"} team-
            {active === "1" ? "Mi" : "Vi"}
          </p>
          <div className="choose-color">
            <p className="color">Adut je: {color}</p>
            <div className="colors">
              {colorOptions.map((option, index) => (
                <button
                  key={index}
                  className={option.className}
                  id={option.id}
                  onClick={(event) => {
                    updateColor(event);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="write-score">
            <label htmlFor={active === "1" ? "first-score" : "second-score"}>
              Unesi Broj Bodova:
            </label>
            <input
              type="number"
              min={1}
              max={162}
              pattern="[0-9]"
              id={active === "1" ? "first-score" : "second-score"}
              className="input"
              ref={inputRef}
            />
            <button
              className="write-score-btn"
              onClick={() => {
                if (
                  Number(inputRef.current!.value) > 162 ||
                  Number(inputRef.current!.value) < 0
                ) {
                  handleClickButton();
                  inputRef.current!.value = "";
                  return;
                }
                updateTeamScore(inputRef);
              }}
            >
              Unesi
            </button>
            <p className="callings">Zvanja: </p>
            {callingOptions.map((option, index) => (
              <button
                key={index}
                className="callings-button"
                id={option.id}
                onClick={(event) => {
                  updateTeamCallings(Number(event.currentTarget.id));
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
        <div className="score">
          <div className="games">
            Bodovi:
            {[firstTeamScore, secondTeamScore][active === "1" ? 0 : 1].map(
              (item, index) => (
                <div key={index}>
                  <div>
                    Zvanja:
                    {item.bonusPoints.map((point, i) => (
                      <p key={i}>
                        {point}
                        {item.score !== 0 ? (
                          ""
                        ) : (
                          <button
                            className="delete-calling-btn"
                            onClick={() => handleDeleteBonusPoint(i, index)}
                          >
                            X
                          </button>
                        )}
                      </p>
                    ))}
                  </div>
                  <p>Igra:</p>
                  <p>{item.score}</p>
                </div>
              )
            )}
          </div>
          <div className="total">
            Sveukupno:
            <p>{active === "1" ? firstTeamTotal : secondTeamTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
