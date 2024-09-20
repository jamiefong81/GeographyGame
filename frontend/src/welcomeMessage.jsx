import React from 'react';

function WelcomeMessage(props) {
    return (
        <div>
            <h1 id='fira-sans' class="text-center">Ready to play?</h1>
            <button type="button" class="btn btn-primary btn-lg" onClick={() => props.setPlayGame(true)}>Play Now</button>
        </div>
    )
}

export default WelcomeMessage;