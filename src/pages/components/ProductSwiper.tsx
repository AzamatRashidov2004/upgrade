import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import ProductCard from "./ProductCard";
import { Product, productApi } from "@/api/serverCalls";
import { useEffect, useState } from "react";


export const ProductSwiper = () => {
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    async function fetchProducts(): Promise<boolean> {
      const result = await productApi.getUniqueModels();
      if (result === undefined) {
        return false;
      }
      setProducts(result);
      return true;
    };
    fetchProducts();
  },[]);
  // Shuffle the data array and take 20 random products
  let randomProducts: Product[] = [];
  if (products !== undefined)
    randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 20);


  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={2} // Default for very small screens
      breakpoints={{
        640: { slidesPerView: 2 }, // >= 640px: show 2 slides
        768: { slidesPerView: 3 }, // >= 768px: show 3 slides
        1024: { slidesPerView: 4 }, // >= 1024px: show 4 slides
        1318: { slidesPerView: 5 }, // >= 1280px: show 5 slides
        1563: { slidesPerView: 6 },
        1820: { slidesPerView: 7 }, // >= 1280px: show 5 slides
      }}
      className="relative w-full"
    >
      {randomProducts.length > 0 && randomProducts.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
