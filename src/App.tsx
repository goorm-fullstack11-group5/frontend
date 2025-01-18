import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EditorPage from './pages/Editor/EditorPage'
import MainPage from './pages/Main/MainPage'
import LoginPage from './pages/Auth/Login/LoginPage'
import SignUpPage from './pages/Auth/SignUp/SignUpPage'
import { ThemeProvider } from './components/ThemeProvider'

function App() {

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/editor' element={<EditorPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
