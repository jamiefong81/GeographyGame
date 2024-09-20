import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './gamePage.css'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import MultipleChoiceOptions from './multipleChoiceOptions';
import ScorePage from './scorePage';
import CompletedMessage from './completeMessage';
import Timer from './timer';

function GamePage(props) {
    const [question, setQuestion] = useState(null);
    const [questionsList, setQuestionsList] = useState(null);
    const [numQuestion, setNumQuestion] = useState(0);
    const [answerArr, setAnswerArr] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [numCorrect, setNumCorrect] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [curAnswerComplete, setCurAnswerComplete] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetchQuestions();
        setUsername(props.username);
    }, []);

    async function fetchQuestions () {
        const questionList = await Axios.get("http://localhost:9000/getquestions");
        setNumQuestion(0);
        setQuestionsList(questionList);
    }

    useEffect(() => {
        if (questionsList && numQuestion === 0) {
            setQuestion(questionsList.data[numQuestion].question);
        }
    }, [questionsList, numQuestion])

    function displayQuestion() {
        if (!curAnswerComplete) {
            return (<h1>{question}</h1>);
        }
    }

    function displayOptions() {
        if (!curAnswerComplete) {
            return answerArr.map((option, questionNumber) => {
                return (<MultipleChoiceOptions id={numQuestion} optionAnswer={option} optionNumber={questionNumber} questionAnswer={questionAnswer} />)
            });
        }
    }

    useEffect(() => {
        if (questionsList) {
            let answersArr = questionsList.data[numQuestion].incorrect_answers;
            let correctAnswerPosition = Math.floor(Math.random() * (answersArr.length + 1));
            answersArr.splice(correctAnswerPosition,0,questionsList.data[numQuestion].correct_answer);
            setAnswerArr(answersArr);
            setCorrectAnswer(correctAnswerPosition);
        }
    }, [questionsList, numQuestion])

    useEffect(() => {
        if (questionsList) {
            setQuestion(questionsList.data[numQuestion].question);
        }
    }, [numQuestion])

    function questionAnswer(optionNumber) {
        if (optionNumber === correctAnswer) {
            setNumCorrect(numCorrect+1);
        } else {
            setIncorrectAnswers([
                ...incorrectAnswers,
                { question: question, userIncorrectAnswer: answerArr[optionNumber], questionCorrectAnswer: answerArr[correctAnswer] }
            ]);
        }

        if (numQuestion != 9) {
            setCurAnswerComplete(true);
            setNumQuestion(numQuestion+1);
        } else {
            updateScore(numCorrect);
            setGameOver(true);
            setQuestion(null);
            setAnswerArr([]);
        };
    }

    function updateScore(pointsToAdd) {
        pointsToAdd += 1;
        const postData = {
            username: username,
            pointsToAdd: pointsToAdd
        };

        Axios.post("http://localhost:9000/updatescore", JSON.stringify(postData), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        props.setScoreUpdated(true);
    }
    
    function displayScorePage() {
        return (
            <ScorePage numCorrect={numCorrect} incorrectAnswers={incorrectAnswers} fetchQuestions={fetchQuestions} playAgain={playAgain} gameType="general"/>
        )
    }

    function displayCompletedMessage() {
        return (
            <CompletedMessage endCountdown={endCountdown}/>
        )
    }

    function endCountdown() {
        setCurAnswerComplete(false);
    }

    function onTimeOut() {
        questionAnswer(-1); // Incorrect
    }

    function playAgain() {
        fetchQuestions();
        setGameOver(false);
        setNumCorrect(0);
        setCurAnswerComplete(false);
        setIncorrectAnswers([]);
    }

    return (
        <div>
            <Timer onTimeOut={onTimeOut} curAnswerComplete={curAnswerComplete} gameOver={gameOver}/>
            <div class="question-box question-text" id="fira-sans">
                <h1>{displayQuestion()}</h1>
                {answerArr.length > 0 && displayOptions()}
                {gameOver ? displayScorePage() : null}
                {curAnswerComplete ? displayCompletedMessage() : null}
            </div>
            {/* <button type="button" class="btn btn-primary btn-lg" onClick={() => props.setPlayGame(false)}>Go Back</button> */}
        </div>
    )
}

export default GamePage;