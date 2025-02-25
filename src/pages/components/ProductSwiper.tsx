import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import ProductCard from "./ProductCard";

export const ProductSwiper = () => {
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
      {Array.from({ length: 12 }).map((_, index) => (
        <SwiperSlide key={index}>
          <ProductCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
