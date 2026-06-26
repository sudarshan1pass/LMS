import React from 'react'
import Home1 from './Home1'
import Footer from '../Footer'
import Home2 from './Home2'
import Home3 from './Home3'
import Contact from './Contact'

const HomeMain = () => {
  return (
    <div>
        <Home1/>
        {/* <Home2/> */}
       <Home3/>
        <Footer/>
        {/* <Contact/> */}
    </div>
  )
}

export default HomeMain