import ReactDOM from 'react-dom/client';
import "./css/app.css";
import { ThemeProvider } from './components/theme-provider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App/>
  </ThemeProvider>
)
