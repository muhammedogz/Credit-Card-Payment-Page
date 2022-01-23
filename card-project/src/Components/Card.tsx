import { useState } from "react";

import ReactCardFlip from 'react-card-flip';

import './Card.scss';

const front = '/card_front.jpg';
const back = '/card_back.jpg';

console.log(process.env.PUBLIC_URL)

const Card = () => {

    const [isFlipped, setIsFlipped] = useState(false);


    return (
        <>
        <div className="card-div" onClick={() => setIsFlipped(!isFlipped)}>
            <ReactCardFlip isFlipped={isFlipped}>
                <div key="front">
                    <img src={process.env.PUBLIC_URL + front} alt="front" />
                </div>

                <div key="back">
                    <img src={process.env.PUBLIC_URL + back} alt="back" />
                </div>
            </ReactCardFlip>
            {!isFlipped && <><p style={{backgroundColor:"re"}} className="card-text card-text-left"> 0545 </p>
            <p className="card-text card-text-right"> 0545 </p></>}
        </div>
        </>
    )
}

export default Card
