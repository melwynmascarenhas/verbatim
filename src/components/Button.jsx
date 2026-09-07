import styles from "../css/button.module.css";

export default function Button({ text, onClick, type = "button" }) {
  return (
    <button type={type} className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
}
