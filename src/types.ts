export type Level = 'Junior' | 'Middle' | 'Senior';

export interface Participant {
    id: number;
    name: string;
    group: string;
    level: Level;
    email: string;
    github?: string;
    dob: string;
    createdAt: number;
}
