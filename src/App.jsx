import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MyRouter } from './routes/route'
function App() {
  return (
    <>
      <ToastContainer />
      <MyRouter />
    </>
  )
}

export default App
