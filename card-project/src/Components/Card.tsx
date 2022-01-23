
const front = '/card_front.jpg';
const back = '/card_back.jpg';

console.log(process.env.PUBLIC_URL)

const Card = () => {
    return (
        <>
        <img src={front} alt='card' />
            <h1>Hi</h1>
        </>
    )
}

export default Card
