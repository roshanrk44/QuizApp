import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="container-home">
      <div className="home">
        <p>Welcome to the Quiz Platform</p>
      </div>
      <div className="home">
        <p>Please select an option to get started:</p>
      </div>
      <div className="home-a">
        <Link to="/create-quiz">
          <button>Create a Quiz</button>
        </Link>
        <Link to="/take-quiz">
          <button>Take a Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
