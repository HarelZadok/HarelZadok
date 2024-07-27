'use client';
import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log(process.env.FIREBASE_API_KEY);
  }, []);


  return (
    <div className="h-body flex w-full flex-col items-center justify-center">
      <h1 className="text-center text-3xl">Under development.</h1>
      <h2 className="text-center text-2xl">Please check back later.</h2>
    </div>
  );
}
