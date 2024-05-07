import { useSelector, useDispatch } from 'react-redux';
import { setAllUsers } from './../store/usersSlice.js';
import { useEffect } from 'react';
import IndUserCard from './IndUserCard.jsx';
import BackButton from './BackButton.jsx';

const AllUsers = () => {

  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.users.allUsers);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {

    const getAllUsers = async () => {
      try {
        const response = await fetch("/api/v1/users", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        const users = await response.json();
        dispatch(setAllUsers(users));
      } catch(err) {
        throw(err);
      }
    }
    getAllUsers();
  }, [],);

  return (
    <>
      <div>
        <BackButton />
        {allUsers.map((user) => {
          return <IndUserCard key={user.id} {...{user}} />
        })}
        <BackButton />
      </div>
    </>
  )
}

export default AllUsers