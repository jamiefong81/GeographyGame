import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stateCapitals.css';
import Axios from 'axios';
import Timer from './timer';
import CompletedMessage from './completeMessage';
import ScorePage from './scorePage';

function StateCapitals(props) {
    const [playGame, setPlayGame] = useState(false);
    const [stateCapitalList, setStateCapitalList] = useState([]);
    const [numQuestion, setNumQuestion] = useState(0);
    const [curState, setCurState] = useState(null);
    const [correctCapital, setCorrectCapital] = useState(null);
    const [numCorrect, setNumCorrect] = useState(0);
    const [curAnswerComplete, setCurAnswerComplete] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        setUsername(props.username);
        fetchData();
    }, [])

    async function fetchData() {
        const response = await Axios.get("http://localhost:9000/getstatecapitals");
        setStateCapitalList(response.data);
    }

    function LoadGame() {
        return (
            <div>
                <Timer onTimeOut={onTimeOut} curAnswerComplete={curAnswerComplete} gameOver={gameOver}/>
                <div class="state-capitals-question-box">
                    {displayQuestion()}
                    {gameOver ? displayScorePage() : null}
                    {curAnswerComplete ? displayCompletedMessage() : null}
                </div>
            </div>
        )
    }

    function onTimeOut() {
        setIncorrectAnswers([
            ...incorrectAnswers,
            { question: curState, userIncorrectAnswer: "Incomplete", questionCorrectAnswer: correctCapital }
        ])

        if (numQuestion != 9) {
            setCurAnswerComplete(true);
            setNumQuestion(numQuestion + 1);
        } else {
            updateScore(numCorrect);
            setGameOver(true);
            setCurState(null);
        }
    }

    function WelcomeMessage() {
        return (
            <div>
                <h1 id='playMessage' class="text-center">State Capital Quiz</h1>
                <button type="button" class="btn btn-primary btn-lg" onClick={() => setPlayGame(true)}>Play Now</button>
            </div>
        )
    }

    function RenderGame() {
        if (playGame) {
            return LoadGame();
        } else {
            return WelcomeMessage();
        }
    }

    useEffect(() => {
        if (stateCapitalList.length !== 0) {
            const randomNumber = Math.floor(Math.random() * 50);
            const state = stateCapitalList[randomNumber][0];
            const capital = stateCapitalList[randomNumber][1];
            setCurState(state);
            setCorrectCapital(capital);
        }
    }, [stateCapitalList, numQuestion]);

    function displayQuestion() {
        if (curState && !curAnswerComplete) {
            return (
                <div>
                    <h1>What is the capital of {curState}?</h1>
                    <input type="text" class="form-control" id="stateCapitalGuess" onChange={(event) => checkUserGuess(event)} />
                </div>
            )
        }
    }

    function checkUserGuess(event) {
        const userGuess = event.target.value;
        if (userGuess.toLowerCase() === correctCapital.toLowerCase()) {
            setNumCorrect(numCorrect + 1);
            if (numQuestion != 9) {
                setCurAnswerComplete(true);
                setNumQuestion(numQuestion + 1);
            } else {
                updateScore(numCorrect);
                setGameOver(true);
                setCurState(null);
            }
        }
    }

    function displayCompletedMessage() {
        return (
            <CompletedMessage endCountdown={endCountdown}/>
        )
    }

    function displayScorePage() {
        return (
            <ScorePage numCorrect={numCorrect} incorrectAnswers={incorrectAnswers} playAgain={playAgain} gameType="general"/>
        )
    }

    function endCountdown() {
        setCurAnswerComplete(false);
    }

    function playAgain() {
        setGameOver(false);
        setNumCorrect(0);
        setCurAnswerComplete(false);
        setNumQuestion(0);
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


    return (
        <RenderGame />
    )
}

export default StateCapitals;