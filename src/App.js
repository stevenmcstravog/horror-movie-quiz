import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { QUESTIONS as questions } from './constants';

const App = () => {

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizFinished, setFinishQuiz] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions();
  }, [])

  const setQuestions = () => {
    shuffleQuestions();
    setQuizQuestions(questions.slice(0, 5));
  }

  const shuffleQuestions = () => {
    for (let i = questions.length - 1; i > 0; i--) {
      const s = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[s]] = [questions[s], questions[i]];
    }
  }

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    (nextQuestion < quizQuestions.length) ? setCurrentQuestion(nextQuestion) : setFinishQuiz(true);
  }

  const handleQuizRestart = () => {
    setQuestions();
    setCurrentQuestion(0);
    setScore(0);
    setFinishQuiz(false);
  }

  return (
    <>
      {quizQuestions.length > 0 &&
        <Container className="quiz">
          <Row>
            <Col sm={12} md={8} className="mx-auto">
              <h1 className="title"><span>Horror</span> Movie Quiz</h1>
              {isQuizFinished
                ? <>
                  <h5 className="mt-4">You answered</h5>
                  <h1 className="question-count">{score} / {quizQuestions.length}</h1>
                  <h5>questions correct</h5>
                  <Button variant="success" className="mt-4" size="lg" onClick={handleQuizRestart}>Play Again</Button>
                </>
                : <>
                  <div className="question-section mt-4 mb-5">
                    <h5 className="question-count">{`${currentQuestion + 1} / ${quizQuestions.length}`}</h5>
                    <h4>{quizQuestions[currentQuestion].question}</h4>
                  </div>
                  <div className="answer-section">
                    {quizQuestions[currentQuestion].answers.map((answer) => (
                      <button onClick={() => handleAnswerClick(answer.isCorrect)}>{answer.text}</button>
                    ))}
                  </div>
                </>
              }
            </Col>
          </Row>
        </Container>
      }
    </>
  );
}

export default App;
