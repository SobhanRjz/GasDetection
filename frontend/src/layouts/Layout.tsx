import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import './Layout.css';

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children || <Outlet />}
      </main>
    </div>
  );
}
