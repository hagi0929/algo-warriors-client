import React from 'react';
import { Card } from './ui/card';
import SimpleProblemList from './SimpleProblemList';

type Problem = {
    id: number;
    title: string;
};

const recommendedProblems: Problem[] = [
    { id: 1, title: 'Problem 1' },
    { id: 2, title: 'Problem 2' },
    { id: 3, title: 'Problem 3' },
    { id: 4, title: 'Problem 4' },
    { id: 5, title: 'Problem 5' },
];

const RecommendedProblems: React.FC = () => {
    return (
        <Card className="bg-white rounded-lg overflow-hidden shadow-md p-4 mt-4">
            <h3 className="text-xl font-bold mb-2">Recommended Problems</h3>
            <SimpleProblemList problems={recommendedProblems} />
        </Card>
    );
};

export default RecommendedProblems;
