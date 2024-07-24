import { Card } from '../components/ui/card';
import ContestDescr from '../components/ContestDescr';
import ContestProblemCard from '../components/ContestProblemCard';
import Navbar from '../components/Navbar';

interface Props {}

interface Problem {
  id: number;
  title: string;
  description: string;
}

const problems: Problem[] = [
{ id: 1, title: 'Problem 1', description: 'Description for Problem 1' },
{ id: 2, title: 'Problem 2', description: 'Description for Problem 2' },
{ id: 3, title: 'Problem 3', description: 'Description for Problem 3' },
{ id: 4, title: 'Problem 4', description: 'Description for Problem 4' },
{ id: 5, title: 'Problem 5', description: 'Description for Problem 5' },
{ id: 6, title: 'Problem 6', description: 'Description for Problem 6' },
{ id: 7, title: 'Problem 7', description: 'Description for Problem 7' },
{ id: 8, title: 'Problem 8', description: 'Description for Problem 8' },
{ id: 9, title: 'Problem 9', description: 'Description for Problem 9' },
{ id: 10, title: 'Problem 10', description: 'Description for Problem 10' },
{ id: 11, title: 'Problem 11', description: 'Description for Problem 11' },
{ id: 12, title: 'Problem 12', description: 'Description for Problem 12' },
{ id: 13, title: 'Problem 13', description: 'Description for Problem 13' },
{ id: 14, title: 'Problem 14', description: 'Description for Problem 14' },
{ id: 15, title: 'Problem 15', description: 'Description for Problem 15' },
{ id: 16, title: 'Problem 16', description: 'Description for Problem 16' }
];

const ContestPage = (props: Props) => {
  return (
    <>
      <Navbar/>
      <div className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm">
          <div className="col-span-3">
              <ContestProblemCard problems={problems}/>
          </div>
          <div className="col-span-2">
            <Card className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="flex-1 py-2 px-4 text-center text-lg font-bold">
                    {'Description'}
                </div>
            </Card>
            <ContestDescr/>
          </div>
      </div>
    </>
  )
}

export default ContestPage