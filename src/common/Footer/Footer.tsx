import "./Footer.scss";
import { FaFacebookF, FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { Tooltip } from "react-tooltip";

function Footer() {
  return (
    <div className="footer">
      <Tooltip id="footer-tooltip" />
      <FaFacebookF
        className="footer-logo"
        size={23}
        onClick={() =>
          window.open("https://www.facebook.com/gillesgrethen", "_blank")
        }
        data-tooltip-id="footer-tooltip"
        data-tooltip-content="Facebook"
      />
      <FaInstagram
        className="footer-logo"
        size={25}
        onClick={() =>
          window.open("https://www.instagram.com/gilles_grethen_", "_blank")
        }
        data-tooltip-id="footer-tooltip"
        data-tooltip-content="Instagram"
      />
      <FaYoutube
        className="footer-logo"
        size={30}
        onClick={() =>
          window.open(
            "https://www.youtube.com/channel/UCgZez7ebsQQFIO83RDIj8zQ",
            "_blank"
          )
        }
        data-tooltip-id="footer-tooltip"
        data-tooltip-content="Youtube"
      />
      <FaSpotify
        className="footer-logo"
        size={25}
        onClick={() =>
          window.open(
            "https://open.spotify.com/album/35HwLkp3QIrMYm8BCPYtA5",
            "_blank"
          )
        }
        data-tooltip-id="footer-tooltip"
        data-tooltip-content="Spotify"
      />
      <SiApplemusic
        className="footer-logo"
        size={25}
        onClick={() =>
          window.open(
            "https://geo.music.apple.com/lu/album/_/1727046789?mt=1&app=music&ls=1&at=1000lHKX&ct=odesli_http&itscg=30200&itsct=odsl_m",
            "_blank"
          )
        }
        data-tooltip-id="footer-tooltip"
        data-tooltip-content="Apple Music"
      />

      <p className="footer-copyright">© 2024 Gilles Grethen</p>
    </div>
  );
}

export default Footer;
