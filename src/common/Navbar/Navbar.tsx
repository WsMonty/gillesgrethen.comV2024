import { useLocation } from "react-router-dom";
import "./Navbar.scss";

const links = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/music", label: "MUSIC" },
  { href: "/linklists", label: "LINKS" },
  { href: "/shop", label: "SHOP" },
];

function Navbar() {
  const { pathname } = useLocation();

  return (
    <div className="navbar">
      {links.map(({ href, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <a
            key={href}
            className="navbar-link"
            data-active={isActive}
            href={href}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}

export default Navbar;
