import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { DiceGenerator } from './pages/DiceGenerator.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dice',
    element: <DiceGenerator />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
