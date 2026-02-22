export interface Contest {
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

export const contests: Contest[] = [
    {
        id: 'web-development',
        title: 'Web Development',
        slug: 'web-development',
        shortDescription: 'Build modern, responsive, and innovative web applications.',
        description: 'Challenge your frontend and backend skills by building a fully functional web application that solves a real-world problem. Focus on modern architecture, responsive design, and exceptional user experience.',
        problemStatements: [
            'E-Commerce Platform with real-time inventory management',
            'AI-powered Customer Support Dashboard',
            'Collaborative Document Editor with live presence tracking'
        ],
        rules: [
            'Must use modern web technologies (React/Next.js/Vue/Angular).',
            'Must be responsive across all devices.',
            'Code must be hosted on a public repository (GitHub/GitLab).',
            'Include a detailed README with setup instructions.'
        ],
        deadline: '2026-04-15',
        criteria: [
            'Innovation and Creativity (30%)',
            'UI/UX Design (25%)',
            'Code Quality & Architecture (25%)',
            'Completeness of Features (20%)'
        ],
        status: 'Open',
        duration: '48 Hours',
        teamSize: '1-4 Members',
        iconType: 'Code'
    },
    {
        id: 'software-development',
        title: 'Software Development',
        slug: 'software-development',
        shortDescription: 'Create scalable, efficient software systems and tools.',
        description: 'Design and implement a robust software solution. This could be a CLI tool, a desktop application, or a robust backend service API.',
        problemStatements: [
            'Distributed Task Queue Server with priority support',
            'Cross-platform Desktop Database Manager',
            'High-performance Log Aggregator and Analyzer'
        ],
        rules: [
            'Language of choice is open (Python, Go, Java, C++, Rust, etc.).',
            'Provide clear documentation on architecture and design decisions.',
            'Include automated tests.',
            'Submission must include a functional prototype or MVP.'
        ],
        deadline: '2026-04-20',
        criteria: [
            'Problem Solving (30%)',
            'System Architecture & Scalability (30%)',
            'Code Readability & Documentation (20%)',
            'Test Coverage (20%)'
        ],
        status: 'Live',
        duration: '1 Week',
        teamSize: '1-3 Members',
        iconType: 'Terminal'
    },
    {
        id: 'android-development',
        title: 'Android App Development',
        slug: 'android-development',
        shortDescription: 'Design and build native or cross-platform Android applications.',
        description: 'Develop an Android application that offers a seamless and engaging mobile experience. Leverage modern mobile frameworks and APIs.',
        problemStatements: [
            'Offline-first Personal Finance Tracker',
            'Location-based AR Travel Guide',
            'Smart Home IoT Controller Hub'
        ],
        rules: [
            'Can use Kotlin/Java (Native) or Flutter/React Native (Cross-platform).',
            'Must follow Material Design guidelines.',
            'Provide the APK and source code repository.',
            'App must run without crashing on standard emulators.'
        ],
        deadline: '2026-04-25',
        criteria: [
            'User Interface and Experience (35%)',
            'Performance and Responsiveness (25%)',
            'Feature Implementation (25%)',
            'Originality (15%)'
        ],
        status: 'Open',
        duration: '72 Hours',
        teamSize: '1-2 Members',
        iconType: 'Smartphone'
    },
    {
        id: 'ios-development',
        title: 'iOS App Development',
        slug: 'ios-development',
        shortDescription: 'Craft intuitive and beautiful applications for the Apple ecosystem.',
        description: 'Build an exceptional iOS application. Focus on smooth animations, adherence to Human Interface Guidelines, and robust performance.',
        problemStatements: [
            'Machine Learning powered Health & Fitness Coach',
            'Professional Photo Editing app with CoreImage',
            'Ambient Productivity Timer with Live Activities'
        ],
        rules: [
            'Must use Swift/SwiftUI or cross-platform tools compatible with iOS.',
            'Must follow Apple Human Interface Guidelines.',
            'Provide source code and clear build instructions.',
            'Ensure compatibility with recent iOS versions.'
        ],
        deadline: '2026-04-30',
        criteria: [
            'Design and Polish (35%)',
            'Technical Implementation (30%)',
            'Usability (20%)',
            'Innovation (15%)'
        ],
        status: 'Open',
        duration: '72 Hours',
        teamSize: '1-2 Members',
        iconType: 'Apple'
    }
];
