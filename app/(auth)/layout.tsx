import Container from '@/components/layout/Container';
import Divider from '@/components/ui/Divider';
import React from 'react';
import AuthFormButton from './AuthFormButton';
import AuthForm from './AuthForm';
import AuthFormTopBar from './AuthFormTopBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="40rem">
      <AuthFormTopBar>
        <AuthFormButton title="Sign in" href="/login" />
        <Divider />
        <AuthFormButton title="Sign up" href="/register" />
      </AuthFormTopBar>
      <AuthForm>{children}</AuthForm>
    </Container>
  );
}
