import "./styles/HomeStudio.css";
import useFetchStudio from "../../shared/hooks/useFetchStudio";
import { useState, useCallback } from "react";
import Loading from "../../shared/components/Loading/Loading";

const HomeStudio = () => {
  const { studioes, loading, error } = useFetchStudio();
  const [imageErrors, setImageErrors] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleImageError = useCallback((index) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }));
  }, []);

  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-studio">
      <div className="title">
        <h2>Famous Studios</h2>
      </div>
      <div className="list-studioes">
        {studioes.map((studio, index) => (
          <div
            key={studio.studioKey || index}
            className={`card ${hoveredIndex === index ? "hovered" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={studio.imgThumbnail}
              alt={studio.studioName}
              loading="lazy"
              onError={() => handleImageError(index)}
              className={`thumbnail ${imageErrors[index] ? "error-image" : ""}`}
            />
            <img
              src={studio.imgMain}
              alt={studio.studioName}
              loading="lazy"
              onError={() => handleImageError(index)}
              className={`main-image ${
                imageErrors[index] ? "error-image" : ""
              }`}
            />
            <div className="studio-name">{studio.studioName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeStudio;
