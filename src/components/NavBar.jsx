import { NavLink, Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="navbar">
      <Link className="navbar-logo">
        <img
          className="logo"
          src="/chattercircle.png"
          alt="Chatter Circle Logo"
        />
      </Link>
      <div className="navbar-search">
        <ion-icon name="search-outline"></ion-icon>
        <input
          type="text"
          name="search"
          id="search"
          autoComplete="off"
          placeholder="Search for posts..."
        />
      </div>
      <div className="navbar-links">
        <NavLink to="" className="navlink">
          Home
        </NavLink>
        <NavLink to="/create" className="navlink">
          Create Post
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
