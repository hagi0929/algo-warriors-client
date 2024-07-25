import { Card } from '../components/ui/card';
import ContestDescr from '../components/ContestDescr';
import ContestProblemCard from '../components/ContestProblemCard';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import ContestScores from '../components/ContestScores';
import { ContestProblem, Contest } from '../models/Contest';
import { useContestProblems } from '../hooks/useContestProblems';
import { useContestDescription } from '../hooks/useContestDescription';
import { useContestParticipants } from '../hooks/useContestParticipants';
import { ContestUser } from '../api/contestApi';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable';
import ProblemCard from '../components/ProblemCard';

interface Props { }

const ContestPage = (props: Props) => {
  const { contest_id } = useParams<{ contest_id: string }>();
  const contestIdNumber = Number(contest_id);

  // Fetching contest problems
  const { data: problems, error: problemsError, isLoading: problemsLoading } = useContestProblems(contestIdNumber);

  // Fetching contest description
  const { data: descriptionInfo, error: descriptionError, isLoading: descriptionLoading } = useContestDescription(contestIdNumber);

  // Fetching contest participants and their scores
  const { data: participants, error: participantsError, isLoading: participantsLoading } = useContestParticipants(contestIdNumber);

  // Combine loading states
  const isLoading = problemsLoading || descriptionLoading || participantsLoading;

  // Combine error states
  const error = problemsError || descriptionError || participantsError;

  // Create arrays if data is available
  const problemsArray: ContestProblem[] = Array.isArray(problems) ? problems : [];
  const participantsArray: ContestUser[] = Array.isArray(participants) ? participants : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

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

