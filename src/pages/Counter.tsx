import React, { useRef } from "react";
import "../styles/pages/Counter.scss";
import { useState } from "react";
import { Teams } from "../utils/Interfaces";

function Counter() {
  const [active, setActive] = useState<string>("1");
  const [color, setColor] = useState<string>("");
  const [firstTeamScore, setFirstTeamScore] = useState<Teams[]>([]);
  const [secondTeamScore, setSecondTeamScore] = useState<Teams[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [counter, setCounter] = useState<number>(0);
  const [firstTeamTotal, setFirstTeamTotal] = useState<number>(0);
  const [secondTeamTotal, setSecondTeamTotal] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleClickButton = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  const updateActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    let id = event.currentTarget.id;
    if (id === "first-btn") {
      setActive("1");
    }
    if (id === "second-btn") {
      setActive("2");
    }
  };

  const updateColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    let id = event.currentTarget.id;
    setColor(id);
  };

  function handleDeleteBonusPoint(i: number, index: number) {
    if (active === "1") {
      const updatedFirstTeamScore = [...firstTeamScore];
      const deletedBonusPoint = updatedFirstTeamScore[index].bonusPoints[i];
      updatedFirstTeamScore[index].bonusPoints.splice(i, 1);
      setFirstTeamScore(updatedFirstTeamScore);
      setFirstTeamTotal(firstTeamTotal - deletedBonusPoint);
    } else {
      const updatedSecondTeamScore = [...secondTeamScore];
      const deletedBonusPoint = updatedSecondTeamScore[index].bonusPoints[i];
      updatedSecondTeamScore[index].bonusPoints.splice(i, 1);
      setSecondTeamScore(updatedSecondTeamScore);
      setSecondTeamTotal(secondTeamTotal - deletedBonusPoint);
    }
  }

  const updateTeamScore = (number: React.RefObject<HTMLInputElement>) => {
    if (active === "1") {
      setFirstTeamScore((prevTeam) => {
        const updatedTeam = [...prevTeam];
        if (updatedTeam[counter]) {
          updatedTeam[counter].score = Number(number.current!.value);
          setFirstTeamTotal(
            updatedTeam[counter].score +
              updatedTeam[counter].bonusPoints.reduce((a, b) => a + b, 0) +
              firstTeamTotal
          );
        } else {
          updatedTeam.push({
            score: Number(number.current!.value),
            bonusPoints: [],
          });
          setFirstTeamTotal(Number(number.current!.value) + firstTeamTotal);
        }
        return updatedTeam;
      });
      setSecondTeamScore((prevTeam) => {
        const updatedTeam = [...prevTeam];
        if (updatedTeam[counter]) {
          updatedTeam[counter].score = 162 - Number(number.current!.value);
          setSecondTeamTotal(
            updatedTeam[counter].score +
              updatedTeam[counter].bonusPoints.reduce((a, b) => a + b, 0) +
              secondTeamTotal
          );
        } else {
          updatedTeam.push({
            score: 162 - Number(number.current!.value),
            bonusPoints: [],
          });
          setSecondTeamTotal(updatedTeam[counter].score + secondTeamTotal);
        }
        number.current!.value = "";
        setColor("");
        return updatedTeam;
      });
      setCounter(counter + 1);
    } else {
      setSecondTeamScore((prevTeam) => {
        const updatedTeam = [...prevTeam];
        if (updatedTeam[counter]) {
          updatedTeam[counter].score = Number(number.current!.value);
          setSecondTeamTotal(
            updatedTeam[counter].score +
              updatedTeam[counter].bonusPoints.reduce((a, b) => a + b, 0) +
              secondTeamTotal
          );
        } else {
          updatedTeam.push({
            score: Number(number.current!.value),
            bonusPoints: [],
          });
          setSecondTeamTotal(updatedTeam[counter].score + secondTeamTotal);
        }
        return updatedTeam;
      });
      setFirstTeamScore((prevTeam) => {
        const updatedTeam = [...prevTeam];
        if (updatedTeam[counter]) {
          updatedTeam[counter].score = 162 - Number(number.current!.value);
          setFirstTeamTotal(
            updatedTeam[counter].score +
              updatedTeam[counter].bonusPoints.reduce((a, b) => a + b, 0) +
              firstTeamTotal
          );
        } else {
          updatedTeam.push({
            score: 162 - Number(number.current!.value),
            bonusPoints: [],
          });
          setFirstTeamTotal(updatedTeam[counter].score + firstTeamTotal);
        }
        number.current!.value = "";
        setColor("");
        return updatedTeam;
      });
      setCounter(counter + 1);
    }
  };

  const updateTeamCallings = (number: number) => {
    if (active === "1") {
      setFirstTeamScore((prevTeam) => {
        const updatedTeam = [...prevTeam];
        if (updatedTeam[counter] && updatedTeam[counter].bonusPoints) {
          updatedTeam[counter].bonusPoints.push(number);
        } else {
          updatedTeam.push({
            score: 0,
            bonusPoints: [number],
          });
        }
        return updatedTeam;
      });
    } else {
      setSecondTeamScore((prevTeam) => {
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
    }
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
          Prvi team-Vi
        </button>
        <button
          className={active === "2" ? "active" : "second-team-btn"}
          id={"second-btn"}
          onClick={(event) => {
            updateActive(event);
          }}
        >
          Drugi team-Oni
        </button>
      </div>
      <div className="board">
        <div className="options">
          <p className="team-name">
            {active === "1" ? "Prvi" : "Drugi"} team-
            {active === "1" ? "Vi" : "Oni"}
          </p>
          <div className="choose-color">
            <p className="color">Adut je: {color}</p>
            <div className="colors">
              <button
                className="heart-karo"
                id={"Herc"}
                onClick={(event) => {
                  updateColor(event);
                }}
              >
                ♥
              </button>
              <button
                className="heart-karo"
                id={"Kara"}
                onClick={(event) => {
                  updateColor(event);
                }}
              >
                ♦
              </button>
              <button
                className="spade"
                id={"Pik"}
                onClick={(event) => {
                  updateColor(event);
                }}
              >
                ♠
              </button>
              <button
                className="club"
                id={"Tref"}
                onClick={(event) => {
                  updateColor(event);
                }}
              >
                ♣
              </button>
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
            <button
              className="callings-button"
              id={"20"}
              onClick={(event) => {
                updateTeamCallings(Number(event.currentTarget.id));
              }}
            >
              3 zaredom / Bela
            </button>
            <button
              className="callings-button"
              id={"50"}
              onClick={(event) => {
                updateTeamCallings(Number(event.currentTarget.id));
              }}
            >
              4 zaredom
            </button>
            <button
              className="callings-button"
              id={"100"}
              onClick={(event) => {
                updateTeamCallings(Number(event.currentTarget.id));
              }}
            >
              5 zaredom
            </button>
            <button
              className="callings-button"
              id={"100"}
              onClick={(event) => {
                updateTeamCallings(Number(event.currentTarget.id));
              }}
            >
              4 iste
            </button>
            <button
              className="callings-button"
              id={"150"}
              onClick={(event) => {
                updateTeamCallings(Number(event.currentTarget.id));
              }}
            >
              4 deve
            </button>
            <button
              className="callings-button"
              id={"200"}
              onClick={(event) => {
                updateTeamCallings(Number(event.currentTarget.id));
              }}
            >
              4 decka
            </button>
            <button
              className="callings-button"
              id={"1001"}
              onClick={(event) => {
                updateTeamCallings(Number(event.currentTarget.id));
              }}
            >
              Belot
            </button>
          </div>
        </div>
        <div className="score">
          <div className="games">
            Bodovi:
            {active === "1"
              ? firstTeamScore.map((item, index) => (
                  <div key={index}>
                    <div>
                      Zvanja:
                      {item.bonusPoints.map((point, i) => (
                        <p key={i}>
                          {point}
                          <button
                            className="delete-calling-btn"
                            onClick={() => handleDeleteBonusPoint(i, index)}
                          >
                            X
                          </button>
                        </p>
                      ))}
                    </div>
                    <p>{item.score}</p>
                  </div>
                ))
              : secondTeamScore.map((item, index) => {
                  return (
                    <div key={index}>
                      <div>
                        Zvanja:
                        {item.bonusPoints.map((point, i) => (
                          <p key={i}>
                            {point}
                            <button
                              className="delete-calling-btn"
                              onClick={() => handleDeleteBonusPoint(i, index)}
                            >
                              X
                            </button>
                          </p>
                        ))}
                      </div>
                      <p>{item.score}</p>
                    </div>
                  );
                })}
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
