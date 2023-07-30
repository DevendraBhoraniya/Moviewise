import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Movielist from './components/Movielist';
import Error from './Pages/Error';
import MovieDetail from './Pages/MovieDetail';
import Footer from './components/Footer';
import Search from './Pages/Search';

function App() {

  return (
    <>

      <div className='App'>
        <Router>
          <Header />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path='movie/:id' element={<MovieDetail />}></Route>
            <Route path='movies/:type' element={<Movielist />}></Route>
            <Route path='Search' element={<Search />}></Route>
            <Route path='/*' element={<Error />}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>

    </>
  )
}

export default App
