import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthScreen } from '../pages/auth pages/auth.page'
import { Enroll } from '../pages/Enroll.page'
import { Home } from '../pages/Home.page'

export const MyRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/auth" element={<AuthScreen />} />
      <Route exact path="/enroll" element={<Enroll />} />
    </Routes>
  </Router>
)
