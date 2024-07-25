import React, { useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import { Button } from './ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { CardFooter } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PagenationState } from '../models/Etc';




interface PaginationProps {
  pagenationState: PagenationState,
  onPagenationStateChange: (newState: PagenationState) => void;

}

const PaginationComponent: React.FC<PaginationProps> = ({ pagenationState, onPagenationStateChange }) => {
  function nextPage() {
    onPagenationStateChange({ ...pagenationState, pageIndex: pagenationState.pageIndex + 1 })
  }

  function previousPage() {
    onPagenationStateChange({ ...pagenationState, pageIndex: Math.max(1, pagenationState.pageIndex - 1) })
  }

  function setPageSize(size: number) {
    onPagenationStateChange({ ...pagenationState, pageSize: size });
  }

  return (
    <CardFooter className="text-xs text-muted-foreground">
      <Select
        value={`${pagenationState.pageSize}`}
        onValueChange={(value) => {
          setPageSize(Number(value))
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={pagenationState.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => previousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{pagenationState.pageIndex}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => nextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </CardFooter>
  );
};

export default PaginationComponent;
