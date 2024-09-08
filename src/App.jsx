import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [quizQuestion, setQuizQuestion] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [selectedVal, setselectedVal] = useState(null);
  const [checkAns, setCheckAns] = useState(0);
  const [shuffle, setShuffle] = useState([]);
  const [showResult, setShowResult] = useState(false);

  let radiosRef = useRef([]);
  const handleClick = (radio) => setselectedVal(radio);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function nextQuestion(index) {
    if (!selectedVal) {
      alert("please select any answer");
      return;
    }

    if (quizQuestion[index].correctAnswer === selectedVal) {
      setCheckAns(checkAns + 1);
    }

    if (index === quizQuestion.length - 1) {
      setShowResult(true);
    } else {
      setQuestionNum(questionNum + 1);
    }

    radiosRef.current.forEach((radio) => {
      if (radio) radio.checked = false;
    });
    setselectedVal(null);
  }

  useEffect(() => {
    if (quizQuestion.length > 0) {
      const answer = [
        ...quizQuestion[questionNum].incorrectAnswers,
        quizQuestion[questionNum].correctAnswer,
      ];

      setShuffle(shuffleArray([...answer]));
    }
  }, [quizQuestion, questionNum]);

  function quiz() {
    setShowResult(false);
    setQuizQuestion([]);
    setCheckAns(0);
    setQuestionNum(0);
    axios(`https://the-trivia-api.com/v2/questions`)
      .then((res) => {
        console.log(res.data);
        setQuizQuestion(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    quiz();
  }, []);

  return (
    <>
      <div className="navbar bg-[#2b3440] p-[15px]">
        <a
          style={{ letterSpacing: "3px" }}
          className="btn btn-ghost text-xl text-white m-auto text-[30px]"
        >
          Quiz App
        </a>
      </div>
      {showResult ? (
        <div
          className="text-center w-[300px] h-[300px] rounded-full bg-black text-white flex justify-center items-center text-[22px] m-auto mt-12
      "
        >
          <p>
            {" "}
            Your Final Score <br /> is {checkAns} <br /> Out of{" "}
            {quizQuestion.length} <br />{" "}
            <button
              className="btn btn-outline btn-primary mt-[30px]"
              onClick={quiz}
            >
              Play Again
            </button>
          </p>
        </div>
      ) : (
        <div className="mb-5 text-blackd p-[30px] rounded-md">
          {quizQuestion.length > 0 ? (
            <>
              <p className="text-[20px] font-semibold mb-4">
                {" "}
                Q:{questionNum + 1} {quizQuestion[questionNum].question.text}
              </p>
              <>
                {shuffle.map((item, index) => (
                  <div className="mb-3" key={index}>
                    <h3>
                      {" "}
                      <input
                        ref={(el) => (radiosRef.current[index] = el)}
                        onChange={() => handleClick(item)}
                        type="radio"
                        name="radio-4"
                        className="radio radio-accent radio-xs mr-3"
                        value={item}
                      />
                      {item}
                    </h3>
                  </div>
                ))}
                <button
                  className="btn btn-outline btn-primary mt-5"
                  onClick={() => nextQuestion(questionNum)}
                >
                  Next Question
                </button>
              </>
            </>
          ) : (
            <span className="loading loading-bars loading-lg"></span>
          )}
        </div>
      )}
      <footer className="footer gap-y-1 bg-neutral text-neutral-content p-6 absolute bottom-0">
        <aside>
          <p className="text-[14px] text-start font-medium leading-relaxed tracking-wide mt-4 mb-2">
            All Rights Reserved
            <br />
            Created by Muhammad Akasha
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}

export default App;
