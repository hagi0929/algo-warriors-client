import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Homepage";
import ProblemPage from "../pages/ProblemPage";
import ContestPage from "../pages/ContestPage";
import DiscussionPage from "../pages/DiscussionPage";
import LoginPage from "../pages/LoginPage"

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <LoginPage/>},
            {path: "home", element: <HomePage/>},
            {path: "problem/:problem_id", element: <ProblemPage/>},
            {path: "contest/:contest_id", element: <ContestPage/>},
            {path: "discussion/:discussionId", element: <DiscussionPage/>}
        ]
    }
])