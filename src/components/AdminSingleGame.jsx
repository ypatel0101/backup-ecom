import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSingleGame, setEditedGame, setErrorMessage } from '../store/gamesSlice.js';
import BackButton from './BackButton.jsx';

// I must apologize for this component.. never code when super tired haha...
// There's a bit of repeating in the jsx return of this component; I figure get
// it working first and then refactor later. 

const AdminSingleGame = () => {

  const { singleGame, editedGame, errorMessage } = useSelector(state => state.games);
  const token = useSelector(state => state.auth.token);
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
    return (() => {
      dispatch(setSingleGame({}))
      // might be a bit redundant for us to set singleGame and editedGame; tbh I forgot my reasoning for this
      dispatch(setEditedGame({}))
    })
  }, []);

  useEffect(() => {
    if (Object.keys(singleGame).length) {
      // prisma automatically sets date format to datetime as opposed to date.. just removing the "time" part with this slice
      dispatch(setEditedGame({...singleGame, release_date: singleGame.release_date.slice(0,10)}))
    }
  }, [singleGame])

  // currently, this fetch requests results in an http 400 message. Haven't had a chance to debug it yet, so the form currently 
  // does not submit.
  const handleGameEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/v1/games/${id}`, {
        method: "PUT",
        headers: {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(editedGame)
        }
      })
      const json = await response.json();
      // TODO: finish debugging this function and its backend routes
    } catch(err) {
      dispatch(setErrorMessage('Network error. Please try again later.'))
    }
  }
  return (
    <>
      {/* For all the radio buttons below; having a small issue where they are not showing a value upon page load. */}
      {/* TODO: debug this. */}
      <div>
        <BackButton />
        {errorMessage && <h2>{errorMessage}</h2>}
        {Object.keys(editedGame).length &&
          <form onSubmit = { handleGameEdit }>
            <label>
              Game Name:
              <input 
                type="text" 
                value={editedGame.name} 
                onChange={(e) => {
                  const valueChange = { name: e.target.value }
                  dispatch(setEditedGame({...editedGame, ...valueChange}))
                }}
                required
              />
            </label>
            <label>
              Developer: 
              <input 
                type="text" 
                value={editedGame.developer} 
                onChange={(e) => {
                  const valueChange = { developer: e.target.value }
                  dispatch(setEditedGame({...editedGame, ...valueChange}))
                }}
                required
              />
            </label>
            <label>
              Publisher:
              <input 
                type="text" 
                value={editedGame.publisher} 
                onChange={(e) => {
                  const valueChange = { publisher: e.target.value }
                  dispatch(setEditedGame({...editedGame, ...valueChange}))
                }}
                required
              />
            </label>
            <label>
              Date:
              <input 
                type="date" 
                value={editedGame.release_date} 
                onChange={(e) => {
                  const valueChange = { release_date: e.target.value }
                  dispatch(setEditedGame({...editedGame, ...valueChange}))
                }}
                required
              />
            </label>
            <label>
              Price: $
              <input 
                type="number"
                value={editedGame.price / 100} 
                onChange={(e) => {
                  const valueChange = { price : e.target.value * 100}
                  dispatch(setEditedGame({...editedGame, ...valueChange}))
                }}
                required
              />
            </label>
            <label>
              Genre:
              <input 
                type="text"
                value={editedGame.genre} 
                onChange={(e) => {
                  const valueChange = { genre : e.target.value}
                  dispatch(setEditedGame({...editedGame, ...valueChange}))
                }}
                required
              />
            </label>
            <label>
              In Stock:
              <input 
                type="number"
                value={editedGame.stock} 
                onChange={(e) => {
                  const valueChange = { stock : e.target.value}
                  dispatch(setEditedGame({...editedGame, ...valueChange}))
                }}
                required
              />
            </label>
            <h3>Type of Game:</h3>
            <label>
              Video Game
              <input 
                name="gameType"
                type="radio"
                value={editedGame.is_videogame} 
                onChange={(e) => {
                  if (e.target.value) {
                    const valueChange = { is_videogame : true }
                    dispatch(setEditedGame({...editedGame, ...valueChange}))
                  }
                }}
              />
            </label>
            <label>
              Board Game
              <input 
                name="gameType"
                type="radio"
                value={!editedGame.is_videogame} 
                onChange={(e) => {
                  if (e.target.value) {
                    const valueChange = { is_videogame : false }
                    dispatch(setEditedGame({...editedGame, ...valueChange}))
                  }
                }}
              />
            </label>
            {editedGame.is_videogame ? 
              ( 
                <>
                  <h4>Is Multiplayer?</h4>
                  <label>
                    Yes
                    <input 
                      name="multiplayerType"
                      type="radio"
                      value={editedGame.is_multiplayer} 
                      onChange={(e) => {
                        if (e.target.value) {
                          const valueChange = { is_multiplayer : true }
                          dispatch(setEditedGame({...editedGame, ...valueChange}))
                        }
                      }}
                    />
                  </label>
                  <label>
                    No
                    <input 
                      name="multiplayerType"
                      type="radio"
                      value={!editedGame.is_multiplayer} 
                      onChange={(e) => {
                        if (e.target.value) {
                          const valueChange = { is_multiplayer : false }
                          dispatch(setEditedGame({...editedGame, ...valueChange}))
                        }
                      }}
                    />
                  </label>
                </>
              ) : ( 
                <label>
                Recommended Number of Players: 
                <input 
                  type="number"
                  value={editedGame.rec_players} 
                  onChange={(e) => {
                    const valueChange = { rec_players : e.target.value}
                    dispatch(setEditedGame({...editedGame, ...valueChange}))
                  }}
                  required
                />
              </label>
              )
            }
            <label>
              Image URL:
              <input 
                type="text"
                value={editedGame.img_url} 
                onChange={(e) => {
                  const valueChange = { img_url : e.target.value}
                  dispatch(setEditedGame({...editedGame, ...valueChange}))
                }}
                required
              />
            </label>
            <label>
              Description:
              <input 
                type="textarea"
                value={editedGame.description} 
                onChange={(e) => {
                  const valueChange = { description : e.target.value}
                  dispatch(setEditedGame({...editedGame, ...valueChange}))
                }}
                required
              />
            </label>
            <button type="submit">Submit Changes</button>
          </form>
        }
      </div>
    </>
  )
}

export default AdminSingleGame