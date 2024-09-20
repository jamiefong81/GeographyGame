import React from 'react';
import IncorrectAnswersCard from './incorrectAnswersCard';

function ScorePage(props) {
    return (
        <div>
            <h1>Game Over!</h1>
            <h2>Score: {props.numCorrect}/10</h2>
            <IncorrectAnswersCard incorrectAnswers={props.incorrectAnswers} gameType={props.gameType}/>
            <button type="button" class="btn btn-primary btn-lg" onClick={() => props.playAgain()}>Play Again</button>
        </div>
    )
}

export default ScorePage;