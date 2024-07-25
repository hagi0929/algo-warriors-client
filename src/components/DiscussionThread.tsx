import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionContent } from './ui/accordion';
import { MessageSquare, Pencil, Trash } from 'lucide-react';
import ReplyForm from './ReplyForm';
import DiscussionItem from './DiscussItem';
import { Discussion } from '../models/Discussion';
import { fetchDiscussionsReplies, createDiscussion, updateDiscussion, deleteDiscussion } from '../api/discussionProblemApi';
import UpdateDiscussionForm from './UpdateDiscussionForm';

interface DiscussionProps {
  mainDiscussion: Discussion | null;
}

const DiscussionThread: React.FC<DiscussionProps> = ({ mainDiscussion }) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [isReplying, setIsReplying] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mainDiscussion) {
      setError('Discussion ID not provided');
      setLoading(false);
      return;
    }

    fetchDiscussionsReplies(Number(mainDiscussion.discussion_id))
      .then((data) => {
        setDiscussions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [mainDiscussion]);

  if (!mainDiscussion) return <div>No main discussion found</div>;

  const addDiscussion = (content: string, parentId: number, problemId: number) => {
    createDiscussion(problemId, parentId, 1, null, content)
      .then(() => {
        console.log("Inserted");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    const newId = discussions.length > 0 ? Math.max(...discussions.map(d => d.discussion_id)) + 1 : 1;
    const newDiscussion: Discussion = {
      discussion_id: newId,
      content: content,
      parentdiscussion_id: parentId,
      title: null,
      created_at: "",
      updated_at: "",
      user_id: 1,
      problem_id: problemId
    };
    setDiscussions([...discussions, newDiscussion]);
  };

  const updateDiscussionContent = (content: string, discussionId: number) => {
    updateDiscussion(discussionId, content)
      .then(() => {
        const updatedDiscussions = discussions.map(d => 
          d.discussion_id === discussionId ? { ...d, content } : d
        );
        setDiscussions(updatedDiscussions);
      })
      .catch(err => setError(err.message));
  };

  const deleteDiscussionContent = (discussionId: number) => {
    deleteDiscussion(discussionId)
      .then(() => {
        // const updatedDiscussions = discussions.map(d => 
        //   d.discussion_id === discussionId ? { ...d, content: 'Deleted Discussion' } : d
        // );
        // setDiscussions(updatedDiscussions);
      })
      .catch(err => setError(err.message));
  };  

  const handleDeleteClick = () => {
    deleteDiscussion(mainDiscussion.discussion_id);
  };

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleUpdateClick = () => {
    console.log(mainDiscussion.content);
    setIsUpdating(!isUpdating);
  };

  const handleReplySubmit = (replyText: string, parentId: number, problemId: number) => {
    addDiscussion(replyText, mainDiscussion.discussion_id, problemId);
    setIsReplying(false);
  };

  const handleReplyCancel = () => {
    setIsReplying(false);
  };

  const handleUpdateSubmit = (content: string, discussionId: number) => {
    updateDiscussionContent(content, discussionId);
    setIsUpdating(false);
  };

  const handleUpdateCancel = () => {
    setIsUpdating(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Accordion type="single" defaultValue={String(mainDiscussion.discussion_id)} collapsible={false} className="w-full">
        <AccordionItem value={String(mainDiscussion.discussion_id)} className="border-b border-gray-200">
          <div className="w-full text-left px-4 py-2 bg-slate-500 font-bold text-xl text-white">
            {mainDiscussion.title}
          </div>
          <AccordionContent className="pl-4 w-full border-x-2 border-slate-300 ">
            <div className="pt-3 text-lg">
              {mainDiscussion.content}
              <div className="actions flex space-x-4 pl-2">
                {!isReplying && !isUpdating && (
                  <>
                    <button
                      onClick={handleReplyClick}
                      className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                    {mainDiscussion.content !== 'DELETED COMMENT' && (
                      <button
                        onClick={handleUpdateClick}
                        className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                      >
                        <Pencil className="w-4 h-4" />
                        <span>Update</span>
                      </button>
                    )}
                    <button
                      onClick={(event) => {
                        event.stopPropagation(); // Stop event propagation
                        handleDeleteClick();
                      }}
                      className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                    >
                      <Trash className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </>
                )}
                {isReplying && (
                  <ReplyForm
                    discussion={mainDiscussion}
                    onSubmit={handleReplySubmit}
                    onCancel={handleReplyCancel}
                  />
                )}
                {isUpdating && (
                  <UpdateDiscussionForm
                    discussion={mainDiscussion}
                    defaultContent={mainDiscussion.content}
                    onSubmit={handleUpdateSubmit}
                    onCancel={handleUpdateCancel}
                  />
                )}
              </div>
            </div>
            {discussions.length > 0 && (
              <DiscussionItem discussion={mainDiscussion} discussions={discussions} />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DiscussionThread;
