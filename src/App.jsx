import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [selectedVal, setselectedVal] = useState(null);
  const [checkAns, setCheckAns] = useState(0);
  const [shuffle, setShuffle] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [footerPosition, setFooterPosition] = useState(false);

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
      alert("Please select an answer");
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
        setFooterPosition(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (startQuiz) {
      quiz();
      setFooterPosition(true);
    }
  }, [startQuiz]);

  return (
    <>
      <Navbar />
      {!startQuiz ? (
        <>
          <h1 className="text-center text-white text-[30px] mt-10 font-semibold">
            Welcome to the Ultimate Quiz Challenge!
          </h1>
          <div className="quiz-sec text-center mt-20 bg-slate-300 shadow-2xl rounded-md border-indigo-600 p-12 w-fit mx-auto">
            <h3 className="text-[20px] mx-auto font-light">
              Explore random quiz questions from a variety of categories and put
              your knowledge to the test. Each quiz offers a fresh experience
              with new questions every time. Ready to see how much you know?
              Start the quiz and find out!
            </h3>
            <button
              onClick={() => setStartQuiz(true)}
              className="btn btn-outline btn-info mt-4 text-[16px]"
            >
              Start Quiz
            </button>
          </div>
        </>
      ) : showResult ? (
        <>
          <h2 className="text-center text-white text-[30px] mt-10 font-semibold">
            Result
          </h2>
          <div className="result-sec text-center w-[300px] h-[300px] rounded-full flex justify-center items-center text-[22px] m-auto mt-7">
            <p>
              Your Final Score <br /> is {checkAns} <br /> Out of{" "}
              {quizQuestion.length} <br />
              <button
                className="btn btn-outline btn-info mt-[30px]"
                onClick={quiz}
              >
                Play Again
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <h2
            style={{ letterSpacing: "3px" }}
            className="text-center text-white text-[30px] mt-10 font-semibold"
          >
            Quiz Questions
          </h2>
          <div className="quiz-sec mb-5 text-black p-[30px] rounded-md">
            {quizQuestion.length > 0 ? (
              <>
                <p className="text-[20px] font-semibold mb-4">
                  Q:{questionNum + 1} {quizQuestion[questionNum].question.text}
                </p>
                {shuffle.map((item, index) => (
                  <div className="mb-3" key={index}>
                    <h3>
                      <label className="cursor-pointer" htmlFor={item.id}>
                        {" "}
                        <input
                          ref={(el) => (radiosRef.current[index] = el)}
                          onChange={() => handleClick(item)}
                          type="radio"
                          name="radio-4"
                          className="radio radio-accent radio-xs mr-3"
                          value={item}
                          id={item.id}
                        />
                        {item}
                      </label>
                    </h3>
                  </div>
                ))}
                <button
                  className="btn btn-outline btn-info mt-5"
                  onClick={() => nextQuestion(questionNum)}
                >
                  Next Question
                </button>
              </>
            ) : (
              <span className="loading loading-bars loading-lg"></span>
            )}
          </div>
        </>
      )}
      <Footer quiz={footerPosition} />
    </>
  );
}

export default App;
