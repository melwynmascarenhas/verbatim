import { useRouteError, Link } from "react-router-dom";
import styles from "../css/errorpage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className={styles.container} id="error-page">
      <div className={styles.errorCard}>
        <h1 className={styles.errorTitle}>Oops!</h1>
        <p className={styles.errorMsg}>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message || "Page not found"}</i>
        </p>
        <Link to="/" className={styles.homeBtn}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

