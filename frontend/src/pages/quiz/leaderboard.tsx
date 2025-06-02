import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Leaderboard.module.css';

type LeaderboardEntry = {
  id: string | number;
  name: string;
  title: string;
  difficulty: string;
  score: number;
  time: number;
};

const LeaderboardPage = () => {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/quiz/leaderboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(rawData => {
        const mapped = rawData.map((entry: any) => ({
          id: entry.id,
          name: entry.student?.user?.fullName || 'Anonymous',
          title: entry.title,
          difficulty: entry.difficulty,
          score: entry.score,
          time: entry.time ?? 0,
        }));
        setData(mapped);
      })
      .catch(err => console.error('Leaderboard fetch failed', err));
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec < 10 ? '0' : ''}${sec}s`;
  };

  const calculateEfficiency = (xp: number, time: number) =>
    time > 0 ? (xp / time * 60).toFixed(2) : '0.00';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Leaderboard</h1>
      <p className={styles.subtitle}>See who's leading the pack!</p>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2><span>🏆</span> Top Performers</h2>
          <button onClick={() => router.push('/quiz')} className={styles.newQuiz}>← New Quiz</button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Topics</th>
              <th>Difficulty</th>
              <th>XP</th>
              <th>Time</th>
              <th>Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => b.score - a.score || a.time - b.time)
              .map((entry, index) => (
                <tr key={entry.id}>
                  <td>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </td>
                  <td>{entry.name}</td>
                  <td>{entry.title}</td>
                  <td>{entry.difficulty}</td>
                  <td>{entry.score}</td>
                  <td>⏱ {formatTime(entry.time)}</td>
                  <td>{calculateEfficiency(entry.score, entry.time)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
