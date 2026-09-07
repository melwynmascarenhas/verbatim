import { Link } from "react-router-dom";
import styles from "../css/switchpage.module.css";

export default function SwitchPage({ text, linkText, link }) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
      <Link to={link} className={styles.link}>
        {linkText}
      </Link>
    </div>
  );
}
