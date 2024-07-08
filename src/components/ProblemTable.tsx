import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Problem } from '../models/Problem';

interface ProblemTableProps {
  problems: Problem[];
}

const ProblemTable: React.FC<ProblemTableProps> = ({ problems }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Problem</TableHead>
        <TableHead className="hidden sm:table-cell">Status</TableHead>
        <TableHead className="hidden sm:table-cell">Date</TableHead>
        <TableHead className="hidden md:table-cell">Value</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {problems.map((problem) => (
        <TableRow key={problem.id}>
          <TableCell>
            <div className="font-medium">{problem.title}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">{problem.description}</div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant={problem.status === 'Fulfilled' ? 'secondary' : 'outline'}>
              {problem.status}
            </Badge>
          </TableCell>
          <TableCell className="hidden sm:table-cell">{problem.date}</TableCell>
          <TableCell className="text-right">${problem.value}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ProblemTable;
