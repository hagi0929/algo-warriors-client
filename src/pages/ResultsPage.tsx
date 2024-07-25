import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Result } from '../models/Result';
import Navbar from '../components/Navbar';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const results = location.state?.results as Result[] | undefined;

  if (!results) {
    return <div className="text-center text-gray-600">No results found.</div>;
  }

  return (
    <>
    <Navbar />
    <div className="results-page p-4">
      
      <h1 className="text-2xl font-bold mb-4">Submission Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map(result => (
          <Card key={result.id} className="result-card shadow-lg rounded-lg">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2 pt-3">Test Case: {result.id}</h2>
              <p><strong>Status:</strong> {result.statusDescription}</p>
              <p><strong>Input:</strong> <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{result.input}</pre></p>
              <p><strong>Output:</strong> <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{result.output}</pre></p>
              <p><strong>Expected Output:</strong> <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{result.expectedOutput}</pre></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </>
  );
};

export default ResultsPage;
