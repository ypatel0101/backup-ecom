import { useSelector, useDispatch } from 'react-redux';
import { setAllGames } from './../store/gamesSlice.js';
import { useEffect } from 'react';
import IndGameCard from './IndGameCard.jsx';

const AllGames = () => {

  const dispatch = useDispatch();
  const allGames = useSelector(state => state.games.allGames);
  const gameStateChange = useSelector(state => state.games.gameStateChange)

  useEffect(() => {
    const getAllGames = async () => {
      try{
        const response = await fetch("/api/v1/games");
        const games = await response.json();
        dispatch(setAllGames(games));
      } catch(err) {
        throw(err);
      }
    }
    getAllGames();
  }, [gameStateChange],);

  return (
    <>
      <div>
        {allGames.map((game) => {
          return <IndGameCard key={game.id} {...{game}} />
        })}
      </div>
    </>
  )
}

export default AllGames