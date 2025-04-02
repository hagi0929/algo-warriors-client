import { useParams } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor'
import ProblemTabs from '../components/ProblemTabs'
import Navbar from '../components/Navbar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable';


const ProblemPage = () => {
  const { problem_id } = useParams<{ problem_id: string }>();
  return (
    <>
      <Navbar />
      <ResizablePanelGroup
        className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm h-screen"
        direction="horizontal"
      >
        <ResizablePanel minSize={30} className="col-span-3 h-screen">
          <CodeEditor problemId={Number(problem_id)} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30} className="col-span-2">
          <ProblemTabs problemId={Number(problem_id)} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default ProblemPage
