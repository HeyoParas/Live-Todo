import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskAssignment from "./sample.jsx" ;


createRoot(document.getElementById('root')).render(
  
    <>
    <App />
    <TaskAssignment/>
    </>
)
