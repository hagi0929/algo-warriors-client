import { useState } from "react"
// import { Button } from './components/ui/button';

import { Badge } from "./ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import { Link } from 'react-router-dom';
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { ProblemTable } from "./ProblemTable"
import { ColumnDef } from "@tanstack/react-table"

interface ProblemCardProps {
  problems: Problem[];
}

interface Problem {
  problem_id: number;
  title: string;
  difficulty: string;
  tags: string[];
}

interface DropDownForm {
  value: string;
  label: string;
}

const difficulties: DropDownForm[] = [
  {
    value: "hard",
    label: "Hard",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "easy",
    label: "Easy",
  },
]

const types: DropDownForm[] = [
  {
    value: "string",
    label: "String",
  },
  {
    value: "binary_search",
    label: "Binary Search",
  },
  {
    value: "regex",
    label: "Regex",
  },
  {
    value: "trie",
    label: "Trie",
  },
]


// define interfave for filter
interface ProblemFilterOptions {
  title: string | null;
  difficulty: string | null;
  categories: string[] | null;
  contestId: number | null;
  sortBy: string | null;
}


const ProblemCard: React.FC<ProblemCardProps> = ({ problems }) => {
  const [posDifficulty, setPosDifficulty] = useState(difficulties[0].value)
  const [curDifficulty, setCurDifficulty] = useState("")

  const [posType, setPosType] = useState(types[0].value)
  const [curType, setCurType] = useState("")
  const [filters, setFilters] = useState<ProblemFilterOptions>({
    title: null,
    difficulty: null,
    categories: null,
    contestId: null,
    sortBy: null,
  })
  const handleDifficultyChange = (value: string) => {
    setPosDifficulty(value);
    setCurDifficulty(value);
  };

  const handleTypeChange = (value: string) => {
    setPosType(value);
    setCurType(value);
  };

  const curDifficultyLabel = curDifficulty != ""
    ? difficulties.find(difficulty => difficulty.value === curDifficulty)?.label
    : 'Difficulty';

  const curTypeLabel = curType != ""
    ? types.find(type => type.value === curType)?.label
    : 'Category';


  return (
    <>
      <Card className="problem-card">
        <CardHeader className="px-7">
          <CardTitle>Problems</CardTitle>
          <CardDescription>Try attempting a problem to better your coding skills!</CardDescription>
        </CardHeader>
        <CardContent>
    
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {curDifficultyLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Available Difficulties</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={posDifficulty} onValueChange={handleDifficultyChange}>
                {difficulties.map(d => (
                  <DropdownMenuRadioItem key={d.value} value={d.value}>
                    {d.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {curTypeLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Available Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={posType} onValueChange={handleTypeChange}>
                {types.map(d => (
                  <DropdownMenuRadioItem key={d.value} value={d.value}>
                    {d.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <ProblemTable data={problems} />
        </CardContent>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </>
  )
}

export default ProblemCard;