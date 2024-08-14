import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { deleteUser } from "./userSlice";


function Username() {

  const {username} = useSelector(store => store.user);
  const dispatch = useDispatch();

  if(!username) return null;

  function handleDeleteUser(){
    dispatch(deleteUser());
    localStorage.removeItem('username');
  }

  return <div className="ml-4 flex items-center gap-4">
    <p className="text-sm hidden md:block">{username}</p>
    <Button type="secondary" onClick={handleDeleteUser}>Logout</Button>
  </div>;
}

export default Username;
