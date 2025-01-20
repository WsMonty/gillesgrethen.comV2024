import dayjs from "dayjs";
import "./Music.scss";

interface GigProps {
  gig: GigInfo;
  index: number;
  gigsTotalLength: number;
}

const Gig = ({ gig, index, gigsTotalLength }: GigProps) => {
  const date = dayjs(gig.start.dateTime);

  const link = gig.description
    ? gig.description.match(/<a href="([^"]+)"/)?.[1]
    : null;

  const goToMaps = (location: string) => {
    window.open(`https://www.google.com/maps/search/${location}`, "_blank");
  };

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div key={gig.id}>
      <div className="gigInfo">
        <div className="gigDate">
          <p>{date.format("MMM D")}</p>
          <p>{date.format("HH:mm")}</p>
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
      {index !== gigsTotalLength - 1 && <hr />}
    </div>
  );
};

export default Gig;
