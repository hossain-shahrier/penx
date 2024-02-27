'use client'

import { useEffect } from 'react';
import Header from './_components/Header';
import Hero from './_components/Hero';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
export default function Home() {
  const { user } = useKindeBrowserClient();

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
