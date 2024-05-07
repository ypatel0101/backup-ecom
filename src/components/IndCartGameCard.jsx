import { Link } from 'react-router-dom';

const IndCartGameCard = ({cartGame}) => {
  return (
    <>
      <div>
        <img 
            src={cartGame.img_url} 
            alt={`photo of the game box cover for ${cartGame.name}`} 
            style={{width: '150px'}}
        />
        <h1>{cartGame.name}</h1>
        <h2>{`Quantity: ${cartGame.quantity}`}</h2>
        <h2>{`Price: $${cartGame.price / 100} x ${cartGame.quantity} : $${cartGame.price * cartGame.quantity / 100}`}</h2>
        <Link to={`/games/${cartGame.id}`}>
          {`View Game Details`}
        </Link>
      </div>
    </>
  )
}

export default IndCartGameCard