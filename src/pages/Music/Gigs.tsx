import dayjs from "dayjs";
import { useState, useEffect } from "react";
import "./Music.scss";
import Gig from "./Gig";

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

  return (
    <div className="music">
      {gigs && gigs.length > 0 && (
        <div className="gigs">
          <h2>All upcoming concerts</h2>
          <div className="gigsList">
            <h2>{dayjs().format("YYYY")}</h2>
            {gigs
              .filter(
                (gig) => dayjs(gig.start.dateTime).year() === dayjs().year()
              )
              .map((gig, index) => (
                <Gig
                  key={index}
                  gig={gig}
                  index={index}
                  gigsTotalLength={gigs.length}
                />
              ))}
          </div>
          {gigs.some(
            (gig) =>
              dayjs(gig.start.dateTime).year() === dayjs().add(1, "year").year()
          ) && (
            <div className="gigsList">
              <h2>{dayjs().add(1, "year").format("YYYY")}</h2>
              {gigs
                .filter(
                  (gig) =>
                    dayjs(gig.start.dateTime).year() ===
                    dayjs().add(1, "year").year()
                )
                .map((gig, index) => (
                  <Gig
                    key={index}
                    gig={gig}
                    index={index}
                    gigsTotalLength={gigs.length}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gigs;
