import React, { useState, useEffect } from 'react';
import { Table, TableRow, TableCell } from './ui/table';
import { Link } from 'react-router-dom';
import MainThreadForm from './MainThreadForm';
import { CirclePlus } from 'lucide-react';
import { Discussion } from '../models/Discussion';
import { fetchDiscussionsByProblem, createDiscussion } from '../api/discussionProblemApi';

interface ProblemTabDiscussProps {
  problemId: number;
}

const ProblemTabDiscuss: React.FC<ProblemTabDiscussProps> = ({ problemId }) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    console.log(problemId)
    fetchDiscussionsByProblem(problemId)
      .then((data) => {
        setDiscussions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [problemId]); // problemId is included in the dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAddDiscussionClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (title: string, content: string) => {
    createDiscussion(problemId, null, 1, title, content)
      .then(() => {
        // Optimistically update the discussions state
        const newDiscussion: Discussion = {
          discussion_id: discussions.length + 1, // Simple ID generation
          parentdiscussion_id: null,
          problem_id: problemId,
          user_id: 1,
          title: title,
          content: content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setDiscussions([...discussions, newDiscussion]);
        setShowForm(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
          <TableRow key={d.discussion_id} className="bg-accent hover:bg-hover-accent shadow-md">
            <Link to={`/discussion/${d.discussion_id}`} className="flex w-full">
              <TableCell>{d.title}</TableCell>
            </Link>
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default ProblemTabDiscuss;