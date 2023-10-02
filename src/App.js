import './App.css';
import Header from './component/header/Header';
import { useEffect, useState } from 'react';
import Footer from './component/footer/footer';
import Chat from './component/main/Chat';
import GoToTop from './component/main/GoToTop';
import Routers from './component/Router/Routers';



function App() {
  const [showChat, setShowChat]= useState(true)
  useEffect(() => {
    const handleScroll = () => {
  
        if (window.scrollY > 650) {
            setShowChat(false);
        } else {
            setShowChat(true);
        }
  
    };
  
    window.addEventListener('scroll', handleScroll);
  
    // Hủy lắng nghe sự kiện scroll khi component unmount
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  
  }, []);

  return (
    <div className="App bg-gray-100 relative">
      <Header/>
      <Routers/>
      <Footer/>
      {showChat && <Chat/>}
      {!showChat &&<GoToTop/>}
    </div>
  );
}

export default App;

