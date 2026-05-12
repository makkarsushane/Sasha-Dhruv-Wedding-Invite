import { createRoot } from 'react-dom/client'
import { applyDevicePerformanceClasses } from './utils/performance'
import './index.css'
import App from './App.jsx'

applyDevicePerformanceClasses()

createRoot(document.getElementById('root')).render(
  <App />,
)
