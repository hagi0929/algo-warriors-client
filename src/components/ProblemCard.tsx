import React, { useState, useEffect } from "react";
// import { Button } from './components/ui/button';
import { PagenationState } from "../models/Etc"


import { useQuery } from "@tanstack/react-query";
import { Tag } from "../models/Tags"
import { ProblemTableFilter } from "./ProblemTableFilter"
import { Input } from "./ui/input"
import PaginationComponent from "./Pagenation"
import { useProblems } from "../hooks/useProblems"

import { useParams } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ProblemTable } from "./ProblemTable"
import { ProblemFilterOptions } from "../models/Problem"

interface ProblemCardProps {
}

const fetchTags = async (tagType: string | null): Promise<Tag[]> => {
  const queryParams = new URLSearchParams();

  if (tagType) queryParams.append('tag_type', tagType);

  const response = await fetch(`http://127.0.0.1:3000/tag/list?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};



const ProblemCard: React.FC<ProblemCardProps> = () => {
  const { contest_id } = useParams<{ contest_id: string }>() ?? null;

  const [filters, setFilters] = useState<ProblemFilterOptions>({
    title: null,
    difficulty: null,
    categories: null,
    contest_id: parseInt(contest_id ?? "") || null,
    sort_by: null,
  })

  const [pagenationState, setPagenationState] = useState<PagenationState>({
    pageIndex: 1,
    pageSize: 20
  })

  const [tagMap, setTagMap] = useState<Map<number, string>>(new Map());

  const { data: problems } = useProblems(filters, pagenationState) || { data: [], isLoading: true };
  const { data: categoriesData } = useQuery<Tag[], Error>(
    {
      queryKey: ['allCategories'],
      queryFn: () => fetchTags("subcategory"),
    }
  );
  const { data: difficultyData } = useQuery<Tag[], Error>(
    {
      queryKey: ['allDifficulties'],
      queryFn: () => fetchTags("difficulty"),
    }
  );

  useEffect(() => {
    if (categoriesData && difficultyData) {
      const allTags = [...categoriesData, ...difficultyData];
      const map = new Map<number, string>();

      allTags.forEach(tag => {
        map.set(tag.tag_id, tag.content);
      });

      setTagMap(map);
    }
  }, [difficultyData, categoriesData]);
  return (
    <>
      <Card className="problem-card">
        <CardHeader className="px-7">
          <CardTitle>{contest_id ? "Contest Problems" : "Problems"}</CardTitle>
          <CardDescription>Try attempting a problem to better your coding skills!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-1 items-center space-x-2">

            <Input
              placeholder="Search by Title"
              value={undefined}
              onChange={(event) =>
                setFilters({ ...filters, title: event.target.value })
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />

            <ProblemTableFilter filter={filters.categories || []} title="Categories"
              options={
                categoriesData?.map(d => ({
                  label: d.content,
                  value: d.tag_id.toString(),
                })) || []
              }
              onSelectedChange={function (newSelected: any): void {
                setFilters({ ...filters, categories: newSelected });
              }} />
            <ProblemTableFilter filter={filters.difficulty || []} title="Difficulty"
              options={
                difficultyData?.map(d => ({
                  label: d.content,
                  value: d.tag_id.toString(),
                })) || []
              }
              onSelectedChange={function (newSelected: any): void {
                setFilters({ ...filters, difficulty: newSelected });
              }} />
          </div>

          <ProblemTable data={problems || []} tagMap={tagMap} />
          <PaginationComponent pagenationState={pagenationState} onPagenationStateChange={setPagenationState} />
        </CardContent>

      </Card>

    </>
  )
}

export default ProblemCard;
