import "./FinnishCards.scss";

const FinnishCards = () => {
  return (
    <div className="page">
      <div className="cards-content">
        <h1 className="cards-title">Finnish Cards</h1>
        <p>
          Need help or have feedback? If you experience any issues, have
          questions, or would like to share suggestions, please contact me at
          <a className="link" href="mailto:gilles@gillesgrethen.com">
            {" "}
            gilles@gillesgrethen.com
          </a>
          .
        </p>
        <br />
        <p>
          When reporting a problem, please include your device model, iOS
          version, app version, and a short description of what happened. This
          helps me investigate and respond more effectively.
        </p>
      </div>
    </div>
  );
};

export default FinnishCards;
