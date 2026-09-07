import { Input } from "../components/Input";
import Heading from "../components/Heading";
import Button from "../components/Button";
import SwitchPage from "../components/SwitchPage";

import styles from "../css/register.module.css";

import { db, auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { useActionData, Form, Link } from "react-router-dom";

export async function registerAction({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!username || !email || !password) {
    return { error: "Please fill out all the fields." };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      username: username,
      email: email,
      createdAt: serverTimestamp(),
    });
    
    return null;
  } catch (error) {
    return { error: error.message };
  }
}

export default function Register() {
  const actionData = useActionData();
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <Link to="/all-quotes" className={styles.backLink}>
          ← Go to Quote Feed
        </Link>
        <Form method="post" className={styles.form}>
          <Heading
            headingText="Join Verbatim"
            text="Start preserving real-life wisdom and everyday quotes"
          />
          {actionData?.error && (
            <div className={styles.errorBanner}>
              {actionData.error}
            </div>
          )}

          <div className={styles.formInputs}>
            <Input type="text" placeholder="Name" name="username" />
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
          </div>
          <SwitchPage
            text="Already have an account?"
            linkText="Login"
            link="/login"
          />
          <Button type="submit" text="Register" />
        </Form>
      </div>
    </div>
  );
}
