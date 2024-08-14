import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {

  const {username} = useSelector(store => store.user);

  return <div className="text-center my-10">
      <h1 className="mb-8 mt-4 text-xl md:text-3xl px-4 font-semibold text-stone-200">
        The best pizza
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ?<CreateUser /> : <Button to="/menu" type="primary">
        continue ordering, {username}
      </Button>}
    </div>
}

export default Home;
