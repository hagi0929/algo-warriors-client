import React from 'react';
import { Table, TableRow, TableCell } from './ui/table';
import { Link } from 'react-router-dom';

interface ProblemTabDiscussProps {}

type Discuss = {
    id: number;
    title: string;
};

const discussions: Discuss[] = [
    { id: 1, title: 'This is the first discussion for this problem' },
    { id: 2, title: 'This is the second discussion for this problem' },
    { id: 3, title: 'This is the third discussion for this problem' },
];

const ProblemTabDiscuss: React.FC<ProblemTabDiscussProps> = () => {
    return (
        <>
        <div className="bg-white overflow-hidden p-4">
            <h2 className="text-xl font-bold mb-4">Discussions</h2>
        </div>
        <Table>
        {discussions.map((d) => (
            <TableRow key={d.id} className="bg-accent hover:bg-hover-accent shadow-md">
                <Link to={`/discussion/${d.id}`} className="flex w-full">
                    <TableCell>{d.title}</TableCell>
                </Link>
            </TableRow>
        ))}
        </Table>
        </>
    );
};

export default ProblemTabDiscuss;