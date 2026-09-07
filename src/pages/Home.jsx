import styles from "../css/home.module.css";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.badgeRow}>
          <span className={`${styles.pillBadge} ${styles.badgeCoral}`}>
            Verbatim
          </span>
          <span className={`${styles.pillBadge} ${styles.badgeLilac}`}>
            Unscripted Wisdom
          </span>
          <span className={`${styles.pillBadge} ${styles.badgeMint}`}>
            Real People, Real Words
          </span>
        </div>

        <h1 className={styles.heroTitle}>
          Preserving Everyday Quotes & Words.
        </h1>

        <p className={styles.heroSubtitle}>
          From coffee shop conversations to quiet words of wisdom, discover, collect, and share unscripted quotes before they are forgotten.
        </p>

        <div className={styles.heroActions}>
          <Link to="/all-quotes" className={styles.primaryBtn}>
            Explore Quote Feed <ArrowRight />
          </Link>
          <Link to="/add-quote" className={styles.secondaryBtn}>
            Share a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}

