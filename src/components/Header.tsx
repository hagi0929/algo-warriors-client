import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Problem } from '../models/Problem';

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => (
  <Card>
    <CardHeader>
      <CardTitle>{problem.title}</CardTitle>
      <CardDescription>{problem.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Status: {problem.status}</p>
      <p>Date: {problem.date}</p>
      <p>Value: ${problem.value}</p>
    </CardContent>
  </Card>
);

export default ProblemCard;
