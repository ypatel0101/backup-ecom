const IndUserCard = ({user}) => {
  return (
    <>
      <div>
        <h1>{`Name: ${user.first_name} ${user.last_name}`}</h1>
        <h3>{`Email: ${user.email}`}</h3>
        <h3>{user.is_admin ? 'Is Admin' : 'Not an Admin'}</h3>
      </div>
    </>
  )
}

export default IndUserCard