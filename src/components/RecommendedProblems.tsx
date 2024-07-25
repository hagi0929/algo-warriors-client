import React from 'react';
import { Card } from './ui/card';
import SimpleProblemList from './SimpleProblemList';
import { useRecommendedProblems } from '../hooks/useRecommendedProblems';

type Problem = {
    id: number;
    title: string;
};

interface Props {
    problemId: number;
}

const RecommendedProblems: React.FC<Props> = ({ problemId }) => {
    const { data: problems, error, isLoading } = useRecommendedProblems(problemId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading results: {error.message}</div>;

    const problemsArray: Problem[] = Array.isArray(problems) ? problems : [];

    return (
        <Card className="bg-white rounded-lg overflow-hidden shadow-md p-4 mt-4">
            <h3 className="text-xl font-bold mb-2">Recommended Problems</h3>
            <SimpleProblemList problems={problemsArray} />
        </Card>
    );
};

export default RecommendedProblems;
