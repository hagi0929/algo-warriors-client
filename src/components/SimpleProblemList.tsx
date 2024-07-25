import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TableCell, TableRow } from './ui/table';

type Problem = {
    id: number;
    title: string;
};

interface SimpleProblemListProps {
    problems: Problem[];
}

const SimpleProblemList: React.FC<SimpleProblemListProps> = ({ problems }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleNewProblem = (id: number) => {
        navigate('/problem/' + id);
        window.location.reload();
    };

    return (
        <ul key={id}>
            {problems.map(p => (
                <TableRow
                    key={p.id}
                    className="bg-white hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    onClick={() => handleNewProblem(p.id)}
                >
                    <TableCell>
                        <div className="hidden text-sm text-gray-500 md:inline">
                            {p.id}
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{p.title}</TableCell>
                </TableRow>
            ))}
        </ul>
    );
};

export default SimpleProblemList;
