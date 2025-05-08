import "./styles/Licenses.css";
import React from "react";
import useFetchLicenses from "../../shared/hooks/useFetchLicenses";
import Loading from "../../shared/components/Loading/Loading";

const Licenses = () => {
  const { licenses, loading, error } = useFetchLicenses();

  return (
    <>
      {/* LICENSES */}
      <div className="licenses">
        {/* Tiêu đề luôn hiển thị */}
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
              <div className="licensesWrapper">
                <div className="licensesRow">
                  <ul className="row row-cols-1 row-cols-sm-4 g-4">
                    {licenses.map((license) => (
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Licenses;
