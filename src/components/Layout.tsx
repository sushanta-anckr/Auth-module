import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Chat from './Chat'

const Layout = () => {
  
  return (
    <div>
      <Header/>
      <Outlet />
      <Chat />
      <Footer />
    </div>
  )
}

export default Layout