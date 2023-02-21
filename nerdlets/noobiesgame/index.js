import React, { useState, useEffect } from 'react';

const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const colors = [
  '#f94144',
  '#f8961e',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#577590',
  '#f3722c',
  '#f94144',
  '#f8961e',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#577590',
  '#f3722c',
  '#577590',
  '#f3722c',
];

const MemoryMatchGame = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const shuffled = symbols
      .concat(symbols)
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        color: colors[index],
        matched: false,
        revealed: false,
      }));
    setCards(shuffled);
  }, []);

  const handleCardClick = (card) => {
    if (card.revealed || card.matched) return;
    const revealedCards = cards.filter((c) => c.revealed && !c.matched);
    if (revealedCards.length === 1) {
      const revealedCard = revealedCards[0];
      if (revealedCard.symbol === card.symbol) {
        const newCards = cards.map((c) =>
          c.id === card.id || c.id === revealedCard.id
            ? { ...c, matched: true }
            : c
        );
        setCards(newCards);
      } else {
        const newCards = cards.map((c) =>
          c.id === card.id || c.id === revealedCard.id
            ? { ...c, revealed: false }
            : c
        );
        setCards(newCards);
      }
    } else {
      const newCards = cards.map((c) =>
        c.id === card.id ? { ...c, revealed: true } : c
      );
      setCards(newCards);
    }
  };

  const cardStyle = {
    width: '80px',
    height: '80px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '50px',
    cursor: 'pointer',
    border: '3px solid black',
    borderRadius: '5px',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => handleCardClick(card)}
          style={{
            ...cardStyle,
            backgroundColor: card.revealed || card.matched ? card.color : 'white',
            borderColor: card.revealed ? 'white' : 'black',
          }}
        >
          {card.revealed ? card.symbol : ''}
        </div>
      ))}
    </div>
  );
};

export default MemoryMatchGame;
