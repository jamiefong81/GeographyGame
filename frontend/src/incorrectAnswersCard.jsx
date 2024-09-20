import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './incorrectAnswersCard.css'

function IncorrectAnswersCard(props) {
    function displayQuestion(incorrectAnswer) {
        if (props.gameType === "general") {
            return (
                <h5 class="card-title">{incorrectAnswer.question}</h5>
            )
        } else {
            return (
                <img src={`https://flagsapi.com/${incorrectAnswer.question}/flat/${64}.png`} />
            )
        }
    }

    return (
        <div>
            <h2>Review Incorrect Answers</h2>
            <Carousel>
                {props.incorrectAnswers.map((incorrectAnswer, index) => {
                    return (
                        <Carousel.Item key={index}>
                            <div class="card" style={{ width: "18rem" }} key={index}>
                                <div class="card-body">
                                    {/* <h5 class="card-title">{incorrectAnswer.question}</h5> */}
                                    {displayQuestion(incorrectAnswer)}
                                    <p class="card-text">Your Answer: {incorrectAnswer.userIncorrectAnswer}</p>
                                    <p class="card-text">Correct Answer: {incorrectAnswer.questionCorrectAnswer}</p>
                                </div>
                            </div>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default IncorrectAnswersCard;