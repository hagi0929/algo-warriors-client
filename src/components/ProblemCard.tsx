import React from 'react';
import {
  Card,
} from "@/components/ui/card"

import { Problem } from '../models/Problem';

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => (
  <Card>
    <h2>{problem.title}</h2>
    <p>{problem.description}</p>
  </Card>
);

export default ProblemCard;
