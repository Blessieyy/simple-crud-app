import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameBoard = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
        const startGame = async () => {
            const response = await axios.get('http://localhost:5000/api/start-game');
            setCards(response.data.board);
        };
        startGame();
    }, []);

    const handleCardClick = (index) => {
       if (flippedCards.length === 2 || matchedCards.includes(index)) return;
       const newFlippedCards = [...flippedCards, index]
       setFlippedCards(newFlippedCards)

       if(newFlippedCards.length === 2){
        const [firstIndex, secondIndex] = newFlippedCards
        if (cards[firstIndex]=== cards[secondIndex]){
            setMatchedCards([... matchedCards, firstIndex, secondIndex])
        }

        setTimeout(()=> setFlippedCards([]), 1000)
       }

    };

    return (
        <div>
<h1 className='header'>Memory Game</h1>
        <div className="grid grid-cols-6 gap-2">
            
            {cards.map((card, index) => (
                <Card
                    key={index}
                    card={card}
                    index={index}
                    isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
                    onClick={() => handleCardClick(index)}
                />
            ))}
        </div>
        </div>
    );
};

const Card = ({ card, index, isFlipped, onClick }) => (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
        {isFlipped ? card : "?"}
    </div>
);


export default GameBoard;