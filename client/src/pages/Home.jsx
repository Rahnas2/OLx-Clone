import Footer from "../Components/Footer"
import HomeMain from "../Components/Home.jsx/HomeMain"
import HomeNav from "../Components/Home.jsx/HomeNav"
import HomeNav2 from "../Components/Home.jsx/HomeNav2"

import CristhmessBanner from '../assets/images/christmas_desktop@1x.png'


function Home() {
  return (
    <div>
      <HomeNav />
      <HomeNav2 />
      <div className="px-8 sm:px-14 md:px-24 lg:px-36">
        <img className="object-contain" src={CristhmessBanner} alt="christmas_banner" />
      </div>
      <HomeMain />
      <Footer />
    </div>
  )
}

export default Home