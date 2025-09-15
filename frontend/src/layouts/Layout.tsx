import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import ModernHeader from '../components/ModernHeader';
import '../components/ModernHeader.css';
import './Layout.css';

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <ModernHeader />
      <main className="main-content">
        {children || <Outlet />}
      </main>
    </div>
  );
}
