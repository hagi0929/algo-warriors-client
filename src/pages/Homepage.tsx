import ContestCard from "../components/ContestCard";
import ProblemCard from "../components/ProblemCard";
import Navbar from '../components/Navbar';
import { useProblems } from "../hooks/useProblems";

const HomePage = () => {

    const { data: problems, error, isLoading } = useProblems();
    

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading results: {error.message}</div>;
    
    const problemsArray = Array.isArray(problems) ? problems : [];

    return (
        <>
        <Navbar />
        <div className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm">
            <div className="col-span-3">
                <ProblemCard problems={problemsArray}/>
            </div>
            <div className="col-span-2">
                <ContestCard />
            </div>
        </div>
        </>
    )
}

export default HomePage