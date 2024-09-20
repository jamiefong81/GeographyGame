import React from 'react';

function MultipleChoiceOptions(props) {
    return (
        // <div class="form-check">
        //     <input class="form-check-input" type="radio" name="flexRadioDefault" id={`option${props.optionNumber}`} checked></input>
        //     <label class="form-check label">
        //         {props.optionAnswer}
        //     </label>
        // </div>
        <button class="answerButton" onClick={() => props.questionAnswer(props.optionNumber)}>{props.optionAnswer}</button>
    )
}

export default MultipleChoiceOptions;