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
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "./ui/alert"
import { Terminal } from "lucide-react"
import { Link } from 'react-router-dom';
  

interface ContestCardProps {
  contests: Contest[];
}

interface Contest {
    id: number;
    title: string;
    description: string;
  }

const ContestCard: React.FC<ContestCardProps> = ({ contests }) => {
    return (
        <>
        <Card className="contest-card">
        <CardHeader className="px-7">
            <CardTitle>Contests</CardTitle>
            <CardDescription>Try attempting a contest to better your coding skills!</CardDescription>
        </CardHeader>
        <CardContent>
        <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Current Contest Achievements:</AlertTitle>
            <AlertDescription>
                You have ___ this many wins!
            </AlertDescription>
        </Alert>
            <Table>
            <TableHeader>
                <TableRow className="pt-6 flex space-around">
                <TableHead></TableHead>
                <TableHead className="hidden sm:table-cell">Title</TableHead>
                <TableHead className="hidden sm:table-cell">Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {contests.map(c => (
              <TableRow key={c.id} className="bg-accent hover:bg-hover-accent">
                <Link to={`/contest/${c.id}`} className="flex w-full">
                  <TableCell>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {c.id}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{c.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {c.description}
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

export default ContestCard;