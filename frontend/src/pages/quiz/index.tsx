import React, { useState, useCallback, useEffect } from 'react';
import { FaGamepad, FaStopwatch, FaTrophy } from 'react-icons/fa';
import { useRouter } from 'next/router';
import styles from '../../styles/QuizPage.module.css';

const QuizPage = () => {
  const [questionsCount, setQuestionsCount] = useState(5);
  const [difficulty, setDifficulty] = useState('Beginner');
  const [topics, setTopics] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Retrieved token:', storedToken);  // <--- Here
    setToken(storedToken);
  }, []);

  const validateInputs = () => {
    if (!token) {
      setErrorMsg('You must be logged in to start a quiz.');
      alert('You must be logged in to start a quiz.');
      return false;
    }
    if (questionsCount < 3 || questionsCount > 10) {
      setErrorMsg('Questions count must be between 3 and 10.');
      return false;
    }
    if (!['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)) {
      setErrorMsg('Please select a valid difficulty.');
      return false;
    }
    return true;
  };

  const handleStartQuiz = useCallback(async () => {
  setErrorMsg(null);
  if (!validateInputs()) return;

  setLoading(true);
  try {
    const topicsArray = topics
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const res = await fetch('http://localhost:5000/quiz/generate', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        topics: topicsArray.join(', '),
        difficulty,
        count: questionsCount,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Server Error:', res.status, errorText);
      throw new Error(`Server Error: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    // Generate title based on topics and difficulty
    const generatedTitle = `Quiz on ${topicsArray.join(', ')} - ${difficulty}`;

    // Save quiz data + title + difficulty to localStorage
    const quizData = {
      ...data,
      title: generatedTitle,
      difficulty,
    };

    localStorage.setItem('currentQuiz', JSON.stringify(quizData));
    console.log('Quiz saved to localStorage:', quizData);

    router.push('/quiz/attempt');  // navigate to attempt page
  } catch (error) {
    console.error('Quiz generation error:', error);
    setErrorMsg(error instanceof Error ? error.message : 'Unknown error');
    alert('Failed to start quiz. Please try again.');
  } finally {
    setLoading(false);
  }
}, [questionsCount, difficulty, topics, router, token]);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Code Quest</h1>
      <p className={styles.subtitle}>Test your coding knowledge and climb the leaderboard!</p>

      <div className={styles.card}>
        <div className={styles.header}>
          <FaGamepad className={styles.headerIcon} />
          <span>Quiz Setup</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="topicsInput">Topics (comma separated)</label>
          <input
            id="topicsInput"
            type="text"
            placeholder="e.g. Python, Java, SQL"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            disabled={loading}
          />
          <p className={styles.help}>Enter programming languages or topics separated by commas</p>
        </div>

        <div className={styles.field}>
          <label>Difficulty Level</label>
          <div className={styles.radioGroup}>
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={difficulty === level}
                  onChange={() => setDifficulty(level)}
                  disabled={loading}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="questionsRange">Number of Questions: {questionsCount}</label>
          <input
            id="questionsRange"
            type="range"
            min={3}
            max={10}
            value={questionsCount}
            onChange={(e) => setQuestionsCount(Number(e.target.value))}
            disabled={loading}
          />
          <div className={styles.sliderLabels}>
            <span>3</span>
            <span>10</span>
          </div>
        </div>

        {errorMsg && <p style={{ color: 'red', marginBottom: '1rem' }}>{errorMsg}</p>}

        <div className={styles.featureRow}>
          <div className={styles.featureBox}>
            <FaStopwatch className={styles.featureIcon} />
            <div>
              <strong>Timed Challenge</strong>
              <p>Race against the clock for bonus XP</p>
            </div>
          </div>
          <div className={styles.featureBox}>
            <FaTrophy className={styles.featureIcon} />
            <div>
              <strong>Leaderboard Ranking</strong>
              <p>Compete for the top spot</p>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={handleStartQuiz}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Generating Quiz...' : 'Start Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
