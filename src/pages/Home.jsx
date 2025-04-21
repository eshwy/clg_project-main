import React from 'react'

import Hero from '../components/home/Hero'
import Card from '../components/home/Card'
import Whychoose from '../components/home/Whychoose'
import Feedback from '../components/home/Feedback'
import CustomerSlider from '../components/home/CustomerSlider'


const Home = () => {
  return (
    <div>
        
        <Hero/>
        <Card/>
        <Whychoose/>
        <CustomerSlider/>
        <Feedback/>

        
    </div>
  )
}

export default Home