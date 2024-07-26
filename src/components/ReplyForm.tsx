import React, { useState } from 'react';
import { MessageCirclePlus } from 'lucide-react';
import { Trash } from 'lucide-react';
import { Discussion } from '../models/Discussion';

interface ReplyFormProps {
  discussion: Discussion;
  onSubmit: (replyText: string, parentId: number, problemId: number) => void;
  onCancel: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ discussion, onSubmit, onCancel }) => {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(replyText, discussion.discussion_id, discussion.problem_id);
    setReplyText('');
  };

  return (
    <div className="mt-2 p-4 bg-white border border-gray-300 shadow-lg rounded-lg w-full">
      <form onSubmit={handleSubmit}>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          rows={4}
          required
          placeholder="Type your reply..."
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:border-black focus:outline-none"
        />
        <div className="flex ">
            <button
            type="submit"
            className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm p-2"
            >
            <MessageCirclePlus className='pr-1'/>
            Reply
            </button>
            <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm p-2"
            >
            <Trash className='pr-1'/>
            Cancel
            </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;