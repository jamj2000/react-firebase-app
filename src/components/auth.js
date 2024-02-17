import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Auth">
      {
        !auth.currentUser

          ? <div>
            <input
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password..."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>

            <button onClick={loginGoogle}>Login con Google</button>
          </div>

          : <div>{auth.currentUser.displayName} / {auth.currentUser.email}
            <button onClick={logout}>  Logout </button>
          </div>
      }
    </div>
  );
};
