import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { MessageSquare } from 'lucide-react';
import ReplyForm from './ReplyForm';

interface Discussion {
  id: number;
  content: string;
  parent_id: number | null;
  title?: string;
}

interface DiscussionProps {
  discussion: Discussion;
  discussions: Discussion[];
}

const getReplies = (discussions: Discussion[], parentId: number): Discussion[] => {
  return discussions.filter(discussion => discussion.parent_id === parentId);
};

const DiscussionItem: React.FC<DiscussionProps> = ({ discussion, discussions : initialDiscussions }) => {
    const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
    const replies = getReplies(discussions, discussion.id);
    const [isReplying, setIsReplying] = useState(false);
    const [replyingTo, setReplyingTo] = useState(-1);

    const addDiscussion = (content: string, parentId: number) => {
        const newId = discussions.length > 0 ? Math.max(...discussions.map(d => d.id)) + 1 : 1;
        const newDiscussion: Discussion = {
          id: newId,
          content,
          parent_id: parentId,
          title: undefined
        };
        setDiscussions([...discussions, newDiscussion]);
      };
    
    
      const handleReplyClick = (id: number) => {
        setIsReplying(!isReplying);
        setReplyingTo(id);
      };
      
      const handleReplySubmit = (replyText: string, parentId: number) => {
        console.log(`Reply submitted for discussion ID ${parentId}: ${replyText}`);
        addDiscussion(replyText, parentId);
        setIsReplying(false);
        setReplyingTo(-1);
      };
      
      const handleReplyCancel = () => {
        setIsReplying(false);
        setReplyingTo(-1);
      };
    
      const mainDiscussion = initialDiscussions.find(discussion => discussion.parent_id === null);
      if (!mainDiscussion) {
        return <div>No main discussion found</div>;
      }

    return (
        <div className="pl-4 border-x-2 border-slate-300 text-base">
        {replies.length > 0 && (
            <Accordion type="multiple">
                {replies.map(reply => (
                    <div key={reply.id}>
                    {getReplies(discussions, reply.id).length > 0 ? (
                        <Accordion type="multiple">
                        <AccordionItem value={String(reply.id)}>
                            <AccordionTrigger>{reply.content}</AccordionTrigger>
                            <div className="reply pl-1">
                            {!isReplying && (
                                <button
                                onClick={() => handleReplyClick(reply.id)}
                                className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                                >
                                <MessageSquare className="w-4 h-4" />
                                <span>Reply</span>
                                </button>
                                )}
                            {(replyingTo === reply.id) && (
                                <ReplyForm
                                discussionId={reply.id}
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
                            <div className="pl-0 pt-3">{reply.content}</div>
                            <div className="reply pl-1">
                            {!isReplying && (
                                <button
                                onClick={() => handleReplyClick(reply.id)}
                                className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                                >
                                <MessageSquare className="w-4 h-4" />
                                <span>Reply</span>
                                </button>
                                )}
                            {(replyingTo === reply.id) && (
                                <ReplyForm
                                discussionId={reply.id}
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