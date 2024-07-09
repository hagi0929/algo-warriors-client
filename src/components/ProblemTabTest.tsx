import React from 'react';

interface ProblemTabTestProps {}

const ProblemTabTest: React.FC<ProblemTabTestProps> = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Ready to test your code?</h2>
            <p className="text-gray-700">
                This is a placeholder for our test cases.
            </p>
        </div>
    );
};

export default ProblemTabTest;