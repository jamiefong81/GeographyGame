import React, { useState, useEffect } from 'react';

function CompletedMessage(props) {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000)

        const nextQuestionCountdown = setTimeout(() => {
            setCountdown(3);
            props.endCountdown();
        }, 3000)

        return () => {
            clearInterval(countdownInterval);
            clearTimeout(nextQuestionCountdown);
        };

    }, [])

    return (
        <div>
            <h2>Next question in:</h2>
            <h3>{countdown}</h3>
        </div>
    )
}

export default CompletedMessage;