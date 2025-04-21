import './App.css';
import Footer from './components/home/Footer';
import Navbar from './components/home/Navbar';
import Routing from './utils/Routing';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Navbar/>
    <Routing/>
    <Footer/>
    <ToastContainer />
    </>
  );
}

export default App;
