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
import { Contest } from "../models/Contest"
import { useEffect, useState } from "react"
import { fetchContests } from "../api/contestApi"
import { Button } from "./ui/button"

const ContestCard: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  useEffect(() => {
    const fetchAndSetContests = async () => {
      try {
        const data = await fetchContests();
        setContests(data);
      } catch (err) {
        console.error("Failed to fetch contests:", err);
      }
    };
  
    fetchAndSetContests();
  }, []);      
  
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
              <TableRow className="pt-6 flex space-around text-sm pb-2">
                Click on a Contest for more information! Or click Register to join!
              </TableRow>
            </TableHeader>
            <TableBody>
              {contests.map(c => (
                <TableRow key={c.id} className="bg-accent hover:bg-hover-accent">
                  <Link to={`/contest/${c.id}`} className="flex w-full">
                    <TableCell className="hidden sm:table-cell w-4/5">
                      <Badge className="text-xs" variant="secondary">
                        {c.title}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell w-1/5 justify-end">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          console.log('Register button clicked');
                        }}
                        className="bg-slate-500 text-white"
                      >
                        Register
                      </Button>
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