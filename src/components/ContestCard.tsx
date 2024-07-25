import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { Contest } from "../models/Contest";
import { useEffect, useState } from "react";
import { fetchContests } from "../api/contestApi";
import { Button } from "./ui/button";
import { Plus } from 'lucide-react';
  

const ContestCard: React.FC = () => {
  const [personalContests, setPersonalContests] = useState<Contest[]>([]);
  const [contests, setContests] = useState<Contest[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const contestsPerPage = 10;
  const pageCount = Math.ceil(contests.length / contestsPerPage);

  useEffect(() => {
    const fetchAndSetContests = async () => {
      try {
        const data = await fetchContests();
        setContests(data);
        setPersonalContests(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch contests:", err);
      }
    };

    fetchAndSetContests();
  }, []);

  const currentContests = contests.slice(
    (currentPage - 1) * contestsPerPage,
    currentPage * contestsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, pageCount);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            className={i === currentPage ? "active" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <Card className="contest-card">
        <CardHeader className="px-7">
          <CardTitle className="flex">
            <div className="title w-3/4">Contests</div>
            <div className="create-contest text-base w-1/4">
            <Link to={`/add-contest`}>
              <Button className="bg-slate-300 text-black">
                Create Contest
              </Button>
            </Link>
            </div>
          </CardTitle>
          <CardDescription>
            Try attempting a contest to better your coding skills!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Your Contests</AlertTitle>
            <AlertDescription>
              <Table>
                <TableBody>
                  {personalContests.map((c) => (
                    <TableRow key={c.id}>
                      <Link to={`/contest/${c.id}`} className="flex w-full">
                        <TableCell className="hidden sm:table-cell w-4/5">
                          <Badge className="text-xs" variant="secondary">
                            {c.title}
                          </Badge>
                        </TableCell>
                      </Link>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDescription>
          </Alert>
          <Table>
            <TableHeader>
              <TableRow className="pt-6 flex space-around text-sm pb-2">
                Click on a Contest for more information! Or click Register to
                join!
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentContests.map((c) => (
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
                          console.log("Register button clicked");
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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {renderPageNumbers()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < pageCount) handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </>
  );
};

export default ContestCard;