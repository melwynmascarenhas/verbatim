import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "../css/all-quotes.module.css";
import { useLoaderData, Await, Link } from "react-router-dom";
import { Suspense, useState } from "react";
import QuoteCard from "../components/QuoteCard";
import { FunnelSimple, Quotes } from "@phosphor-icons/react";

export async function allQuotesLoader() {
	const quotesDataPromise = getDocs(collection(db, "quotes")).then(
		(querySnapshot) =>
			querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			})),
	);

	return { quotes: quotesDataPromise };
}

export default function AllQuotes() {
	const quoteLoaderData = useLoaderData();
	const [selectedCategory, setSelectedCategory] = useState("All");

	const categories = [
		"All",
		"Wisdom",
		"Humor",
		"Overheard",
		"Philosophy",
		"Life Advice",
		"Love & Friendship",
	];

	return (
		<main className={styles.main}>
			<header className={styles.header}>
				<div className={styles.titleRow}>
					<div>
						<h1 className={styles.title}>Quote Feed</h1>
						<p className={styles.subHeader}>
							Explore verbatim thoughts, everyday wisdom, and unscripted lines
						</p>
					</div>
					<Link to="/add-quote" className={styles.shareBtn}>
						Share Quote
					</Link>
				</div>

				<div className={styles.filterBar}>
					<span className={styles.filterLabel}>
						<FunnelSimple /> Filter:
					</span>
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setSelectedCategory(cat)}
							className={`${styles.filterPill} ${
								selectedCategory === cat ? styles.activeFilter : ""
							}`}
						>
							{cat}
						</button>
					))}
				</div>
			</header>

			<div className={styles.quotesGrid}>
				<Suspense
					fallback={
						<div className={styles.loadingState}>
							<p>Loading verbatim quotes...</p>
						</div>
					}
				>
					<Await resolve={quoteLoaderData.quotes}>
						{(quotes) => {
							if (!quotes || quotes.length === 0) {
								return (
									<div className={styles.emptyState}>
										<div className={styles.emptyCard}>
											<Quotes className={styles.emptyIcon} />
											<h3 className={styles.emptyTitle}>No quotes recorded yet</h3>
											<p className={styles.emptySubtext}>
												Be the first to share a quote you heard today!
											</p>
										</div>
									</div>
								);
							}

							const filteredQuotes =
								selectedCategory === "All"
									? quotes
									: quotes.filter((q) => {
											const c = (q.category || "").toLowerCase();
											return c.includes(selectedCategory.toLowerCase());
									  });

							if (filteredQuotes.length === 0) {
								return (
									<div className={styles.emptyState}>
										<div className={styles.emptyCard}>
											<h3 className={styles.emptyTitle}>No quotes found for "{selectedCategory}"</h3>
											<p className={styles.emptySubtext}>
												Try selecting another category filter above.
											</p>
										</div>
									</div>
								);
							}

							return filteredQuotes.map((quote) => {
								return (
									<QuoteCard
										key={quote.id}
										quote={quote.quote}
										speaker={quote.speaker}
										category={quote.category}
										title={quote.title}
										description={quote.description}
									/>
								);
							});
						}}
					</Await>
				</Suspense>
			</div>
		</main>
	);
}

