import { Input, Textarea } from "../components/Input";
import Heading from "../components/Heading";
import Button from "../components/Button";
import styles from "../css/add-quote.module.css";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

import {
	useOutletContext,
	Form,
	redirect,
	useActionData,
} from "react-router-dom";

export async function addQuoteAction({ request }) {
	const formData = await request.formData();
	const quote = formData.get("quote") || formData.get("title");
	const speaker = formData.get("speaker") || "Anonymous";
	const category = formData.get("category") || "Wisdom";
	const userId = formData.get("userId");

	if (!quote) {
		return { error: "Please enter the quote." };
	}

	try {
		await addDoc(collection(db, "quotes"), {
			quote,
			speaker,
			category,
			title: quote, // fallback for legacy compatibility
			description: speaker ? `— ${speaker}` : "",
			userId,
			createdAt: serverTimestamp(),
		});

		return redirect("/all-quotes");
	} catch (error) {
		return { error: error.message };
	}
}

export default function AddQuote() {
	const { user } = useOutletContext();
	const actionData = useActionData();

	return (
		<div className={styles.container}>
			<Heading
				headingText="Share a Quote"
				text="Preserve words spoken in real life"
			/>

			{actionData?.error && (
				<div className={styles.errorBanner}>
					{actionData.error}
				</div>
			)}

			<Form method="post" className={styles.formInputs}>
				<input type="hidden" name="userId" value={user.id} />

				<div className={styles.fieldGroup}>
					<label className={styles.label}>The Quote *</label>
					<Textarea
						id="quote"
						name="quote"
						placeholder='"You don&apos;t cross a river by staring at the water."'
						rows={4}
					/>
				</div>

				<div className={styles.fieldGroup}>
					<label className={styles.label}>Who Said It? *</label>
					<Input
						id="speaker"
						name="speaker"
						placeholder="e.g. An old carpenter in my hometown, NYC taxi driver, My grandmother"
					/>
				</div>

				<div className={styles.fieldGroup}>
					<label className={styles.label}>Category</label>
					<select
						name="category"
						id="category"
						className={styles.selectInput}
						defaultValue="Wisdom"
					>
						<option value="Wisdom">Wisdom</option>
						<option value="Humor">Humor</option>
						<option value="Overheard">Overheard</option>
						<option value="Life Advice">Life Advice</option>
						<option value="Philosophy">Philosophy</option>
						<option value="Love & Friendship">Love & Friendship</option>
					</select>
				</div>

				<Button text="Publish Quote" type="submit" />
			</Form>
		</div>
	);
}
