import moment from 'moment';
import { useState } from 'react';
import Datetime from "react-datetime";
import 'react-datetime/css/react-datetime.css';


import Card from './Card'
import './CardLayout.scss';
import './Button.scss';

const mastercard = '/mastercard.png';
const visa = '/visa.png';


const CardLayout = () => {

    const [cardType, setCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardCCV, setCardCCV] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const checkValidCard = async (e : any) => {
        e.preventDefault();

        const response = await fetch('https://mocki.io/v1/a5ae8585-b42d-486b-a4ff-25ebfebbaddf');
        const body = await response.json();

        
        // first check, if card number, ccv and date are not empty
        if (!(cardNumber && cardCCV && cardDate)) {
            setPaymentSuccess(false);
            return;
        }

        
        // iterate through the body and check if the card number is valid
        for (let i = 0; i < body.length; i++) {
            if (body[i].number === cardNumber && body[i].ccv === cardCCV && body[i].exp === cardDate) {
                setPaymentSuccess(true);
                return;
            }
        }

        setPaymentSuccess(false);
    };

    

    const checkCardNumber = (cardNumber: string) => {
        const cardNumberLength = cardNumber.length;

        if (cardNumberLength !== 16) {
            setCardType('');
        }

        if (cardNumberLength === 16) {
            if (cardNumber.startsWith('4')) {
                setCardType(visa);
            } else if (cardNumber.startsWith('5')) {
                setCardType(mastercard);
            } else {
                setCardType('');
            }
        }
        
        setCardNumber(cardNumber.replace(/[^0-9]/g, ''));
            
    }

    const setDate = (date : string | moment.Moment) => {
        // if type is moment
        if (date instanceof moment) {
            const newDate = moment(date);

            const year = newDate.year() - 2000;
            let month = (newDate.month() + 1).toString();

            // if month is less than 10, add a 0
            if (month.length === 1) {
                month = '0' + month;
            }

            setCardDate(`${month}/${year}`);
        }

    }

    return (
        <>
        <div className='center-div'>
            <form onSubmit={checkValidCard} className='inner-div'>
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
                        {/* value={new Date(year + "-" + month)} dateFormat="MM/YYYY" onChange={(date) => printDate(date)} */}
                            <Datetime dateFormat="MM/YYYY" timeFormat={false} onChange={(date) => setDate(date)}  />
                        </label>
                    </div>
                    <div className='input-form'>
                        <label >CCV:
                        <input 
                            type='text' 
                            name='card-ccv'
                            id='card-ccv'
                            placeholder='Enter CCV'
                            max={3}
                            pattern="[0-9]{3}"
                            maxLength={3}
                            value={cardCCV}
                            onChange={(e) => setCardCCV(e.target.value)}
                        />
                        </label>
                    </div>
                </div>
                <div className="wrap">
                    <button className="button">Submit</button>
                </div>
                {paymentSuccess && <div className='success-message'>Payment Successful</div>}
            </form>
        </div>
        </>
    )
    
}


export default CardLayout
