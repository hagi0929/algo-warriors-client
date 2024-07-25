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

interface Props { }


const HomePage = (props: Props) => {

    return (
        <>
            <Navbar />
            <ResizablePanelGroup
                className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm "
                direction="horizontal"
            >
                <ResizablePanel minSize={30} className="col-span-3 ">
                    <ProblemCard />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={30} className="col-span-2">
                    <ContestCard/>
                </ResizablePanel>
            </ResizablePanelGroup>

        </>

    )
}

export default HomePage