import React from 'react';

interface IndivProbCardProps {}

const IndivProbCard: React.FC<IndivProbCardProps> = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Component</h2>
            <p className="text-gray-700">
                This is a placeholder component. Modify and use it as needed.
            </p>
        </div>
    );
};

export default IndivProbCard;