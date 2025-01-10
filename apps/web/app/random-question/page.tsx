"use client"
import { useState, useEffect } from 'react';

import { Button } from '@repo/ui/button';
import { useRouter } from 'next/navigation';


export default function RandomQuestion() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const fetchRandomQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/random-question');
      const data = await response.json();
      if (data.type === 'mcq') {
        router.push(`/mcq/${data.id}`);
      } else if (data.type === 'coding') {
        router.push(`/problems/${data.id}`);
      }
    } catch (error) {
      console.error('Error fetching random question:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkgray">
      <h1 className="text-2xl font-bold mb-4">Random Question</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Button onClick={fetchRandomQuestion}>Get Another Random Question</Button>
      )}
    </div>
  );
}