import React from 'react';
import { Link } from 'react-router-dom';

type Problem = {
    id: number;
    title: string;
};

interface SimpleProblemListProps {
    problems: Problem[];
}

const SimpleProblemList: React.FC<SimpleProblemListProps> = ({ problems }) => {
    return (
        <ul>
            {problems.map(problem => (
                <li key={problem.id} className="py-2 border-b last:border-none">
                    <Link to={`/problem/${problem.id}`} className="text-blue-500 hover:underline">
                        {problem.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default SimpleProblemList;
