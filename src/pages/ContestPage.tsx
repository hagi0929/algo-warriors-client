import { Card } from '../components/ui/card';
import ContestDescr from '../components/ContestDescr';
import ContestProblemCard from '../components/ContestProblemCard';
import Navbar from '../components/Navbar';
import { useProblems } from "../hooks/useProblems";
import ContestScores from '../components/ContestScores';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable';
import ProblemCard from '../components/ProblemCard';

interface Props { }

const ContestPage = (props: Props) => {

  return (
    <>
      <Navbar />
      <ResizablePanelGroup
        className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm"
        direction="horizontal"
      >
        <ResizablePanel minSize={30} className="col-span-3">
          <ProblemCard/>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30} className="col-span-2">
          <Card className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="flex-1 py-2 px-4 text-center text-lg font-bold">
              {'Description'}
            </div>
          </Card>
          <ContestDescr />
          <ContestScores />
        </ResizablePanel>
      </ResizablePanelGroup>

    </>
  )
}

export default ContestPage