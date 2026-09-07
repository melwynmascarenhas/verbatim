import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../css/register.module.css";
import Heading from "../components/Heading";
import { Input } from "../components/Input";
import Button from "../components/Button";
import SwitchPage from "../components/SwitchPage";
import { Form, redirect, useActionData, useLocation, Link } from "react-router-dom";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/all-quotes";

  if (!email || !password) {
    return { error: "Please fill out all the fields." };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return redirect(redirectTo);
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
}

export default function Login() {
  const location = useLocation();
  const errorMessage = location.state?.message;

  const actionData = useActionData();

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <Link to="/all-quotes" className={styles.backLink}>
          ← Go to Quote Feed
        </Link>
        <Form method="post" className={styles.form}>
          <Heading
            headingText="Welcome Back to Verbatim"
            text="Sign in to share and explore real-world quotes"
          />
          {actionData?.error && (
            <div className={styles.errorBanner}>
              {actionData.error}
            </div>
          )}

          <div className={styles.formInputs}>
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
          </div>
          <SwitchPage
            text="Don't have an account?"
            linkText="Register"
            link="/register"
          />
          <Button text="Sign In" type="submit" />

          {errorMessage && <div className={styles.alertBox}>{errorMessage}</div>}
        </Form>
      </div>
    </div>
  );
}
