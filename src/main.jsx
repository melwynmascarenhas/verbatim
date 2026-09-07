import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import AllQuotes, { allQuotesLoader } from "./pages/AllQuotes";
import Profile, { profileLoader } from "./pages/Profile";
import AddQuote, { addQuoteAction } from "./pages/AddQuote";
import Login, { loginAction } from "./pages/Login";
import Register, { registerAction } from "./pages/Register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IconContext } from "@phosphor-icons/react";

import { AuthContextProvider } from "./context/AuthContext";
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			// --- PUBLIC ROUTES (Landing Page & Quote Feed) ---
			{
				element: <PublicRoute />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: "all-quotes",
						element: <AllQuotes />,
						loader: allQuotesLoader,
					},
				],
			},

			// --- PROTECTED ROUTES (Requires Login) ---
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: "profile",
						element: <Profile />,
						loader: profileLoader,
					},
					{
						path: "add-quote",
						element: <AddQuote />,
						action: addQuoteAction,
					},
				],
			},

			// --- GUEST ONLY ROUTES (Redirects if Logged In) ---
			{
				element: <AuthRoute />,
				children: [
					{
						path: "login",
						element: <Login />,
						action: loginAction,
					},
					{
						path: "register",
						element: <Register />,
						action: registerAction,
					},
				],
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthContextProvider>
			<IconContext.Provider
				value={{
					color: "currentColor",
					size: "1.5em",
					weight: "light",
				}}
			>
				<RouterProvider router={router} />
			</IconContext.Provider>
		</AuthContextProvider>
	</StrictMode>,
);
