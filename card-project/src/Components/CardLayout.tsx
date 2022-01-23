import { useState } from 'react';

import Card from './Card'
import './CardLayout.scss';

const mastercard = '/mastercard.png';
const visa = '/visa.png';

const CardLayout = () => {

    const [isMasterCard, setIsMasterCard] = useState(false);
    const [cardType, setCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardCCV, setCardCCV] = useState('');
    const [cardDate, setCardDate] = useState('');

    const checkCardNumber = (cardNumber: string) => {
        const cardNumberLength = cardNumber.length;
        // if card contains alphabets
        // delete last character

        setCardNumber(cardNumber.replace(/[^0-9]/g, ''));
            
    }


    return (
        <div className='center-div'>
            <Card cardType={cardType} cardNumber={cardNumber} cardDate={cardDate} cardCCV={cardCCV} />
            <div className='form-div'>
                <div className='input-form'>
                    <label >Card Number
                    <input 
                        type='text' 
                        name='card-num'
                        id='card-num'
                        placeholder='Enter Card Number'
                        max={16}
                        pattern="[0-9]{16}"
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => checkCardNumber(e.target.value)}
                    />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CardLayout
