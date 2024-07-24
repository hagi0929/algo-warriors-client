import { Card } from '../components/ui/card';
import ContestDescr from '../components/ContestDescr';
import ContestProblemCard from '../components/ContestProblemCard';
import Navbar from '../components/Navbar';
import { useProblems } from "../hooks/useProblems";
import ContestScores from '../components/ContestScores';

interface Props {}

const ContestPage = (props: Props) => {
  const { data: problems, error, isLoading } = useProblems();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading results: {error.message}</div>;
    
  const problemsArray = Array.isArray(problems) ? problems : [];

  return (
    <>
      <Navbar/>
      <div className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm">
          <div className="col-span-3">
              <ContestProblemCard problems={problemsArray}/>
          </div>
          <div className="col-span-2">
            <Card className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="flex-1 py-2 px-4 text-center text-lg font-bold">
                    {'Description'}
                </div>
            </Card>
            <ContestDescr/>
            <ContestScores/>
          </div>
      </div>
    </>
  )
}

export default ContestPage