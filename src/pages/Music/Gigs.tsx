import dayjs from "dayjs";
import { useState, useEffect } from "react";
import "./Music.scss";

const Gigs = () => {
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

  const goToMaps = (location: string) => {
    window.open(`https://www.google.com/maps/search/${location}`, "_blank");
  };

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="music">
      {gigs && gigs.length > 0 && (
        <div className="gigs">
          <h2>All upcoming concerts</h2>
          <div className="gigsList">
            {gigs.map((gig, index) => {
              const date = dayjs(gig.start.dateTime);

              const link = gig.description
                ? gig.description.match(/<a href="([^"]+)"/)?.[1]
                : null;

              return (
                <div key={gig.id}>
                  <div className="gigInfo">
                    <div className="gigDate">
                      <p>{date.format("MMM")}</p>
                      <p>{date.format("D")}</p>
                    </div>
                    <div className="gigSummary">
                      <h3 className="gigTitle">{gig.summary}</h3>
                      {link ? (
                        <div>
                          <p
                            className="linkBlue gigDescription"
                            onClick={() => openLink(link)}
                          >
                            Tickets and more info
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="gigTBA">More infos will come!</p>
                        </div>
                      )}

                      {gig.location && (
                        <p
                          className="linkBlue gigLocation"
                          onClick={() => goToMaps(gig.location)}
                        >
                          Show on Google Maps
                        </p>
                      )}
                    </div>
                  </div>
                  {index !== gigs.length - 1 && <hr />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gigs;
