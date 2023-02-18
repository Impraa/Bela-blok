import React from "react";
import "../styles/pages/FAQ.scss";
import UpArrow from "./components/UpArrow";
import { useState } from "react";
import { FAQBody } from "../utils/Interfaces";
import DownArrow from "./components/DownArrow";

function FAQ() {
  const questions: FAQBody[] = [
    {
      question: "Zašto ovo postoji?",
      text: "Zato jer je bela blok loša aplikacija",
    },
    {
      question: "Što je bela(belot)?",
      text: "Bela (Belot) je kartaška igra koju možete igrati u dvoje, troje ili četvoro, s tim što se najčešće igra u četvoro. Svaka partija se sastoji od dijeljenja, određivanja aduta, zvanja, igranja i skupljanja bodova.",
    },
    {
      question: "Kako se dijele karte?",
      text: "Belot se igra sa špilom od 32 karte ili mađarskim kartama. Karte se dijele u suprotnom smjeru od kazaljke na satu.",
    },
    {
      question: "Kako se igra bela u četvero?",
      text: "Glavno obilježje bele u četvero je parovna igra u kojoj se cilj svakog para sastoji u sakupljanju pola + 1 bodova od ukupne igre. Igrači dobivaju šest karata licem prema dolje i još dvije u talonu. Nakon što se podigne prvih šest karata, igrači odlučuju hoće li odrediti aduta ili će reći dalje. Djelitelj je obavezan zvati aduta, a igra počinje kada se adut odredi.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const Bounce = require("react-reveal/Bounce");

  const handleClick = (index: number) => {
    console.log(index);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {questions.map((item: FAQBody, index: number) => (
        <Bounce bottom>
          <div
            className="faq"
            onClick={() => {
              handleClick(index);
            }}
            key={index}
          >
            <div className="question">
              {item.question}{" "}
              {activeIndex === index ? <UpArrow /> : <DownArrow />}
            </div>
            <div
              className={
                activeIndex === index ? "answer answer-active" : "answer"
              }
            >
              {item.text}
            </div>
          </div>
        </Bounce>
      ))}
    </div>
  );
}

export default FAQ;
