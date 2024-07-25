import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";

interface DataTableProps<AbstractProblem> {
  data: AbstractProblem[],
  tagMap: Map<number, string>
}

const colorClasses = [
  { bg: "bg-red-100", text: "text-red-800" },
  { bg: "bg-green-100", text: "text-green-800" },
  { bg: "bg-blue-100", text: "text-blue-800" },
  { bg: "bg-yellow-100", text: "text-yellow-800" },
  { bg: "bg-purple-100", text: "text-purple-800" },
  { bg: "bg-pink-100", text: "text-pink-800" },
  { bg: "bg-indigo-100", text: "text-indigo-800" },
  { bg: "bg-teal-100", text: "text-teal-800" },
];

function getColorClass(category: string, categoryColorMap: Map<string, { bg: string, text: string }>) {
  if (!categoryColorMap.has(category)) {
    const color = colorClasses[categoryColorMap.size % colorClasses.length];
    categoryColorMap.set(category, color);
  }
  return categoryColorMap.get(category);
}

export function ProblemTable<AbstractProblem>({
  data,
  tagMap,
}: DataTableProps<AbstractProblem>) {
  const navigate = useNavigate();
  const categoryColorMap = new Map<string, { bg: string, text: string }>();

  const columns = useMemo<ColumnDef<AbstractProblem, any>[]>(
    () => [
      {
        accessorKey: "problem_id",
        header: "ID",
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium">
                {row.getValue("problem_id")}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <Button variant={"link"} asChild><Link to={`/problem/${row.getValue("problem_id")}`} className="font-semibold">{row.getValue("title")}</Link></Button>
            </div>
          );
        },
      },
      {
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: ({ row }) => {
          const difficultyKey = parseInt(row.getValue("difficulty"));
          const difficultyLabel = tagMap.get(difficultyKey) || "Unknown";
          const difficultyColor = {
            "Easy": "text-green-500",
            "Medium": "text-orange-500",
            "Hard": "text-red-500"
          }[difficultyLabel] || "text-gray-500";

          return (
            <div className="flex space-x-2">
              <span className={`max-w-[500px] truncate font-medium ${difficultyColor}`}>
                {difficultyLabel}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'categories',
        header: 'Categories',
        cell: ({ row }) => {
          const temp: string[] = row.getValue("categories") || [];
          const categories = temp.map((catId) => tagMap.get(parseInt(catId)) || catId);
          return (
            <div className="flex flex-wrap space-x-2">
              {categories.map((category, index) => {
                const colorClass = getColorClass(category, categoryColorMap);
                return (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-sm font-medium ${colorClass?.bg} ${colorClass?.text} m-1`}
                  >
                    {category}
                  </span>
                );
              })}
            </div>
          );
        },
      },
    ],
    [tagMap]
  );

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });
  const [state, setState] = useState(table.initialState);

  table.setOptions(prev => ({
    ...prev,
    state,
    onStateChange: setState,
  }));

  return (
    <div className="">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {tagMap.size > 0 && table.getRowModel()?.rows?.length ? (
            table.getRowModel().rows?.map((row) => (
              <TableRow
                key={row.id}
                className="bg-accent hover:bg-hover-accent"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
