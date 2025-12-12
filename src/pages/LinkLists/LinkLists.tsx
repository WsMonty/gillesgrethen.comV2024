import { useNavigate } from "react-router-dom";
import "./LinkLists.scss";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { BsFileMusic } from "react-icons/bs";

enum ListName {
  LIST_VIEW = "linklists",
  COMPOSITION_FILM = "composition-film",
  NOSTALGIE_REVIEWS = "nostalgie-reviews",
}

const ListNameURLMap = {
  [ListName.COMPOSITION_FILM]: "/linklists/composition-film",
  [ListName.NOSTALGIE_REVIEWS]: "/linklists/nostalgie-reviews",
};

const ListNameMap = {
  [ListName.LIST_VIEW]: "Links",
  [ListName.COMPOSITION_FILM]: "Composition | Film Music examples",
  [ListName.NOSTALGIE_REVIEWS]: "Nostalgie | Reviews",
};

interface LinkList {
  name: ListName;
  links: {
    name: string;
    description?: string;
    url: string;
  }[];
}

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/gilles_grethen_",
    icon: <FaInstagram />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/gillesgrethen",
    icon: <FaFacebook />,
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/channel/UCgZez7ebsQQFIO83RDIj8zQ",
    icon: <FaYoutube />,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@gillesgrethen",
    icon: <FaTiktok />,
  },
  {
    name: "Nostalgie - Gilles Grethen Big Band",
    url: "https://gillesgrethenbigband.hearnow.com",
    icon: <BsFileMusic />,
  },
  {
    name: "CHROMA (2024)",
    url: "https://album.link/chroma",
    icon: <BsFileMusic />,
  },
  {
    name: "State of Mind - Live (2023) - Gilles Grethen Quartet",
    url: "https://album.link/som-live",
    icon: <BsFileMusic />,
  },
  {
    name: "State of Mind - Gilles Grethen Quartet & Strings (2022)",
    url: "https://album.link/som",
    icon: <BsFileMusic />,
  },
  {
    name: "Time Suite - Gilles Grethen Quartet (2021)",
    url: "https://album.link/time-suite",
    icon: <BsFileMusic />,
  },
];

const linkList: LinkList[] = [
  {
    name: ListName.COMPOSITION_FILM,
    links: [
      {
        name: "Coffee & Water (Catherine Dauphin, Luxembourg/UK, 2021)",
        url: "https://vimeo.com/636046700",
      },
      {
        name: "Trail of Light (BIFSC 2024)",
        description:
          "Music composed for the Berlin International Film Scoring Competition 2024.",
        url: "https://drive.google.com/file/d/1b_pGLn4K5ZfnR3S63lbhjMowNFqt7-eF/view?usp=share_link",
      },
      {
        name: "Genesis (BIFSC 2022)",
        description:
          "Music composed for the Berlin International Film Scoring Competition 2022.",
        url: "https://drive.google.com/file/d/1SRrmHZO6c9ZPb08FePrWqo47L7Bt8t9n/view?usp=share_link",
      },
      {
        name: "Change - Gilles Grethen Quartet & Strings | Music Video (2023)",
        url: "https://www.youtube.com/watch?v=KFusjpETh7w",
      },
      {
        name: "The Collector (Dimitris Argyriou 2022)",
        description:
          "Re-score for the short film 'The Collector' by Dimitris Argyriou during the Fusion Film Scoring Workshops (Thessaloniki, Greece, 2022).",
        url: "https://www.youtube.com/watch?v=I6e8oLQ1MBM",
      },
    ],
  },
  {
    name: ListName.NOSTALGIE_REVIEWS,
    links: [
      {
        name: "hifi-ifas.de | Victoriah Szirmai",
        description: "Review in German",
        url: "https://hifi-ifas.de/musik-tipp-gilles-grethen-big-band-nostalgie-und-weitere-musikalische-last-minute-geschenktipps",
      },
      {
        name: "jazz-fun.de | Jacek Brun",
        description: "Review in German",
        url: "https://www.jazz-fun.de/gilles-grethen-big-band-nostalgie.html",
      },
      {
        name: "Radio 100,7 | Jeff Herr",
        description: "Audio interview in Luxembourgish",
        url: "https://100komma7.lu/show/Een-zwee-Jazz/202510302100/episode/E-raife-Klang-teschent-Energie-a-Sensibiliteit?pd=search",
      },
      {
        name: "jazzma.hu | Szegedy-Maszák Blanka",
        description: "Review in Hungarian",
        url: "https://www.jazzma.hu/lemezpolc/kulfoldi-eloadok/grethen-gilles/nostalgie/kritika/grethen-gilles-nostalgie",
      },
    ],
  },
];

const LinkLists = () => {
  const listName = location.pathname.split("/").pop();
  const navigate = useNavigate();

  const isListView = listName === ListName.LIST_VIEW;
  const currentList = linkList.find((list) => list.name === listName);

  if (!currentList && listName !== ListName.LIST_VIEW) {
    navigate("/linklists");
  }

  return (
    <div className="linkLists">
      {isListView || !currentList ? (
        <>
          <h1
            className="listName"
            style={{ marginBlock: "2rem", fontSize: "2.5rem" }}
          >
            Links
          </h1>
          <div className="socialLinks">
            {socialLinks.map((link) => (
              <div
                key={link.name}
                onClick={() => window.open(link.url, "_blank")}
                className="link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  maxWidth: "fit-content",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {link.icon}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {link.name}
                </div>
              </div>
            ))}
            <h1
              className="listName"
              style={{ fontSize: "2.5rem", marginTop: "2rem" }}
            >
              Other lists
            </h1>
            <div className="linkList">
              {linkList.map((list) => (
                <div key={list.name}>
                  <h2
                    className="link"
                    style={{ maxWidth: "fit-content", cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        ListNameURLMap[list.name as keyof typeof ListNameURLMap]
                      )
                    }
                  >
                    {ListNameMap[list.name as keyof typeof ListNameMap]}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="linkList" style={{ fontSize: "1.5em" }}>
          <div className="backToLinkLists">
            <a className="link" href="/linklists">
              Back to all links
            </a>
          </div>
          <h1 className="listName">
            {ListNameMap[currentList.name as keyof typeof ListNameMap]}
          </h1>
          <div className="linkListItems">
            {currentList?.links.map((link) => (
              <div key={link.name} className="linkItem">
                <a
                  className="link"
                  style={{ maxWidth: "fit-content" }}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
                {link.description && (
                  <p className="linkDescription">{link.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkLists;
