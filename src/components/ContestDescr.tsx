import React from 'react';

interface ContestDescrProps {
    description: string;
}

const ContestDescr: React.FC<ContestDescrProps> = ({ description }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">What is this contest about?</h2>
            <p className="text-gray-700">
                {description}
            </p>
        </div>
    );
};

export default ContestDescr;
