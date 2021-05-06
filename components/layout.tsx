import Header from 'components/header';
import Footer from 'components/footer';
import React from 'react';

export default function Layout(props: React.PropsWithChildren<unknown>): JSX.Element {
  const { children } = props;
  return (
    <div className="container mx-auto flex flex-col h-screen max-w-5xl">
      <Header />
      <main className="mb-auto self-center w-full max-w-2xl">
        {children}
      </main>
      <Footer />
    </div>
  );
}
