import React from 'react';


interface ProblemTabTestProps {}

const ProblemTabTest: React.FC<ProblemTabTestProps> = () => {
    const runTests = async () => {
        try {
            const response = await fetch('https://your-backend-api.com/run-tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Include any necessary data here
                    // For example: code: userCode
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Test results:', data);
            // Handle the response data here (e.g., display test results to the user)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Ready to test your code?</h2>
                
            </div>
            <p className="text-gray-700">
            You will see test results when you submit your code.
            </p>
        </div>
    );
};

export default ProblemTabTest;
