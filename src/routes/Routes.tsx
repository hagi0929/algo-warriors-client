import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Homepage";
import ProblemPage from "../pages/ProblemPage";
import ContestPage from "../pages/ContestPage";
import DiscussionPage from "../pages/DiscussionPage";
import LoginPage from "../pages/LoginPage"
import ResourcesPage from "../pages/ResourcesPage";
import ResultsPage from "../pages/ResultsPage";
import ContestFormPage from "../pages/ContestFormPage";

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <LoginPage/>},
            {path: "home", element: <HomePage/>},
            {path: "problem/:problem_id", element: <ProblemPage/>},
            {path: "contest/:contest_id", element: <ContestPage/>},
            {path: "discussion/:discussionId", element: <DiscussionPage/>},
            {path: "resources", element: <ResourcesPage/>},
            { path: "results", element: <ResultsPage /> },
            {path: "add-contest", element: <ContestFormPage/>}
        ]
    }
])