import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Homepage";
import ProblemPage from "../pages/ProblemPage";
import ContestPage from "../pages/ContestPage";
import DiscussionPage from "../pages/DiscussionPage";
import ResourcesPage from "../pages/ResourcesPage";

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage/>},
            {path: "problem/:problem_id", element: <ProblemPage/>},
            {path: "contest/:contest_id", element: <ContestPage/>},
            {path: "discussion/:discussion_id", element: <DiscussionPage/>},
            {path: "resources", element: <ResourcesPage/>}
        ]
    }
])