// import{React}
// import { Button } from './components/ui/button';

import { useQueryClient } from "@tanstack/react-query";
import ContestCard from "../components/ContestCard";
import ProblemCard from "../components/ProblemCard";
import { useProblems } from "../hooks/useProblems";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../components/ui/resizable"
import ContestProblemCard from "../components/ContestProblemCard";
import { Card } from "../components/ui/card";
import ContestDescr from "../components/ContestDescr";
import { useContests } from "../hooks/useContests";
import { AbstractProblem, ProblemFilterOptions } from "../models/Problem";
import { Contest } from "../models/Contest"

interface Props { }


const contests: Contest[] = [
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
                    <ContestCard contests={contests} />
                </ResizablePanel>
            </ResizablePanelGroup>

        </>

    )
}

export default HomePage