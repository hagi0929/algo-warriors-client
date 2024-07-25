import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface ContestScoresProps {
    scores: ContestUser[];
}

interface ContestUser {
    user_id: number;
    username: string;
    score: number;
    last_submission: string;
}
  

const ContestScores: React.FC<ContestScoresProps> = ({scores}) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Current Contest Scores</h2>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden sm:table-cell">Score</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {scores?.map((participant, index) => (
                    <TableRow key={participant.user_id}>
                    <TableCell>
                        <div className="font-medium">{participant.username}</div>
                    </TableCell>
                    <TableCell>
                        <div className="font-medium">{participant.score}</div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ContestScores;
