import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Result.module.css';

const ResultPage = () => {
  const router = useRouter();
  const { score, total, time, title, difficulty } = router.query;
  const [name, setName] = useState('');

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to submit your score.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: String(title) || 'Untitled Quiz',
          totalQuestions: Number(total) || 0,
          score: Number(score) || 0,
          difficulty: String(difficulty) || 'medium',
          time: Number(time) || 0,
          name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/quiz/leaderboard'); // Redirect here
      } else {
        alert('Submission failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      alert('An error occurred while submitting your score.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Quiz Completed!</h2>
        <p className={styles.subheading}>Congratulations! You've completed the quiz.</p>

        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>XP Earned</p>
            <h3 className={styles.statValue}>{score}</h3>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Time Taken</p>
            <h3 className={styles.statValue}>{formatTime(Number(time))}</h3>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Submit Score
          </button>
        </div>

        <button onClick={() => router.push('/quiz')} className={styles.newQuizButton}>
          New Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
