import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DiscussionThread from '../components/DiscussionThread';
import Navbar from '../components/Navbar';
import { Discussion } from '../models/Discussion';
import { fetchDiscussionsById } from '../api/discussionProblemApi';

const DiscussionPage = () => {
    const { discussionId } = useParams<{ discussionId: string }>();
    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!discussionId) {
            setError('Discussion ID not provided');
            setLoading(false);
            return;
        }
        fetchDiscussionsById(Number(discussionId))
            .then((data) => {
                setDiscussion(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [discussionId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!discussion) return <div>No discussion found</div>;

    return (
        <>
            <Navbar />
            <DiscussionThread mainDiscussion={discussion} />
        </>
    );
};

export default DiscussionPage;