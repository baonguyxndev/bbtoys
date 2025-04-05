import "./style.css";
import licences from "../../assets/data/licences.json";

const Licences = () => {
  return (
    <>
      {/* LICENCES */}
      <div className="licences">
        <div className="title mt-2 hidden">
          <h2>
            <div className="line"></div>
            <span className="titleMain">LICENCES</span>
            <div className="line"></div>
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="licenceWrapper">
              <ul className="row row-cols-1 row-cols-sm-4 g-4 licenceRow">
                {licences.map((licence) => (
                  <li key={licence.id} className="col hidden">
                    <div className="licenceCard">
                      <a
                        href={`/licences/${licence.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="licenceCard-link"
                      >
                        <div className="imageWrapper">
                          <img
                            src={licence.background}
                            alt={`img-${licence.name}`}
                            className="img-fluid"
                          />
                          <div className="logoOverlay">
                            <img
                              src={licence.logo}
                              alt={`logo-${licence.name}`}
                            />
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Licences;
