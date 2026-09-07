import styles from "../css/input.module.css";

function Input({ id, type, placeholder, name }) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      className={styles.input}
    />
  );
}

function Textarea({ id, placeholder, name }) {
  return (
    <textarea
      id={id}
      type="text"
      name={name}
      placeholder={placeholder}
      className={styles.textarea}
    />
  );
}

export { Input, Textarea };
