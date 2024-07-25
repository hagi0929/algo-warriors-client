import React, { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Discussion } from '../models/Discussion';

interface UpdateDiscussionFormProps {
  discussion: Discussion;
  defaultContent: string;
  onSubmit: (updateText: string, discussionId: number) => void;
  onCancel: () => void;
}

const UpdateDiscussionForm: React.FC<UpdateDiscussionFormProps> = ({ discussion, defaultContent, onSubmit, onCancel }) => {
  const [updateText, setUpdateText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(updateText, discussion.discussion_id);
    setUpdateText('');
  };

  return (
    <div className="mt-2 p-4 bg-white border border-gray-300 shadow-lg rounded-lg w-full">
      <form onSubmit={handleSubmit}>
        <textarea
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
          rows={4}
          placeholder={defaultContent}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:border-black focus:outline-none"
        />
        <div className="flex ">
            <button
            type="submit"
            className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm p-2"
            >
            <Pencil className='pr-1'/>
            Update
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

export default UpdateDiscussionForm;