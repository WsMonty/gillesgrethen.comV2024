import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAutoLinkTreeBySlug } from "../../contentful";

const Listen = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    const redirect = async () => {
      const release = await getAutoLinkTreeBySlug(slug);
      if (release?.sourceUrl && release.isActive !== false) {
        window.location.replace(release.sourceUrl);
      } else {
        setNotFound(true);
      }
    };
    redirect();
  }, [slug, navigate]);

  if (notFound) {
    return (
      <div className="loading">
        Link not found. <a href="/">Go home</a>
      </div>
    );
  }

  return <div className="loading">Redirecting...</div>;
};

export default Listen;
