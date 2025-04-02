import { Card } from '../components/ui/card';
import ContestDescr from '../components/ContestDescr';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import ContestScores from '../components/ContestScores';
import { useContestDescription } from '../hooks/useContestDescription';
import { useContestParticipants } from '../hooks/useContestParticipants';
import { ContestUser } from '../api/contestApi';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable';
import ProblemCard from '../components/ProblemCard';

const ContestPage = () => {
  const { contest_id } = useParams<{ contest_id: string }>();
  const contestIdNumber = Number(contest_id);

  const { data: descriptionInfo } = useContestDescription(contestIdNumber);

  const { data: participants } = useContestParticipants(contestIdNumber);

  const participantsArray: ContestUser[] = Array.isArray(participants) ? participants : [];

  return (
    <>
      <Navbar />
      <ResizablePanelGroup
        className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm"
        direction="horizontal"
      >
        <ResizablePanel minSize={30} className="col-span-3">
          <ProblemCard />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30} className="col-span-2">
          <Card className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="flex-1 py-2 px-4 text-center text-lg font-bold">
              {'Description'}
            </div>
          </Card>
          <ContestDescr description={descriptionInfo || ''} />
          <ContestScores scores={participantsArray} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default ContestPage

