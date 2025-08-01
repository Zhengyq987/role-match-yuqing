import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Share2, RefreshCw, CheckCircle2, Info, Users, Zap, Target, Home, ArrowRight, Sparkles, Code, Palette, Settings, TestTube, User, Mail, CreditCard, Sun, Moon } from 'lucide-react';

const RoleMatch = () => {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'about', 'studentInfo', 'quiz', 'results', 'professor'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  
  // Use system dark mode preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => setDarkMode(e.matches);
      
      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Older browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [shareNotification, setShareNotification] = useState('');
  const [hoveredRole, setHoveredRole] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Student information state
  const [studentInfo, setStudentInfo] = useState(() => ({
    firstName: '',
    lastName: '',
    buId: '',
    email: ''
  }));
  const [studentInfoErrors, setStudentInfoErrors] = useState({});

  // Handle input changes - using event persist for safety
  const handleInputChange = (field) => (e) => {
    const { value } = e.target;
    
    // Only allow letters and spaces for names
    if (field === 'firstName' || field === 'lastName') {
      if (value === '' || /^[A-Za-z\s]*$/.test(value)) {
        setStudentInfo(prev => ({
          ...prev,
          [field]: value
        }));
      }
    } else {
      setStudentInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Handle BU ID change with validation
  const handleBuIdChange = (e) => {
    e.persist && e.persist(); // For older React versions
    const value = e.target.value.toUpperCase();
    // Allow only U followed by up to 8 digits
    if (value === '' || /^U\d{0,8}$/.test(value)) {
      setStudentInfo(prev => ({
        ...prev,
        buId: value
      }));
    }
  };

  // Debug: Log when component re-renders
  useEffect(() => {
    console.log('StudentInfo state:', studentInfo);
  }, [studentInfo]);

  // Create refs for inputs to avoid re-render issues
  const inputRefs = {
    firstName: React.useRef(null),
    lastName: React.useRef(null),
    buId: React.useRef(null),
    email: React.useRef(null)
  };

  // Material 3 Color Scheme
  const colors = {
    light: {
      primary: '#006495',
      onPrimary: '#ffffff',
      primaryContainer: '#c9e6ff',
      onPrimaryContainer: '#001e31',
      secondary: '#525f6e',
      onSecondary: '#ffffff',
      secondaryContainer: '#d5e3f5',
      onSecondaryContainer: '#0f1c29',
      tertiary: '#6a5778',
      onTertiary: '#ffffff',
      tertiaryContainer: '#f2daff',
      onTertiaryContainer: '#251432',
      error: '#ba1a1a',
      background: '#fdfcff',
      onBackground: '#1a1c1e',
      surface: '#fdfcff',
      onSurface: '#1a1c1e',
      surfaceVariant: '#dfe2eb',
      onSurfaceVariant: '#43474e',
      outline: '#73777f',
      outlineVariant: '#c3c6cf',
      elevation1: 'rgba(0, 0, 0, 0.05)',
      elevation2: 'rgba(0, 0, 0, 0.08)',
      elevation3: 'rgba(0, 0, 0, 0.11)',
    },
    dark: {
      primary: '#8cccff',
      onPrimary: '#003450',
      primaryContainer: '#004b71',
      onPrimaryContainer: '#c9e6ff',
      secondary: '#b9c7d9',
      onSecondary: '#24323f',
      secondaryContainer: '#3a4856',
      onSecondaryContainer: '#d5e3f5',
      tertiary: '#d5bee5',
      onTertiary: '#3a2948',
      tertiaryContainer: '#52405f',
      onTertiaryContainer: '#f2daff',
      error: '#ffb4ab',
      background: '#1a1c1e',
      onBackground: '#e2e2e6',
      surface: '#1a1c1e',
      onSurface: '#e2e2e6',
      surfaceVariant: '#43474e',
      onSurfaceVariant: '#c3c6cf',
      outline: '#8d9199',
      outlineVariant: '#43474e',
      elevation1: 'rgba(255, 255, 255, 0.05)',
      elevation2: 'rgba(255, 255, 255, 0.08)',
      elevation3: 'rgba(255, 255, 255, 0.11)',
    }
  };

  const theme = darkMode ? colors.dark : colors.light;

  // Role definitions with Lottie animations
  const roles = {
    RE: {
      name: "Requirements Engineer",
      description: "Gathers and documents project requirements, writes specifications",
      skills: ["Documentation", "Analysis", "Communication", "Research"],
      icon: <Sparkles size={32} />,
      gradient: { from: theme.primary, to: theme.secondary },
      lottieUrl: "https://lottie.host/d3f7d4d6-4f7e-4b8f-8f4f-6f8f8f8f8f8f/requirements-engineer.json",
      color: "#3B82F6"
    },
    CM: {
      name: "Configuration Manager",
      description: "Manages tools, files, versions, and project structure",
      skills: ["Organization", "Version Control", "Tool Management", "Documentation"],
      icon: <Settings size={32} />,
      gradient: { from: theme.secondary, to: theme.tertiary },
      lottieUrl: "https://lottie.host/e4f5d5d7-5f8e-5c9f-9f5f-7f9f9f9f9f9f/config-manager.json",
      color: "#10B981"
    },
    Design: {
      name: "System Designer",
      description: "Plans system architecture and component interactions",
      skills: ["Architecture", "Diagramming", "System Planning", "Technical Design"],
      icon: <Code size={32} />,
      gradient: { from: theme.tertiary, to: theme.primary },
      lottieUrl: "https://lottie.host/f5f6d6d8-6f9f-6d0f-0f6f-8f0f0f0f0f0f/system-designer.json",
      color: "#8B5CF6"
    },
    UX: {
      name: "UX Designer",
      description: "Designs user interfaces and improves user experience",
      skills: ["UI Design", "Prototyping", "User Research", "Visual Design"],
      icon: <Palette size={32} />,
      gradient: { from: theme.primary, to: theme.tertiary },
      lottieUrl: "https://lottie.host/a6f7d7d9-7f0f-7e1f-1f7f-9f1f1f1f1f1f/ux-designer.json",
      color: "#EC4899"
    },
    Test: {
      name: "QA Tester",
      description: "Ensures quality through testing and bug detection",
      skills: ["Testing", "Debugging", "Quality Assurance", "Attention to Detail"],
      icon: <TestTube size={32} />,
      gradient: { from: theme.secondary, to: theme.primary },
      lottieUrl: "https://lottie.host/b7f8d8e0-8f1f-8f2f-2f8f-0f2f2f2f2f2f/qa-tester.json",
      color: "#F59E0B"
    }
  };

  // Questions data
  const questions = [
    {
      id: 1,
      text: "Which of these roles sounds most enjoyable to you?",
      type: "single",
      weight: 3.0,
      options: [
        { text: "Writing clear instructions or outlining requirements", points: { RE: 3 }, roleKey: 'RE' },
        { text: "Organizing tools, files, and project structure", points: { CM: 3 }, roleKey: 'CM' },
        { text: "Planning how system parts connect and work together", points: { Design: 3 }, roleKey: 'Design' },
        { text: "Designing user interfaces and improving usability", points: { UX: 3 }, roleKey: 'UX' },
        { text: "Testing and making sure things work correctly", points: { Test: 3 }, roleKey: 'Test' }
      ]
    },
    {
      id: 2,
      text: "If you had to pick a role for a group project, which would you choose?",
      type: "single",
      weight: 2.5,
      options: [
        { text: "Requirement writer or researcher", points: { RE: 3 }, roleKey: 'RE' },
        { text: "Repository/file manager", points: { CM: 3 }, roleKey: 'CM' },
        { text: "Systems planner or diagram designer", points: { Design: 3 }, roleKey: 'Design' },
        { text: "Interface or layout designer", points: { UX: 3 }, roleKey: 'UX' },
        { text: "Tester or debugger", points: { Test: 3 }, roleKey: 'Test' }
      ]
    },
    {
      id: 3,
      text: "Which work style describes you best?",
      type: "single",
      weight: 2.0,
      options: [
        { text: "I like working alone and being detail-focused", points: { Test: 2, CM: 1 }, roleKey: 'Test' },
        { text: "I enjoy collaborative work and sharing ideas", points: { RE: 2, UX: 1 }, roleKey: 'RE' },
        { text: "I prefer strategic planning and system thinking", points: { Design: 2, RE: 1 }, roleKey: 'Design' },
        { text: "I like creative work and visual problem-solving", points: { UX: 2, Design: 1 }, roleKey: 'UX' }
      ]
    },
    {
      id: 4,
      text: "What would you most enjoy improving or learning about?",
      type: "single",
      weight: 1.5,
      options: [
        { text: "Writing requirements or specifications", points: { RE: 2 }, roleKey: 'RE' },
        { text: "Managing shared tools and files", points: { CM: 2 }, roleKey: 'CM' },
        { text: "Designing system architecture", points: { Design: 2 }, roleKey: 'Design' },
        { text: "UI/UX design and accessibility", points: { UX: 2 }, roleKey: 'UX' },
        { text: "Testing and quality control", points: { Test: 2 }, roleKey: 'Test' }
      ]
    },
    {
      id: 5,
      text: "Which of these describe your interests?",
      type: "multiple",
      weight: 1.0,
      options: [
        { text: "Writing instructions or organizing project ideas", points: { RE: 1 }, roleKey: 'RE' },
        { text: "Keeping track of files, folders, and shared materials", points: { CM: 1 }, roleKey: 'CM' },
        { text: "Planning how different features work together", points: { Design: 1 }, roleKey: 'Design' },
        { text: "Designing how interfaces should look and feel", points: { UX: 1 }, roleKey: 'UX' },
        { text: "Finding problems or mistakes in systems", points: { Test: 1 }, roleKey: 'Test' }
      ]
    },
    {
      id: 6,
      text: "What have you done before?",
      type: "multiple",
      weight: 2.5,
      options: [
        { text: "Wrote documents, outlines, or plans for projects", points: { RE: 1 }, roleKey: 'RE' },
        { text: "Helped keep files and folders organized", points: { CM: 1 }, roleKey: 'CM' },
        { text: "Drew diagrams to explain how something works", points: { Design: 1 }, roleKey: 'Design' },
        { text: "Sketched website or app designs", points: { UX: 1 }, roleKey: 'UX' },
        { text: "Found bugs or tested features", points: { Test: 1 }, roleKey: 'Test' }
      ]
    },
    {
      id: 7,
      text: "What do you enjoy doing?",
      type: "multiple",
      weight: 1.5,
      options: [
        { text: "Writing documents that explain things clearly", points: { RE: 1 }, roleKey: 'RE' },
        { text: "Keeping files and content neat and organized", points: { CM: 1 }, roleKey: 'CM' },
        { text: "Planning visuals or system structures", points: { Design: 1 }, roleKey: 'Design' },
        { text: "Making interfaces simple and easy to use", points: { UX: 1 }, roleKey: 'UX' },
        { text: "Catching small details others might miss", points: { Test: 1 }, roleKey: 'Test' }
      ]
    },
    {
      id: 8,
      text: "Which tools or platforms have you used?",
      type: "multiple",
      weight: 1.0,
      options: [
        { text: "Written instructions or documentation", points: { RE: 1 }, roleKey: 'RE' },
        { text: "Managed files or versions in group settings", points: { CM: 1 }, roleKey: 'CM' },
        { text: "Created flowcharts or system diagrams", points: { Design: 1 }, roleKey: 'Design' },
        { text: "Designed visual layouts or presentations", points: { UX: 1 }, roleKey: 'UX' },
        { text: "Logged issues or verified test results", points: { Test: 1 }, roleKey: 'Test' }
      ]
    },
    {
      id: 9,
      text: "Which behaviors describe you?",
      type: "multiple",
      weight: 2.0,
      options: [
        { text: "I help teammates understand requirements", points: { RE: 2 }, roleKey: 'RE' },
        { text: "I enjoy organizing to-do lists and folders", points: { CM: 2 }, roleKey: 'CM' },
        { text: "I notice when designs or interfaces feel off", points: { UX: 2, Design: 1 }, roleKey: 'UX' },
        { text: "I think through edge cases and scenarios", points: { Test: 2, Design: 1 }, roleKey: 'Test' },
        { text: "I often write instructions for others", points: { RE: 2, CM: 1 }, roleKey: 'RE' }
      ]
    },
    {
      id: 10,
      text: "When joining a new project, what's your natural instinct?",
      type: "single",
      weight: 1.5,
      options: [
        { text: "Help define the goals and scope", points: { RE: 2 }, roleKey: 'RE' },
        { text: "Set up project structure and tools", points: { CM: 2 }, roleKey: 'CM' },
        { text: "Start planning the system architecture", points: { Design: 2 }, roleKey: 'Design' },
        { text: "Think about the user experience", points: { UX: 2 }, roleKey: 'UX' },
        { text: "Consider testing strategies", points: { Test: 2 }, roleKey: 'Test' }
      ]
    },
    {
      id: 11,
      text: "What do you usually contribute most in team work?",
      type: "single",
      weight: 2.0,
      options: [
        { text: "Writing up steps or requirements", points: { RE: 2 }, roleKey: 'RE' },
        { text: "Organizing files and documentation", points: { CM: 2 }, roleKey: 'CM' },
        { text: "Creating system diagrams", points: { Design: 2 }, roleKey: 'Design' },
        { text: "Making visual layouts or mockups", points: { UX: 2 }, roleKey: 'UX' },
        { text: "Finding issues and ensuring quality", points: { Test: 2 }, roleKey: 'Test' }
      ]
    },
    {
      id: 12,
      text: "Which role have you enjoyed most in past experiences?",
      type: "single",
      weight: 2.5,
      options: [
        { text: "Requirements gathering and documentation", points: { RE: 2 }, roleKey: 'RE' },
        { text: "Managing project setup and structure", points: { CM: 2 }, roleKey: 'CM' },
        { text: "Building logical flows and diagrams", points: { Design: 2 }, roleKey: 'Design' },
        { text: "Creating user interfaces", points: { UX: 2 }, roleKey: 'UX' },
        { text: "Spotting bugs and issues", points: { Test: 2 }, roleKey: 'Test' }
      ]
    }
  ];

  // Role Character Component
  const RoleCharacter = ({ roleKey, isAnimated = false, size = 'medium' }) => {
    const sizeClasses = {
      small: 'w-12 h-12',
      medium: 'w-24 h-24',
      large: 'w-32 h-32'
    };

    const animationClasses = isAnimated ? 'animate-bounce' : '';
    
    // Using placeholder divs styled as characters for now
    // In production, these would be replaced with Lottie animations
    const characterStyles = {
      RE: { background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' },
      CM: { background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
      Design: { background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' },
      UX: { background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)' },
      Test: { background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }
    };

    return (
      <div className={`role-character ${sizeClasses[size]} ${animationClasses}`}>
        <div 
          className="character-circle"
          style={characterStyles[roleKey]}
        >
          {React.cloneElement(roles[roleKey].icon, { 
            size: size === 'small' ? 20 : size === 'medium' ? 32 : 40,
            style: { color: '#ffffff' }
          })}
        </div>
      </div>
    );
  };

  // Validate student information
  const validateStudentInfo = () => {
    const errors = {};
    
    if (!studentInfo.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!studentInfo.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    // BU ID validation - must start with U and be followed by 8 digits
    const buIdRegex = /^U\d{8}$/;
    if (!studentInfo.buId.trim()) {
      errors.buId = 'BU ID is required';
    } else if (!buIdRegex.test(studentInfo.buId)) {
      errors.buId = 'BU ID must start with U followed by 8 digits (e.g., U41513646)';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!studentInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(studentInfo.email)) {
      errors.email = 'Please enter a valid email address';
    } else if (!studentInfo.email.toLowerCase().includes('bu.edu')) {
      errors.email = 'Please use your BU email address';
    }
    
    setStudentInfoErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle student info updates
  const updateStudentInfo = (field, value) => {
    setStudentInfo(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Handle student info submission
  const handleStudentInfoSubmit = () => {
    console.log('Validating student info:', studentInfo);
    const isValid = validateStudentInfo();
    console.log('Validation result:', isValid, 'Errors:', studentInfoErrors);
    if (isValid) {
      setCurrentPage('quiz');
    }
  };

  // Calculate results
  const calculateResults = () => {
    const scores = {
      RE: 0,
      CM: 0,
      Design: 0,
      UX: 0,
      Test: 0
    };

    // Calculate raw scores
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (!question) return;

      if (question.type === 'single') {
        const option = question.options[answer];
        if (option && option.points) {
          Object.entries(option.points).forEach(([role, points]) => {
            scores[role] += points * question.weight;
          });
        }
      } else if (question.type === 'multiple' && Array.isArray(answer)) {
        answer.forEach(optionIndex => {
          const option = question.options[optionIndex];
          if (option && option.points) {
            Object.entries(option.points).forEach(([role, points]) => {
              scores[role] += points * question.weight;
            });
          }
        });
      }
    });

    // Normalize scores
    const maxScore = Math.max(...Object.values(scores));
    const normalizedScores = {};
    Object.entries(scores).forEach(([role, score]) => {
      normalizedScores[role] = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    });

    // Get top 3 recommendations
    const sortedRoles = Object.entries(normalizedScores)
      .filter(([_, score]) => score >= 20)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const recommendations = sortedRoles.map(([role, score], index) => ({
      rank: index + 1,
      role: role,
      score: score,
      roleInfo: roles[role],
      explanation: generateExplanation(role, score, answers)
    }));

    return {
      recommendations,
      rawScores: scores,
      normalizedScores
    };
  };

  const generateExplanation = (role, score, answers) => {
    const explanations = {
      RE: "Your responses show strong alignment with requirements engineering. You enjoy documentation, clear communication, and helping others understand project needs.",
      CM: "You demonstrate excellent organizational skills and attention to structure. Your preference for managing tools and maintaining order makes you ideal for configuration management.",
      Design: "Your strategic thinking and system planning abilities shine through. You excel at seeing the big picture and designing how components work together.",
      UX: "Your creative vision and user-focused mindset are perfect for UX design. You have a natural talent for making interfaces intuitive and visually appealing.",
      Test: "Your detail-oriented nature and quality-focused approach make you an excellent tester. You have a knack for finding issues others might miss."
    };
    return explanations[role] || "Based on your responses, this role aligns well with your skills and interests.";
  };

  const handleAnswer = (answer, option) => {
    const question = questions[currentQuestion];
    
    if (question.type === 'single') {
      setShowWarning(false);
      setIsAnimating(true);
      setAnswers({ ...answers, [question.id]: answer });
      setSelectedOption(option.roleKey);
      
      setTimeout(() => {
        setSelectedOption(null);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          submitAnswers();
        }
        setIsAnimating(false);
      }, 800);
    }
  };

  const handleMultipleAnswer = (optionIndex, option) => {
    const question = questions[currentQuestion];
    const currentAnswers = answers[question.id] || [];
    
    if (currentAnswers.includes(optionIndex)) {
      setAnswers({
        ...answers,
        [question.id]: currentAnswers.filter(i => i !== optionIndex)
      });
    } else {
      setAnswers({
        ...answers,
        [question.id]: [...currentAnswers, optionIndex]
      });
      // Flash animation for selected option
      setSelectedOption(option.roleKey);
      setTimeout(() => setSelectedOption(null), 500);
    }
    setShowWarning(false);
  };

  const nextQuestion = () => {
    const question = questions[currentQuestion];
    
    // Validation for single choice questions
    if (question.type === 'single' && answers[question.id] === undefined) {
      setShowWarning(true);
      return;
    }
    
    // Validation for multiple choice questions
    if (question.type === 'multiple' && (!answers[question.id] || answers[question.id].length === 0)) {
      setShowWarning(true);
      return;
    }
    
    setShowWarning(false);
    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        submitAnswers();
      }
      setIsAnimating(false);
    }, 300);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setShowWarning(false);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const submitAnswers = () => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setCurrentPage('results');
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
    setShowWarning(false);
    setStudentInfo({
      firstName: '',
      lastName: '',
      buId: '',
      email: ''
    });
    setStudentInfoErrors({});
    setCurrentPage('studentInfo');
  };

  const exportToCSV = () => {
    if (!results) return;
    
    // Create a single row with all three recommendations
    const roles = results.recommendations.map(rec => rec.roleInfo.name).join(',');
    let csv = "Name,BU Email,BU ID,Role 1,Role 2,Role 3\n";
    csv += `"${studentInfo.firstName} ${studentInfo.lastName}","${studentInfo.email}","${studentInfo.buId}",${results.recommendations.map(rec => `"${rec.roleInfo.name}"`).join(',')}\n`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rolematch-results-${studentInfo.buId}.csv`;
    a.click();
  };

  const exportToPDF = () => {
    if (!results) return;
    
    // Create a new window with printable content
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>RoleMatch Results - ${studentInfo.firstName} ${studentInfo.lastName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            
            body {
              font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
              margin: 0;
              padding: 40px;
              background: #ffffff;
              color: #1a1c1e;
              line-height: 1.6;
            }
            
            .header {
              text-align: center;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e5e7eb;
            }
            
            .header h1 {
              color: #006495;
              font-size: 36px;
              margin: 0 0 10px 0;
            }
            
            .header p {
              color: #6b7280;
              font-size: 16px;
              margin: 0;
            }
            
            .student-info {
              background: #f3f4f6;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 30px;
            }
            
            .student-info h2 {
              color: #1a1c1e;
              font-size: 20px;
              margin: 0 0 12px 0;
            }
            
            .student-info p {
              margin: 4px 0;
              color: #4b5563;
            }
            
            .result-card {
              background: #f9fafb;
              border-radius: 16px;
              padding: 24px;
              margin-bottom: 24px;
              border: 1px solid #e5e7eb;
              page-break-inside: avoid;
            }
            
            .result-header {
              display: flex;
              align-items: center;
              margin-bottom: 16px;
            }
            
            .rank-circle {
              width: 48px;
              height: 48px;
              background: #006495;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              font-weight: bold;
              margin-right: 16px;
            }
            
            .role-info h2 {
              margin: 0;
              color: #1a1c1e;
              font-size: 24px;
            }
            
            .match-percentage {
              color: #006495;
              font-weight: 600;
              font-size: 18px;
              margin: 4px 0 0 0;
            }
            
            .description {
              color: #4b5563;
              margin: 16px 0;
              font-style: italic;
            }
            
            .explanation {
              color: #1a1c1e;
              margin: 16px 0;
            }
            
            .skills {
              margin-top: 16px;
            }
            
            .skills-label {
              font-weight: 600;
              color: #1a1c1e;
              margin-bottom: 8px;
            }
            
            .skill-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }
            
            .skill-tag {
              background: #e5e7eb;
              color: #374151;
              padding: 6px 16px;
              border-radius: 20px;
              font-size: 14px;
            }
            
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 14px;
            }
            
            @media print {
              body {
                padding: 20px;
              }
              
              .result-card {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>RoleMatch Results</h1>
            <p>Generated on ${new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          
          <div class="student-info">
            <h2>Student Information</h2>
            <p><strong>Name:</strong> ${studentInfo.firstName} ${studentInfo.lastName}</p>
            <p><strong>BU ID:</strong> ${studentInfo.buId}</p>
            <p><strong>Email:</strong> ${studentInfo.email}</p>
          </div>
          
          ${results.recommendations.map(rec => `
            <div class="result-card">
              <div class="result-header">
                <div class="rank-circle">${rec.rank}</div>
                <div class="role-info">
                  <h2>${rec.roleInfo.name}</h2>
                  <p class="match-percentage">${rec.score}% Match</p>
                </div>
              </div>
              
              <p class="description">${rec.roleInfo.description}</p>
              <p class="explanation">${rec.explanation}</p>
              
              <div class="skills">
                <p class="skills-label">Key Skills:</p>
                <div class="skill-tags">
                  ${rec.roleInfo.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
          
          <div class="footer">
            <p>RoleMatch - Smart Role Recommender for CS673 Software Engineering</p>
            <p>Find your perfect team role at rolematch.app</p>
          </div>
          
          <script>
            // Auto-trigger print dialog
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const shareResults = async () => {
    if (!results) return;
    
    const text = `My RoleMatch Results:\n\n${results.recommendations.map(rec => 
      `${rec.rank}. ${rec.roleInfo.name} (${rec.score}% match)`
    ).join('\n')}\n\nDiscover your perfect team role at RoleMatch!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RoleMatch Results',
          text: text
        });
        setShareNotification('Results shared successfully!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Fallback to clipboard
          copyToClipboard(text);
        }
      }
    } else {
      // Fallback to clipboard
      copyToClipboard(text);
    }
    
    setTimeout(() => setShareNotification(''), 3000);
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareNotification('Results copied to clipboard!');
    }).catch(() => {
      setShareNotification('Unable to share results');
    });
  };

  // Theme Toggle Button Component
  // Auto dark mode is enabled - no manual toggle needed

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, overflow: 'auto' }}>
      <div className="relative">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="blob blob-1" style={{ backgroundColor: theme.primary }}></div>
          <div className="blob blob-2" style={{ backgroundColor: theme.secondary }}></div>
          <div className="blob blob-3" style={{ backgroundColor: theme.tertiary }}></div>
        </div>

        <div className="relative z-10">
          {/* Navigation */}
          <nav className="px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold" style={{ color: theme.primary }}>RoleMatch</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="nav-button px-4 py-2 rounded-full transition-all"
                  style={{ 
                    color: theme.onSurface,
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.outline}`,
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.surfaceVariant;
                    e.target.style.color = theme.onSurfaceVariant;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = theme.onSurface;
                  }}
                >
                  About
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <div className="mb-8">
              <h2 className="text-6xl font-bold mb-6" style={{ color: theme.onBackground }}>
                Find Your Perfect<br />
                <span className="gradient-text" style={{ 
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.tertiary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block'
                }}>Team Role</span>
              </h2>
              <p className="text-xl mb-8" style={{ color: theme.onSurfaceVariant }}>
                Discover where you'll thrive in your next software engineering project with our intelligent role matching system
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('studentInfo')}
              className="primary-button group"
              style={{ 
                backgroundColor: theme.primary,
                color: theme.onPrimary,
                boxShadow: '0 8px 32px rgba(0, 100, 149, 0.3)',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontSize: '18px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 100, 149, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 100, 149, 0.3)';
              }}
            >
              Start Assessment
              <ArrowRight size={20} className="arrow-icon" />
            </button>

            {/* Role Preview - moved here above features */}
            <div className="mt-20 mb-16">
              <h3 className="text-2xl font-semibold mb-8" style={{ color: theme.onSurface }}>
                Discover Your Role Among
              </h3>
              <div className="role-grid-container">
                <div className="role-grid-top">
                  {Object.entries(roles).slice(0, 3).map(([key, role]) => (
                    <div 
                      key={key} 
                      className="role-card"
                      style={{ 
                        backgroundColor: theme.elevation1,
                        border: `2px solid ${hoveredRole === key ? role.color : 'transparent'}`,
                        transform: hoveredRole === key ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'visible'
                      }}
                      onMouseEnter={() => setHoveredRole(key)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      <RoleCharacter roleKey={key} isAnimated={hoveredRole === key} size="medium" />
                      <h4 style={{ color: theme.onSurface, marginTop: '12px', fontWeight: '600' }}>
                        {role.name}
                      </h4>
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: `translateX(-50%) translateY(${hoveredRole === key ? '10px' : '0'})`,
                        backgroundColor: theme.surface,
                        padding: '12px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                        opacity: hoveredRole === key ? 1 : 0,
                        visibility: hoveredRole === key ? 'visible' : 'hidden',
                        transition: 'all 0.3s ease',
                        width: '200px',
                        zIndex: 10,
                        border: `1px solid ${theme.outline}`
                      }}>
                        <p style={{ color: theme.onSurface, fontSize: '14px' }}>
                          {role.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="role-grid-bottom">
                  {Object.entries(roles).slice(3, 5).map(([key, role]) => (
                    <div 
                      key={key} 
                      className="role-card"
                      style={{ 
                        backgroundColor: theme.elevation1,
                        border: `2px solid ${hoveredRole === key ? role.color : 'transparent'}`,
                        transform: hoveredRole === key ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'visible'
                      }}
                      onMouseEnter={() => setHoveredRole(key)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      <RoleCharacter roleKey={key} isAnimated={hoveredRole === key} size="medium" />
                      <h4 style={{ color: theme.onSurface, marginTop: '12px', fontWeight: '600' }}>
                        {role.name}
                      </h4>
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: `translateX(-50%) translateY(${hoveredRole === key ? '-10px' : '0'})`,
                        backgroundColor: theme.surface,
                        padding: '12px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                        opacity: hoveredRole === key ? 1 : 0,
                        visibility: hoveredRole === key ? 'visible' : 'hidden',
                        transition: 'all 0.3s ease',
                        width: '200px',
                        zIndex: 10,
                        border: `1px solid ${theme.outline}`
                      }}>
                        <p style={{ color: theme.onSurface, fontSize: '14px' }}>
                          {role.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="features-grid" style={{ marginBottom: '80px' }}>
              <div className="feature-card" style={{ backgroundColor: theme.elevation1 }}>
                <div className="feature-icon" style={{ backgroundColor: theme.primaryContainer }}>
                  <Zap size={24} style={{ color: theme.onPrimaryContainer }} />
                </div>
                <h3 style={{ color: theme.onSurface }}>Quick & Easy</h3>
                <p style={{ color: theme.onSurfaceVariant }}>Complete the assessment in under 5 minutes</p>
              </div>

              <div className="feature-card" style={{ backgroundColor: theme.elevation1 }}>
                <div className="feature-icon" style={{ backgroundColor: theme.secondaryContainer }}>
                  <Target size={24} style={{ color: theme.onSecondaryContainer }} />
                </div>
                <h3 style={{ color: theme.onSurface }}>Accurate Matching</h3>
                <p style={{ color: theme.onSurfaceVariant }}>Smart algorithm analyzes your skills and preferences</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
              <div className="feature-card" style={{ backgroundColor: theme.elevation1, maxWidth: '320px' }}>
                <div className="feature-icon" style={{ backgroundColor: theme.tertiaryContainer }}>
                  <Users size={24} style={{ color: theme.onTertiaryContainer }} />
                </div>
                <h3 style={{ color: theme.onSurface }}>Better Teams</h3>
                <p style={{ color: theme.onSurfaceVariant }}>Build stronger, more effective project teams</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .blob {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(80px);
        }
        
        .blob-1 {
          width: 400px;
          height: 400px;
          top: -200px;
          right: -200px;
          animation: float 20s ease-in-out infinite;
        }
        
        .blob-2 {
          width: 350px;
          height: 350px;
          bottom: -175px;
          left: -175px;
          animation: float 25s ease-in-out infinite reverse;
        }
        
        .blob-3 {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 15s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.15; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .arrow-icon {
          transition: transform 0.3s ease;
        }
        
        .primary-button:hover .arrow-icon {
          transform: translateX(4px);
        }
        
        .role-grid-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .role-grid-top {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .role-grid-bottom {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        
        .role-card {
          padding: 20px;
          border-radius: 20px;
          text-align: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 200px;
        }
        
        .role-character {
          position: relative;
        }
        
        .character-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 80px;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }
        
        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .role-grid-top {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .role-grid-bottom {
            flex-direction: column;
            align-items: center;
          }
          
          .role-card {
            max-width: 150px;
          }
        }
        
        .feature-card {
          padding: 24px;
          border-radius: 24px;
          transition: all 0.3s ease;
          cursor: default;
        }
        
        .feature-card:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        
        .feature-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .feature-card p {
          font-size: 14px;
          line-height: 1.5;
        }
        
        input[type="text"],
        input[type="email"] {
          font-size: 16px !important; /* Prevents zoom on iOS */
        }
        
        /* Prevent input field issues */
        input {
          -webkit-user-modify: read-write-plaintext-only;
        }
        
        /* Common styles */
        .min-h-screen { min-height: 100vh; }
        .max-w-4xl { max-width: 56rem; }
        .max-w-7xl { max-width: 80rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .z-10 { z-index: 10; }
        .overflow-hidden { overflow: hidden; }
        .text-center { text-align: center; }
        .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .text-6xl { font-size: 3.75rem; line-height: 1; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .mb-16 { margin-bottom: 4rem; }
        .mt-20 { margin-top: 5rem; }
        .gap-4 { gap: 1rem; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .flex-wrap { flex-wrap: wrap; }
        .rounded-full { border-radius: 9999px; }
        .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
      `}</style>
    </div>
  );

  // Student Info Page Component
  const StudentInfoPage = () => {
    // Local state management for better performance
    const [localInfo, setLocalInfo] = useState(studentInfo);
    
    const handleLocalInputChange = (field) => (e) => {
      const { value } = e.target;
      setLocalInfo(prev => ({
        ...prev,
        [field]: value
      }));
    };
    
    const handleLocalBuIdChange = (e) => {
      const value = e.target.value.toUpperCase();
      if (value === '' || /^U\d{0,8}$/.test(value)) {
        setLocalInfo(prev => ({
          ...prev,
          buId: value
        }));
      }
    };
    
    const validateLocalInfo = () => {
      const errors = {};
      
      if (!localInfo.firstName.trim()) {
        errors.firstName = 'First name is required';
      }
      
      if (!localInfo.lastName.trim()) {
        errors.lastName = 'Last name is required';
      }
      
      // BU ID validation - must start with U and be followed by 8 digits
      const buIdRegex = /^U\d{8}$/;
      if (!localInfo.buId.trim()) {
        errors.buId = 'BU ID is required';
      } else if (!buIdRegex.test(localInfo.buId)) {
        errors.buId = 'BU ID must start with U followed by 8 digits (e.g., U41513646)';
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!localInfo.email.trim()) {
        errors.email = 'Email is required';
      } else if (!emailRegex.test(localInfo.email)) {
        errors.email = 'Please enter a valid email address';
      } else if (!localInfo.email.toLowerCase().includes('bu.edu')) {
        errors.email = 'Please use your BU email address';
      }
      
      setStudentInfoErrors(errors);
      return Object.keys(errors).length === 0;
    };
    
    const handleSubmit = () => {
      if (validateLocalInfo()) {
        setStudentInfo(localInfo);
        setCurrentPage('quiz');
      }
    };
    
    return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, overflow: 'auto' }}>
      <div className="relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="info-blob-1" style={{ backgroundColor: theme.primary }}></div>
          <div className="info-blob-2" style={{ backgroundColor: theme.secondary }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: theme.onBackground }}>
              Student Information
            </h1>
            <p className="text-lg" style={{ color: theme.onSurfaceVariant }}>
              Please enter your details to begin the assessment
            </p>
          </div>

          {/* Form Card */}
          <div className="form-card" style={{ 
            backgroundColor: theme.surface,
            boxShadow: darkMode 
              ? '0 10px 40px rgba(0, 0, 0, 0.5)' 
              : '0 10px 40px rgba(0, 0, 0, 0.08)'
          }}>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label" style={{ color: theme.onSurface }}>
                <User size={20} />
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                inputMode="text"
                value={localInfo.firstName}
                onChange={handleLocalInputChange('firstName')}
                className="form-input"
                style={{ 
                  backgroundColor: theme.elevation1,
                  color: theme.onSurface,
                  borderColor: studentInfoErrors.firstName ? theme.error : theme.outline
                }}
                placeholder="Enter your first name"
                autoComplete="given-name"
                spellCheck="false"
                autoCapitalize="words"
                data-testid="firstName-input"
              />
              {studentInfoErrors.firstName && (
                <p className="error-message" style={{ color: theme.error }}>
                  {studentInfoErrors.firstName}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label" style={{ color: theme.onSurface }}>
                <User size={20} />
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={localInfo.lastName}
                onChange={handleLocalInputChange('lastName')}
                className="form-input"
                style={{ 
                  backgroundColor: theme.elevation1,
                  color: theme.onSurface,
                  borderColor: studentInfoErrors.lastName ? theme.error : theme.outline
                }}
                placeholder="Enter your last name"
                autoComplete="family-name"
                spellCheck="false"
                autoCapitalize="words"
              />
              {studentInfoErrors.lastName && (
                <p className="error-message" style={{ color: theme.error }}>
                  {studentInfoErrors.lastName}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="buId" className="form-label" style={{ color: theme.onSurface }}>
                <CreditCard size={20} />
                BU ID
              </label>
              <input
                id="buId"
                name="buId"
                type="text"
                value={localInfo.buId}
                onChange={handleLocalBuIdChange}
                className="form-input"
                style={{ 
                  backgroundColor: theme.elevation1,
                  color: theme.onSurface,
                  borderColor: studentInfoErrors.buId ? theme.error : theme.outline
                }}
                placeholder="U12345678"
                maxLength={9}
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="characters"
              />
              {studentInfoErrors.buId && (
                <p className="error-message" style={{ color: theme.error }}>
                  {studentInfoErrors.buId}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label" style={{ color: theme.onSurface }}>
                <Mail size={20} />
                BU Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                value={localInfo.email}
                onChange={handleLocalInputChange('email')}
                className="form-input"
                style={{ 
                  backgroundColor: theme.elevation1,
                  color: theme.onSurface,
                  borderColor: studentInfoErrors.email ? theme.error : theme.outline
                }}
                placeholder="yourname@bu.edu"
                autoComplete="email"
                spellCheck="false"
                autoCapitalize="off"
              />
              {studentInfoErrors.email && (
                <p className="error-message" style={{ color: theme.error }}>
                  {studentInfoErrors.email}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="submit-btn"
              style={{ 
                backgroundColor: theme.primary,
                color: theme.onPrimary,
                boxShadow: '0 4px 20px rgba(0, 100, 149, 0.3)'
              }}
            >
              Start Assessment
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .info-blob-1 {
          position: absolute;
          width: 400px;
          height: 400px;
          top: 10%;
          left: -200px;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 20s ease-in-out infinite;
        }
        
        .info-blob-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          bottom: 10%;
          right: -200px;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 25s ease-in-out infinite reverse;
        }
        
        .form-card {
          border-radius: 24px;
          padding: 40px;
          transition: all 0.3s ease;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 16px;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 2px solid;
          font-size: 16px;
          transition: all 0.3s ease;
          outline: none;
          box-sizing: border-box;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          display: block;
          touch-action: manipulation;
          position: relative;
          z-index: 1;
          background-clip: padding-box;
        }
        
        .form-input:focus {
          border-color: ${theme.primary} !important;
          box-shadow: 0 0 0 3px ${theme.primary}20;
        }
        
        .form-input::-webkit-inner-spin-button,
        .form-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .form-input::-webkit-search-decoration,
        .form-input::-webkit-search-cancel-button,
        .form-input::-webkit-search-results-button,
        .form-input::-webkit-search-results-decoration {
          display: none;
        }
        
        .form-input:-webkit-autofill,
        .form-input:-webkit-autofill:hover,
        .form-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px ${theme.elevation1} inset !important;
          -webkit-text-fill-color: ${theme.onSurface} !important;
          caret-color: ${theme.onSurface} !important;
        }
        
        .error-message {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .submit-btn {
          width: 100%;
          padding: 16px 24px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 32px;
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 100, 149, 0.4) !important;
        }
        
        /* Common styles */
        .container { width: 100%; margin: 0 auto; padding: 0 1rem; }
        .max-w-2xl { max-width: 42rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .font-bold { font-weight: 700; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
      `}</style>
    </div>
    );
  };

  // About Page Component
  const AboutPage = () => (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, overflow: 'auto' }}>
      <div className="relative">
        {/* Navigation */}
        <nav className="px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button
              onClick={() => setCurrentPage('landing')}
              className="home-button"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '12px',
                backgroundColor: theme.primaryContainer,
                color: theme.onPrimaryContainer,
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.primaryContainer;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.elevation1;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Home size={20} />
              RoleMatch
            </button>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-8" style={{ color: theme.onBackground }}>About RoleMatch</h1>
          
          <div className="space-y-8">
            <section className="section-card" style={{ backgroundColor: theme.elevation1 }}>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.primary }}>Our Mission</h2>
              <p className="text-lg leading-relaxed" style={{ color: theme.onSurfaceVariant }}>
                RoleMatch is a smart role recommendation system created for CS673 Software Engineering course. 
                It's designed to revolutionize team formation by matching individuals to their optimal project roles. 
                We believe that when people work in roles that align with their skills, interests, and working style, 
                teams become more productive, creative, and successful.
              </p>
            </section>

            <section className="section-card" style={{ backgroundColor: theme.elevation1 }}>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.primary }}>How It Works</h2>
              <div className="space-y-4">
                <div className="step-item">
                  <div className="step-number" style={{ backgroundColor: theme.primaryContainer }}>
                    <span style={{ color: theme.onPrimaryContainer }}>1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: theme.onSurface }}>Take the Assessment</h3>
                    <p style={{ color: theme.onSurfaceVariant }}>Answer 12 carefully crafted questions about your skills, preferences, and experience.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-number" style={{ backgroundColor: theme.primaryContainer }}>
                    <span style={{ color: theme.onPrimaryContainer }}>2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: theme.onSurface }}>Smart Analysis</h3>
                    <p style={{ color: theme.onSurfaceVariant }}>Our algorithm analyzes your responses using weighted scoring to find your ideal matches.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-number" style={{ backgroundColor: theme.primaryContainer }}>
                    <span style={{ color: theme.onPrimaryContainer }}>3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: theme.onSurface }}>Get Your Results</h3>
                    <p style={{ color: theme.onSurfaceVariant }}>Receive your top 3 role recommendations with detailed explanations and match percentages.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-card" style={{ backgroundColor: theme.elevation1 }}>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.primary }}>The Roles</h2>
              <div className="space-y-4">
                {Object.entries(roles).map(([key, role]) => (
                  <div key={key} className="role-item">
                    <div style={{ color: theme.primary }}>{role.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: theme.onSurface }}>{role.name}</h3>
                      <p style={{ color: theme.onSurfaceVariant }}>{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="section-card" style={{ backgroundColor: theme.elevation1 }}>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.primary }}>Our Team</h2>
              <ul className="team-list" style={{ color: theme.onSurfaceVariant }}>
                <li>• <strong>Gagan Veginati</strong> - Software Designer and Developer, Front-end Lead</li>
                <li>• <strong>Swamy Tuttagunta</strong> - Software Developer, Team Lead</li>
                <li>• <strong>Yuqing Zheng</strong> - UX Developer, Back-end Lead</li>
                <li>• <strong>Brady Wu</strong> - Software Tester, Test Lead</li>
                <li>• <strong>Paul Mulroney</strong> - Project Manager, Requirements Lead</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-card {
          padding: 24px;
          border-radius: 24px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        }
        
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        
        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: 600;
        }
        
        .role-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        
        .team-list {
          list-style: none;
          padding: 0;
        }
        
        .team-list li {
          margin-bottom: 8px;
          line-height: 1.6;
        }
        
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-8 > * + * { margin-top: 2rem; }
        .font-semibold { font-weight: 600; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-4 { margin-bottom: 1rem; }
        .leading-relaxed { line-height: 1.625; }
      `}</style>
    </div>
  );

  // Quiz Page Component
  const QuizPage = () => {
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen" style={{ backgroundColor: theme.background, overflow: 'auto' }}>
        <div className="relative">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="quiz-blob-1" style={{ backgroundColor: theme.primary }}></div>
            <div className="quiz-blob-2" style={{ backgroundColor: theme.secondary }}></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
            {/* Header with Home Button */}
            <nav className="mb-8">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentPage('landing')}
                  className="home-btn"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    backgroundColor: theme.primaryContainer,
                    color: theme.onPrimaryContainer,
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Home size={20} />
                  RoleMatch
                </button>
              </div>
            </nav>
            
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2" style={{ color: theme.onBackground }}>
                RoleMatch Assessment
              </h1>
              <p className="text-lg" style={{ color: theme.onSurfaceVariant }}>
                {studentInfo.firstName} {studentInfo.lastName} ({studentInfo.buId})
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium" style={{ color: theme.onSurfaceVariant }}>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="progress-bar" style={{ backgroundColor: theme.surfaceVariant }}>
                <div
                  className="progress-fill"
                  style={{ 
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.tertiary} 100%)`
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div
              className={`question-card ${isAnimating ? 'animating' : ''}`}
              style={{ 
                backgroundColor: theme.surface,
                boxShadow: darkMode 
                  ? '0 10px 40px rgba(0, 0, 0, 0.5)' 
                  : '0 10px 40px rgba(0, 0, 0, 0.08)'
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme.onSurface }}>
                {questions[currentQuestion].text}
              </h2>

              {/* Warning Message */}
              {showWarning && (
                <div className="warning-message" style={{ backgroundColor: theme.error + '20' }}>
                  <Info size={20} style={{ color: theme.error }} />
                  <span style={{ color: theme.error }}>
                    {questions[currentQuestion].type === 'multiple' 
                      ? 'Please select at least one option' 
                      : 'Please select an option'}
                  </span>
                </div>
              )}

              <div className="options-container">
                {questions[currentQuestion].options.map((option, index) => {
                  const question = questions[currentQuestion];
                  const isSelected = question.type === 'single' 
                    ? answers[question.id] === index
                    : (answers[question.id] || []).includes(index);

                  return (
                    <div key={index} className="option-wrapper">
                      <button
                        onClick={() => {
                          if (question.type === 'single') {
                            handleAnswer(index, option);
                          } else {
                            handleMultipleAnswer(index, option);
                          }
                        }}
                        className={`option-button ${isSelected ? 'selected' : ''}`}
                        style={{ 
                          backgroundColor: isSelected ? theme.primaryContainer : theme.elevation1,
                          color: isSelected ? theme.onPrimaryContainer : theme.onSurfaceVariant,
                          borderColor: isSelected ? theme.primary : 'transparent',
                          boxShadow: isSelected ? '0 4px 16px rgba(0, 100, 149, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div className="option-content">
                          {question.type === 'multiple' && (
                            <div className={`checkbox ${isSelected ? 'checked' : ''}`} 
                                 style={{ 
                                   backgroundColor: isSelected ? theme.primary : 'transparent',
                                   borderColor: isSelected ? theme.primary : theme.outline
                                 }}>
                              {isSelected && <CheckCircle2 size={16} style={{ color: theme.onPrimary }} />}
                            </div>
                          )}
                          <span className="option-text">{option.text}</span>
                        </div>
                      </button>
                      {selectedOption === option.roleKey && (
                        <div className="role-popup">
                          <RoleCharacter roleKey={option.roleKey} isAnimated={true} size="small" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="navigation">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`nav-btn prev-btn ${currentQuestion === 0 ? 'disabled' : ''}`}
                  style={{ 
                    backgroundColor: currentQuestion === 0 ? theme.surfaceVariant : theme.elevation2,
                    color: currentQuestion === 0 ? theme.onSurfaceVariant : theme.onSurface
                  }}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                {questions[currentQuestion].type === 'multiple' && (
                  <span className="select-hint" style={{ color: theme.onSurfaceVariant }}>
                    Select all that apply
                  </span>
                )}

                <button
                  onClick={nextQuestion}
                  className="nav-btn next-btn"
                  style={{ 
                    backgroundColor: theme.primary,
                    color: theme.onPrimary,
                    boxShadow: '0 4px 20px rgba(0, 100, 149, 0.3)'
                  }}
                >
                  {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium" style={{ color: theme.onSurfaceVariant }}>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="progress-bar" style={{ backgroundColor: theme.surfaceVariant }}>
                <div
                  className="progress-fill"
                  style={{ 
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.tertiary} 100%)`
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div
              className={`question-card ${isAnimating ? 'animating' : ''}`}
              style={{ 
                backgroundColor: theme.surface,
                boxShadow: darkMode 
                  ? '0 10px 40px rgba(0, 0, 0, 0.5)' 
                  : '0 10px 40px rgba(0, 0, 0, 0.08)'
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme.onSurface }}>
                {questions[currentQuestion].text}
              </h2>

              {/* Warning Message */}
              {showWarning && (
                <div className="warning-message" style={{ backgroundColor: theme.error + '20' }}>
                  <Info size={20} style={{ color: theme.error }} />
                  <span style={{ color: theme.error }}>
                    {questions[currentQuestion].type === 'multiple' 
                      ? 'Please select at least one option' 
                      : 'Please select an option'}
                  </span>
                </div>
              )}

              <div className="options-container">
                {questions[currentQuestion].options.map((option, index) => {
                  const question = questions[currentQuestion];
                  const isSelected = question.type === 'single' 
                    ? answers[question.id] === index
                    : (answers[question.id] || []).includes(index);

                  return (
                    <div key={index} className="option-wrapper">
                      <button
                        onClick={() => {
                          if (question.type === 'single') {
                            handleAnswer(index, option);
                          } else {
                            handleMultipleAnswer(index, option);
                          }
                        }}
                        className={`option-button ${isSelected ? 'selected' : ''}`}
                        style={{ 
                          backgroundColor: isSelected ? theme.primaryContainer : theme.elevation1,
                          color: isSelected ? theme.onPrimaryContainer : theme.onSurfaceVariant,
                          borderColor: isSelected ? theme.primary : 'transparent',
                          boxShadow: isSelected ? '0 4px 16px rgba(0, 100, 149, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div className="option-content">
                          {question.type === 'multiple' && (
                            <div className={`checkbox ${isSelected ? 'checked' : ''}`} 
                                 style={{ 
                                   backgroundColor: isSelected ? theme.primary : 'transparent',
                                   borderColor: isSelected ? theme.primary : theme.outline
                                 }}>
                              {isSelected && <CheckCircle2 size={16} style={{ color: theme.onPrimary }} />}
                            </div>
                          )}
                          <span className="option-text">{option.text}</span>
                        </div>
                      </button>
                      {selectedOption === option.roleKey && (
                        <div className="role-popup">
                          <RoleCharacter roleKey={option.roleKey} isAnimated={true} size="small" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="navigation">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`nav-btn prev-btn ${currentQuestion === 0 ? 'disabled' : ''}`}
                  style={{ 
                    backgroundColor: currentQuestion === 0 ? theme.surfaceVariant : theme.elevation2,
                    color: currentQuestion === 0 ? theme.onSurfaceVariant : theme.onSurface
                  }}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                {questions[currentQuestion].type === 'multiple' && (
                  <span className="select-hint" style={{ color: theme.onSurfaceVariant }}>
                    Select all that apply
                  </span>
                )}

                <button
                  onClick={nextQuestion}
                  className="nav-btn next-btn"
                  style={{ 
                    backgroundColor: theme.primary,
                    color: theme.onPrimary,
                    boxShadow: '0 4px 20px rgba(0, 100, 149, 0.3)'
                  }}
                >
                  {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .home-btn {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          
          .home-btn:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          
          .quiz-blob-1 {
            position: absolute;
            width: 400px;
            height: 400px;
            top: 25%;
            left: -200px;
            border-radius: 50%;
            filter: blur(80px);
            animation: float 20s ease-in-out infinite;
          }
          
          .quiz-blob-2 {
            position: absolute;
            width: 400px;
            height: 400px;
            bottom: 25%;
            right: -200px;
            border-radius: 50%;
            filter: blur(80px);
            animation: float 25s ease-in-out infinite reverse;
          }
          
          .progress-bar {
            height: 8px;
            border-radius: 9999px;
            overflow: hidden;
          }
          
          .progress-fill {
            height: 100%;
            transition: width 0.5s ease-out;
          }
          
          .question-card {
            border-radius: 24px;
            padding: 32px;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .question-card.animating {
            transform: scale(0.95);
            opacity: 0.5;
          }
          
          .warning-message {
            margin-bottom: 16px;
            padding: 12px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            animation: shake 0.5s ease-in-out;
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
          
          .options-container {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 32px;
          }
          
          .option-wrapper {
            position: relative;
          }
          
          .option-button {
            width: 100%;
            text-align: left;
            padding: 16px 20px;
            border-radius: 16px;
            transition: all 0.2s ease;
            border: 2px solid transparent;
            cursor: pointer;
          }
          
          .option-button:hover {
            transform: scale(1.01);
          }
          
          .option-button.selected {
            transform: scale(1.02);
          }
          
          .option-content {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .checkbox {
            width: 20px;
            height: 20px;
            border-radius: 6px;
            border: 2px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            flex-shrink: 0;
          }
          
          .option-text {
            flex: 1;
            font-weight: 500;
            font-size: 16px;
          }
          
          .role-popup {
            position: absolute;
            right: -80px;
            top: 50%;
            transform: translateY(-50%);
            animation: slideInRight 0.3s ease-out;
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(20px) translateY(-50%);
            }
            to {
              opacity: 1;
              transform: translateX(0) translateY(-50%);
            }
          }
          
          .navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 32px;
          }
          
          .nav-btn {
            padding: 12px 24px;
            border-radius: 9999px;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            border: none;
            cursor: pointer;
            font-size: 16px;
          }
          
          .nav-btn:hover:not(.disabled) {
            transform: scale(1.05);
          }
          
          .nav-btn.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .select-hint {
            font-size: 14px;
            font-weight: 500;
          }
          
          /* Common styles */
          .container { width: 100%; margin: 0 auto; padding: 0 1rem; }
          .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
          .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
          .font-bold { font-weight: 700; }
          .font-medium { font-weight: 500; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-8 { margin-bottom: 2rem; }
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
          .flex-1 { flex: 1; }
        `}</style>
      </div>
    );
  };

  // Results Page Component
  const ResultsPage = () => (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, overflow: 'auto' }}>
      <div className="relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {results.recommendations.map((rec, index) => (
            <div key={rec.role}
                 className="result-blob"
                 style={{ 
                   background: `linear-gradient(135deg, ${rec.roleInfo.gradient.from} 0%, ${rec.roleInfo.gradient.to} 100%)`,
                   top: `${index * 30}%`,
                   left: index % 2 === 0 ? '-10%' : '60%',
                   animationDelay: `${index * 0.5}s`
                 }}></div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="results-header">
            <h1 className="text-4xl font-bold" style={{ color: theme.onBackground }}>
              Your Results
            </h1>
            <div className="header-actions">
              <button
                onClick={restart}
                className="retake-btn"
                style={{ 
                  backgroundColor: theme.primary,
                  color: theme.onPrimary,
                  boxShadow: '0 4px 20px rgba(0, 100, 149, 0.3)'
                }}
              >
                <RefreshCw size={20} />
                Retake Quiz
              </button>
            </div>
          </div>

          {/* Student Info Summary */}
          <div className="student-summary" style={{ 
            backgroundColor: theme.elevation1,
            color: theme.onSurfaceVariant,
            padding: '12px 24px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            <strong>{studentInfo.firstName} {studentInfo.lastName}</strong> • {studentInfo.buId} • {studentInfo.email}
          </div>

          {/* Results Cards with Character Animations */}
          <div className="results-grid">
            {results.recommendations.map((rec, index) => (
              <div
                key={rec.role}
                className="result-card"
                style={{
                  backgroundColor: theme.surface,
                  boxShadow: darkMode 
                    ? '0 10px 40px rgba(0, 0, 0, 0.5)' 
                    : '0 10px 40px rgba(0, 0, 0, 0.08)',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="card-content">
                  <div className="card-main">
                    <div className="card-header">
                      <RoleCharacter roleKey={rec.role} isAnimated={false} size="large" />
                      <div>
                        <h3 className="role-name" style={{ color: theme.onSurface }}>
                          {rec.roleInfo.name}
                        </h3>
                        <p className="match-percentage" style={{ color: theme.primary }}>
                          {rec.score}% Match
                        </p>
                      </div>
                    </div>
                    
                    <p className="explanation" style={{ color: theme.onSurfaceVariant }}>
                      {rec.explanation}
                    </p>
                    
                    <p className="description" style={{ color: theme.onSurfaceVariant }}>
                      {rec.roleInfo.description}
                    </p>
                    
                    <div className="skills-container">
                      {rec.roleInfo.skills.map(skill => (
                        <span
                          key={skill}
                          className="skill-tag"
                          style={{
                            backgroundColor: theme.secondaryContainer,
                            color: theme.onSecondaryContainer
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="score-visual">
                    <svg className="score-circle" viewBox="0 0 96 96">
                      <circle
                        cx="48"
                        cy="48"
                        r="36"
                        stroke={theme.surfaceVariant}
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="36"
                        stroke={`url(#gradient-${rec.role})`}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - rec.score / 100)}`}
                        className="score-progress"
                      />
                      <defs>
                        <linearGradient id={`gradient-${rec.role}`}>
                          <stop offset="0%" stopColor={rec.roleInfo.gradient.from} />
                          <stop offset="100%" stopColor={rec.roleInfo.gradient.to} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="score-text">
                      <span style={{ color: theme.onSurface }}>{rec.score}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Export Options */}
          <div className="export-card" style={{ 
            backgroundColor: theme.surface,
            boxShadow: darkMode 
              ? '0 10px 40px rgba(0, 0, 0, 0.5)' 
              : '0 10px 40px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 className="export-title" style={{ color: theme.onSurface }}>
              Save & Share Your Results
            </h3>
            <div className="export-buttons">
              <button
                onClick={exportToCSV}
                className="export-btn"
                style={{ 
                  backgroundColor: theme.secondaryContainer,
                  color: theme.onSecondaryContainer
                }}
              >
                <Download size={20} />
                Download CSV
              </button>
              <button
                onClick={exportToPDF}
                className="export-btn"
                style={{ 
                  backgroundColor: theme.tertiaryContainer,
                  color: theme.onTertiaryContainer
                }}
              >
                <Download size={20} />
                Download PDF
              </button>
              <button
                onClick={shareResults}
                className="export-btn"
                style={{ 
                  backgroundColor: theme.primaryContainer,
                  color: theme.onPrimaryContainer
                }}
              >
                <Share2 size={20} />
                Share Results
              </button>
            </div>
          </div>

          {/* Share Notification */}
          {shareNotification && (
            <div className="share-notification" style={{ 
              backgroundColor: theme.primary,
              color: theme.onPrimary
            }}>
              {shareNotification}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .result-blob {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(100px);
          animation: float 20s ease-in-out infinite;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .header-actions {
          display: flex;
          gap: 16px;
        }
        
        .retake-btn {
          padding: 12px 24px;
          border-radius: 9999px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .retake-btn:hover {
          transform: scale(1.1);
        }
        
        .results-grid {
          display: grid;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .result-card {
          border-radius: 24px;
          padding: 24px;
          animation: slideInUp 0.5s ease-out both;
        }
        
        @keyframes slideInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .card-content {
          display: flex;
          justify-content: space-between;
          gap: 24px;
        }
        
        .card-main {
          flex: 1;
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .role-name {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        
        .match-percentage {
          font-weight: 600;
          font-size: 16px;
        }
        
        .explanation {
          margin-bottom: 16px;
          font-size: 18px;
          line-height: 1.6;
        }
        
        .description {
          margin-bottom: 16px;
          font-style: italic;
          line-height: 1.5;
        }
        
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .skill-tag {
          padding: 6px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .score-visual {
          position: relative;
          width: 96px;
          height: 96px;
          flex-shrink: 0;
        }
        
        .score-circle {
          width: 96px;
          height: 96px;
          transform: rotate(-90deg);
        }
        
        .score-progress {
          transition: stroke-dashoffset 1s ease-out;
        }
        
        .score-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }
        
        .export-card {
          border-radius: 24px;
          padding: 24px;
          animation: slideInUp 0.5s ease-out 0.3s both;
        }
        
        .export-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        
        .export-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .export-btn {
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
        
        .export-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        
        .share-notification {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          padding: 16px 24px;
          border-radius: 12px;
          font-weight: 600;
          animation: slideUpIn 0.3s ease-out;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        
        @keyframes slideUpIn {
          from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        
        /* Common styles */
        .container { width: 100%; margin: 0 auto; padding: 0 1rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .font-bold { font-weight: 700; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
      `}</style>
    </div>
  );

  // Main render logic
  if (currentPage === 'landing') {
    return <LandingPage />;
  } else if (currentPage === 'about') {
    return <AboutPage />;
  } else if (currentPage === 'studentInfo') {
    return <StudentInfoPage />;
  } else if (currentPage === 'quiz') {
    return <QuizPage />;
  } else if (currentPage === 'results' && results) {
    return <ResultsPage />;
  }

  // Default to landing page
  return <LandingPage />;
};

export default RoleMatch;