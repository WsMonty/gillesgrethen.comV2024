import "./Chroma.scss";
import chromaImage from "../../assets/chroma.jpg";
import chromaImage2 from "../../assets/chroma2.jpg";
import chromaCD from "../../assets/chroma_cd.jpg";

function Chroma() {
  return (
    <div className="chroma">
      <div className="chromaContent">
        <h1>Chroma</h1>
        <div className="chromaCD">
          <img src={chromaCD} alt="chroma cd cover" />
          <p>
            Chroma's debut album is out now!
            <br />
            <br />
            <a
              className="link"
              href="https://album.link/chroma"
              target="_blank"
            >
              Stream it here!
            </a>
            <p>or</p>
            <a
              className="link"
              href="https://gillesgrethen.com/shop"
              target="_blank"
            >
              Buy it here!
            </a>
          </p>
        </div>
        <div className="chromaText">
          <p>
            From their first meeting, Sebastian Voltz and Gilles Grethen felt a
            strong musical attraction. Piano and guitar seemed to complement
            each other, effortlessly blending their timbres.
            <br />
            <br />
            Piano and guitar are rare duo partners – Gilles Grethen and
            Sebastian Voltz take advantage of this. In their interplay they
            paint colorfully, weave their rhythms into a dense yet always
            transparent fabric and skillfully play with the fact that both
            instruments have the same abilities.
          </p>
          <img src={chromaImage} alt="chroma biography" />
          <p>
            The compositions of the two artists move between quieter, extended
            passages and more intense, dense moments. In their modern jazz,
            however, improvisation is always in the foreground, through which
            the virtuosity of the two musicians comes to light. This is where
            the long experience of the two musicians in the field of classical
            music becomes apparent.
            <br />
            <br />
            Chamber music interplay, lively, free and intuitive.
          </p>
          <img src={chromaImage2} alt="chroma duo portrait" />
        </div>
        <div className="chromaBooking">
          <h2>Booking:</h2>
          <p>
            For booking and press inquiries please contact:{" "}
            <a
              className="link"
              href="mailto:grethen.gilles@gmail.com"
              target="_blank"
            >
              grethen.gilles@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chroma;
