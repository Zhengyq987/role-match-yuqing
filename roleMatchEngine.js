class RoleMatchEngine {
    constructor() {
        this.roles = {
            'Team Lead': {
                name: 'Team Lead',
                description: 'Coordinates team activities, manages timelines, and ensures project goals are met',
                skills: ['Leadership', 'Communication', 'Project Management', 'Coordination'],
                personality: ['Collaborative', 'Organized', 'Decisive', 'Supportive']
            },
            'RE': {
                name: 'Requirements Engineer',
                description: 'Gathers, documents, and manages project requirements and specifications',
                skills: ['Documentation', 'Analysis', 'Communication', 'Research'],
                personality: ['Detail-oriented', 'Analytical', 'Clear communicator', 'Systematic']
            },
            'CM': {
                name: 'Configuration Manager',
                description: 'Manages project structure, tools, files, and development environment',
                skills: ['Organization', 'Tool Management', 'Version Control', 'Documentation'],
                personality: ['Methodical', 'Detail-focused', 'Reliable', 'Structured']
            },
            'Design': {
                name: 'System Designer',
                description: 'Designs system architecture, component interactions, and technical workflows',
                skills: ['System Architecture', 'Logical Thinking', 'Diagramming', 'Technical Planning'],
                personality: ['Analytical', 'Creative', 'Strategic', 'Problem-solver']
            },
            'UX': {
                name: 'UX Designer',
                description: 'Designs user interfaces, wireframes, and ensures optimal user experience',
                skills: ['UI Design', 'User Research', 'Prototyping', 'Visual Design'],
                personality: ['Creative', 'User-focused', 'Empathetic', 'Aesthetic-minded']
            },
            'Test': {
                name: 'Quality Assurance Tester',
                description: 'Tests system functionality, identifies bugs, and ensures quality standards',
                skills: ['Testing', 'Bug Detection', 'Quality Assurance', 'Attention to Detail'],
                personality: ['Meticulous', 'Persistent', 'Logical', 'Quality-focused']
            }
        };

        this.questionWeights = {
            'preference': 3.0,
            'experience': 2.5,
            'skills': 2.0,
            'personality': 1.5,
            'interest': 1.0
        };

        this.questions = [
            {
                id: 1,
                text: "Which of these roles sounds most enjoyable to you?",
                type: "preference",
                weight: 3.0,
                options: [
                    { text: "Leading teams and keeping everyone on track", scores: { 'Team Lead': 3 } },
                    { text: "Writing clear instructions or outlining requirements", scores: { 'RE': 3 } },
                    { text: "Organizing tools, files, and project structure", scores: { 'CM': 3 } },
                    { text: "Planning how system parts connect and work together", scores: { 'Design': 3 } },
                    { text: "Designing user interfaces and improving usability", scores: { 'UX': 3 } },
                    { text: "Testing and making sure things work correctly", scores: { 'Test': 3 } }
                ]
            },
            {
                id: 2,
                text: "If you had to pick a role for a group project, which one would you take first?",
                type: "preference",
                weight: 2.5,
                options: [
                    { text: "Coordinator and team lead", scores: { 'Team Lead': 3 } },
                    { text: "Requirement writer or researcher", scores: { 'RE': 3 } },
                    { text: "Repository/file manager", scores: { 'CM': 3 } },
                    { text: "Systems planner or diagram designer", scores: { 'Design': 3 } },
                    { text: "Interface or layout designer", scores: { 'UX': 3 } },
                    { text: "Tester or debugger", scores: { 'Test': 3 } }
                ]
            },
            {
                id: 3,
                text: "Which of these work styles describes you best?",
                type: "personality",
                weight: 2.0,
                options: [
                    { text: "I like working alone and being detail-focused", scores: { 'Test': 2, 'CM': 1 } },
                    { text: "I like working collaboratively and sharing ideas", scores: { 'Team Lead': 2, 'RE': 1 } },
                    { text: "I prefer creative and visual tasks", scores: { 'UX': 2, 'Design': 1 } },
                    { text: "I enjoy organizing and structuring things", scores: { 'CM': 2, 'Team Lead': 1 } }
                ]
            },
            {
                id: 4,
                text: "What would you most enjoy improving or learning about?",
                type: "interest",
                weight: 1.5,
                options: [
                    { text: "Leadership and communication", scores: { 'Team Lead': 2 } },
                    { text: "Writing requirements or specs", scores: { 'RE': 2 } },
                    { text: "Managing shared tools/files", scores: { 'CM': 2 } },
                    { text: "Designing system architecture", scores: { 'Design': 2 } },
                    { text: "UI/UX design and accessibility", scores: { 'UX': 2 } },
                    { text: "Testing and quality control", scores: { 'Test': 2 } }
                ]
            },
            {
                id: 5,
                text: "Which of these describe your interests? (Select all that apply)",
                type: "interest",
                weight: 1.0,
                multiple: true,
                options: [
                    { text: "Coordinating people and planning team work", scores: { 'Team Lead': 1 } },
                    { text: "Writing instructions or organizing project ideas", scores: { 'RE': 1 } },
                    { text: "Keeping track of files, folders, and shared materials", scores: { 'CM': 1 } },
                    { text: "Planning how different features or parts of a system work together", scores: { 'Design': 1 } },
                    { text: "Designing how a page, form, or interface should look and feel", scores: { 'UX': 1 } },
                    { text: "Trying to find problems or mistakes in systems or features", scores: { 'Test': 1 } }
                ]
            },
            {
                id: 6,
                text: "Which things have you done before (in school, work, or side projects)? (Select all that apply)",
                type: "experience",
                weight: 2.0,
                multiple: true,
                options: [
                    { text: "Wrote a document, outline, or plan for a project", scores: { 'RE': 2 } },
                    { text: "Helped keep files, folders, or naming consistent", scores: { 'CM': 2 } },
                    { text: "Drew diagrams to explain how something should work", scores: { 'Design': 2 } },
                    { text: "Sketched or imagined how a website or form should look", scores: { 'UX': 2 } },
                    { text: "Tried to find bugs, test inputs, or recreate issues", scores: { 'Test': 2 } },
                    { text: "Helped assign responsibilities or organize your team", scores: { 'Team Lead': 2 } }
                ]
            },
            {
                id: 7,
                text: "What do you enjoy doing? (Select all that apply)",
                type: "personality",
                weight: 1.5,
                multiple: true,
                options: [
                    { text: "Catching small details others might miss", scores: { 'Test': 2 } },
                    { text: "Planning visuals or structure for systems", scores: { 'Design': 1, 'UX': 1 } },
                    { text: "Supporting team collaboration and goals", scores: { 'Team Lead': 2 } },
                    { text: "Writing documents that explain things clearly", scores: { 'RE': 2 } },
                    { text: "Making UIs simple and easy to use", scores: { 'UX': 2 } },
                    { text: "Keeping files, notes, or shared content neat and easy to find", scores: { 'CM': 2 } }
                ]
            },
            {
                id: 8,
                text: "Which tools or platforms have you used before? (Select all that apply)",
                type: "experience",
                weight: 1.5,
                multiple: true,
                options: [
                    { text: "Written instructions or shared notes for a group", scores: { 'RE': 1 } },
                    { text: "Created visual layouts or slides for presentations", scores: { 'UX': 1 } },
                    { text: "Managed files, folders, or versions in a group setting", scores: { 'CM': 1 } },
                    { text: "Drew flowcharts or system diagrams", scores: { 'Design': 1 } },
                    { text: "Logged issues, tested inputs, or helped verify results", scores: { 'Test': 1 } },
                    { text: "Used lists or spreadsheets to help track team progress", scores: { 'Team Lead': 1 } }
                ]
            },
            {
                id: 9,
                text: "Which of these habits or behaviors describe you? (Select all that apply)",
                type: "personality",
                weight: 2.0,
                multiple: true,
                options: [
                    { text: "I like helping teammates understand what needs to be done", scores: { 'RE': 2, 'Team Lead': 1 } },
                    { text: "I enjoy organizing to-do lists, checklists, or shared folders", scores: { 'CM': 2, 'Team Lead': 1 } },
                    { text: "I often notice when something in a design or interface feels off", scores: { 'UX': 2, 'Design': 1 } },
                    { text: "I like thinking through 'what if' scenarios or edge cases", scores: { 'Test': 2, 'Design': 1 } },
                    { text: "I'm usually the one reminding others about what's due or what's left", scores: { 'Team Lead': 2, 'CM': 1 } },
                    { text: "I often help by writing instructions or steps for others", scores: { 'RE': 2, 'CM': 1 } },
                    { text: "I like imagining how an app or website should look on screen", scores: { 'UX': 2, 'Design': 1 } }
                ]
            },
            {
                id: 10,
                text: "When joining a new project team, what's your natural instinct?",
                type: "personality",
                weight: 2.0,
                options: [
                    { text: "Help define the goals and scope", scores: { 'RE': 2 } },
                    { text: "Take initiative to coordinate tasks", scores: { 'Team Lead': 2 } },
                    { text: "Start planning the system's architecture", scores: { 'Design': 2 } },
                    { text: "Think about user experience and interface", scores: { 'UX': 2 } },
                    { text: "Set up tools and organize the workspace", scores: { 'CM': 2 } },
                    { text: "Consider potential issues and test scenarios", scores: { 'Test': 2 } }
                ]
            },
            {
                id: 11,
                text: "What do you usually contribute most in team work?",
                type: "skills",
                weight: 2.0,
                options: [
                    { text: "Task planning or leading group discussions", scores: { 'Team Lead': 2 } },
                    { text: "Writing up steps or requirements", scores: { 'RE': 2 } },
                    { text: "Making screen layouts, diagrams, or presentation visuals", scores: { 'UX': 2 } },
                    { text: "Organizing files and maintaining project structure", scores: { 'CM': 2 } },
                    { text: "Designing system flows and technical architecture", scores: { 'Design': 2 } },
                    { text: "Finding issues and ensuring quality", scores: { 'Test': 2 } }
                ]
            },
            {
                id: 12,
                text: "Which role do you enjoy most (if you've had team experience)?",
                type: "experience",
                weight: 2.5,
                options: [
                    { text: "Spotting bugs and issues", scores: { 'Test': 2 } },
                    { text: "Managing the setup and structure of workspaces", scores: { 'CM': 2 } },
                    { text: "Building logical flows and diagrams", scores: { 'Design': 2 } },
                    { text: "Creating user-friendly interfaces", scores: { 'UX': 2 } },
                    { text: "Documenting requirements and processes", scores: { 'RE': 2 } },
                    { text: "Coordinating team activities and timelines", scores: { 'Team Lead': 2 } }
                ]
            }
        ];
    }

    calculateScores(answers) {
        const scores = {};
        
        Object.keys(this.roles).forEach(role => {
            scores[role] = 0;
        });

        answers.forEach(answer => {
            const question = this.questions.find(q => q.id === answer.questionId);
            if (!question) return;

            const selectedOptions = Array.isArray(answer.selectedOptions) 
                ? answer.selectedOptions 
                : [answer.selectedOptions];

            selectedOptions.forEach(optionIndex => {
                const option = question.options[optionIndex];
                if (option && option.scores) {
                    Object.entries(option.scores).forEach(([role, points]) => {
                        scores[role] += points * question.weight;
                    });
                }
            });
        });

        return scores;
    }

    normalizeScores(rawScores) {
        const maxScore = Math.max(...Object.values(rawScores));
        const normalizedScores = {};
        
        Object.entries(rawScores).forEach(([role, score]) => {
            normalizedScores[role] = maxScore > 0 ? (score / maxScore) * 100 : 0;
        });

        return normalizedScores;
    }

    generateExplanation(role, score, userAnswers) {
        const roleInfo = this.roles[role];
        const explanations = [];

        const strongPoints = this.analyzeStrengths(role, userAnswers);
        const fitReason = this.analyzeFitReason(role, userAnswers);

        explanations.push(`Based on your responses, you show strong alignment with the ${roleInfo.name} role.`);
        
        if (strongPoints.length > 0) {
            explanations.push(`Your strengths in ${strongPoints.join(', ')} make you well-suited for this position.`);
        }

        if (fitReason) {
            explanations.push(fitReason);
        }

        explanations.push(`This role involves: ${roleInfo.description}`);
        explanations.push(`Key skills: ${roleInfo.skills.join(', ')}`);

        return explanations.join(' ');
    }

    analyzeStrengths(role, userAnswers) {
        const strengths = [];
        
        const experienceAnswers = userAnswers.filter(a => {
            const q = this.questions.find(q => q.id === a.questionId);
            return q && q.type === 'experience';
        });

        const personalityAnswers = userAnswers.filter(a => {
            const q = this.questions.find(q => q.id === a.questionId);
            return q && q.type === 'personality';
        });

        switch(role) {
            case 'Team Lead':
                if (personalityAnswers.some(a => this.hasCollaborativeAnswers(a))) {
                    strengths.push('collaborative leadership');
                }
                break;
            case 'RE':
                if (experienceAnswers.some(a => this.hasDocumentationExperience(a))) {
                    strengths.push('documentation and analysis');
                }
                break;
            case 'Test':
                if (personalityAnswers.some(a => this.hasDetailOrientedAnswers(a))) {
                    strengths.push('attention to detail');
                }
                break;
            case 'UX':
                if (personalityAnswers.some(a => this.hasCreativeAnswers(a))) {
                    strengths.push('creative design thinking');
                }
                break;
            case 'Design':
                if (experienceAnswers.some(a => this.hasSystemThinkingExperience(a))) {
                    strengths.push('systems thinking');
                }
                break;
            case 'CM':
                if (personalityAnswers.some(a => this.hasOrganizationalAnswers(a))) {
                    strengths.push('organizational skills');
                }
                break;
        }

        return strengths;
    }

    analyzeFitReason(role, userAnswers) {
        const preferenceAnswers = userAnswers.filter(a => {
            const q = this.questions.find(q => q.id === a.questionId);
            return q && q.type === 'preference';
        });

        if (preferenceAnswers.length > 0) {
            return `Your preferences strongly indicate an interest in ${role.toLowerCase()} responsibilities.`;
        }

        return null;
    }

    hasCollaborativeAnswers(answer) {
        return true;
    }

    hasDocumentationExperience(answer) {
        return true;
    }

    hasDetailOrientedAnswers(answer) {
        return true;
    }

    hasCreativeAnswers(answer) {
        return true;
    }

    hasSystemThinkingExperience(answer) {
        return true;
    }

    hasOrganizationalAnswers(answer) {
        return true;
    }

    getRecommendations(userAnswers) {
        const rawScores = this.calculateScores(userAnswers);
        const normalizedScores = this.normalizeScores(rawScores);
        
        const filteredScores = {};
        Object.entries(normalizedScores).forEach(([role, score]) => {
            if (score >= 20) {
                filteredScores[role] = score;
            }
        });

        const sortedRoles = Object.entries(filteredScores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3);

        const recommendations = sortedRoles.map(([role, score], index) => ({
            rank: index + 1,
            role: role,
            score: Math.round(score),
            explanation: this.generateExplanation(role, score, userAnswers),
            roleInfo: this.roles[role]
        }));

        return {
            recommendations,
            rawScores,
            normalizedScores: filteredScores
        };
    }

    testSystem() {
        const sampleAnswers = [
            { questionId: 1, selectedOptions: 0 },
            { questionId: 2, selectedOptions: 0 },
            { questionId: 3, selectedOptions: 1 },
            { questionId: 4, selectedOptions: 0 },
            { questionId: 5, selectedOptions: [0, 2] },
            { questionId: 6, selectedOptions: [5] },
            { questionId: 7, selectedOptions: [2] },
            { questionId: 8, selectedOptions: [5] },
            { questionId: 9, selectedOptions: [4] },
            { questionId: 10, selectedOptions: 1 },
            { questionId: 11, selectedOptions: 0 },
            { questionId: 12, selectedOptions: 5 }
        ];

        const result = this.getRecommendations(sampleAnswers);
        return result;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoleMatchEngine;
}

if (typeof window !== 'undefined') {
    window.RoleMatchEngine = RoleMatchEngine;
}