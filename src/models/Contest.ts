export interface Contest {
    contest_id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    created_by: number;
    created_at: string;
    winner: number | null;
}
export interface ContestParticipant {
    contest_id: number;
    participant_id: number;
}

export interface ContestProblem {
    problem_id: number;
    contest_id: number;
}

export interface ContestProblemSubmission {
    submission_id: number;
    participant_id: number;
    problem_id: number;
    submission: string;
    created_at: string;
}
