import licences from "../../assets/data/licences.json";
import "./style.css";

const HomeLicences = () => {
  return (
    <div className="homeLicences">
      {/* LICENCES */}
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
            {/* Hàng 1: 4 card nhỏ */}
            <ul className="row row-cols-1 row-cols-sm-4 g-4 licenceRow">
              {licences.slice(0, 4).map((licence) => (
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
            {/* Hàng 2: 2 card nhỏ + 1 card lớn */}
            <div className="licenceRow licenceRow--mixed hidden">
              {/* 2 card nhỏ */}
              <ul className="row row-cols-1 row-cols-sm-2 g-4">
                {licences.slice(4, 6).map((licence) => (
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
              {/* Card lớn */}
              <ul className="row">
                <li className="col-12 allLicenceItem hidden">
                  <div className="allLicenceCard">
                    <a href="/licences" className="cardAllLicences">
                      <div className="text">OTHER</div>
                      <div className="imageWrapper">
                        <img
                          src="https://e1.pxfuel.com/desktop-wallpaper/894/350/desktop-wallpaper-anime-digital-anime-crossover-accel-world-another-crossover-anime.jpg"
                          alt={`img-all-licences`}
                          className="img-fluid"
                        />
                      </div>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeLicences;
