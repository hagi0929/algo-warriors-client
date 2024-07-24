import React, { useState } from 'react';
import { Table, TableRow, TableCell } from './ui/table';
import { Link } from 'react-router-dom';
import MainThreadForm from './MainThreadForm';
import { CirclePlus } from 'lucide-react';

interface ProblemTabDiscussProps {}

type Discuss = {
  id: number;
  title: string;
  content: string;
};

const initialDiscussions: Discuss[] = [
  { id: 1, title: 'This is the first discussion for this problem', content: "undefined" },
  { id: 2, title: 'This is the second discussion for this problem', content: "undefined" },
  { id: 3, title: 'This is the third discussion for this problem', content: "undefined" },
];

const ProblemTabDiscuss: React.FC<ProblemTabDiscussProps> = () => {
  const [discussions, setDiscussions] = useState<Discuss[]>(initialDiscussions);
  const [showForm, setShowForm] = useState(false);

  const handleAddDiscussionClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (title: string, content: string) => {
    const newDiscussion: Discuss = {
      id: discussions.length + 1, // Simple ID generation
      title: title,
      content: content
    };
    setDiscussions([...discussions, newDiscussion]);
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="bg-white overflow-hidden p-4">
        <h2 className="text-xl font-bold mb-4">Discussions</h2>
        <div className="add mb-4 rounded-lg">
          {!showForm ? (
            <button
              onClick={handleAddDiscussionClick}
              className="flex items-center space-x-2 text-white
              bg-slate-500 hover:bg-gray-200 hover:text-black text-base p-2 rounded-lg"
            >
                <CirclePlus className="w-6 h-6 pr-1" />
                Add Discussion
            </button>
          ) : (
            <MainThreadForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          )}
        </div>
      </div>
      <Table>
        {discussions.map((d) => (
          <TableRow key={d.id} className="bg-accent hover:bg-hover-accent shadow-md">
            <Link to={`/discussion/${d.id}`} className="flex w-full">
              <TableCell>{d.title}</TableCell>
            </Link>
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default ProblemTabDiscuss;