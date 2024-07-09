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

interface ContestProblemCardProps {
  problems: Problem[];
}

interface Problem {
    id: number;
    title: string;
    description: string;
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


const ContestProblemCard: React.FC<ContestProblemCardProps> = ({ problems }) => {
  const [posDifficulty, setPosDifficulty] = useState(difficulties[0].value)
  const [curDifficulty, setCurDifficulty] = useState("")

  const [posType, setPosType] = useState(types[0].value)
  const [curType, setCurType] = useState("")

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
            <CardTitle>Contest Problems</CardTitle>
            <CardDescription>Have a hand a this contest by attempting any of the problems below! You can be awarded points even if you don't solve the problem compeletely!</CardDescription>
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

            <Table>
            <TableHeader>
              <TableRow className="pt-6 flex space-around">
                <TableHead></TableHead>
                <TableHead className="hidden sm:table-cell">Title</TableHead>
                <TableHead className="hidden sm:table-cell">Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map(p => (
              <TableRow key={p.id} className="bg-accent hover:bg-hover-accent">
                <Link to={`/problem/${p.id}`} className="flex w-full">
                  <TableCell>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {p.id}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{p.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {p.description}
                    </Badge>
                  </TableCell>
                </Link>
              </TableRow>
            ))}
            </TableBody>
            </Table>
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

export default ContestProblemCard;