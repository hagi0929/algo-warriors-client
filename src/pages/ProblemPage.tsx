import React from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor'
import ProblemTabs from '../components/ProblemTabs'

interface Props {}

const ProblemPage = (props: Props) => {
  const { problem_id } = useParams<{ problem_id: string }>()

  return (
    <div className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm h-screen">
      <div className="col-span-3 h-full">
        <CodeEditor problemId={problem_id as string} />
      </div>
      <div className="col-span-2">
        <ProblemTabs problemId={problem_id as string} />
      </div>
    </div>
  )
}

export default ProblemPage
