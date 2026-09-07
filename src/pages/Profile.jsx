import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useLoaderData, useRevalidator, Await, useOutletContext, Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import QuoteCard from "../components/QuoteCard";
import styles from "../css/all-quotes.module.css";
import { Suspense } from "react";
import { User, NotePencil, Trash } from "@phosphor-icons/react";

export async function profileLoader() {
	await auth.authStateReady();
	const currentUser = auth.currentUser;

	if (!currentUser) {
		return [];
	}

	const q = query(
		collection(db, "quotes"),
		where("userId", "==", currentUser.uid),
	);

	const quotesDataPromise = getDocs(q).then((querySnapshot) =>
		querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		})),
	);

	return { quotes: quotesDataPromise };
}

export default function Profile() {
	const quoteLoaderData = useLoaderData();
	const { user } = useOutletContext() || {};

	const { revalidate } = useRevalidator();

	const handleDelete = async (quoteId) => {
		await deleteDoc(doc(db, "quotes", quoteId));
		revalidate();
	};

	return (
		<main className={styles.main}>
			<header className={styles.header}>
				<div className={styles.titleRow}>
					<div>
						<h1 className={styles.title}>
							{user?.username ? `${user.username}'s` : "My"} Preserved Quotes
						</h1>
						<p className={styles.subHeader}>
							Quotes and everyday words you have contributed to Verbatim.
						</p>
					</div>
					<Link to="/add-quote" className={styles.shareBtn}>
						Share Quote
					</Link>
				</div>
			</header>

			<div className={styles.quotesGrid}>
				<Suspense
					fallback={
						<div className={styles.loadingState}>
							<p>Loading your quotes collection...</p>
						</div>
					}
				>
					<Await resolve={quoteLoaderData.quotes}>
						{(quotes) => {
							if (!quotes || quotes.length === 0) {
								return (
									<div className={styles.emptyState}>
										<div className={styles.emptyCard}>
											<NotePencil className={styles.emptyIcon} />
											<h3 className={styles.emptyTitle}>No quotes preserved yet</h3>
											<p className={styles.emptySubtext}>
												Share a quote you heard recently to build your personal collection!
											</p>
										</div>
									</div>
								);
							}

							return quotes.map((quote) => {
								return (
									<QuoteCard
										key={quote.id}
										quote={quote.quote}
										speaker={quote.speaker}
										category={quote.category}
										title={quote.title}
										description={quote.description}
										onDelete={() => handleDelete(quote.id)}
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

