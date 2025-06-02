// pages/loading.tsx

import React, { useEffect } from 'react';
import styles from '../styles/LoadingPage.module.css';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/router';

const LoadingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/attempt'); // Navigate to quiz attempt after loading
    }, 3000); // Simulate loading for 3 seconds

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <FaSpinner className={styles.icon} />
      </div>
      <h2 className={styles.text}>Generating Your Quiz...</h2>
    </div>
  );
};

export default LoadingPage;
