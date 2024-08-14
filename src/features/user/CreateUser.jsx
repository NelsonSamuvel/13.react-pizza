import { useState } from "react";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if(!username) return;
    dispatch(updateName(username));
    localStorage.setItem('username',username);
    navigate("/menu");
    setUsername("");
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <p className="text-sm text-stone-300 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-6 input w-64 text-stone-800 sm:w-72"
      />

      {username !== "" && (
        <div className="mt-6 sm:mt-8">
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
