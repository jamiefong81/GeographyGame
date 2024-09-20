import React, { useState, useEffect } from 'react';
import './timer.css'

function Timer(props) {
    const [timerBarWidth, setTimerBarWidth] = useState(100);
    const duration = 10; // in seconds

    useEffect(() => {
        if (props.gameOver) {
            setTimerBarWidth(0);
            return;
        }

        const totalTimeDuration = duration * 1000; // in milliseconds
        const intervalDuration = 100;
        const totalIntervals = totalTimeDuration / intervalDuration;
        let intervalCount = 0;

        const timer = setInterval(() => {
            intervalCount += 1;
            const newWidth = 100 - (intervalCount / totalIntervals) * 100;
            setTimerBarWidth(newWidth);

            if (intervalCount >= totalIntervals) {
                clearInterval(timer);
                props.onTimeOut();
            }
        }, intervalDuration);

        return () => clearInterval(timer);
    }, [duration, props.onTimeOut, props.curAnswerComplete]);

    return (
        <div className="timer-container">
            <div className="timer-bar" style={{ width: `${timerBarWidth}%` }}></div>
        </div>
    )
}

export default Timer;