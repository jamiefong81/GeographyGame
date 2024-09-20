import React, { useState, useEffect } from 'react';
import './flagGame.css'
import Axios from 'axios';
import MultipleChoiceOptions from './multipleChoiceOptions';
import Timer from './timer';
import CompletedMessage from './completeMessage';
import ScorePage from './scorePage';

function FlagGame(props) {
    const [playGame, setPlayGame] = useState(false);
    const [curAnswerComplete, setCurAnswerComplete] = useState(false);
    const [numQuestion, setNumQuestion] = useState(0);
    const [curCountrycode, setCurCountryCode] = useState(null);
    const [curCorrectCountryName, setCurCorrectCountryName] = useState(null);
    const [curAnswerArr, setCurAnswerArr] = useState([]);
    const [numCorrect, setNumCorrect] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        setUsername(props.username);
    }, [])

    useEffect(() => {
        fetchFlagQuestion();
    }, [numQuestion])

    function LoadGame() {
        return (
            <div>
                <Timer onTimeOut={onTimeOut} curAnswerComplete={curAnswerComplete} gameOver={gameOver}/>
                <div class="flag-game-question-box">
                    {displayFlagQuestion()}
                    {curAnswerArr.length > 0 && displayAnswerOptions()}
                    {gameOver ? displayScorePage() : null}
                    {curAnswerComplete ? displayCompletedMessage() : null}
                </div>
            </div>
        )
    }

    function WelcomeMessage() {
        return (
            <div>
                <h1 id='playMessage' class="text-center">Flags Quiz</h1>
                <button type="button" class="btn btn-primary btn-lg" onClick={() => setPlayGame(true)}>Play Now</button>
            </div>
        )
    }

    function RenderGame() {
        if (playGame) {
            return (
                <div>
                    <LoadGame />
                </div>
            );
        } else {
            return WelcomeMessage();
        }
    }

    async function fetchFlagQuestion() {
        const response = await Axios.get("http://localhost:9000/getFlag"); // countryCode, correctCountryName, answersArr
        setCurCountryCode(response.data[0]);
        setCurCorrectCountryName(response.data[1]);
        setCurAnswerArr(response.data[2]);
    }

    function displayFlagQuestion() {
        if (!curAnswerComplete && setCurAnswerArr && curCountrycode) {
            return (
                <img src={`https://flagsapi.com/${curCountrycode}/flat/${64}.png`} height="200" width="200" />
            )
        }
    }

    function displayAnswerOptions() {
        if (!curAnswerComplete) {
            return curAnswerArr.map((option, questionNumber) => {
                return (<MultipleChoiceOptions optionAnswer={option} optionNumber={option} questionAnswer={questionAnswer} />)
            });
        }
    }

    function questionAnswer(userAnswer) {
        if (userAnswer === curCorrectCountryName) {
            setNumCorrect(numCorrect + 1);
        } else {
            setIncorrectAnswers([
                ...incorrectAnswers,
                { question: curCountrycode, userIncorrectAnswer: userAnswer, questionCorrectAnswer: curCorrectCountryName }
            ])
        }

        if (numQuestion != 9) {
            setCurAnswerComplete(true);
            setNumQuestion(numQuestion + 1);
        } else {
            updateScore(numCorrect);
            setGameOver(true);
            setCurCountryCode(null);
            setCurAnswerArr([]);
        }
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

    function onTimeOut() {
        questionAnswer("");
    }
    
    function displayCompletedMessage() {
        return (
            <CompletedMessage endCountdown={endCountdown}/>
        )
    }

    function endCountdown() {
        setCurAnswerComplete(false);
    }

    function displayScorePage() {
        return (
            <ScorePage numCorrect={numCorrect} incorrectAnswers={incorrectAnswers} fetchQuestions={fetchFlagQuestion} playAgain={playAgain}/>
        )
    }

    function playAgain() {
        fetchFlagQuestion();
        setGameOver(false);
        setNumCorrect(0);
        setCurAnswerComplete(false);
        setIncorrectAnswers([]);
        setNumQuestion(0);
    }

    return (
        <RenderGame />
    )
}

export default FlagGame;