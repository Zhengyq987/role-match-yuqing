import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Share2, RefreshCw, Moon, Sun, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';

const RoleMatch = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Role definitions (excluding Team Lead as per requirements)
  const roles = {
    RE: {
      name: "Requirements Engineer",
      description: "Gathers and documents project requirements, writes specifications",
      skills: ["Documentation", "Analysis", "Communication", "Research"],
      color: "from-blue-500 to-cyan-500"
    },
    CM: {
      name: "Configuration Manager",
      description: "Manages tools, files, versions, and project structure",
      skills: ["Organization", "Version Control", "Tool Management", "Documentation"],
      color: "from-green-500 to-emerald-500"
    },
    Design: {
      name: "System Designer",
      description: "Plans system architecture and component interactions",
      skills: ["Architecture", "Diagramming", "System Planning", "Technical Design"],
      color: "from-purple-500 to-pink-500"
    },
    UX: {
      name: "UX Designer",
      description: "Designs user interfaces and improves user experience",
      skills: ["UI Design", "Prototyping", "User Research", "Visual Design"],
      color: "from-pink-500 to-rose-500"
    },
    Test: {
      name: "QA Tester",
      description: "Ensures quality through testing and bug detection",
      skills: ["Testing", "Debugging", "Quality Assurance", "Attention to Detail"],
      color: "from-orange-500 to-red-500"
    }
  };

  // All 12 questions with proper scoring
  const questions = [
    {
      id: 1,
      text: "Which of these roles sounds most enjoyable to you?",
      type: "single",
      weight: 3.0,
      options: [
        { text: "Writing clear instructions or outlining requirements", points: { RE: 3 } },
        { text: "Organizing tools, files, and project structure", points: { CM: 3 } },
        { text: "Planning how system parts connect and work together", points: { Design: 3 } },
        { text: "Designing user interfaces and improving usability", points: { UX: 3 } },
        { text: "Testing and making sure things work correctly", points: { Test: 3 } }
      ]
    },
    {
      id: 2,
      text: "If you had to pick a role for a group project, which would you choose?",
      type: "single",
      weight: 2.5,
      options: [
        { text: "Requirement writer or researcher", points: { RE: 3 } },
        { text: "Repository/file manager", points: { CM: 3 } },
        { text: "Systems planner or diagram designer", points: { Design: 3 } },
        { text: "Interface or layout designer", points: { UX: 3 } },
        { text: "Tester or debugger", points: { Test: 3 } }
      ]
    },
    {
      id: 3,
      text: "Which work style describes you best?",
      type: "single",
      weight: 2.0,
      options: [
        { text: "I like working alone and being detail-focused", points: { Test: 2, CM: 1 } },
        { text: "I enjoy collaborative work and sharing ideas", points: { RE: 2, UX: 1 } },
        { text: "I prefer strategic planning and system thinking", points: { Design: 2, RE: 1 } },
        { text: "I like creative work and visual problem-solving", points: { UX: 2, Design: 1 } }
      ]
    },
    {
      id: 4,
      text: "What would you most enjoy improving or learning about?",
      type: "single",
      weight: 1.5,
      options: [
        { text: "Writing requirements or specifications", points: { RE: 2 } },
        { text: "Managing shared tools and files", points: { CM: 2 } },
        { text: "Designing system architecture", points: { Design: 2 } },
        { text: "UI/UX design and accessibility", points: { UX: 2 } },
        { text: "Testing and quality control", points: { Test: 2 } }
      ]
    },
    {
      id: 5,
      text: "Which of these describe your interests? (Select all that apply)",
      type: "multiple",
      weight: 1.0,
      options: [
        { text: "Writing instructions or organizing project ideas", points: { RE: 1 } },
        { text: "Keeping track of files, folders, and shared materials", points: { CM: 1 } },
        { text: "Planning how different features work together", points: { Design: 1 } },
        { text: "Designing how interfaces should look and feel", points: { UX: 1 } },
        { text: "Finding problems or mistakes in systems", points: { Test: 1 } }
      ]
    },
    {
      id: 6,
      text: "What have you done before? (Select all that apply)",
      type: "multiple",
      weight: 2.5,
      options: [
        { text: "Wrote documents, outlines, or plans for projects", points: { RE: 1 } },
        { text: "Helped keep files and folders organized", points: { CM: 1 } },
        { text: "Drew diagrams to explain how something works", points: { Design: 1 } },
        { text: "Sketched website or app designs", points: { UX: 1 } },
        { text: "Found bugs or tested features", points: { Test: 1 } }
      ]
    },
    {
      id: 7,
      text: "What do you enjoy doing? (Select all that apply)",
      type: "multiple",
      weight: 1.5,
      options: [
        { text: "Writing documents that explain things clearly", points: { RE: 1 } },
        { text: "Keeping files and content neat and organized", points: { CM: 1 } },
        { text: "Planning visuals or system structures", points: { Design: 1 } },
        { text: "Making interfaces simple and easy to use", points: { UX: 1 } },
        { text: "Catching small details others might miss", points: { Test: 1 } }
      ]
    },
    {
      id: 8,
      text: "Which tools or platforms have you used? (Select all that apply)",
      type: "multiple",
      weight: 1.0,
      options: [
        { text: "Written instructions or documentation", points: { RE: 1 } },
        { text: "Managed files or versions in group settings", points: { CM: 1 } },
        { text: "Created flowcharts or system diagrams", points: { Design: 1 } },
        { text: "Designed visual layouts or presentations", points: { UX: 1 } },
        { text: "Logged issues or verified test results", points: { Test: 1 } }
      ]
    },
    {
      id: 9,
      text: "Which behaviors describe you? (Select all that apply)",
      type: "multiple",
      weight: 2.0,
      options: [
        { text: "I help teammates understand requirements", points: { RE: 2 } },
        { text: "I enjoy organizing to-do lists and folders", points: { CM: 2 } },
        { text: "I notice when designs or interfaces feel off", points: { UX: 2, Design: 1 } },
        { text: "I think through edge cases and scenarios", points: { Test: 2, Design: 1 } },
        { text: "I often write instructions for others", points: { RE: 2, CM: 1 } }
      ]
    },
    {
      id: 10,
      text: "When joining a new project, what's your natural instinct?",
      type: "single",
      weight: 1.5,
      options: [
        { text: "Help define the goals and scope", points: { RE: 2 } },
        { text: "Set up project structure and tools", points: { CM: 2 } },
        { text: "Start planning the system architecture", points: { Design: 2 } },
        { text: "Think about the user experience", points: { UX: 2 } },
        { text: "Consider testing strategies", points: { Test: 2 } }
      ]
    },
    {
      id: 11,
      text: "What do you usually contribute most in team work?",
      type: "single",
      weight: 2.0,
      options: [
        { text: "Writing up steps or requirements", points: { RE: 2 } },
        { text: "Organizing files and documentation", points: { CM: 2 } },
        { text: "Creating system diagrams", points: { Design: 2 } },
        { text: "Making visual layouts or mockups", points: { UX: 2 } },
        { text: "Finding issues and ensuring quality", points: { Test: 2 } }
      ]
    },
    {
      id: 12,
      text: "Which role have you enjoyed most in past experiences?",
      type: "single",
      weight: 2.5,
      options: [
        { text: "Requirements gathering and documentation", points: { RE: 2 } },
        { text: "Managing project setup and structure", points: { CM: 2 } },
        { text: "Building logical flows and diagrams", points: { Design: 2 } },
        { text: "Creating user interfaces", points: { UX: 2 } },
        { text: "Spotting bugs and issues", points: { Test: 2 } }
      ]
    }
  ];

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

  const handleAnswer = (answer) => {
    setIsAnimating(true);
    const question = questions[currentQuestion];
    
    if (question.type === 'single') {
      setAnswers({ ...answers, [question.id]: answer });
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          submitAnswers();
        }
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleMultipleAnswer = (optionIndex) => {
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
    }
  };

  const nextQuestion = () => {
    const question = questions[currentQuestion];
    if (question.type === 'multiple' && (!answers[question.id] || answers[question.id].length === 0)) {
      alert("Please select at least one option");
      return;
    }
    
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
    setShowResults(true);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  const exportToCSV = () => {
    if (!results) return;
    
    let csv = "Rank,Role,Score,Description\n";
    results.recommendations.forEach(rec => {
      csv += `${rec.rank},"${rec.roleInfo.name}",${rec.score}%,"${rec.explanation}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rolematch-results.csv';
    a.click();
  };

  const exportToPDF = () => {
  const doc = new jsPDF();
  
  // Add background color for header
  doc.setFillColor(99, 102, 241); // Purple color
  doc.rect(0, 0, 210, 40, 'F');
  
  // Add title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont(undefined, 'bold');
  doc.text('RoleMatch Results', 105, 25, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Add date and subtitle
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, 105, 50, { align: 'center' });
  
  // Add a line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 60, 190, 60);
  
  // Add recommendations
  let yPosition = 75;
  
  results.recommendations.forEach((rec, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Rank circle
    doc.setFillColor(99, 102, 241);
    doc.circle(30, yPosition, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(rec.rank.toString(), 30, yPosition + 1, { align: 'center' });
    
    // Role name and percentage
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(rec.roleInfo.name, 45, yPosition);
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(`${rec.score}% Match`, 45, yPosition + 8);
    
    // Role description
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont(undefined, 'italic');
    const descLines = doc.splitTextToSize(rec.roleInfo.description, 140);
    doc.text(descLines, 45, yPosition + 16);
    
    // Explanation
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const explainLines = doc.splitTextToSize(rec.explanation, 140);
    doc.text(explainLines, 45, yPosition + 16 + (descLines.length * 5) + 5);
    
    // Skills
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Key Skills:', 45, yPosition + 16 + (descLines.length * 5) + (explainLines.length * 5) + 10);
    
    doc.setFont(undefined, 'normal');
    const skillsText = rec.roleInfo.skills.join(' • ');
    doc.text(skillsText, 45, yPosition + 16 + (descLines.length * 5) + (explainLines.length * 5) + 16);
    
    // Add separator line
    yPosition += 16 + (descLines.length * 5) + (explainLines.length * 5) + 25;
    if (index < results.recommendations.length - 1) {
      doc.setDrawColor(220, 220, 220);
      doc.line(40, yPosition, 170, yPosition);
      yPosition += 10;
    }
  });
  
  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('RoleMatch - Smart Role Recommender', 105, 285, { align: 'center' });

  // Save the PDF
  doc.save('rolematch-results.pdf');
};

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && results) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-500`}>
        <div className="relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Your Results
              </h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} hover:scale-110 transition-all`}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={restart}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-all flex items-center gap-2"
                >
                  <RefreshCw size={20} />
                  Retake Quiz
                </button>
              </div>
            </div>

            {/* Results Cards */}
            <div className="grid gap-6 mb-8">
              {results.recommendations.map((rec, index) => (
                <div
                  key={rec.role}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-300`}
                  style={{
                    animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${rec.roleInfo.color} flex items-center justify-center text-white font-bold text-2xl`}>
                          {rec.rank}
                        </div>
                        <div>
                          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {rec.roleInfo.name}
                          </h3>
                          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {rec.score}% Match
                          </p>
                        </div>
                      </div>
                      
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {rec.explanation}
                      </p>
                      
                      <p className={`mb-4 italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {rec.roleInfo.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {rec.roleInfo.skills.map(skill => (
                          <span
                            key={skill}
                            className={`px-3 py-1 rounded-full text-sm ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke={darkMode ? '#374151' : '#e5e7eb'}
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 36}`}
                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - rec.score / 100)}`}
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient id="gradient">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {rec.score}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Export Options */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Export Your Results
              </h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={exportToCSV}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Download size={20} />
                  Download CSV
                </button>
                <button
                  onClick={exportToPDF}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Download size={20} />
                  Download PDF
                </button>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Share2 size={20} />
                  Share Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-500`}>
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              RoleMatch
            </h1>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Find Your Perfect Team Role
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} hover:scale-110 transition-all`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
            <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} overflow-hidden`}>
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-xl transition-all duration-300 ${
              isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {questions[currentQuestion].text}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => {
                const question = questions[currentQuestion];
                const isSelected = question.type === 'single' 
                  ? answers[question.id] === index
                  : (answers[question.id] || []).includes(index);

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (question.type === 'single') {
                        handleAnswer(index);
                      } else {
                        handleMultipleAnswer(index);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-[1.02]'
                        : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {question.type === 'multiple' && (
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-white' : darkMode ? 'border-gray-500' : 'border-gray-400'
                        }`}>
                          {isSelected && <CheckCircle2 size={16} />}
                        </div>
                      )}
                      <span className="flex-1">{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  currentQuestion === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {questions[currentQuestion].type === 'multiple' && (
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Select all that apply
                </span>
              )}

              <button
                onClick={nextQuestion}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default RoleMatch;