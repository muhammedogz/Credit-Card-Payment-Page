import { useState } from "react";

import ReactCardFlip from 'react-card-flip';

import './Card.scss';

const front = '/card_front.jpg';
const back = '/card_back.jpg';

interface CardProps {
    cardType: string;
    cardNumber: string;
    cardDate: string;
    cardCCV: string;
}

const Card = ( { cardType, cardNumber, cardCCV, cardDate } : CardProps ) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [showText, setShowText] = useState(true);



    let leftSide = '';
    let rightSide = '';

    const splitStringToLeftRight = (string: string) => {
        const splitString = string.split('');

        const length = splitString.length;
        // get first 4 digits
        leftSide = splitString.slice(0, 4).join('');
        if (length > 12){
            const showValue = length - 12;
            rightSide = splitString.slice(length - showValue).join('');
        }
        // get last 4 digits
    }

    splitStringToLeftRight(cardNumber);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        
        // wait .1 seconds before flipping back
        setTimeout(() => {
            setShowText(!showText);
        } , 300);

    }

    return (
        <>
        <div className="card-div" onClick={handleClick}>
            <ReactCardFlip isFlipped={isFlipped}>
                <div key="front">
                    <img src={process.env.PUBLIC_URL + front} alt="front" />
                </div>

                <div key="back">
                    <img src={process.env.PUBLIC_URL + back} alt="back" />
                </div>
            </ReactCardFlip>
            {(!isFlipped && showText) ? 
            <>
                <p className="card-text card-text-left"> {leftSide} </p>
                <p className="card-text card-text-right"> {rightSide} </p>
                <p className="card-text card-time">Date: {cardDate}</p>
                <img className="card-brand" src={process.env.PUBLIC_URL + cardType } alt={cardType} />
            </> : 
            <>
                <p className="card-text card-ccv">CCV: {cardCCV} </p>
            </>
            }
        </div>
        </>
    )
}

export default Card
