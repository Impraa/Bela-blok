import React, { useRef } from "react";
import "../styles/pages/Counter.scss";
import { useState } from "react";

function Counter() {
  const [active, setActive] = useState<string>("1");
  const [color, setColor] = useState<string>("");
  const [firstTeamScore, setFirstTeamScore] = useState<number[]>([]);
  const [secondTeamScore, setSecondTeamScore] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="counter">
      <div className="team-btns">
        <button
          className={active === "1" ? "active" : "first-team-btn"}
          id={"first-btn"}
          onClick={(event) => {
            let id = event.currentTarget.id;
            if (id === "first-btn") {
              setActive("1");
            }
          }}
        >
          Prvi team-Vi
        </button>
        <button
          className={active === "2" ? "active" : "second-team-btn"}
          id={"second-btn"}
          onClick={(event) => {
            let id = event.currentTarget.id;
            if (id === "second-btn") {
              setActive("2");
            }
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
                  let id = event.currentTarget.id;
                  setColor(id);
                }}
              >
                ♥
              </button>
              <button
                className="heart-karo"
                id={"Kara"}
                onClick={(event) => {
                  let id = event.currentTarget.id;
                  setColor(id);
                }}
              >
                ♦
              </button>
              <button
                className="spade"
                id={"Pik"}
                onClick={(event) => {
                  let id = event.currentTarget.id;
                  setColor(id);
                }}
              >
                ♠
              </button>
              <button
                className="club"
                id={"Tref"}
                onClick={(event) => {
                  let id = event.currentTarget.id;
                  setColor(id);
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
                if (active === "1") {
                  setFirstTeamScore([
                    ...firstTeamScore,
                    Number(inputRef.current!.value),
                  ]);
                  console.log(firstTeamScore);
                  setSecondTeamScore([
                    ...secondTeamScore,
                    162 - Number(inputRef.current!.value),
                  ]);
                } else {
                  setSecondTeamScore([
                    ...secondTeamScore,
                    Number(inputRef.current!.value),
                  ]);
                  console.log(firstTeamScore);
                  setFirstTeamScore([
                    ...firstTeamScore,
                    162 - Number(inputRef.current!.value),
                  ]);
                }
              }}
            >
              Unesi
            </button>
          </div>
        </div>
        <div className="score">
          Bodovi:
          {active === "1"
            ? firstTeamScore.map((score, index) => <p key={index}>{score}</p>)
            : secondTeamScore.map((score, index) => <p key={index}>{score}</p>)}
        </div>
      </div>
    </div>
  );
}

export default Counter;
