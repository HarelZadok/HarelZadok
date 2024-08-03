import Container from '@/components/layout/Container';
import Divider from '@/components/ui/Divider';
import React from 'react';
import AuthFormButton from './AuthFormButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="40rem">
      <div className="flex w-full flex-row">
        <AuthFormButton title="Sign in" href="/login" />
        <Divider />
        <AuthFormButton title="Sign up" href="/register" />
      </div>
      {children}
    </Container>
  );
}
