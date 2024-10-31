import { useEffect, useState } from "react";
import "./About.scss";
import { getAbout } from "../../contentful";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface About {
  name: string;
  email: string;
  phone: string;
  bio: {
    json: Document;
  };
  picturesCollection: {
    items: Picture[];
  };
}

interface Picture {
  url: string;
  description: string;
  title: string;
}

function About() {
  const [data, setData] = useState<About>();

  useEffect(() => {
    getAbout()
      .then((response) => setData(response[0]))
      .catch((error) => console.log(error));
  }, []);

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => {
        return <p style={{ marginBottom: "1em" }}>{children}</p>;
      },
    },
  };

  return (
    <div className="about">
      {data && (
        <>
          <div className="bioContainer">
            <div className="bio">
              {documentToReactComponents(data.bio.json, options)}
              <div className="contact">
                <h2>Contact</h2>
                <h3>{data?.name}</h3>
                <p>
                  <a href={`mailto:${data?.email}`} className="email">
                    <span className="link">{data?.email}</span>
                  </a>
                </p>
                <p>{data?.phone}</p>
              </div>
            </div>
            {data.picturesCollection.items[0] && (
              <img
                className="bioImage"
                src={data.picturesCollection.items[0].url}
                alt={data.picturesCollection.items[0].description}
              />
            )}
          </div>
          <div className="pictures"></div>
        </>
      )}
    </div>
  );
}

export default About;
