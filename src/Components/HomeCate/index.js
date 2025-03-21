import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

const categories = [
  {
    name: "Anime",
    key: "anime",
    items: [
      {
        name: "Dragon Ball Z",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Dragon_Ball_Z_Logo_C.png",
        key: "dragon-ball-z",
      },
      {
        name: "One Piece",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/One-piece-2048x748.png",
        key: "one-piece",
      },
      {
        name: "Naruto",
        img: "https://img.orzgk.com/wp-content/uploads/2024/11/pngimg.com-naruto_PNG47.png",
        key: "naruto",
      },
      {
        name: "Jujutsu Kaisen",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Jujutsu-Kaisen.png",
        key: "jujutsu-kaisen",
      },
      {
        name: "Attack On Titan",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Attack-on-Titan.png",
        key: "attack-on-titan",
      },
      {
        name: "Fairy Tail",
        img: "https://upload.wikimedia.org/wikipedia/fr/7/77/Fairy_Tail_%282014%29_Logo.png?20170523181914",
        key: "fairy-tail",
      },
      {
        name: "Demon Slayer",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Demon-Slayer-Logo.png",
        key: "demon-slayer",
      },
      {
        name: "Hunter x Hunter",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/HUNTER%C3%97HUNTER.png",
        key: "hunter-x-hunter",
      },
      {
        name: "Spy x Family",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/SPY%C3%97FAMILY.png",
        key: "spy-x-family",
      },
      {
        name: "Berserk",
        img: "https://img.orzgk.com/wp-content/uploads/2024/07/vk0amsjhqjg61.png",
        key: "berserk",
      },
      {
        name: "Chainsaw Man",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Chainsaw-Man.png",
        key: "chainsaw-man",
      },
      {
        name: "Slam Dunk",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Slam-Dunk.png",
        key: "slam-dunk",
      },
      {
        name: "Cyberpunk",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Cyberpunk-2077.png",
        key: "cyberpunk",
      },
      {
        name: "Digimon Adventure",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/digimon_adventure_logo_by_sliter_dfiw4qd-fullview.png",
        key: "digimon-adventure",
      },
      {
        name: "Saint Seiya",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Saint-Seiya.png",
        key: "saint-seiya",
      },
      {
        name: "Jojo",
        img: "https://img.orzgk.com/wp-content/uploads/2024/07/Jojos_Bizarre_Adventure_English_logo-2048x1290.png",
        key: "jojo",
      },
      {
        name: "Fate Stay Night",
        img: "https://img.orzgk.com/wp-content/uploads/2024/07/48671a7bec5ac4a871f2c99bd2c67669.png",
        key: "fate-stay-night",
      },
    ],
  },
  {
    name: "Mobile Game",
    key: "mobile-game",
    items: [
      {
        name: "Genshin Impact",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Genshin-I%EF%BD%8Dpact-_-logo-1080x675-1.png",
        key: "genshin-impact",
      },
      {
        name: "Honkai Impact",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/honkai-impact.png",
        key: "honkai-impact",
      },
      {
        name: "Honkai Star Rail",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Honkai_Star_Rail_logo.png",
        key: "honekai-star-rail",
      },
      {
        name: "Blue Archive",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Blue_Archive_logo.svg-1.png",
        key: "blue-archive",
      },
      {
        name: "Azur Lane",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Azur_Lane_English_Release_Logo.png",
        key: "azur-lane",
      },
      {
        name: "Arknights",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Arknights_English_Release_Logo.svg.png",
        key: "arknights",
      },
      {
        name: "Zenless Zone Zero",
        img: "https://img.orzgk.com/wp-content/uploads/2024/07/50380b0324d6b0ac2f9eed1844d0a2e5.png",
        key: "zenless-zone-zero",
      },
      {
        name: "Project Sekai",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Project-Sekai.png",
        key: "project-sekai",
      },
      {
        name: "Uma Musume Pretty Derby",
        img: "https://img.orzgk.com/wp-content/uploads/2024/07/logo.4c404883.png",
        key: "uma-musume-pretty-derby",
      },
      {
        name: "Fate Grand Order",
        img: "https://img.orzgk.com/wp-content/uploads/2024/07/Fate_Grand_Order_logo.png",
        key: "fate-grand-order",
      },
      {
        name: "GYEE",
        img: "http://img.orzgk.com/wp-content/uploads/2023/11/gyee-logo.png",
        key: "gyee",
      },
    ],
  },
  {
    name: "Video Game",
    key: "video-game",
    items: [
      {
        name: "Elden Ring",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/6076036fdb272f49688c571013f3ede1.png",
        key: "elden-ring",
      },
      {
        name: "Resident Evil",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/resident-evil.png",
        key: "resident-evil",
      },
      {
        name: "The Legend Of Zelda",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Zelda_Logo.svg.png",
        key: "the-legend-of-zelda",
      },
      {
        name: "Final Fantasy",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/final-fantasy-logo_602113434b503.png",
        key: "final-fantasy",
      },
      {
        name: "Nier:Automata",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Nier-Automata-Logo-PNG-Pic.png",
        key: "nier-automata",
      },
      {
        name: "League Of Legend",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/League_of_Legends_2019_vector.svg.png",
        key: "league-of-legend",
      },
      {
        name: "Monter Hunter",
        img: "https://img.orzgk.com/wp-content/uploads/2024/07/Monster_Hunter_logo.png",
        key: "monter-hunter",
      },
      {
        name: "Dark Souls",
        img: "http://img.orzgk.com/wp-content/uploads/2024/07/dfixtv0-1b50db79-9390-40c9-99ac-36d6e1e17ab0.png",
        key: "dark-souls",
      },
      {
        name: "Baldur's Gate",
        img: "https://img.orzgk.com/wp-content/uploads/2024/07/logo-666a175a.png",
        key: "baldurs-gate",
      },
      {
        name: "Overwatch",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/overwatch-6.png",
        key: "overwatch",
      },
      {
        name: "Street Fighter",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/580b57fcd9996e24bc43c341.png",
        key: "street-fighter",
      },
    ],
  },
  {
    name: "Super Hero",
    key: "super-hero",
    items: [
      {
        name: "DC Comics",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/900px-DC_Comics_logo.svg.png",
        key: "dc-comics",
      },
      {
        name: "Marvel",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1200px-Marvel_Logo.svg.png",
        key: "marvel",
      },
      {
        name: "Kamen Raider",
        img: "https://images.seeklogo.com/logo-png/55/1/kamen-rider-2020-logo-png_seeklogo-553896.png",
        key: "kamen-kaider",
      },
      {
        name: "Ultraman",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Ultraman_tiga_logo.svg/1200px-Ultraman_tiga_logo.svg.png",
        key: "ultraman",
      },
      {
        name: "Power Ranger",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/Power-Rangers-Logo-1993-1996.png",
        key: "power-ranger",
      },
    ],
  },
  {
    name: "Celebrity",
    key: "celebrity",
    items: [
      {
        name: "Basket Ball",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/NBA.webp",
        key: "basket-ball",
      },
      {
        name: "Football",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/football-2.png",
        key: "football",
      },
      {
        name: "Vtuber",
        img: "https://img.orzgk.com/wp-content/uploads/2024/12/Kizuna_AI_-_SCP_Foundation_2.png",
        key: "vtuber",
      },
      {
        name: "Super Star",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/superstar.png",
        key: "super-star",
      },
      {
        name: "Porn Star",
        img: "https://img.orzgk.com/wp-content/uploads/2023/11/pornstar.png",
        key: "porn-start",
      },
    ],
  },
];

const HomeCate = () => {
  const [activeTab, setActiveTab] = useState("anime");

  return (
    <section className="homeCate">
      <div className="container-fluid">
        <div className="sectionTitle mt-2">
          <h2>
            <div className="line"></div>
            <span className="sectionTitleMain">
              <BiSearchAlt /> &nbsp; FIND BY SOURCE
            </span>
            <div className="line"></div>
          </h2>
        </div>

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

        <div className="category-grid">
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
