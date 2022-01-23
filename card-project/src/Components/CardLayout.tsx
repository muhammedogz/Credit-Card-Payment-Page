import { useState } from 'react';
import Datetime from "react-datetime";
import 'react-datetime/css/react-datetime.css';

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

    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const checkCardNumber = (cardNumber: string) => {
        const cardNumberLength = cardNumber.length;
        // if card contains alphabets
        // delete last character

        setCardNumber(cardNumber.replace(/[^0-9]/g, ''));
            
    }

    const printDate = (date : any) => {
        console.log(date)
        setYear("2005");
        setMonth("10");
    }


    return (
        <>
        <div className='center-div'>
            <div className='inner-div'>
                <div>
                    <Card cardType={cardType} cardNumber={cardNumber} cardDate={cardDate} cardCCV={cardCCV} />
                </div>
                <div className='form-div'>
                    <div className='input-form'>
                        <label >Card Number:
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
                    <div>
                        <label> Expiration Date:
                            <Datetime value={year + month} dateFormat="MM/YYYY" onChange={(e) => printDate(e)} />
                        </label>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardLayout
