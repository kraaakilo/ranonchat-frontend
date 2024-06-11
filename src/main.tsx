import ReactDOM from 'react-dom/client';
import "./css/app.css";
import { ThemeProvider } from './components/theme-provider';
import App from './App';
import { Toaster } from './components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App/>
    <Toaster />
  </ThemeProvider>
)
