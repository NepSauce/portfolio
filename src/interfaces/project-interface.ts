export interface Project {
    id: string;
    name: string;
    description: string;
    startMonth: string;
    status: 'Under Development' | 'Completed';
    teamMembers: string[];
    githubLink?: string;
}