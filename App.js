import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from "./components/Header";
import Coins from "./components/Coins";
import Home from "./components/Home";
import Exchanges from "./components/Exchanges";
import CoinDetails from "./components/CoinDetails";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
        <Router>
          <Header></Header>
          <Routes>
            <Route path = '/' element = {<Home></Home>}></Route>
            <Route path = '/Coins' element = {<Coins></Coins>}></Route>
            <Route path = '/Exchanges' element = {<Exchanges></Exchanges>}></Route>
            <Route path = '/coin/:id' element = {<CoinDetails></CoinDetails>}></Route>
          </Routes>
          <Footer></Footer>
        </Router>
    </div>
  );
}

export default App;
