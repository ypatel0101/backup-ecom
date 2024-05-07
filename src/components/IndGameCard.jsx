import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setGameStateChange } from '../store/gamesSlice.js';

const IndGameCard = ({game}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userRole } = useSelector(state => state.auth)
  const deleteHandler = async () => {
    try{
      // TODO: write error handling for a game not deleting
      await fetch(`/api/v1/games/${game.id}`, {
        method:"DELETE",
        headers: {"Authorization": `Bearer ${token}`}})
      dispatch(setGameStateChange());
    }catch(e){
      throw e;
    }
  };

  return (
    <>
      <div>
        <img 
          src={game.img_url} 
          alt={`photo of the game box cover for ${game.name}`} 
          style={{width: '300px'}}
        />
        <h1>{game.name}</h1>
        <h3>{game.is_videogame ? "Video Game" : "Board Game"}</h3>
        <h2>{`Price: $${game.price / 100}`}</h2>
        <Link to={`/games/${game.id}`}>
          <button>
            View Additional Details
          </button>
        </Link>
      </div>
      {userRole === 'admin' && 
        <div> 
          <button onClick={deleteHandler}>Delete</button> 
          <Link to={`/admingames/${game.id}`}><button>Edit</button></Link>
        </div>
      }
    </>
  )
}

export default IndGameCard;