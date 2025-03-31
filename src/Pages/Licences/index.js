import "./style.css";
import licences from "../../assets/data/licences.json";

const Licences = () => {
  return (
    <>
      {/* LICENCES */}
      <div className="licences">
        <div className="sectionTitle mt-2 hidden">
          <h2>
            <div className="line"></div>
            <span className="sectionTitleMain">LICENCES</span>
            <div className="line"></div>
          </h2>
        </div>
        {/* <div className="licencesBanner">
          <img
            src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/477875091_652306947139708_2739746465941956581_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=5i66U-ncE70Q7kNvgFFdm1o&_nc_oc=AdnoEFcn73AZyE0b071MQjBLJKo5EWrr_KtgZuO_SzlnV4EIfV3-MdU8J6rmUvnt-g4oH_-lxYy73zJ2jD_9Hsb1&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=2BlgeJg8j93CNJbFgW2tZQ&oh=00_AYF9fxlf4F1saiC8LYoxlo-BLVH2NxWAvgsnPhG-ITCSWQ&oe=67E974ED"
            alt="Licences Banner"
            className="bannerImage"
          />
        </div> */}
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
