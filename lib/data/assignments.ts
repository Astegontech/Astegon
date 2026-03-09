export const projectAssignments = [
    {
        id: "3d-game-development",
        title: "3D Game Development",
        file: "3D_Game_Assignment.pdf",
        coverImage: "/images/projects/3d-game.png",
        difficulty: "Hard",
        points: 500,
        description: "Develop a cutting-edge 3D Game that showcases advanced rendering, physics simulation, and engaging mechanics. Focus on creating an immersive experience that runs efficiently.",
        rules: [
            "The game must be fully playable from start to finish.",
            "Visual assets (models, textures) must either be original or appropriately licensed/credited.",
            "You are encouraged to use game engines like Unity, Unreal Engine, or Godot.",
            "Code should be modular and well-documented.",
            "Include a Readme with instructions on how to build and run the game."
        ],
        criteria: [
            "Gameplay mechanics and overall fun factor.",
            "Visual fidelity and art direction.",
            "Performance and optimization (e.g., frame rate stability).",
            "Code quality and architectural design.",
            "Creativity and originality of the core concept."
        ]
    },
    {
        id: "education-erp",
        title: "Education ERP",
        file: "Education_ERP_Assignment.pdf",
        coverImage: "/images/projects/education-erp.png",
        difficulty: "Medium",
        points: 300,
        description: "Design and implement a comprehensive Enterprise Resource Planning (ERP) system tailored for educational institutions. The system should manage student data, attendance, grades, and faculty information.",
        rules: [
            "The backend must be built using a robust framework (e.g., Spring Boot, Node.js, Django).",
            "The frontend should be a responsive web application.",
            "Implement secure authentication with role-based access control (Admin, Teacher, Student).",
            "Data must be persisted in a normalized relational database (PostgreSQL/MySQL) or structured NoSQL database.",
            "Ensure RESTful or GraphQL API principles are followed."
        ],
        criteria: [
            "Completeness of the core functional requirements.",
            "Security implementation (authentication, authorization, data validation).",
            "Database schema design and query efficiency.",
            "User interface intuitiveness and responsiveness.",
            "System scalability and code structure."
        ]
    },
    {
        id: "hospital-management-system",
        title: "Hospital Management System",
        file: "Hospital_Management_System_Assignment.pdf",
        coverImage: "/images/projects/hospital-erp.png",
        difficulty: "Hard",
        points: 500,
        description: "Build an end-to-line Hospital Management System (HMS) that handles patient registration, appointment scheduling, billing, and doctor availability.",
        rules: [
            "Must support distinct portals for Patients, Doctors, and Receptionists.",
            "Include real-time or near real-time updates for appointment statuses.",
            "Ensure sensitive patient data (PII/PHI) is handled securely.",
            "Provide a mock payment gateway integration for the billing module.",
            "The API should be fully documented (e.g., Swagger/OpenAPI)."
        ],
        criteria: [
            "System reliability and robustness under concurrent data access.",
            "Security and data privacy compliance.",
            "User Experience (UX) for different user roles.",
            "Integration capabilities (mock payment, email notifications).",
            "Quality of API design and documentation."
        ]
    },
    {
        id: "logistics-management-system",
        title: "Logistics Management System",
        file: "Logistics_Management_System_Assignment.pdf",
        coverImage: "/images/projects/logistics-erp.png",
        difficulty: "Medium",
        points: 300,
        description: "Create a platform to track shipments, manage fleets, and optimize delivery routes. The system should provide visibility from dispatch to final delivery.",
        rules: [
            "Implement a tracking system that updates shipment statuses.",
            "Include a mapping component (e.g., Google Maps API, Mapbox) to visualize routes.",
            "The system should handle different user roles: Admin, Driver, and Customer.",
            "Provide an analytics dashboard for fleet performance and delivery times.",
            "Use a modern frontend framework (React, Vue, etc.) and a scalable backend."
        ],
        criteria: [
            "Accuracy of the tracking and updating mechanism.",
            "Effective use of mapping/routing APIs.",
            "Clarity and usefulness of the analytics dashboard.",
            "Overall system architecture and component communication.",
            "Code maintainability and testing coverage."
        ]
    },
    {
        id: "multi-vendor-ecommerce",
        title: "Multi-Vendor E-commerce",
        file: "MultiVendor_Ecommerce_Assignment.pdf",
        coverImage: "/images/projects/ecommerce.png",
        difficulty: "Hard",
        points: 400,
        description: "Develop a robust e-commerce platform where multiple independent vendors can register, list their products, and manage orders, while customers can browse and purchase items from various sellers.",
        rules: [
            "Support separate interfaces for Admin, Vendor, and Customer.",
            "Implement a comprehensive product catalog with search, filtering, and categorization.",
            "Include a shopping cart and a unified checkout process handling items from multiple vendors.",
            "Vendors must have a dashboard to track inventory, sales, and order fulfillment.",
            "System must securely handle user data and mock transactions."
        ],
        criteria: [
            "Complexity and successful implementation of the multi-vendor logic.",
            "Search and filtering performance and UX.",
            "Seamless checkout experience handling split orders.",
            "Completeness of the vendor dashboard features.",
            "Security measures (e.g., handling sensitive cart data, authentication)."
        ]
    },
    {
        id: "point-of-sale",
        title: "Point of Sale (POS)",
        file: "Point_of_Sale_Assignment.pdf",
        coverImage: "/images/projects/pos.png",
        difficulty: "Easy",
        points: 200,
        description: "Design a fast, efficient Point of Sale system intended for retail or restaurant environments. The application should handle inventory management, fast checkout, and basic reporting.",
        rules: [
            "The UI must be optimized for speed, ideally suitable for touch screens or rapid keyboard entry.",
            "Implement offline capability or resilience; the system should handle temporary network drops gracefully.",
            "Must include inventory tracking that updates immediately upon sale.",
            "Generate end-of-day sales reports and receipt summaries.",
            "Can be a desktop application (Electron, Tauri) or a highly responsive web application (PWA)."
        ],
        criteria: [
            "Speed and responsiveness of the checkout interface.",
            "Implementation of offline functionality/caching.",
            "Accuracy of real-time inventory synchronization.",
            "Quality and usefulness of generated reports.",
            "Overall application stability and error handling."
        ]
    },
    {
        id: "rag-system",
        title: "RAG System",
        file: "RAG_System_Assignment.pdf",
        coverImage: "/images/projects/rag.png",
        difficulty: "Hard",
        points: 500,
        description: "Build a Retrieval-Augmented Generation (RAG) system that allows users to query a custom document base and receive contextual, AI-generated answers based strictly on the provided documents.",
        rules: [
            "The system must ingest documents (PDF, TXT, etc.) and convert them into vector embeddings.",
            "Use a vector database (e.g., Pinecone, Weaviate, Milvus, or pgvector) to store and retrieve chunks.",
            "Integrate with an LLM API (e.g., OpenAI, Anthropic, or local open-source models) for generation.",
            "The UI should provide a chat interface and clearly cite which snippets from the documents were used for the answer.",
            "Implement mechanisms to mitigate hallucinations."
        ],
        criteria: [
            "Accuracy and relevance of the retrieved context chunks.",
            "Quality and coherence of the LLM-generated answers.",
            "Effectiveness of the citation/sourcing mechanism in the UI.",
            "System architecture (e.g., chunking strategy, embedding choice).",
            "Performance and latency of the retrieval/generation pipeline."
        ]
    },
    {
        id: "social-media-application",
        title: "Social Media Application",
        file: "Social_Media_Application_Assignment.pdf",
        coverImage: "/images/projects/social-media.png",
        difficulty: "Medium",
        points: 350,
        description: "Create a modern social networking platform focused on user interaction, content sharing, and real-time engagement.",
        rules: [
            "Core features must include user profiles, following/followers, posting text/media, and a feed.",
            "Implement real-time features using WebSockets (e.g., live notifications or chat).",
            "Include an interactive feed algorithm (can be chronological or engagement-based).",
            "Ensure the platform scales well with pagination or infinite scrolling.",
            "Deploy the application and provide a working live link."
        ],
        criteria: [
            "Smoothness and responsiveness of the user interface (especially infinite scrolling).",
            "Successful implementation and stability of real-time WebSockets features.",
            "Completeness of core social interactions (likes, comments, follows).",
            "Database efficiency for complex queries (e.g., generating timelines).",
            "Deployment setup and configuration."
        ]
    }
];
