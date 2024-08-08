import CreateUser from "../features/user/CreateUser";

function Home() {
  return <div className="text-center my-10">
      <h1 className="mb-8 mt-4 text-xl md:text-3xl px-4 font-semibold text-stone-200">
        The best pizza
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
}

export default Home;
