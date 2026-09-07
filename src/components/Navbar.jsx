import { NavLink, useNavigate } from "react-router-dom";
import styles from "../css/navbar.module.css";

import { Quotes } from "@phosphor-icons/react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const handleLogout = () => {
		navigate("/login");
		signOut(auth);
	};

	return (
		<nav className={styles.nav}>
			{/* Left: Logo */}
			<NavLink to="/" className={styles.logo}>
				<span className={styles.logoIconBadge}>
					<Quotes className={styles.logoAccent} />
				</span>
				Verbatim
			</NavLink>

			{/* Center: Main Navigation Links */}
			<div className={styles.centerLinks}>
				<NavLink
					to="/all-quotes"
					className={({ isActive }) =>
						`${styles.navItem} ${isActive ? styles.active : ""}`
					}
				>
					Quote Feed
				</NavLink>
				{user && (
					<>
						<NavLink
							to="/profile"
							className={({ isActive }) =>
								`${styles.navItem} ${isActive ? styles.active : ""}`
							}
						>
							My Quotes
						</NavLink>
						<NavLink
							to="/add-quote"
							className={({ isActive }) =>
								`${styles.navItem} ${isActive ? styles.active : ""}`
							}
						>
							Share Quote
						</NavLink>
					</>
				)}
			</div>

			{/* Right: User Actions / Auth Links */}
			<div className={styles.userActions}>
				{user ? (
					<>
						<Link to={`/profile`} className={styles.username}>
							{user.username}
						</Link>
						<button onClick={handleLogout} className={styles.logout}>
							Logout
						</button>
					</>
				) : (
					<>
						<NavLink
							to="/login"
							className={({ isActive }) =>
								`${styles.navItem} ${isActive ? styles.active : ""}`
							}
						>
							Login
						</NavLink>
						<NavLink
							to="/register"
							className={({ isActive }) =>
								`${styles.navItem} ${isActive ? styles.active : ""}`
							}
						>
							Register
						</NavLink>
					</>
				)}
			</div>
		</nav>
	);
}
