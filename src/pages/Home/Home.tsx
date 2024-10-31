import { useEffect, useState } from "react";
import "./Home.scss";
import { getNews } from "../../contentful";
import { NEWS_LIMIT } from "../../globals/constants";
import { formatDate } from "../../globals/helpers";
import headerImage from "../../assets/GG_websiteHeader.jpg";

function Home() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    getNews()
      .then((response) => setNews(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="home">
      <div className="title">
        <h1>GILLES</h1>
        <h1 className="lastname">GRETHEN</h1>
      </div>
      <div className="headerImageContainer">
        <img
          src={headerImage}
          alt="Gilles and Grethen"
          className="headerImage"
        />
        <div className="headerImageOverlay">
          Jazz guitarist and composer from Luxembourg, currently based in
          Hamburg.
        </div>
      </div>
      <div className="newsList">
        {news.slice(0, NEWS_LIMIT).map((newsItem, index) => (
          <div key={index}>
            <div className="news">
              <div className="newsContent">
                <h2>{newsItem.title}</h2>
                <p>{newsItem.newsText}</p>
                <h3>
                  <a className="link" href={newsItem.link} target="_blank">
                    {newsItem.linkText || "Click here for more information!"}
                  </a>
                </h3>
                <p className="date">{formatDate(newsItem.date)}</p>
              </div>
              {newsItem.media && (
                <img
                  className="image-hover"
                  src={newsItem.media.url}
                  alt={newsItem.media.title}
                  onClick={() => {
                    window.open(newsItem.link, "_blank");
                  }}
                />
              )}
            </div>
            {index !== NEWS_LIMIT - 1 && <div className="divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
