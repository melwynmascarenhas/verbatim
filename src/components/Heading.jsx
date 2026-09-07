import styles from "../css/heading.module.css";
export default function Heading({ headingText, text }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{headingText}</h1>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
