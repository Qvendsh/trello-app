import './App.css';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { fetchLists } from './redux/slices/listsSlice';
import { createCard, deleteCard, fetchCards, moveCard } from './redux/slices/cardsSlice';

interface ICard {
  id: string;
  description: string;
  listId: string;
}

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector((state: RootState) => state.lists.lists);
  const cards = useSelector((state: RootState) => state.cards.cards);

  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [currentList, setCurrentList] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  useEffect(() => {
    if (lists.length > 0) {
      lists.forEach((list) => dispatch(fetchCards(list._id)));
    }
  }, [lists, dispatch]);

  const handleAddCard = (listId: string) => {
    const description = prompt('Enter card description') || '';
    dispatch(createCard({ listId, description }));
  };

  const handleDeleteCard = (cardId: string) => {
    dispatch(deleteCard(cardId));
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, listId: string, card: ICard) => {
    setCurrentCard(card);
    setCurrentList(listId);
    e.dataTransfer.effectAllowed = "move"
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, targetListId: string) => {
    e.preventDefault();
    if (!currentCard || !currentList || currentCard.listId === targetListId) return;

    dispatch(moveCard({ cardId: currentCard.id, targetListId }));

    setCurrentCard(null);
    setCurrentList(null);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
      <div className='block'>
        {lists.map((list) => (
            <div key={list._id} className='list'>
              <h2>{list.name}</h2>
              <div onClick={() => handleAddCard(list._id)} className='add-button'>+</div>
              <div className='cards'
                   onDrop={(e) => dropHandler(e, list._id)}
                   onDragOver={dragOverHandler}>
                {cards
                    .filter((card) => card.listId === list._id)
                    .map((card) => (
                        <div
                            key={card.id}
                            draggable={true}
                            onDragStart={(e) => dragStartHandler(e, list._id, card)}
                            className='card'>
                          <div>{card.description}</div>
                          <div onClick={() => handleDeleteCard(card.id)} className='delete-button'>Delete</div>
                        </div>
                    ))}
              </div>
            </div>
        ))}
      </div>
  );
};

export default App;
