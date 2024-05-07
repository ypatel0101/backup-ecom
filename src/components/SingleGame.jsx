import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSingleGame } from '../store/gamesSlice.js';
import BackButton from './BackButton.jsx';

const setStockMsg = (stock) => {
  if (stock >= 10) return 'In Stock: 10+';
  else return `In Stock: ${stock}`;
}

const setDate = (date) => {
  if (date) return date.slice(0, 10);
  else return date;
};

const SingleGame = () => {

  const singleGame = useSelector(state => state.games.singleGame);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const getSingleGame = async () => {
      try {
        const response = await fetch(`/api/v1/games/${id}`);
        const game = await response.json();
        dispatch(setSingleGame(game));
      } catch(err) {
        throw(err);
      }
    }
    getSingleGame();
    // cleanup function to clear singlegame state
    return (() => {dispatch(setSingleGame(null))})
  }, []);

  return (
    <>
      <div>
        <BackButton />
        <h1>{singleGame.name}</h1>
        <h3>Developer: {singleGame.developer}</h3>
        <h3>Publisher: {singleGame.publisher}</h3>
        <h3>Release Date: {setDate(singleGame.release_date)}</h3>
        <h3>Genre: {singleGame.genre}</h3>
        <h3>{setStockMsg(singleGame.stock)}</h3>
        <h2>{singleGame.is_videogame ? 'Video Game' : 'Board Game'}</h2>
        <h3>
          {singleGame.is_videogame ? 
            (
              singleGame.is_multiplayer ? 'Multiplayer Game' : 'Single Player Game'
            ) : (
              `Recommended Number of Players: ${singleGame.rec_players}` 
            )
          }
        </h3>
        <img 
          src={singleGame.img_url} 
          alt={`photo of the game box cover for ${singleGame.name}`} 
          style={{width: '500px'}}
        />
        <p>{singleGame.description}</p>
        <BackButton />
      </div>
    </>
  )
}

export default SingleGame