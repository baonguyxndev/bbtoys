import "./styles/HomeCate.css";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import useFetchCategories from "../../shared/hooks/useFetchCategories.js";
import Loading from "../../shared/components/Loading/Loading.js";

const HomeCate = () => {
  const [activeTab, setActiveTab] = useState("anime");
  const { categories, loading, error } = useFetchCategories();

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <section className="homeCate">
      <div className="container-full">
        <div className="title mt-2">
          <h2>
            <div className="line"></div>
            <span className="titleMain">
              <BiSearchAlt /> &nbsp; FIND BY SOURCE
            </span>
            <div className="line"></div>
          </h2>
        </div>

        <ul className="nav navPills mb-3 justify-content-center">
          {categories.map((category) => (
            <li key={category.categoryKey} className="navItem">
              <button
                className={`navBtnHomeCate ${
                  activeTab === category.categoryKey ? "active" : ""
                }`}
                onClick={() => setActiveTab(category.categoryKey)}
              >
                {category.categoryName}
              </button>
            </li>
          ))}
        </ul>

        <div className="categoryGrid">
          {categories
            .find((cat) => cat.categoryKey === activeTab)
            ?.items.map((category, index) => (
              <a
                key={index}
                href={`/category/${activeTab}/${category.itemKey}`}
                className="categoryItem text-center"
              >
                <img src={category.itemImg} alt={category.itemName} />
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
