import React, { useState } from "react";
import "./MustRead.css";

const MustRead = () => {
  const [activeTab, setActiveTab] = useState("shipping");

  const renderTabContent = () => {
    switch (activeTab) {
      case "shipping":
        return (
          <div className="tab-content" id="shipping-tab">
            <h3>Estimated shipping cost</h3>

            <table>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Delivery Method</th>
                  <th>Delivery Time</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>EU</td>
                  <td>EU Warehouse + UPS</td>
                  <td>40-45 days</td>
                  <td>
                    Tax-free delivery via EU warehouse. Tracking available after
                    EU arrival.
                  </td>
                </tr>
                <tr>
                  <td>US/CANADA</td>
                  <td>Local Warehouse + Local Delivery</td>
                  <td>30-35 days</td>
                  <td>
                    Tax-free delivery via local warehouse. Tracking available
                    after local arrival.
                  </td>
                </tr>
                <tr>
                  <td>AU/UK</td>
                  <td>Local Warehouse + Local Delivery</td>
                  <td>40-45 days</td>
                  <td>
                    Tax-free delivery via local warehouse. Tracking available
                    after local arrival.
                  </td>
                </tr>
                <tr>
                  <td>Japan</td>
                  <td>China Post Express</td>
                  <td>7 days</td>
                  <td>
                    Special contract with China Post. Low customs inspection
                    rate. Very cost-effective.
                  </td>
                </tr>
                <tr>
                  <td>Switzerland/Norway</td>
                  <td>China Post Train</td>
                  <td>Varies</td>
                  <td>
                    Special train delivery for items under 30KG. More economical
                    than commercial express.
                  </td>
                </tr>
                <tr>
                  <td>Russia</td>
                  <td>Russia Warehouse + Local Delivery</td>
                  <td>Varies</td>
                  <td>
                    Tax-free delivery. Local courier charges apply for final
                    delivery.
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="shipping-note">
              *If your region is not listed, please message us for a shipping
              quote.
            </p>
            <p className="shipping-note">
              *Shipping cost is calculated based on package size (Formula: Depth
              x Width x Height / 6000 = Final weight)
            </p>
          </div>
        );

      case "payment":
        return (
          <div className="tab-content" id="payment-tab">
            <h3>Custom Payment Plan</h3>
            <div className="highlight-box">
              <h4>General Conditions:</h4>
              <ul>
                <li>Applicable for orders from ~500$</li>
                <li>Internal installment - not through financial companies</li>
                <li>No credit card/documentation required</li>
                <li>
                  0% interest rate option (for 3-6 months) or low interest (9-12
                  months)
                </li>
                <li>
                  Payment via: Apple Pay, Google Pay, Mastercard, PayPal, Visa,
                  Wechat Pay
                </li>
              </ul>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Initial Payment (Deposit)</th>
                  <th>Remaining Payments</th>
                  <th>Interest Rate</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3 months</td>
                  <td>30%</td>
                  <td>2 times (35% + 35%) monthly</td>
                  <td>0%</td>
                  <td className="table-note">Most popular</td>
                </tr>
                <tr>
                  <td>6 months</td>
                  <td>20%</td>
                  <td>5 times (16% monthly)</td>
                  <td>0%</td>
                  <td className="table-note">
                    Suitable for orders &gt;2 million
                  </td>
                </tr>
                <tr>
                  <td>9 months</td>
                  <td>20%</td>
                  <td>8 times</td>
                  <td>1%/month</td>
                  <td className="table-note">Low interest, smaller payments</td>
                </tr>
                <tr>
                  <td>12 months</td>
                  <td>20%</td>
                  <td>11 times</td>
                  <td>1%/month</td>
                  <td className="table-note">
                    Super light monthly payments, suitable for high-value orders
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "purchasing":
        return (
          <div className="tab-content" id="purchasing-tab">
            <h3>Purchasing Policy</h3>
            <div className="highlight-box">
              <ul>
                <li>
                  The final product delivered to customers may differ from the
                  Pre-Order images (as studios may make changes for better
                  suitability).
                </li>
                <li>
                  The product release date may be earlier or later depending on
                  the studio's progress.
                </li>
                <li>
                  Additional payment period starts when you receive the notice,
                  with a deadline of 2 weeks after the goods arrive at BB Toys.
                </li>
                <li>
                  Customers who do not pay on time will lose their deposit for
                  that product.
                </li>
                <li>
                  BB Toys does not support refunding deposits after they have
                  been paid to the studio. If you wish, you can transfer your
                  slot to another person.
                </li>
                <li>
                  Goods usually arrive 3-4 weeks after the tracking code is
                  issued from the factory, but may be delayed or arrive sooner
                  due to various factors.
                </li>
              </ul>
            </div>
            <div className="highlight-box">
              <h4>Pre-Order</h4>
              <p>
                Pre-Order is a form of ordering a product from the studio in
                advance with a certain deposit, to confirm your order and
                receive the studio's listed price. As these are handmade
                products, after pre-ordering, customers usually have to wait an
                average of 3 months or more to receive the goods.
              </p>
            </div>
            <div className="highlight-box">
              <h4>Order</h4>
              <p>
                Order is a form of purchasing/ordering products that have
                already been released on the market. Ordered products usually
                require a deposit of 30-50%. As these are already released,
                customers usually receive the goods after 1-4 weeks, but this
                may vary due to various factors.
              </p>
            </div>
            <div className="highlight-box">
              <h4>Why should you Pre-Order?</h4>
              <ul>
                <li>Each product is produced in a limited quantity.</li>
                <li>
                  Some products can only be purchased during the Pre-Order
                  period.
                </li>
                <li>
                  After release, it is very difficult to find the product again,
                  and if found, the price is often much higher (2-3 times, or
                  even unavailable).
                </li>
              </ul>
            </div>
            <div className="highlight-box">
              <h4>Why should you Order?</h4>
              <ul>
                <li>
                  Order products usually have better prices than in-stock items.
                </li>
                <li>Items are not available at the store.</li>
                <li>
                  Order items can be selected according to customer
                  requirements.
                </li>
              </ul>
            </div>
          </div>
        );

      case "return":
        return (
          <div className="tab-content" id="return-tab">
            <h3>RETURN POLICY</h3>
            <div className="highlight-box">
              <p>
                <strong>
                  Applies to all products at BB TOYS (Effective from 01/01/2023)
                </strong>
              </p>
              <p>
                <em>
                  *Condition: Customers must provide a video recording the
                  unboxing process (starting from the outermost packaging
                  layer)*
                </em>
              </p>
            </div>
            <div className="highlight-box">
              <h4>For PVC Products</h4>
              <ul>
                <li>
                  Products broken or damaged during shipping ⇒ Support for
                  repair.
                </li>
                <li>
                  Products scratched or with manufacturing defects ⇒ Support to
                  contact the supplier for complaints.
                </li>
                <li>
                  Boxes severely damaged during shipping ⇒ Resolved on a
                  case-by-case basis.
                </li>
                <li>
                  Products damaged during use ⇒ Support for repair with a
                  service fee.
                </li>
              </ul>
              <p>
                <em>"BB Toys does not guarantee 100% perfect product boxes"</em>
              </p>
            </div>
            <div className="highlight-box">
              <h4>For Resin Products</h4>
              <ul>
                <li>
                  Products damaged during shipping ⇒ Support for repair or
                  provide replacement parts (if possible).
                </li>
                <li>
                  Products missing parts due to the studio ⇒ Support to contact
                  the studio to send new parts.
                </li>
              </ul>
              <p>
                <em>
                  *In force majeure cases, BB Toys will try to resolve and
                  provide the most suitable solution for customers*
                </em>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="must-read-section">
      <h2 className="must-read-title">Must Read</h2>
      <div className="tabs-info-service">
        <button
          className={activeTab === "shipping" ? "tab active" : "tab"}
          onClick={() => setActiveTab("shipping")}
          role="tab"
          aria-selected={activeTab === "shipping"}
          aria-controls="shipping-tab"
        >
          Shipping Cost
        </button>
        <button
          className={activeTab === "payment" ? "tab active" : "tab"}
          onClick={() => setActiveTab("payment")}
          role="tab"
          aria-selected={activeTab === "payment"}
          aria-controls="payment-tab"
        >
          Payment Plan
        </button>
        <button
          className={activeTab === "purchasing" ? "tab active" : "tab"}
          onClick={() => setActiveTab("purchasing")}
          role="tab"
          aria-selected={activeTab === "purchasing"}
          aria-controls="purchasing-tab"
        >
          Purchasing Policy
        </button>
        <button
          className={activeTab === "return" ? "tab active" : "tab"}
          onClick={() => setActiveTab("return")}
          role="tab"
          aria-selected={activeTab === "return"}
          aria-controls="return-tab"
        >
          Return Policy
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default MustRead;
