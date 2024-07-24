export interface Discussion {
    discussion_id: number;
    content: string;
    parentdiscussion_id: number | null;
    title?: string | null;
    created_at: string;
    updated_at: string;
    user_id: number;
    problem_id: number;
}