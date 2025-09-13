import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomeLayout from './layouts/HomeLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import About from './pages/About';

// Create wrapper components that include Outlet
const HomeLayoutWrapper = () => (
  <HomeLayout>
    <Outlet />
  </HomeLayout>
);

const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayoutWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/settings',
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <Settings />,
      },
    ],
  },
  {
    path: '/about',
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <About />,
      },
    ],
  },
]);
