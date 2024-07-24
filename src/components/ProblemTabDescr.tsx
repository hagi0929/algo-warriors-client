import React from 'react';
import { useProblemDescription } from '../hooks/useProblems';

interface ProblemTabDescrProps {
  problemId: string;
}

const ProblemTabDescr: React.FC<ProblemTabDescrProps> = ({ problemId }) => {
    const { data: description, error, isLoading } = useProblemDescription(problemId);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading problems: {error.message}</div>;
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">What is this problem about?</h2>
            <p className="text-gray-700">
                {/* You can replace the placeholder text with actual content based on the problemId */}
                {`${description}`}
                
            </p>
        </div>
    );
};

export default ProblemTabDescr;
