import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeMessage from './welcomeMessage';
import GamePage from './gamePage';
import { useState, useEffect } from 'react';
import StateCapitals from './stateCapitals';
import FlagGame from './flagGame';
import Login from './login';
import Axios from 'axios';


function App() {
  const [playGame, setPlayGame] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [scoreFetched, setScoreFetched] = useState(false);
  const [scoreUpdated, setScoreUpdated] = useState(false);
  const [topUsers, setTopUsers] = useState([]);
  const [topUsersFetched, setTopUsersFetched] = useState(false);

  useEffect(() => {
    renderGame();
  }, [playGame]);

  function renderGame() {
    if (playGame) {
      return <GamePage setPlayGame={setPlayGame} username={username} setScoreUpdated={setScoreUpdated}/>
    } else {
      return <WelcomeMessage setPlayGame={setPlayGame} />
    }
  }

  async function fetchUserInfo() {
    const userScore = await Axios.get("http://localhost:9000/getscore", {
      params: {
        username: username
      }
    });

    setUserScore(userScore.data);
    setScoreUpdated(false);
  }

  useEffect(() => {
    if (authenticated) {
      fetchUserInfo();
      fetchTopUsers();
    }
  }, [authenticated, scoreUpdated]);

  useEffect(() => {
    setScoreFetched(true);
  }, [userScore]);

  function displayUserInfo() {
    return (
      <div>
        <h1>Welcome {username}!</h1>
        <h2>Your current score is: {userScore}</h2>
        <h2>Keep playing to increase!</h2>
        <button type="button" class="btn btn-primary btn-lg" onClick={() => logout()}>Log Out</button>
      </div>
    )
  }

  function logout() {
    setUsername(null);
    setAuthenticated(false);
  }

  async function fetchTopUsers() {
    const topUsers = await Axios.get("http://localhost:9000/gettopusers")
    setTopUsers(topUsers.data);
  }

  function displayTopUsers() {
    if (authenticated) {
      return topUsers.map((user, index) => {
        return (
        <tr key={index}>
          <th scope="row">{index+1}</th>
          <td>{user.username}</td>
          <td>{user.score}</td>
        </tr>
        )
      })
    }
  }

  useEffect(() => {
    setTopUsersFetched(true);
  }, [topUsers])

  function renderHomePage() {
    return (
      <div>
        <div>
          <div class="user-info-page d-flex justify-content-center align-items-center">
            {scoreFetched ? displayUserInfo() : null}
          </div>
          <div class="game-page d-flex justify-content-center align-items-center">
            <div>{renderGame()}</div>
          </div>
        </div>
        <div class="state-capitals-game-page d-flex justify-content-center align-items-center">
          <StateCapitals username={username} setScoreUpdated={setScoreUpdated}/>
        </div>
        <div class="country-flag-game-page d-flex justify-content-center align-items-center">
          <FlagGame username={username} setScoreUpdated={setScoreUpdated}/>
        </div>
        <div class="top-users-page">
          <div class="table-container">
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {topUsersFetched ? displayTopUsers() : null}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    )
  }

  function displayLogin() {
    return (
      <Login setAuthenticated={setAuthenticated} setUsername={setUsername} />
    )
  }


  return (
    <div>
      {authenticated ? renderHomePage() : displayLogin()}
    </div>
  );
}

export default App;
