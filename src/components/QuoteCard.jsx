import styles from "../css/quote-card.module.css";
import { Quotes } from "@phosphor-icons/react";

function cleanCategoryName(cat) {
  if (!cat) return "Wisdom";
  return cat.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim() || cat;
}

const THEMES = [
  styles.themeLilac,
  styles.themeMint,
  styles.themePink,
  styles.themeOrange,
  styles.themeYellow,
  styles.themeCoral,
];

function getThemeClass(str) {
  if (!str) return THEMES[0];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % THEMES.length;
  return THEMES[index];
}

export default function QuoteCard({
	quote,
	speaker,
	category,
	title,
	description,
	onDelete,
}) {
	const displayQuote = quote || title;
	const displaySpeaker =
		speaker ||
		(description && description.startsWith("— ")
			? description.substring(2)
			: description);

	const themeClass = getThemeClass(displayQuote + (category || ""));

	return (
		<div className={`${styles.quoteCard} ${themeClass}`}>
			<div className={styles.cardHeader}>
				<span className={styles.categoryBadge}>
					{cleanCategoryName(category)}
				</span>
				<Quotes className={styles.quoteIcon} />
			</div>

			<div className={styles.quoteBody}>
				<p className={styles.quoteText}>"{displayQuote}"</p>
			</div>

			{displaySpeaker && (
				<div className={styles.speakerLine}>
					<span className={styles.dash}>—</span>
					<span className={styles.speakerName}>{displaySpeaker}</span>
				</div>
			)}

			{onDelete && (
				<div className={styles.cardFooter}>
					<button onClick={onDelete} className={styles.deleteBtn}>
						Delete Quote
					</button>
				</div>
			)}
		</div>
	);
}
