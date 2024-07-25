import { useEffect, useState } from "react"
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
import { AbstractProblem, Problem } from "../models/Problem"
import { Tag } from "../models/Tag"
import { fetchTags } from "../api/tagsApi"
import TagDropdown from "./TagDropDown"

interface ContestProblemCardProps {
  problems: AbstractProblem[];
}

const ContestProblemCard: React.FC<ContestProblemCardProps> = ({ problems }) => {
  const [difficulties, setDifficulties] = useState<Tag[]>([]);
  const [subcategories, setSubcategories] = useState<Tag[]>([]);
  const [sources, setSources] = useState<Tag[]>([]);
  const [curDifficulty, setCurDifficulty] = useState("");
  const [curCat, setCurCat] = useState("");
  const [curSource, setCurSource] = useState("");

  useEffect(() => {
    fetchTags()
      .then((tags) => {
        setDifficulties(tags.filter(tag => tag.type === "difficulty" && tag.content.trim() !== ""));
        setSubcategories(tags.filter(tag => tag.type === "subcategory" && tag.content.trim() !== ""));
        setSources(tags.filter(tag => tag.type === "source" && tag.content.trim() !== ""));
      })
      .catch((err) => {
        console.error("Failed to fetch tags:", err);
      });
  }, []);

    return (
        <>
        <Card className="problem-card">
        <CardHeader className="px-7">
            <CardTitle>Contest Problems</CardTitle>
            <CardDescription>Have a hand a this contest by attempting any of the problems below! You can be awarded points even if you don't solve the problem compeletely!</CardDescription>
        </CardHeader>
        <CardContent>
        <TagDropdown
            label="Difficulty"
            tags={difficulties}
            selectedValue={curDifficulty}
            onChange={setCurDifficulty}
          />
          <TagDropdown
            label="Category"
            tags={subcategories}
            selectedValue={curCat}
            onChange={setCurCat}
          />
          <TagDropdown
            label="Source"
            tags={sources}
            selectedValue={curSource}
            onChange={setCurSource}
          />

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