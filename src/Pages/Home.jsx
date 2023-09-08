import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Trending from './Trending'
import MovieDetail from './MovieDetail'
import Movielist from '../components/Movielist'
import Search from './Search'
import Error from './Error'
import { SignIn } from '@clerk/clerk-react';


const Home = () => {
  return (
    <>
      <div className='App'>
        <Router>
          <Header />
          <Routes>
            <Route index element={<Trending />}></Route>
            <Route
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in" />}
            />
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

export default Home
