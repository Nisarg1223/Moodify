import {BrowserRouter} from 'react-router-dom'
import AllRoutes from './allRoutes'
import '../src/features/shared/styles/global.scss'
import { AuthProvider } from './features/auth/auth.context'
function App() {
 

  return (
     <BrowserRouter>
     <AuthProvider>
      <AllRoutes/>
      </AuthProvider>
     </BrowserRouter>
  )
}

export default App
