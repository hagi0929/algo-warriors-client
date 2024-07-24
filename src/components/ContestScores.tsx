import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface ContestScoresProps {
}

interface ContestUser {
    user_id: number;
    score: number;
  }
  
  const contestUsers: ContestUser[] = [
    { user_id: 1, score: 100 },
    { user_id: 2, score: 85 },
  ];

const ContestScores: React.FC<ContestScoresProps> = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Contest Scores</h2>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden sm:table-cell">Score</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {contestUsers.map((u) => (
                    <TableRow key={u.user_id}>
                    <TableCell>
                        <div className="font-medium">{u.user_id}</div>
                    </TableCell>
                    <TableCell>
                        <div className="font-medium">{u.score}</div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ContestScores;
