import styles from "../css/logoutmodal.module.css";
import { User } from "@phosphor-icons/react";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LogoutModal() {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
    alert("Logged out successfully!");
  };

  return (
    <div className={styles.container}>
      <User />
      <div className={styles.rightContainer}>
        <Link to={`/profile/${user.id}`}>{user.username}</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
