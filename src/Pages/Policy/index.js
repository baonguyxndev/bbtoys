import React, { useState, useCallback, memo } from "react";
import { FaTools, FaRunning, FaCreditCard } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { LuReceipt } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { MdOutlinePolicy } from "react-icons/md";
import { TfiShoppingCartFull } from "react-icons/tfi";

import "./style.css";

// Constants
const CATEGORIES = [
  {
    id: 1,
    icon: <TfiShoppingCartFull />,
    title: "Shopping",
    description: "Guidelines and regulations for shopping on the system",
  },
  {
    id: 2,
    icon: <TbTruckDelivery />,
    title: "Shipping",
    description: "Shipping and delivery policies",
  },
  {
    id: 3,
    icon: <MdOutlinePolicy />,
    title: "Policy",
    description: "Purchase/Return policies and After-Sales service",
  },
];

const CATEGORY_CARDS = {
  1: [
    {
      icon: <FaRunning />,
      title: "Products",
      link: "/products",
      content: "Product-related policies and information.",
      sections: [
        {
          title: "What is a product state?",
          items: [
            {
              subtitle: "Avaiale",
              content: [
                "These are products available at the shop's warehouses and showrooms.",
                "Viet Nam: ",
                "China: ",
                "Japan: ",
                "Canada: ",
                "Singapore: ",
              ],
            },
            {
              subtitle: "Order",
              content: [
                "The product has been released but is currently unavailable or out of stock in the store's showroom or warehouse.",
              ],
            },
            {
              subtitle: "Pre-Order",
              content: [
                "A pre-order allows you to secure the latest statues before production is completed. Since resin statues are produced in limited quantities, studios only manufacture based on pre-order demand.",
                "Purchasing during the pre-order period ensures that you get the product at its original retail price. Once a product is released, availability is not guaranteed, and any remaining stock in the market is often resold at a higher price due to increased demand.",
              ],
            },
            {
              subtitle: "Sold-Out",
              content: [
                "The product is currently out of stock at BB Toys stores or at Studios, please contact us via media (facebook, instagram, wechat, tiktok, mail)",
              ],
            },
          ],
        },
        {
          title:
            "Why is the product price sometimes different from the website?",
          items: [
            {
              subtitle: "",
              content: [
                "Most of our products are limited edition with restricted availability, and their prices fluctuate based on market demand, timing, and other factors.",
                "Special pricing may only be available for a limited time due to the unique nature of these collectibles.",
                "As inventory moves quickly, some products may sell out within minutes of being updated on our website.",
                "While we strive to keep prices up to date, it is not always possible due to the large number of items we manage.",
                "We sincerely appreciate your understanding. For the most accurate pricing and availability, please contact us directly.",
              ],
            },
          ],
        },
        {
          title: "What types of materials?",
          items: [
            {
              subtitle: "Resin",
              content: [
                "Resin is like the high-definition version of materials for anime figures. It's a sturdy mix that locks into shape once it dries. Collectors dig it for those super detailed, often limited-edition figures because it's great at picking up all those tiny, complex details.",
              ],
            },
            {
              subtitle: "PVC",
              content: [
                "PVC (Polyvinyl Chloride) is a type of plastic that's very popular in various industries due to its versatility. It's commonly found in items such as plumbing pipes, and electrical cables, and also plays a key role in the creation of anime figures.",
              ],
            },
            {
              subtitle: "ABS",
              content: [
                "Known for its hardness, ABS is less likely to deform under high temperatures, making it suitable for displaying figures near windows or in well-lit rooms. Its resistance to physical impact means fewer worries about accidental drops. Often, you'll find ABS paired with PVC to give your items some extra backbone where it's needed most.",
              ],
            },
            {
              subtitle: "Silicon",
              content: [
                "This is a type of plastic with high elasticity, durable over time, limited damage during transportation or breakage, easy to clean.",
              ],
            },
          ],
        },
      ],
    },
    {
      icon: <FaCreditCard />,
      title: "Payments",
      link: "/payments",
      content: "Payment methods and security details.",
      sections: [
        {
          title: "How do I make a payment? What currencies do you accept?",
          items: [
            {
              subtitle: "We accept payments via:",
              icon: <FaCreditCard />,
              content: ["PayPal", "Wise Transfer", "Credit Card"],
            },
            {
              subtitle:
                "Payments are processed in USD. If you choose to pay via PayPal’s Goods and Services, an additional 5% fee will be applied.",
              content: [],
            },
          ],
        },
        {
          title: "Payment Error!!!",
          items: [
            {
              subtitle: "",
              icon: <FaCreditCard />,
              content: [
                "If your payment has failed, you will be notified by email and presented with the option to enter a new payment via a new payment email reminder.",
                "If the error persists, please contact our support via the following selection.",
                "Category: Payment & Refund",
                "Subject: Payment Error.",
              ],
            },
          ],
        },
        {
          title: "Update of the payment method",
          items: [
            {
              subtitle: "",
              icon: <FaCreditCard />,
              content: [
                "Please contact our support via the following selection.",
                "Category: Payment & Refund",
                "Subject: Update payment method.",
              ],
            },
          ],
        },
      ],
    },
    {
      icon: <GiCancel />,
      title: "Cancellation",
      link: "/cancellation",
      content: "Order cancellation rules and conditions.",
      sections: [
        {
          title: "Under Warranty",
          items: [
            {
              subtitle: "On Pre-Order",
              content: [
                "By sending a support ticket to request a cancellation within 14 days of placing an order or pre-order, the refund is equal to 100%.",
                "If the support ticket is sent after this period, the refund will be equal to 90%.",
              ],
            },
            {
              subtitle: "Parcel Refusal (+ opening ticket)",
              content: [
                "By sending a support ticket to declare the refusal of the parcel within 14 days maximum after having received and refused it, the refund is equal to 100%.",
                "Important: the return of the parcel(s) is at the customer’s expense.",
                "If the support ticket is sent after the period, the 10% deposit will be deducted from the refund as well as the possible breakage fees, the refund will be made after reception and inspection of the item.",
              ],
            },
            {
              subtitle: "After Reception",
              content: [
                "If the customer decides to send back his parcel during the 14 days maximum after reception, by sending a support ticket within the deadline, he will have to:",
                "Organize by his or her own means the return of the part, the shipping costs being at his or her expense.",
                "Upon receipt of the package, a quality control will be performed, the customer being held responsible for any damage incurred during the return of the parcel.",
                "If no breakage is found, the refund will be equal to 100%.",
                "If one or more breakages are noted, the refund will be equal to 100% - the amount that relates to the breakages.",
              ],
            },
          ],
        },
        {
          title: "Out of Warranty",
          items: [
            {
              subtitle: "On Pre-Order",
              content: [
                "If the cancellation request ticket is sent more than 14 days after the order or pre-order of the product, the refund will be equal to 90%.",
              ],
            },
            {
              subtitle: "Parcel Refusal (without opening a ticket)",
              content: [
                "If the package is refused upon receipt but the support ticket is sent more than 14 days after the receipt, the refund will be equal to 90%.",
                "Don’t forget to open a support ticket as soon as the parcel is refused.",
              ],
            },
            {
              subtitle: "After Reception",
              content: [
                "It is not possible to return a parcel received more than 14 days ago.",
                "If the ticket is sent after this period, there will be no cancellation or refund possible.",
              ],
            },
          ],
        },
      ],
    },
  ],
  2: [
    {
      icon: <TbTruckDelivery />,
      title: "Delivery",
      link: "/delivery",
      content: "Expected delivery times and tracking.",
      sections: [
        {
          title: "Do you ship worldwide?",
          items: [
            {
              subtitle: "",
              content: [
                "Yes! We offer two international shipping options:",
                "Express Air Shipping (5–7 days) – Fast but more expensive",
                "Sea/Train Shipping (30–45 days) – Cost-effective but slower",
                "To calculate the exact shipping cost, please send us your shipping address, and we will provide a quote.",
              ],
            },
          ],
        },
      ],
    },
    {
      icon: <IoMdTime />,
      title: "Delivery Time",
      link: "/delivery",
      content: "Expected delivery times and tracking.",
      sections: [
        {
          title: "In Stock",
          items: [
            {
              subtitle: "",
              content: [
                "A product available on order and in stock (e.g., figurines xtra) is available within 30 days after purchase.",
                "Once the product is sent, you will be notified by email.",
              ],
            },
          ],
        },
        {
          title: "On Pre-Order",
          items: [
            {
              subtitle: "",
              content: [
                "The estimated delivery period of the product appears on the product sheet.",
                "Please note that the delivery time is an estimate and may vary depending on the situation.",
                "In order to stay up to date on the progress of the production and shipping of your pre-ordered statue on our site, you can consult the latest Point Prod articles published on the Blog.",
                "Statues are shipped in order of pre-order, waves, and territories. Once ready to be sent to you, you will receive an email confirming the address and once sent, a follow-up email.",
                "If you ordered from a reseller, please contact them directly.",
              ],
            },
          ],
        },
        {
          title: "At the time of the address confirmation",
          items: [
            {
              subtitle: "",
              content: [
                "When you receive your Address Confirmation email before shipment, you will be able to select the desired carrier and an estimated delivery time will be displayed.",
                "If you move before shipping, this email will allow you to indicate your new delivery address, in your name.",
              ],
            },
          ],
        },
      ],
    },
    {
      icon: <LuReceipt />,
      title: "Transport & Customs Fees",
      link: "/fees",
      content: "Costs related to shipping and customs.",
      sections: [
        {
          title: "Transport Costs",
          items: [
            {
              subtitle: "",
              content: [
                "Shipping costs are free for shipments to France, Luxembourg, Belgium, and Germany.",
                "If your destination country is not listed, shipping will be charged and you will be able to see an estimate of the shipping costs at the time of purchase. Then, once the statue is ready to go and your address is confirmed (in case of pre-order), you will be able to pay your shipping invoice, after which the statue can be sent.",
              ],
            },
          ],
        },
        {
          title: "Customs Fees",
          items: [
            {
              subtitle: "",
              content: [
                "Depending on where your products are stored, we will provide you with information on fees.",
                "In the case of an After-Sales Service Return, BB Toys declares it as an After-Sales Service Return. However, depending on the country, taxes may be applied.",
                "Please check your country's (receiving) laws.",
              ],
            },
          ],
        },
      ],
    },
  ],
  3: [
    {
      icon: <IoBagOutline />,
      title: "Purchase Policy",
      link: "/purchase-policy",
      content: "What to do if your parcel arrives damaged.",
      sections: [
        {
          title: "Purchasing Process at BB Toys",
          items: [
            {
              subtitle: "",
              content: [
                "Customers submit the desired product model for purchase.",
                "Customers confirm their purchase upon receiving the price quotation.",
                "Customers provide a deposit payment invoice.",
                "Customers submit the necessary information for invoice issuance.",
                "Customers receive and verify the invoice details.",
                "Upon product arrival, customers complete the remaining payment to NZ Toys.",
                "Customers receive the tracking number, concluding the purchasing process.",
              ],
            },
          ],
        },
      ],
    },
    {
      icon: <TbTruckReturn />,
      title: "Return Policy",
      link: "/return-policy",
      content: "Warranty terms and coverage.",
      sections: [
        {
          title: "For PVC product line",
          items: [
            {
              subtitle: "",
              content: [
                "If the product is damaged or broken due to transportation, repair support will be provided.",
                "If the product has scratches or manufacturing defects, we will assist in communicating with the supplier to file a complaint.",
                "If the product’s packaging is severely damaged during shipping, the resolution will be determined on a case-by-case basis.",
                "If the product is damaged due to usage, repair support is available at an additional charge.",
              ],
            },
            {
              subtitle: "BB Toys does not guarantee 100% perfect packaging.",
              content: [],
            },
          ],
        },
        {
          title: "For Resin Product Line",
          items: [
            {
              subtitle: "",
              content: [
                "If the product is damaged during transportation, repair support or replacement parts will be provided (if available).",
                "If the product is missing parts due to a Studio error, we will assist in contacting the Studio to request new parts.",
              ],
            },
            {
              subtitle:
                "In cases of force majeure, NZ Toys will make every effort to resolve the issue and provide the most suitable solution for our customers.",
              content: [],
            },
          ],
        },
      ],
    },
    {
      icon: <FaTools />,
      title: "After-Sales Service",
      link: "/after-sales-service",
      content: "Reporting and replacing defective products.",
      sections: [
        {
          title: "What After-Sales support do you provide?",
          items: [
            {
              subtitle: "",
              content: [
                "Before shipping, we offer the option to open and inspect the package for any breakages. If any issues are found at this stage, we can request replacement parts from the studio and fix them before shipping.",
                "If a product arrives damaged, we will assist you in contacting the studio for possible replacement parts. However, you must provide a clear unboxing video as proof. Please note:",
                "Not all studios can provide replacement parts, especially for products that have been released for a long time.",
                "If replacement is not possible, we will attempt to find a local repair service or offer a partial refund based on the extent of the damage.",
                "Our warranty period for resin statues is 7 days upon receipt. Any breakages or missing parts must be reported to our customer service team within this period.",
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Components
const PolicyCategory = memo(
  ({ icon, title, description, isActive, onClick }) => (
    <div
      className={`policy-category ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
);

const PolicySubcategory = memo(({ icon, title, isActive, onClick }) => (
  <div
    className={`policy-subcategory ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    <div className="subcategory-icon">{icon}</div>
    <h4>{title}</h4>
  </div>
));

const DetailContent = memo(({ item }) => (
  <div className="policy-details">
    <h2>{item.title}</h2>
    <div className="policy-detail-item">
      {item.description && (
        <p className="detail-description">{item.description}</p>
      )}
      {item.sections?.map((section, index) => (
        <div key={index} className="detail-section">
          <h4>{section.title}</h4>
          {section.items.map((subItem, subIndex) => (
            <div key={subIndex} className="sub-detail-section">
              {typeof subItem === "string" ? (
                <ul>
                  <li>{subItem}</li>
                </ul>
              ) : (
                <>
                  <div className="sub-detail-header">
                    <h5>{subItem.subtitle}</h5>
                  </div>
                  <ul>
                    {subItem.content.map((contentItem, contentIndex) => (
                      <li key={contentIndex}>{contentItem}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
      {item.buttonText && (
        <button
          className="detail-button"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = item.link;
          }}
        >
          {item.buttonText}
        </button>
      )}
    </div>
  </div>
));

const Policy = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleCategoryClick = useCallback((categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
    setActiveItem(null);
  }, []);

  const handleItemClick = useCallback((item) => {
    setActiveItem(item);
  }, []);

  const renderSubcategories = () => {
    if (!activeCategory || !CATEGORY_CARDS[activeCategory]) return null;

    return (
      <div className="policy-subcategories show">
        {CATEGORY_CARDS[activeCategory].map((item, index) => (
          <PolicySubcategory
            key={index}
            icon={item.icon}
            title={item.title}
            isActive={activeItem?.title === item.title}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="policy">
      <div className="sectionTitle mt-2 hidden">
        <h2 className="title">
          <div className="line"></div>
          <span className="sectionTitleMain">Policies & Terms</span>
          <div className="line"></div>
        </h2>
      </div>
      <div className="container-full mx-5">
        <div className="row">
          {/* SIDE BAR */}
          <div className="col-md-3 hidden">
            <div className="sidebar">
              {/*Category*/}
              {CATEGORIES.map((category) => (
                <div key={category.id} className="category-wrapper hidden">
                  <PolicyCategory
                    {...category}
                    isActive={activeCategory === category.id}
                    onClick={() => handleCategoryClick(category.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 hidden">
            <div className="policy-subcategories-wrapper hidden">
              {renderSubcategories()}
            </div>
            <div className="policy-content main-content hidden">
              {activeItem ? (
                <DetailContent item={activeItem} />
              ) : (
                <div className="coming-soon">
                  <h2>Please select an item to view details</h2>
                  <p>
                    Choose an item from the list above to view detailed
                    information
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
