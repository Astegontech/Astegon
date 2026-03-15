// Shared Contest types — source of truth for the entire app
// Models re-export these; components and services consume them directly.

export interface IContestBase {
    id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    problemStatements: string[];
    rules: string[];
    deadline: string;
    criteria: string[];
    status: 'Open' | 'Live' | 'Closed';
    duration: string;
    teamSize: string;
    iconType: 'Code' | 'Terminal' | 'Smartphone' | 'Apple';
}

export interface IContestRegistrationBase {
    fullName: string;
    email: string;
    phone: string;
    portfolio?: string;
    category: string;
    problemStatement: string;
    reason: string;
    submittedAt: Date;
}

export interface IContactBase {
    name: string;
    email: string;
    company?: string;
    message: string;
    verified: boolean;
    submittedAt: Date;
}

export interface IOTPBase {
    email: string;
    otp: string;
    expires: Date;
    createdAt: Date;
}

// Assignment type used in static data
export interface IProjectAssignment {
    id: string;
    title: string;
    file: string;
    coverImage: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    points: number;
    description: string;
    rules: string[];
    criteria: string[];
}
