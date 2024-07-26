import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { MessageSquare, Pencil, Trash } from 'lucide-react';
import ReplyForm from './ReplyForm';
import { Discussion } from '../models/Discussion';
import { fetchDiscussionsReplies, createDiscussion, updateDiscussion, deleteDiscussion } from '../api/discussionProblemApi';
import UpdateDiscussionForm from './UpdateDiscussionForm';

interface DiscussionProps {
  discussion: Discussion;
  discussions: Discussion[];
}

const getReplies = (discussions: Discussion[], parentId: number): Discussion[] => {
  return discussions.filter(discussion => discussion.parentdiscussion_id === parentId);
};

const DiscussionItem: React.FC<DiscussionProps> = ({ discussion, discussions : initialDiscussions }) => {
    const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
    const replies = getReplies(discussions, discussion.discussion_id);
    const [isReplying, setIsReplying] = useState(false);
    const [replyingTo, setReplyingTo] = useState(-1);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateingTo, setUpdatingTo] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (!discussion) {
        setError('Discussion ID not provided');
        setLoading(false);
        return;
    }
  
      fetchDiscussionsReplies(Number(discussion.discussion_id))
          .then((data) => {
              setDiscussions(data);
              setLoading(false);
          })
          .catch((err) => {
              setError(err.message);
              setLoading(false);
          });
    }, [discussion]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!discussion) return <div>No discussion found</div>;
  
    const addDiscussion = (content: string, parentId: number, problemId: number) => {
        createDiscussion(problemId, parentId, 1, null, content)
        .then(() => {
            console.log("inserted")
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

      const handleDeleteClick = (discussionId: number) => {
        deleteDiscussion(discussionId);
      };

      const handleUpdateClick = (discussionId: number) => {
        setIsUpdating(!isUpdating);
        setUpdatingTo(discussionId);
      };
    

      const handleReplyClick = (id: number) => {
        setIsReplying(!isReplying);
        setReplyingTo(id);
      };
      
      const handleReplySubmit = (replyText: string, parentId: number, problemId: number) => {
        console.log(`Reply submitted for discussion ID ${parentId}: ${replyText}`);
        addDiscussion(replyText, parentId, problemId);
        setIsReplying(false);
        setReplyingTo(-1);
      };

      const handleUpdateSubmit = (content: string, discussionId: number) => {
        updateDiscussionContent(content, discussionId);
        setIsUpdating(false);
        setUpdatingTo(-1);
      };
      
      const handleReplyCancel = () => {
        setIsReplying(false);
        setReplyingTo(-1);
      };

      const handleUpdateCancel = () => {
        setIsUpdating(false);
        setUpdatingTo(-1);
      };

    return (
        <div className="pl-4 border-x-2 border-slate-300 text-base">
        {replies.length > 0 && (
            <Accordion type="multiple">
                {replies.map(reply => (
                    <div key={reply.discussion_id}>
                    {getReplies(discussions, reply.discussion_id).length > 0 ? (
                        <Accordion type="multiple">
                        <AccordionItem value={String(reply.discussion_id)}>
                            <AccordionTrigger className='pb-2 text-sm text-left'>{reply.content}</AccordionTrigger>
                            <div className="reply pl-1 actions flex space-x-4">
                            {!isReplying && !isUpdating && (
                                <>
                                    <button
                                    onClick={() => handleReplyClick(reply.discussion_id)}
                                    className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                                    >
                                    <MessageSquare className="w-4 h-4" />
                                    <span>Reply</span>
                                    </button>
                                    {reply.content !== 'DELETED COMMENT' && (
                                    <button
                                        onClick={() => handleUpdateClick(reply.discussion_id)}
                                        className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        <span>Update</span>
                                    </button>
                                    )}
                                    {reply.content !== 'DELETED COMMENT' && (
                                    <button
                                    onClick={(event) => {
                                        event.stopPropagation(); // Stop event propagation
                                        handleDeleteClick(reply.discussion_id);
                                    }}
                                    className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                                    >
                                    <Trash className="w-4 h-4" />
                                    <span>Delete</span>
                                    </button>
                                    )}
                                </>
                                )}
                            {(replyingTo === reply.discussion_id) && (
                                <ReplyForm
                                discussion={reply}
                                onSubmit={handleReplySubmit}
                                onCancel={handleReplyCancel}
                                />
                            )}
                            </div>
                            <AccordionContent className="text-base">
                            <DiscussionItem discussion={reply} discussions={discussions} />
                            </AccordionContent>
                        </AccordionItem>
                        </Accordion>
                    ) : (
                        <AccordionContent className='border-b-2 pr-2 border-slate-200'>
                            <div className="pl-0 pt-3 pb-2">{reply.content}</div>
                            <div className="reply pl-1 actions flex space-x-4">
                            {!isReplying && !isUpdating && (
                                <>
                                    <button
                                    onClick={() => handleReplyClick(reply.discussion_id)}
                                    className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                                    >
                                    <MessageSquare className="w-4 h-4" />
                                    <span>Reply</span>
                                    </button>
                                    {reply.content !== 'DELETED COMMENT' && (
                                    <button
                                        onClick={() => handleUpdateClick(reply.discussion_id)}
                                        className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        <span>Update</span>
                                    </button>
                                    )}
                                    {reply.content !== 'DELETED COMMENT' && (
                                    <button
                                    onClick={(event) => {
                                        event.stopPropagation(); // Stop event propagation
                                        handleDeleteClick(reply.discussion_id);
                                    }}
                                    className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                                    >
                                    <Trash className="w-4 h-4" />
                                    <span>Delete</span>
                                    </button>
                                    )}
                                </>
                                )}
                            {(replyingTo === reply.discussion_id) && (
                                <ReplyForm
                                discussion={reply}
                                onSubmit={handleReplySubmit}
                                onCancel={handleReplyCancel}
                                />
                            )}
                            </div>
                        </AccordionContent>
                    )}
                    </div>
                ))}
            </Accordion>
        )}
        </div>
    );
};

export default DiscussionItem;