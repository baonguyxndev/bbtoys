import { useState } from "react";
import "./style.css";
import WarehouseAndShowroomImg from "../../assets/image/showroom-and-warehouse.jpg";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiWechat,
  SiGmail,
} from "react-icons/si";

// Giả lập hình ảnh (thay thế bằng URL thực tế nếu có)
const images = {
  privateWarehouseAndShowroomInVietNam:
    "https://cdn11.bigcommerce.com/s-5s1ah0hhi7/product_images/uploaded_images/-1-1-.jpg",
  privateWarehouseAndShowroomInChina:
    "https://cdn11.bigcommerce.com/s-5s1ah0hhi7/product_images/uploaded_images/-1-1-.jpg",
  privateWarehouseAndShowroomInJapan:
    "https://cdn11.bigcommerce.com/s-5s1ah0hhi7/product_images/uploaded_images/-1-1-.jpg",
  privateWarehouseAndShowroomInCanada:
    "https://cdn11.bigcommerce.com/s-5s1ah0hhi7/product_images/uploaded_images/-1-1-.jpg",
  privateWarehouseAndShowroomInSingapore:
    "https://cdn11.bigcommerce.com/s-5s1ah0hhi7/product_images/uploaded_images/-1-1-.jpg",
  ensureSecurity:
    "https://media.licdn.com/dms/image/v2/D5612AQGm1fNiyYc9Bg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690828104113?e=2147483647&v=beta&t=ECeG8RZNw8gsCQiV-8dIUfIR_9upp2jFxwnUajzEs3k",
  afterSaleService:
    "https://www.adtance.com/media/pages/blog/2020/was-ist-after-sales-service/2959077289-1615847967/after-sales-service.jpg",
  cheapestShipping:
    "https://media.licdn.com/dms/image/v2/D5612AQEdyfDiZ9bYvg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733840869687?e=2147483647&v=beta&t=9V3_774eUi21JROkTR0NudR97_mJboqyAOKHHYFYgh4",
  experiencedProfessional:
    "https://assets.kpmg.com/is/image/kpmgcloud/experienced-professionals-banner:cq5dam-web-2732-1088?wid=2732&hei=1088",
  professionalPacking:
    "https://rambosmoversinc.com/images/box-with-packing-peanuts-01.webp",
};

const Info = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="contact">
      <div className="title mt-2 hidden">
        <h2>
          <div className="line"></div>
          <span className="titleMain">INFO</span>
          <div className="line"></div>
        </h2>
      </div>
      <div className="container hidden">
        <div className="brief-introduction hidden">
          <p>
            Welcome to BBTOYS, your premier destination for retail and custom
            orders of officially licensed collectible figures from around the
            world. We specialize in sourcing and procuring figures based on
            customer requests, ensuring top-quality products for collectors in
            the region.
          </p>

          <p>
            At BBTOYS, we are committed to providing exceptional service at
            competitive prices. As a leader in the figure industry, we guarantee
            the authenticity of our products, with clear documentation and
            verified origins.
          </p>
          <p>
            Why wait? Visit us today—fulfilling your passion is our greatest
            honor.
          </p>
        </div>

        <div className="tabs hidden">
          <button
            className={activeTab === "about" ? "tab active" : "tab"}
            onClick={() => setActiveTab("about")}
            role="tab"
            aria-selected={activeTab === "about"}
            aria-controls="about-tab"
          >
            About Us
          </button>
          <button
            className={activeTab === "media" ? "tab active" : "tab"}
            onClick={() => setActiveTab("media")}
            role="tab"
            aria-selected={activeTab === "media"}
            aria-controls="media-tab"
          >
            Contact
          </button>
        </div>

        <div className="tab-content hidden">
          {activeTab === "about" && (
            <div className="about" id="about-tab">
              <h1>About Us</h1>

              {/* Private Warehouse */}
              <section className="content-section">
                <h2>Private warehouse / Showroom</h2>

                <img
                  src={WarehouseAndShowroomImg}
                  alt="Private Warehouse in Viet Nam"
                />
                <ul>
                  <li>
                    We currently have dedicated warehouses and showrooms in Việt
                    Nam, Canada, China, Japan, and Singapore. This allows us to
                    provide a better and more convenient shopping experience
                    while ensuring safer product transportation, significantly
                    reducing the risk of damage during shipping. However, we
                    cannot guarantee 100% protection against potential shipping
                    issues.
                  </li>
                </ul>
              </section>
              {/* Ensure the security of money */}
              <section className="content-section">
                <h2>Ensure the security of money</h2>
                <img src={images.ensureSecurity} alt="Ensure Security" />
                <ul>
                  <li>
                    Very friendly cancellation policy. Some studios have been
                    known to experience long delays in producing products. If a
                    product is shipped more than three months after our preset
                    time, we will refund the customer in full and without any
                    conditions IF the customer requests a refund. (However, we
                    will not accept refunds or exchanges once the product has
                    been shipped and the final product photos are available.)
                  </li>
                  <li>Free cancellation within 14 days</li>
                </ul>
              </section>

              {/* After Sale Service */}
              <section className="content-section">
                <h2>After Sale Service</h2>
                <img src={images.afterSaleService} alt="After Sale Service" />
                <ul>
                  <li>
                    We are constantly optimizing our after-sales service. Since
                    the after-sales problem is not something we can decide, it
                    depends entirely on the studio’s studio attitude and
                    efficiency, so this problem often bothers us. According to
                    the number of sales, we order more accessories to prevent
                    the possibility of after-sales.
                  </li>
                  <li>
                    Efficient response. At the end of June 2024, we set up a
                    small team to handle after-sales service for our customers.
                    Track the whole event, update the after-sales progress for
                    customers regularly.
                  </li>
                  <li>
                    Make replacements in our factory directly. We have our own
                    factory. If the studio does not cooperate, we will try our
                    best to produce replacement on the premise that we can
                    produce them.
                  </li>
                  <li>
                    Cooperative Statue repair in EU & US. We will bear all the
                    repair costs, there are professional statue repair personnel
                    to help us solve the problem for buyers.
                  </li>
                </ul>
              </section>

              {/* Cheapest shipping cost */}
              <section className="content-section">
                <h2>Cheapest shipping cost</h2>
                <img src={images.cheapestShipping} alt="Cheapest Shipping" />
                <ul>
                  <li>
                    Cutting out the middlemen to save you money. Our
                    transportation costs to customers are often the lowest
                    compared to the market. We have our own warehouse and
                    workers. We are not looking for suppliers to provide
                    products, and customers who buy products in our store save a
                    lot of costs.
                  </li>
                  <li>
                    The volume of our orders provides us with the bargaining
                    power to negotiate with the shipping company. In July 2024,
                    we signed agreements with UPS/Fedex directly for the United
                    States and Canada, and with DPD/DHL for Europe, updating the
                    Mexican ocean logistics provider and opening the customized
                    channels for resin sculpture products. We set up a
                    professional team to take care of transportation. Under the
                    premise of extremely low transportation costs, we have
                    optimized our channels again, and the transportation costs
                    have been reduced. Under the premise of ensuring
                    transportation safety, we have achieved the ultimate in
                    transportation costs, greatly reducing the cost of customer
                    collection.
                  </li>
                  <li>
                    Closer location to the most factories. From most factories
                    to our warehouses, we have a very good location. We have
                    professional people to help us pick up the goods from the
                    factory to our warehouse. In this stage, we save customers a
                    considerable part of front-end logistics freight and reduce
                    the risk of damage during transportation.
                  </li>
                </ul>
              </section>

              {/* Experienced and Professional */}
              <section className="content-section">
                <h2>Experienced and Professional</h2>
                <img
                  src={images.experiencedProfessional}
                  alt="Experienced Professional"
                />
                <ul>
                  <li>
                    Seven years of experience selling resin statues. Not all
                    resin products we will sell. We are more careful in the
                    choice of products. We have our own risk control system,
                    which greatly reduces the failure of product delivery and
                    poor after-sales experience caused by the studio. We
                    maintain the close communication with most of the factories
                    to ensure that the true details of the product are known.
                  </li>
                </ul>
              </section>

              {/* Professional packing team */}
              <section className="content-section">
                <h2>Professional packing team</h2>
                <img
                  src={images.professionalPacking}
                  alt="Professional Packing"
                />
                <ul>
                  <li>
                    We add extra protection to each box. For every customer who
                    purchases on our website, we offer a free packaging upgrade.
                    Customize different safety measures according to the
                    specific circumstances of each product.
                  </li>
                  <li>
                    Change the outside box to save shipping cost for buyer.
                    Sometimes, the factory will add meaningless measures, so
                    that the box will become large, so that the product box
                    generates a higher surcharge. In the case of absolute
                    safety, we will change the size of the shipping box to save
                    the corresponding freight for customers.
                  </li>
                </ul>
              </section>
            </div>
          )}
          {activeTab === "media" && (
            <div className="contact-media content-section">
              <h1>CONTACT</h1>
              <p>We are present on the following social platforms:</p>
              <div className="media-grid">
                <a
                  href="https://facebook.com/nztoys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-item"
                >
                  <SiFacebook />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://instagram.com/nztoys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-item"
                >
                  <SiInstagram />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://tiktok.com/@nztoys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-item"
                >
                  <SiTiktok />
                  <span>TikTok</span>
                </a>

                <a
                  href="https://wechat.com/nztoys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-item"
                >
                  <SiWechat />
                  <span>WeChat</span>
                </a>
                <a
                  href="https://wechat.com/nztoys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-item"
                >
                  <SiGmail />
                  <span>Mail</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
