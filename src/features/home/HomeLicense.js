import "./styles/HomeLicense.css";
import React from "react";
import useFetchLicenses from "../../shared/hooks/useFetchLicenses";
import Loading from "../../shared/components/Loading/Loading";

const HomeLicense = () => {
  const { licenses, loading, error } = useFetchLicenses();

  return (
    <div className="homeLicenses">
      {/* LICENSES */}
      <div className="title mt-2">
        <h2>
          <div className="line"></div>
          <span className="titleMain">LICENSES</span>
          <div className="line"></div>
        </h2>
      </div>
      {/* Hiển thị Loading sau tiêu đề khi đang tải */}
      {loading && <Loading />}

      {/* Hiển thị lỗi nếu có */}
      {error && <div>{error}</div>}

      {/* Nội dung chính, chỉ hiển thị khi không loading và không có lỗi */}
      {!loading && !error && (
        <div className="container">
          <div className="row">
            <div className="licenseWrapper">
              {/* Hàng 1: 4 card nhỏ */}
              <div className="licenseRow">
                <ul className="row row-cols-1 row-cols-sm-4 g-4">
                  {licenses.slice(0, 4).map((license) => (
                    <li key={license.id} className="col">
                      <div className="licenseCard">
                        <a
                          href={`/licenses/${license.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="licenseCard-link"
                        >
                          <div className="imageWrapper">
                            <img
                              src={license.background}
                              alt={`img-${license.name}`}
                              className="img-fluid"
                            />
                            <div className="logoOverlay">
                              <img
                                src={license.logo}
                                alt={`logo-${license.name}`}
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Hàng 2: 2 card nhỏ + 1 card lớn */}
              <div className="licenseRow licenseRow--mixed">
                {/* 2 card nhỏ */}
                <ul className="row row-cols-1 row-cols-sm-2 g-4">
                  {licenses.slice(4, 6).map((license) => (
                    <li key={license.id} className="col">
                      <div className="licenseCard">
                        <a
                          href={`/licenses/${license.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="licenseCard-link"
                        >
                          <div className="imageWrapper">
                            <img
                              src={license.background}
                              alt={`img-${license.name}`}
                            />
                            <div className="logoOverlay">
                              <img
                                src={license.logo}
                                alt={`logo-${license.name}`}
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
                  <li className="col-12 allLicenseItem">
                    <div className="allLicenseCard">
                      <a href="/licenses" className="cardAllLicenses">
                        <div className="text">OTHER</div>
                        <div className="imageWrapper">
                          <img
                            src="https://e1.pxfuel.com/desktop-wallpaper/894/350/desktop-wallpaper-anime-digital-anime-crossover-accel-world-another-crossover-anime.jpg"
                            alt={`img-all-licenses`}
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
      )}
    </div>
  );
};

export default HomeLicense;
