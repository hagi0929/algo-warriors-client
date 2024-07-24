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

interface ProblemCardProps {
  problems: Problem[];
}

interface Problem {
    id: number;
    title: string;
    description: string;
  }

interface DropDownForm {
  id: number;
  type: string;
  content: string;
}

const difficulties: DropDownForm[] = [
  {
    id: 1,
    type: "difficulty",
    content: "Hard",
  },
  {
    id: 2,
    type: "difficulty",
    content: "Medium",
  },
  {
    id: 3,
    type: "difficulty",
    content: "Easy",
  },
]

const subcategories: DropDownForm[] = [
  {
    id: 1,
    type: "subcategory",
    content: "string",
  },
  {
    id: 2,
    type: "subcategory",
    content: "hash",
  },
  {
    id: 3,
    type: "subcategory",
    content: "ahhh",
  },
]

const sources: DropDownForm[] = [
  {
    id: 1,
    type: "source",
    content: "0",
  },
  {
    id: 2,
    type: "source",
    content: "1",
  },
  {
    id: 3,
    type: "difficulty",
    content: "2",
  },
]


const ProblemCard: React.FC<ProblemCardProps> = ({ problems }) => {
  const [posDifficulty, setPosDifficulty] = useState(-1)
  const [curDifficulty, setCurDifficulty] = useState('')

  const [posCat, setposCat] = useState(-1)
  const [curCat, setCurCat] = useState('')


  const [posSource, setPosSource] = useState(-1)
  const [curSource, setCurSource] = useState('')

  const handleDifficultyChange = (id: number) => {
    const selectedDifficulty = difficulties.find(difficulty => difficulty.id === id);
    setPosDifficulty(id);
    setCurDifficulty(selectedDifficulty ? selectedDifficulty.content : '');
  };

  const handleCatChange = (id: number) => {
    const selectedCat = subcategories.find(cat => cat.id === id);
    setposCat(id);
    setCurCat(selectedCat ? selectedCat.content : '');
  };

  const handleSrcChange = (id: number) => {
    const selectedCat = subcategories.find(cat => cat.id === id);
    setPosSource(id);
    setCurSource(selectedCat ? selectedCat.content : '');
  };

  const difficultyLabel = 'Difficulty';
  const catLabel = 'Category';
  const sourceLabel = 'Source';

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
              {difficultyLabel}
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Available Difficulties</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={curDifficulty} onValueChange={setCurDifficulty}>
              {difficulties.map(d => (
                <DropdownMenuRadioItem key={d.id}
                  value={d.content}
                  onSelect={() => handleDifficultyChange(d.id)}
                >{d.content}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {catLabel}
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Available Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={curCat} onValueChange={setCurCat}>
              {subcategories.map(d => (
                <DropdownMenuRadioItem key={d.id}
                  value={d.content}
                  onSelect={() => handleCatChange(d.id)}
                >{d.content}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {sourceLabel}
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Available Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={curSource} onValueChange={setCurSource}>
              {sources.map(d => (
                <DropdownMenuRadioItem key={d.id}
                  value={d.content}
                  onSelect={() => handleSrcChange(d.id)}
                >{d.content}</DropdownMenuRadioItem>
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

export default ProblemCard;