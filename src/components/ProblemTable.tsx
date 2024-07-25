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

interface DataTableProps<AbstractProblem> {
  data: AbstractProblem[],
  tagMap: Map<number, string>
}

export function ProblemTable<AbstractProblem>({
  data,
  tagMap,
}: DataTableProps<AbstractProblem>) {
  const navigate = useNavigate();

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
              <Link to={`/problem/${row.getValue("problem_id")}`} className="flex w-full">
                {row.getValue("title")}
              </Link>
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
          const categories = temp.map((catId) => tagMap.get(parseInt(catId)) || catId).join(", ");
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium">
                {categories}
              </span>
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
