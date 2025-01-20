import { useEffect, useState } from "react";
import "./Music.scss";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import { getProjects } from "../../contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MOBILE_BREAKPOINT } from "../../globals/constants";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Gig from "./Gig";

interface Project {
  name: string;
  description: { json: Document };
  image: Media;
  link: string;
  id: number;
}

function Music() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [gigs, setGigs] = useState<GigInfo[]>([]);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/8e6676d71abf0788902ff814252440ccbe5904a9e030a5692e7bed826ccfd09a@group.calendar.google.com/events?key=${
        import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data: Gigs) =>
        setGigs(
          data.items
            .filter((gig: GigInfo) =>
              dayjs(gig.start.dateTime).isAfter(dayjs().subtract(1, "week"))
            )
            .sort((a: GigInfo, b: GigInfo) =>
              dayjs(a.start.dateTime).isBefore(dayjs(b.start.dateTime)) ? -1 : 1
            )
        )
      )
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getProjects()
      .then((response) => setProjects(response))
      .catch((error) => console.log(error));
  }, []);

  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => {
        return (
          <p
            style={{
              marginBottom: "1em",
              fontSize: isMobile ? "1.5rem" : "1.1rem",
            }}
          >
            {children}
          </p>
        );
      },
      [INLINES.HYPERLINK]: (_node: any, children: any) => {
        return (
          <a
            className="link"
            href={_node.data.uri || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className="music">
      {gigs && gigs.length > 0 && (
        <div className="gigs">
          <h2>Upcoming concerts</h2>
          <div className="gigsList">
            {gigs.slice(0, 3).map((gig, index) => {
              return (
                <Gig
                  key={index}
                  gig={gig}
                  index={index}
                  gigsTotalLength={gigs.length}
                />
              );
            })}
            {gigs.length > 3 && (
              <p className=" seeMoreGigs" onClick={() => navigate("/gigs")}>
                See more gigs
              </p>
            )}
          </div>
        </div>
      )}
      {projects &&
        projects
          .sort((a, b) => a.id - b.id)
          .map((project) => (
            <div key={project.name}>
              <div className="descriptionPicture">
                <div className="description">
                  <h2>{project.name}</h2>
                  {documentToReactComponents(project.description.json, options)}
                </div>
                <div className="imageAndLink">
                  <img
                    src={project.image.url}
                    alt={project.name}
                    onClick={() => window.open(project.link, "_blank")}
                  />
                  <a
                    className="link biggerLink"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get more info about {project.name}!
                  </a>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default Music;
