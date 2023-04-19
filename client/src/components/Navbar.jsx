import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo2.svg'
import { AuthContext } from '../context/authContext'
const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(currentUser);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo"><img src={logo} alt="" /></div>
        <div className="links">
    
          <Link className='link' to = "/?cat=art">
            <h6>Art</h6>
          </Link>
          <Link className='link' to = "/?cat=science">
            <h6>Science</h6>
          </Link>
          <Link className='link' to = "/?cat=math">
            <h6>Math</h6>
          </Link>
          <Link className='link' to = "/?cat=technology">
            <h6>Technology</h6>
          </Link>
          <Link className='link' to = "/?cat=food">
            <h6>Food</h6>
          </Link>
          <Link className='link' to = "/?cat=design">
            <h6>Design</h6>
          </Link>
          <Link className='link' to = "/?cat=cinema">
            <h6>Cinema</h6>
          </Link>
          <Link className='link' to = "/?cat=programming">
            <h6>Programming</h6>
          </Link>
          
          <span>{currentUser?.username}</span>
          {currentUser ? ( <button className='btnLogout' onClick={logout}>Logout</button>) : (<button> <Link className='link' to="/login">Login</Link></button>)}
          <span className='write'>
            <Link className='link' to = "/write" >Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar