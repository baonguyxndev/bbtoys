import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import categories from "../../assets/data/categories.json";
import "./style.css";

const HomeCate = () => {
  const [activeTab, setActiveTab] = useState("anime");

  return (
    <section className="homeCate">
      <div className="container-full">
        <div className="sectionTitle mt-2 hidden">
          <h2>
            <div className="line"></div>
            <span className="sectionTitleMain">
              <BiSearchAlt /> &nbsp; FIND BY SOURCE
            </span>
            <div className="line"></div>
          </h2>
        </div>

        <div className="hidden">
          <ul className="nav nav-pills mb-3 justify-content-center">
            {categories.map((category) => (
              <li key={category.key} className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === category.key ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(category.key)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="category-grid hidden">
          {categories
            .find((cat) => cat.key === activeTab)
            ?.items.map((category, index) => (
              <a
                key={index}
                href={`/category/${activeTab}/${category.key}`}
                className="category-item text-center"
              >
                <img src={category.img} alt={category.name} />
              </a>
            ))}
          <div className="viewAll">
            <a href={`/category/${activeTab}`}>View All</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCate;
