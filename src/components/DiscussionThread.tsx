import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionContent } from './ui/accordion';
import { MessageSquare } from 'lucide-react';
import ReplyForm from './ReplyForm';
import DiscussionItem from './DiscussItem';

interface Discussion {
  id: number;
  content: string;
  parent_id: number | null;
  title?: string;
}

interface DiscussionProps {
  discussions: Discussion[];
}

const DiscussionThread: React.FC<DiscussionProps> = ({ discussions: initialDiscussions }) => {
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const [isReplying, setIsReplying] = useState(false);
  const mainDiscussion = initialDiscussions.find(discussion => discussion.parent_id === null);
  if (!mainDiscussion) {
    return <div>No main discussion found</div>;
  }
  
  const addDiscussion = (content: string, parentId: number) => {
    const newId = discussions.length > 0 ? (Math.max(...discussions.map(d => d.id)) + 1) : 1;
    const newDiscussion: Discussion = {
      id: newId,
      content,
      parent_id: parentId,
      title: undefined
    };
    console.log(newDiscussion)
    setDiscussions([...discussions, newDiscussion]);
  };


  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };
  
  const handleReplySubmit = (replyText: string, parentId: number) => {
    console.log(`Reply submitted for discussion ID ${parentId}: ${replyText}`);
    addDiscussion(replyText, mainDiscussion.id);
    setIsReplying(false);
  };
  
  const handleReplyCancel = () => {
    setIsReplying(false);
  };


  return (
    <div className="">
    <Accordion type="single" defaultValue={String(mainDiscussion.id)} collapsible={false} className="w-full">
      <AccordionItem value={String(mainDiscussion.id)} className="border-b border-gray-200">
        <div className="w-full text-left px-4 py-2 bg-slate-500 font-bold text-xl text-white">
          {mainDiscussion.title}
        </div>
        <AccordionContent className="pl-4 w-full border-x-2 border-slate-300 ">
          <div className="pt-3 text-lg">
            {mainDiscussion.content}
            <div className="reply pl-2">
              {!isReplying && (
                <button
                  onClick={() => handleReplyClick()}
                  className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reply</span>
                </button>
                )}
              {isReplying && (
                <ReplyForm
                  discussionId={mainDiscussion.id}
                  onSubmit={handleReplySubmit}
                  onCancel={handleReplyCancel}
                />
              )}
            </div>
          </div>
          <DiscussionItem discussion={mainDiscussion} discussions={discussions} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  );
};

export default DiscussionThread;

