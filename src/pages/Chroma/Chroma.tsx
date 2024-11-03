import "./Chroma.scss";
import chromaImage from "../../assets/chroma.png";
import chromaImage2 from "../../assets/chroma2.png";
import chromaCD from "../../assets/chroma_cd.png";

function Chroma() {
  return (
    <div className="chroma">
      <div className="chromaContent">
        <h1>Chroma</h1>
        <div className="chromaCD">
          <img src={chromaCD} alt="chroma cd cover" />
          <p>
            Chroma's debut album will be available on all streaming platforms
            starting November 8th, 2024!
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
      </div>
    </div>
  );
}

export default Chroma;
