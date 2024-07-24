import React, { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { Trash } from 'lucide-react';

interface MainThreadFormProps {
  onSubmit: (title: string, content: string) => void;
  onCancel: () => void;
}

const MainThreadForm: React.FC<MainThreadFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }
    setError(null);
    onSubmit(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div className="mt-2 p-4 bg-white border border-gray-300 shadow-lg rounded-lg w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type the title of the discussion..."
          className={`w-full p-2 mb-2 border border-gray-300 rounded-md text-sm focus:border-black focus:outline-none ${error ? 'border-red-500' : ''}`}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Type the content of the discussion..."
          className={`w-full p-2 border border-gray-300 rounded-md text-sm focus:border-black focus:outline-none ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex mt-2 space-x-2">
          <button
            type="submit"
            className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm p-2 rounded-md"
          >
            <CirclePlus className='pr-1' />
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-2 text-black hover:bg-gray-200 text-sm p-2 rounded-md"
          >
            <Trash className='pr-1' />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainThreadForm;