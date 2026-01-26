import { useEffect, useState } from "react";
import { LINK_LISTS_PATH } from "../../globals/constants";
import "./NewLinkList.scss";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaSpotify,
  FaYoutube,
  FaVimeo,
  FaSoundcloud,
  FaGoogleDrive,
  FaLink,
  FaRegNewspaper,
  FaVideo,
  FaArrowLeft,
  FaInstagram,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";
import { FaMicrophoneLines } from "react-icons/fa6";
import { BsFileMusic } from "react-icons/bs";
import { SiApplemusic, SiTidal } from "react-icons/si";
import { getLinkLists } from "../../contentful";

const iconMap: Record<string, React.ComponentType> = {
  FaSpotify,
  FaYoutube,
  FaVimeo,
  FaSoundcloud,
  SiApplemusic,
  SiTidal,
  FaGoogleDrive,
  FaMicrophoneLines,
  FaRegNewspaper,
  FaVideo,
  FaInstagram,
  BsFileMusic,
  FaFacebook,
  FaTiktok,
};

const getIcon = (icon?: string) => {
  if (icon && Object.prototype.hasOwnProperty.call(iconMap, icon)) {
    const IconComponent = iconMap[icon] as React.ComponentType<{
      className?: string;
    }>;
    return <IconComponent />;
  }
  return <FaLink />;
};

const NewLinkList = () => {
  const [links, setLinks] = useState<LinkTree[]>([]);
  const [linksAvailable, setLinksAvailable] = useState<boolean>(false);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await getLinkLists();
      setLinks(response);
      setLinksAvailable(true);
    };
    fetchLinks();
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const listName = location.pathname.split("/").filter(Boolean).pop() || "";

  const isListCollectionView = listName === LINK_LISTS_PATH;

  const handleLinkClick = (url?: string) => {
    if (url) {
      navigate(`/${LINK_LISTS_PATH}/${url}`);
    } else {
      navigate(`/${LINK_LISTS_PATH}`);
    }
  };

  useEffect(() => {
    if (!linksAvailable) return;
    if (
      listName !== LINK_LISTS_PATH &&
      !links.some((link) => link.path.toLowerCase() === listName.toLowerCase())
    ) {
      navigate(`/${LINK_LISTS_PATH}`);
    }
  }, [listName, navigate, links, linksAvailable]);

  return links.length > 0 ? (
    <div className="linkList-container">
      {!isListCollectionView && (
        <div className="backButton" onClick={() => handleLinkClick()}>
          <FaArrowLeft />
          <p>Back to all links</p>
        </div>
      )}

      {isListCollectionView ? (
        <div className="linkCardContainer">
          {links.map((link) => (
            <div
              key={link.path}
              className="linkCard"
              onClick={() => handleLinkClick(link.path)}
            >
              {link.imageUrl && <img src={link.imageUrl} alt={link.name} />}
              <div className="linkCardContent">
                <h3 className="linkCardTitle">{link.name}</h3>
                <p>{link.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="linkTreesContainer">
          <div className="linkTree">
            {links
              .find((link) => link.path === listName)
              ?.links.map((link) => (
                <div
                  className="linkTreeCard"
                  key={link.name}
                  onClick={() => window.open(link.url, "_blank")}
                >
                  <div className="linkTreeCardIcon">{getIcon(link.icon)}</div>
                  <div className="linkTreeCardContent">
                    <p className="link linkTreeCardTitle">{link.name}</p>
                    {link.description && (
                      <p className="linkTreeCardDescription">
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="loading">Loading...</div>
  );
};

export default NewLinkList;
