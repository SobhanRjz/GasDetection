import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import './HomeLayout.css';

interface HomeLayoutProps {
  children?: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="home-layout">
      <main className="home-main-content">
        {children || <Outlet />}
      </main>
    </div>
  );
}
