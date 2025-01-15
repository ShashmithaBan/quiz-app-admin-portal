import React, { useEffect, useState } from 'react';

export default function Timer({ timeout, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeOut(); 
          }, timeout);
        return () => clearTimeout(timer);
    }, [onTimeOut, timeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => Math.max(prevTime - 100, 0));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return <progress id="question-timer" max={timeout} value={remainingTime} />;
}