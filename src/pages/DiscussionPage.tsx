import React from 'react'
import DiscussionThread from '../components/DiscussionThread';
import Navbar from '../components/Navbar';

interface Props {}

interface Discussion {
    id: number;
    content: string;
    parent_id: number | null;
    title?: string;
  }

const discussions: Discussion[] = [
    { id: 1, content: 'This is the main discussion.', parent_id: null, title: 'Main Discussion' },
  { id: 2, content: 'This is a reply to the main discussion.', parent_id: 1 },
  { id: 3, content: 'This is another reply to the main discussion.', parent_id: 1 },
  { id: 4, content: 'This is a reply to the first reply.', parent_id: 2 },
  { id: 5, content: 'This is a reply to the reply of the first reply.', parent_id: 4 },
  { id: 6, content: 'This is another reply to the first reply.', parent_id: 2 },
  ];

const DiscussionPage = (props: Props) => {
  return (
    <>
    <Navbar />
    <DiscussionThread discussions={discussions} />
    </>
  )
}

export default DiscussionPage