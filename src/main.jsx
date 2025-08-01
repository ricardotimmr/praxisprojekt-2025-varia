import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Find the root element in the HTML
const rootElement = document.getElementById("root");

// If the root element exists, render the App component into it
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found!");
}
