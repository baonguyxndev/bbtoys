import HomeBanner from "../../Components/HomeBanner";
import { Button } from "@mui/material";
import { IoIosArrowRoundForward } from "react-icons/io";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import ProductItem from "../../Components/ProductItem";
import HomeCate from "../../Components/HomeCate";

const products = [
  {
    id: 1,
    name: "Kaido vs Luffy",
    studio: "Venus",
    price: 27000000,
    oldPrice: null,
    status: "Pre-Order",
    img1: "https://product.hstatic.net/200000515997/product/f15ece37-567b-42ed-af4e-5c034cf23810_48c0ee711d4f40018130b1f354088be0_master.jpg",
    img2: "https://product.hstatic.net/200000515997/product/7ab63b1d-0ec0-4035-87a7-3cf0b98ca9ea_7e641bd158804b4e80272ebbbaf55a04_master.jpg",
  },
  {
    id: 2,
    name: "Monkey.D.Luffy Red Roc",
    studio: "Monkey.D",
    price: 55000000,
    oldPrice: 60000000,
    status: "Available",
    img1: "https://www.ffcollectibles.com.au/cdn/shop/products/MONKEYDSTUDIOREDROCLUFFY_9.jpg?v=1662223252&width=990",
    img2: "https://www.senseitoy.com/image/magictoolbox_cache/cf3e6ec01aac7cb79461bcfe9d0d075e/2/0/2079_product/thumb600x600/2230335894/monkey-d-studio-luffy-red-roc-epic-diorama-resin-statue013.jpg",
  },
  {
    id: 3,
    name: "Kaido vs Luffy",
    studio: "Venus",
    price: 27000000,
    oldPrice: null,
    status: "Order",
    img1: "https://product.hstatic.net/200000515997/product/f15ece37-567b-42ed-af4e-5c034cf23810_48c0ee711d4f40018130b1f354088be0_master.jpg",
    img2: "https://product.hstatic.net/200000515997/product/7ab63b1d-0ec0-4035-87a7-3cf0b98ca9ea_7e641bd158804b4e80272ebbbaf55a04_master.jpg",
  },
  {
    id: 4,
    name: "Monkey.D.Luffy Red Roc",
    studio: "Monkey.D",
    price: 55000000,
    oldPrice: 60000000,
    status: "Sold-Out",
    img1: "https://www.ffcollectibles.com.au/cdn/shop/products/MONKEYDSTUDIOREDROCLUFFY_9.jpg?v=1662223252&width=990",
    img2: "https://www.senseitoy.com/image/magictoolbox_cache/cf3e6ec01aac7cb79461bcfe9d0d075e/2/0/2079_product/thumb600x600/2230335894/monkey-d-studio-luffy-red-roc-epic-diorama-resin-statue013.jpg",
  },
  {
    id: 5,
    name: "Kaido vs Luffy",
    studio: "Venus",
    price: 27000000,
    oldPrice: null,
    status: "Pre-Order",
    img1: "https://product.hstatic.net/200000515997/product/f15ece37-567b-42ed-af4e-5c034cf23810_48c0ee711d4f40018130b1f354088be0_master.jpg",
    img2: "https://product.hstatic.net/200000515997/product/7ab63b1d-0ec0-4035-87a7-3cf0b98ca9ea_7e641bd158804b4e80272ebbbaf55a04_master.jpg",
  },
  {
    id: 6,
    name: "Monkey.D.Luffy Red Roc",
    studio: "Monkey.D",
    price: 55000000,
    oldPrice: 60000000,
    status: "Available",
    img1: "https://www.ffcollectibles.com.au/cdn/shop/products/MONKEYDSTUDIOREDROCLUFFY_9.jpg?v=1662223252&width=990",
    img2: "https://www.senseitoy.com/image/magictoolbox_cache/cf3e6ec01aac7cb79461bcfe9d0d075e/2/0/2079_product/thumb600x600/2230335894/monkey-d-studio-luffy-red-roc-epic-diorama-resin-statue013.jpg",
  },
  {
    id: 7,
    name: "Kaido vs Luffy",
    studio: "Venus",
    price: 27000000,
    oldPrice: null,
    status: "Pre-Order",
    img1: "https://product.hstatic.net/200000515997/product/f15ece37-567b-42ed-af4e-5c034cf23810_48c0ee711d4f40018130b1f354088be0_master.jpg",
    img2: "https://product.hstatic.net/200000515997/product/7ab63b1d-0ec0-4035-87a7-3cf0b98ca9ea_7e641bd158804b4e80272ebbbaf55a04_master.jpg",
  },
  {
    id: 8,
    name: "Monkey.D.Luffy Red Roc",
    studio: "Monkey.D",
    price: 55000000,
    oldPrice: 60000000,
    status: "Available",
    img1: "https://www.ffcollectibles.com.au/cdn/shop/products/MONKEYDSTUDIOREDROCLUFFY_9.jpg?v=1662223252&width=990",
    img2: "https://www.senseitoy.com/image/magictoolbox_cache/cf3e6ec01aac7cb79461bcfe9d0d075e/2/0/2079_product/thumb600x600/2230335894/monkey-d-studio-luffy-red-roc-epic-diorama-resin-statue013.jpg",
  },
  {
    id: 9,
    name: "Kaido vs Luffy",
    studio: "Venus",
    price: 27000000,
    oldPrice: null,
    status: "Pre-Order",
    img1: "https://product.hstatic.net/200000515997/product/f15ece37-567b-42ed-af4e-5c034cf23810_48c0ee711d4f40018130b1f354088be0_master.jpg",
    img2: "https://product.hstatic.net/200000515997/product/7ab63b1d-0ec0-4035-87a7-3cf0b98ca9ea_7e641bd158804b4e80272ebbbaf55a04_master.jpg",
  },
  {
    id: 10,
    name: "Monkey.D.Luffy Red Roc",
    studio: "Monkey.D",
    price: 55000000,
    oldPrice: 60000000,
    status: "Available",
    img1: "https://www.ffcollectibles.com.au/cdn/shop/products/MONKEYDSTUDIOREDROCLUFFY_9.jpg?v=1662223252&width=990",
    img2: "https://www.senseitoy.com/image/magictoolbox_cache/cf3e6ec01aac7cb79461bcfe9d0d075e/2/0/2079_product/thumb600x600/2230335894/monkey-d-studio-luffy-red-roc-epic-diorama-resin-statue013.jpg",
  },
];

const Home = () => {
  return (
    <>
      <HomeBanner />
      <HomeCate />
      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* BEST SELLER */}
              <div className="d-flex align-items-center productRow mt-4">
                <div className="info">
                  <h3 className="mb-0 hd">BEST SELLERS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View all <IoIosArrowRoundForward />
                </Button>
              </div>
              <div className="product_row w-100">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  slidesPerGroup={4}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                >
                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem product={product} />
                    </SwiperSlide>
                  ))}

                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* NEW PRODUCTS */}
              <div className="d-flex align-items-center productRow mt-5">
                <div className="info">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">
                    New products with updated stock.
                  </p>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View all <IoIosArrowRoundForward />
                </Button>
              </div>
              <div className="product_row w-100">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  slidesPerGroup={4}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                >
                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem product={product} />
                    </SwiperSlide>
                  ))}

                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
