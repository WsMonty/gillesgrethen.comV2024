import "./Navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <a className="navbar-link" href="/">
        HOME
      </a>
      <a className="navbar-link" href="/about">
        ABOUT
      </a>
      <a className="navbar-link" href="/music">
        MUSIC
      </a>
      <a className="navbar-link" href="/linklists">
        LINKS
      </a>
      <a className="navbar-link" href="/shop">
        SHOP
      </a>
    </div>
  );
}

export default Navbar;
