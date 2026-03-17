import {BrowserRouter} from 'react-router-dom'
import AllRoutes from './allRoutes'
import '../src/features/shared/styles/global.scss'
import { AuthProvider } from './features/auth/auth.context'
import { SongContextProvider } from './features/Expression/song.context'
function App() {
 

  return (
     <BrowserRouter>
     <AuthProvider>
      <SongContextProvider>
      <AllRoutes/>
      </SongContextProvider>
      </AuthProvider>
     </BrowserRouter>
  )
}

export default App
