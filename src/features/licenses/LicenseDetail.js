import "./styles/LicenseDetail.css";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchLicenses from "../../shared/hooks/useFetchLicenses";
import useFetchProducts from "../../shared/hooks/useFetchProducts";
import { flattenProducts } from "../../shared/utils/productUtils";
import Loading from "../../shared/components/Loading/Loading";
import ProductItem from "../../shared/components/ProductItem/ProductItem";

const LicenseDetail = () => {
  const { licenseName } = useParams();
  const {
    licenses,
    loading: licensesLoading,
    error: licensesError,
  } = useFetchLicenses();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useFetchProducts();

  // Tìm license dựa trên tên
  const license = useMemo(() => {
    if (!licenses) return null;
    return licenses.find(
      (l) => l.name.toLowerCase().replace(/\s+/g, "-") === licenseName
    );
  }, [licenses, licenseName]);

  // Lọc sản phẩm theo license
  const licenseProducts = useMemo(() => {
    if (!products || !license) return [];
    const allProducts = flattenProducts(products);
    return allProducts.filter((product) => {
      // Kiểm tra xem sản phẩm có thuộc category của license này không
      const category = products.find(
        (cat) => cat.categoryKey === license.categoryKey
      );
      if (!category) return false;

      // Kiểm tra xem sản phẩm có thuộc item của license này không
      return category.items.some((item) => item.itemKey === license.itemKey);
    });
  }, [products, license]);

  if (licensesLoading || productsLoading) return <Loading />;
  if (licensesError) return <div>{licensesError}</div>;
  if (productsError) return <div>{productsError}</div>;
  if (!license) return <div>License not found</div>;

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="licenseDetail">
      {/* Header */}
      <div className="licenseHeader">
        <div className="container">
          <div className="headerContent">
            <div className="licenseInfo">
              <h1 className="licenseName">{license.name}</h1>
              <p className="licenseDescription">{license.description}</p>
            </div>
            <div className="licenseLogo">
              <img src={license.logo} alt={`${license.name} logo`} />
            </div>
          </div>
        </div>
      </div>

      {/* License Agreement Section */}
      <div className="container">
        <div className="licenseAgreement">
          <div className="agreementHeader">
            <h1>LICENSE AGREEMENT</h1>
            <p className="agreementNumber">
              Agreement No: BB-{license.name.substring(0, 3).toUpperCase()}-
              {new Date().getFullYear()}
            </p>
            <p className="agreementDate">Date: {currentDate}</p>
          </div>

          <div className="agreementContent">
            <div className="agreementParties">
              <div className="party">
                <h3>LICENSOR</h3>
                <p className="companyName">{license.name}</p>
                <p className="address">
                  {license.address || "123 License Street, Tokyo, Japan"}
                </p>
                <p>Tax ID: {license.taxId || "123-456-789"}</p>
                <p>Represented by: {license.representative || "John Doe"}</p>
                <p>Position: {license.position || "CEO"}</p>
              </div>
              <div className="party">
                <h3>LICENSEE</h3>
                <p className="companyName">BB Toys Company Limited</p>
                <p className="address">
                  123 Toy Street, District 1, Ho Chi Minh City, Vietnam
                </p>
                <p>Tax ID: 0312345678</p>
                <p>Represented by: Nguyen Van A</p>
                <p>Position: Chief Executive Officer</p>
              </div>
            </div>

            <div className="agreementTerms">
              <h3>WHEREAS:</h3>
              <div className="whereasList">
                <p>
                  A. The Licensor is the owner of certain intellectual property
                  rights related to {license.name} ("Licensed Property").
                </p>
                <p>
                  B. The Licensee desires to obtain a license to use the
                  Licensed Property for the manufacture and distribution of
                  products in Vietnam.
                </p>
                <p>
                  C. The Licensor is willing to grant such license to the
                  Licensee under the terms and conditions set forth herein.
                </p>
              </div>

              <h3>
                NOW, THEREFORE, in consideration of the mutual covenants
                contained herein, the parties agree as follows:
              </h3>

              <div className="termsList">
                <div className="term">
                  <h4>1. GRANT OF LICENSE</h4>
                  <p>
                    1.1. Subject to the terms and conditions of this Agreement,
                    Licensor hereby grants to Licensee an exclusive license to
                    use the Licensed Property in connection with the
                    manufacture, distribution, and sale of products in Vietnam.
                  </p>
                  <p>
                    1.2. The license granted herein is non-transferable and
                    non-assignable without the prior written consent of
                    Licensor.
                  </p>
                </div>

                <div className="term">
                  <h4>2. TERM AND TERRITORY</h4>
                  <p>
                    2.1. This Agreement shall commence on the Effective Date and
                    continue for a period of three (3) years, unless terminated
                    earlier in accordance with the terms herein.
                  </p>
                  <p>
                    2.2. The licensed territory shall be limited to Vietnam.
                  </p>
                </div>

                <div className="term">
                  <h4>3. ROYALTIES AND PAYMENT</h4>
                  <p>
                    3.1. Licensee shall pay Licensor a royalty of 10% of the Net
                    Sales Price of all Licensed Products sold.
                  </p>
                  <p>
                    3.2. Royalty payments shall be made quarterly, within 30
                    days after the end of each calendar quarter.
                  </p>
                  <p>
                    3.3. All payments shall be made in USD via wire transfer to
                    the account designated by Licensor.
                  </p>
                </div>

                <div className="term">
                  <h4>4. QUALITY CONTROL</h4>
                  <p>
                    4.1. Licensee shall submit all product designs, prototypes,
                    and marketing materials to Licensor for approval prior to
                    production and distribution.
                  </p>
                  <p>
                    4.2. Licensor shall have the right to inspect Licensee's
                    manufacturing facilities and quality control procedures.
                  </p>
                </div>

                <div className="term">
                  <h4>5. MARKETING AND PROMOTION</h4>
                  <p>
                    5.1. Licensee shall use commercially reasonable efforts to
                    promote and market the Licensed Products.
                  </p>
                  <p>
                    5.2. Licensee shall participate in relevant trade shows and
                    exhibitions in Vietnam.
                  </p>
                  <p>
                    5.3. All marketing materials must be approved by Licensor
                    prior to use.
                  </p>
                </div>

                <div className="term">
                  <h4>6. INTELLECTUAL PROPERTY RIGHTS</h4>
                  <p>
                    6.1. Licensor retains all rights, title, and interest in and
                    to the Licensed Property.
                  </p>
                  <p>
                    6.2. Licensee shall not challenge Licensor's ownership of
                    the Licensed Property.
                  </p>
                </div>

                <div className="term">
                  <h4>7. CONFIDENTIALITY</h4>
                  <p>
                    7.1. Both parties agree to maintain the confidentiality of
                    all proprietary information received from the other party.
                  </p>
                  <p>
                    7.2. This obligation shall survive the termination of this
                    Agreement.
                  </p>
                </div>

                <div className="term">
                  <h4>8. TERMINATION</h4>
                  <p>
                    8.1. Either party may terminate this Agreement upon 90 days'
                    written notice if the other party breaches any material term
                    of this Agreement.
                  </p>
                  <p>
                    8.2. Upon termination, Licensee shall cease all use of the
                    Licensed Property and return all materials to Licensor.
                  </p>
                </div>
              </div>
            </div>

            <div className="agreementSignatures">
              <div className="signature">
                <h4>For and on behalf of {license.name}</h4>
                <div className="signatureLine"></div>
                <p>Authorized Signature</p>
                <p>Name: {license.representative || "John Doe"}</p>
                <p>Position: {license.position || "CEO"}</p>
                <p>Date: {currentDate}</p>
              </div>
              <div className="signature">
                <h4>For and on behalf of BB Toys</h4>
                <div className="signatureLine"></div>
                <p>Authorized Signature</p>
                <p>Name: Nguyen Van A</p>
                <p>Position: Chief Executive Officer</p>
                <p>Date: {currentDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container">
        <div className="productsSection">
          <h2 className="sectionTitle">Licensed Products</h2>
          <div className="productsGrid">
            {licenseProducts.map((product) => (
              <div key={product.id} className="productItem">
                <ProductItem product={product} layout="grid" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseDetail;
