import './App.css'
import './background-video/background-video.jsx';
import BackgroundLoginVideo from './background-video/background-video.jsx';
import ModalLogin from './modal-login/modal-login.jsx';

function App() {
  return (
    <div>
      <div>
      <BackgroundLoginVideo />
      </div>
      <div>
      <ModalLogin />
      </div>
    </div>
  )
}

export default App
