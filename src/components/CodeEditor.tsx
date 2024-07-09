import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "./ui/card"

interface Props {}

const CodeEditor = (props: Props) => {
  return (
    <Card className='code-editor h-full'>
        <CardContent className='bg-slate-500 h-full flex flex-col'>
            <div className="text-white">This is a stand-in for our code editor</div>
        </CardContent>
    </Card>
  )
}

export default CodeEditor;