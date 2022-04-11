import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import { useState } from "react";

function App() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const [user, setUser] = useState({});
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFbLogin = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .then((error) => {
        console.error(error);
      });
  };
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      });
  };
  return (
    <div className="App">
      <h1>Google Popup Sign In!</h1>
      {user.uid ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button onClick={handleSignIn}>Google Sign In</button>
          <button onClick={handleFbLogin}>FaceBook Login</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </>
      )}
      <h2>Name: {user.displayName}</h2>
      <h3>Email: {user.email}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
