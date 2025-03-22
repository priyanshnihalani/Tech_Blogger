import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home/Home'
import ContactUs from './ContactUs/ContactUs'
import LoginRegister from './Register/LoginRegister'
import TechVideos from './TechVideos/techVideos'
import TechPosts from './TechPosts/techPosts'
import TechTutorial from './TechTutorial/techTutorial'

function App() {
 

  return (
   <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path='/register' element={<LoginRegister />} />
        <Route path='/techvideos' element={<TechVideos />} />
        <Route path='/techvideos' element={<TechVideos />} />
        <Route path='/techpost' element={<TechPosts />} />
        <Route path='/techtutorial' element={<TechTutorial />} />
      </Routes>
    </Router>
   </>
  )
}

export default App
