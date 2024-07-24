import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import {
  ReplyIcon
} from "lucide-react";

interface Discussion {
  id: number;
  content: string;
  parent_id: number | null;
  title?: string;
}

interface DiscussionProps {
  discussions: Discussion[];
}

const getReplies = (discussions: Discussion[], parentId: number): Discussion[] => {
  return discussions.filter(discussion => discussion.parent_id === parentId);
};

const DiscussionItem: React.FC<{ discussion: Discussion; discussions: Discussion[] }> = ({ discussion, discussions }) => {
  const replies = getReplies(discussions, discussion.id);

  return (
    <div className="pl-4">
      {replies.length > 0 && (
        <Accordion type="multiple">
            {replies.map(reply => (
                <div key={reply.id}>
                  {getReplies(discussions, reply.id).length > 0 ? (
                    <Accordion type="multiple">
                      <AccordionItem value={String(reply.id)}>
                        <AccordionTrigger>{reply.content}</AccordionTrigger>
                        <AccordionContent className="border-x-2 border-slate-300 text-base">
                          <DiscussionItem discussion={reply} discussions={discussions} />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <AccordionContent >
                        <div className="pl-0 pt-3">{reply.content}</div>
                    </AccordionContent>
                  )}
                </div>
            ))}
        </Accordion>
      )}
    </div>
  );
};

const DiscussionThread: React.FC<DiscussionProps> = ({ discussions }) => {
  const mainDiscussion = discussions.find(discussion => discussion.parent_id === null);
  if (!mainDiscussion) {
    return <div>No main discussion found</div>;
  }
  const replies = getReplies(discussions, mainDiscussion.id);

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
          </div>
          <div >
            {replies.length > 0 && (
              <div>
                {replies.map(reply => (
                  <div key={reply.id}>
                    {getReplies(discussions, reply.id).length > 0 ? (
                      <Accordion type="multiple">
                        <AccordionItem value={String(reply.id)}>
                          <AccordionTrigger>{reply.content}</AccordionTrigger>
                          <AccordionContent className="border-x-2 border-slate-300 text-base">
                            <DiscussionItem discussion={reply} discussions={discussions} />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <AccordionContent>
                          <div className="pl-0 pt-6">{reply.content}</div>
                      </AccordionContent>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  );
};

export default DiscussionThread;
