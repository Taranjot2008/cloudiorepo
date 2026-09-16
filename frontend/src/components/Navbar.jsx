import { Link } from 'react-router-dom'

import Logo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <section className="navbar fixed top-0 w-full flex items-center justify-between py-5 px-10 z-1000 max-sm:justify-center">
        <div className="name text-4xl font-bold text-purple-400 font-(family-name:--font-h) flex items-center gap-2 ">
          <img src={Logo} alt="Cloudio Logo" className='w-14 h-14 top-1' />
          Cloudio
          </div>

        <div className="links text-[16px] font-bold flex items-center gap-8 text-purple-400 font-(family-name:--font-link) max-sm:hidden">
            <Link to="/about" className='tab-link'>About</Link>
            <Link to="/services" className='tab-link'>Services</Link>
            <Link to="/contact" className='tab-link'>Contact</Link>

            <div className="profile ml-8 text-xl hover:text-purple-500 cursor-pointer transition-colors duration-200">
                <i className="fa-solid fa-user"></i>
            </div>
        </div>

        
    </section>
  )
}

export default Navbar