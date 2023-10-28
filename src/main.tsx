import ReactDOM from 'react-dom/client';
import "./css/app.css";
import { ThemeProvider } from './components/theme-provider';
import { RouterProvider } from 'react-router-dom';
import router from './route';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
)
