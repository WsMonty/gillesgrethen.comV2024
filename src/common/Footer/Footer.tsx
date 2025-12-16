import "./Footer.scss";
import { FaFacebookF, FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";
import { SiApplemusic, SiTidal } from "react-icons/si";
import { Tooltip } from "react-tooltip";
import { MOBILE_BREAKPOINT } from "../../globals/constants";
import { useMediaQuery } from "react-responsive";

function Footer() {
  const isMobile = useMediaQuery({ maxWidth: MOBILE_BREAKPOINT });

  return (
    <div className="footer">
      {!isMobile && <Tooltip id="footer-tooltip" />}
      <div className="footer-social-icons">
        <FaFacebookF
          className="footer-logo"
          size={18}
          onClick={() =>
            window.open("https://www.facebook.com/gillesgrethen", "_blank")
          }
          data-tooltip-id="footer-tooltip"
          data-tooltip-content="Facebook"
        />
        <FaInstagram
          className="footer-logo"
          size={21}
          onClick={() =>
            window.open("https://www.instagram.com/gilles_grethen_", "_blank")
          }
          data-tooltip-id="footer-tooltip"
          data-tooltip-content="Instagram"
        />
        <FaYoutube
          className="footer-logo"
          size={25}
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
          size={21}
          onClick={() =>
            window.open(
              "https://open.spotify.com/intl-de/album/73Ak6YJz0GYBuRxZFGODsB",
              "_blank"
            )
          }
          data-tooltip-id="footer-tooltip"
          data-tooltip-content="Spotify"
        />
        <SiApplemusic
          className="footer-logo"
          size={21}
          onClick={() =>
            window.open(
              "https://music.apple.com/de/album/nostalgie/1843596856",
              "_blank"
            )
          }
          data-tooltip-id="footer-tooltip"
          data-tooltip-content="Apple Music"
        />
        <SiTidal
          className="footer-logo"
          size={21}
          onClick={() =>
            window.open("https://tidal.com/album/461048750/u", "_blank")
          }
          data-tooltip-id="footer-tooltip"
          data-tooltip-content="Tidal"
        />
      </div>

      <p className="footer-copyright">
        © Gilles Grethen {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Footer;
