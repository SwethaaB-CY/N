import React, { useEffect, useState } from 'react';
import styles from '../../styles/AttemptPage.module.css';
import { useRouter } from 'next/router';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const AttemptQuiz = () => {
  const router = useRouter();
  const [startTime] = useState(Date.now());

  const [quizData, setQuizData] = useState<{ 
    questions: Question[]; 
    title?: string;         // added optional title
    difficulty?: string;    // added optional difficulty
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins

  useEffect(() => {
    const storedQuiz = localStorage.getItem('currentQuiz');
    if (storedQuiz) {
      try {
        const parsed = JSON.parse(storedQuiz);
        if (parsed && Array.isArray(parsed.questions)) {
          setQuizData(parsed);
        } else {
          setErrorMsg('Invalid quiz data found. Please start a new quiz.');
        }
      } catch {
        setErrorMsg('Failed to load quiz data. Please start a new quiz.');
      }
    } else {
      setErrorMsg('No quiz data found. Please start a new quiz.');
    }
  }, []);

  useEffect(() => {
    if (showScore) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowScore(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showScore]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!quizData) return;

    setButtonDisabled(true);

    const currentQuestion = quizData.questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    const newScore = isCorrect ? score + 1 : score;

    setScore(newScore);
    setSelectedOption(null);

    if (currentIndex + 1 < quizData.questions.length) {
      setCurrentIndex(currentIndex + 1);
      setButtonDisabled(false);
    } else {
      localStorage.removeItem('currentQuiz');

      const timeTakenSeconds = Math.floor((Date.now() - startTime) / 1000);

      // Pass title and difficulty along with other quiz results
      router.push({
        pathname: '/quiz/result',
        query: {
          score: newScore,
          total: quizData.questions.length,
          time: timeTakenSeconds,
          title: quizData.title || 'Untitled Quiz',
          difficulty: quizData.difficulty || 'medium',
        },
      });
    }
  };

  if (errorMsg) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Code Quest</h1>
        <p className={styles.errorMsg}>{errorMsg}</p>
        <button className={styles.button} onClick={() => (window.location.href = '/quiz')}>Back to Setup</button>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Code Quest</h1>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Code Quest</h1>
        <div className={styles.card}>
          <h2>Quiz Complete!</h2>
          <p>Your score: <strong>{score}</strong> / <strong>{quizData.questions.length}</strong></p>
          <button className={styles.button} onClick={() => window.location.href = '/quiz'}>Try Again</button>
        </div>
      </div>
    );
  }

  const question = quizData.questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Code Quest</h1>

      <div className={styles.timerProgressContainer}>
        <span className={styles.timer}>Time Left: {formatTime(timeLeft)}</span>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <span>Question {currentIndex + 1} of {quizData.questions.length}</span>
        </div>

        <div className={styles.question}>
          <p>{question.question}</p>
        </div>

        <div className={styles.options}>
          {question.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            return (
              <label
                key={option}
                className={`${styles.optionLabel} ${selectedOption === option ? styles.selected : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                <input
                  type="radio"
                  name={`question-${currentIndex}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                  className={styles.optionInput}
                />
                <span className={styles.optionPrefix}>{optionLetter}</span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={handleNext}
            disabled={selectedOption === null || buttonDisabled}
          >
            {currentIndex + 1 === quizData.questions.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttemptQuiz;
