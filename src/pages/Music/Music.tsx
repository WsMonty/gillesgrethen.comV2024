import { useEffect, useState } from "react";
import "./Music.scss";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import { getProjects } from "../../contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MOBILE_BREAKPOINT } from "../../globals/constants";

interface Project {
  name: string;
  description: { json: Document };
  image: Media;
  link: string;
  id: number;
}

function Music() {
  const [projects, setProjects] = useState<Project[]>([]);

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
      {projects
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
