import Container from '@/components/layout/Container';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container maxWidth="40rem">{children}</Container>;
}
