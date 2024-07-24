// import{React}
// import { Button } from './components/ui/button';

import ContestCard from "../components/ContestCard";
import ProblemCard from "../components/ProblemCard";
import { useProblems } from "../hooks/useProblems";

interface Props {}

interface Problem {
    id: number;
    title: string;
    description: string;
  }
  
  var problems: Problem[] = [
    // { id: 1, title: 'Problem 1', description: 'Description for Problem 1' },
    // { id: 2, title: 'Problem 2', description: 'Description for Problem 2' },
    // { id: 3, title: 'Problem 3', description: 'Description for Problem 3' },
    // { id: 4, title: 'Problem 4', description: 'Description for Problem 4' },
    // { id: 5, title: 'Problem 5', description: 'Description for Problem 5' },
    // { id: 6, title: 'Problem 6', description: 'Description for Problem 6' },
    // { id: 7, title: 'Problem 7', description: 'Description for Problem 7' },
    // { id: 8, title: 'Problem 8', description: 'Description for Problem 8' },
    // { id: 9, title: 'Problem 9', description: 'Description for Problem 9' },
    // { id: 10, title: 'Problem 10', description: 'Description for Problem 10' },
    // { id: 11, title: 'Problem 11', description: 'Description for Problem 11' },
    // { id: 12, title: 'Problem 12', description: 'Description for Problem 12' },
    // { id: 13, title: 'Problem 13', description: 'Description for Problem 13' },
    // { id: 14, title: 'Problem 14', description: 'Description for Problem 14' },
    // { id: 15, title: 'Problem 15', description: 'Description for Problem 15' },
    // { id: 16, title: 'Problem 16', description: 'Description for Problem 16' }
    ];

const contests: Problem[] = [
    { id: 1, title: 'Contest 1', description: 'Description for Contest 1' },
    { id: 2, title: 'Contest 2', description: 'Description for Contest 2' },
    { id: 3, title: 'Contest 3', description: 'Description for Contest 3' },
    { id: 4, title: 'Contest 4', description: 'Description for Contest 4' },
    { id: 5, title: 'Contest 5', description: 'Description for Contest 5' },
    { id: 6, title: 'Contest 6', description: 'Description for Contest 6' },
    { id: 7, title: 'Contest 7', description: 'Description for Contest 7' },
    { id: 8, title: 'Contest 8', description: 'Description for Contest 8' },
    { id: 9, title: 'Contest 9', description: 'Description for Contest 9' },
    { id: 10, title: 'Contest 10', description: 'Description for Contest 10' },
    { id: 11, title: 'Contest 11', description: 'Description for Contest 11' },
    { id: 12, title: 'Contest 12', description: 'Description for Contest 12' },
    { id: 13, title: 'Contest 13', description: 'Description for Contest 13' },
    { id: 14, title: 'Contest 14', description: 'Description for Contest 14' },
    { id: 15, title: 'Contest 15', description: 'Description for Contest 15' },
    { id: 16, title: 'Contest 16', description: 'Description for Contest 16' }
    ];

const HomePage = (props: Props) => {
    const { data: problems, error, isLoading } = useProblems();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading problems: {error.message}</div>;
    return (
        <div className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm">
            <div className="col-span-3">
                <ProblemCard problems={problems || []}/>
            </div>
            <div className="col-span-2">
                <ContestCard contests={contests}/>
            </div>
        </div>
    
    )
}

export default HomePage