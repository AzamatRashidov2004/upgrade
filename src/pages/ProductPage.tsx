import { useEffect, useState } from "react";
import ImageCarousel from "./components/ImageCarousel";
import ProductConfigurator from "./components/ProductConfigurator";
import { ProductSwiper } from "./components/ProductSwiper";
import StickyProductHeader from "./components/StickyProductHeader";
import { getProductById } from "@/api/products";
import { useParams } from "react-router-dom";
import { Product } from "@/types/product";
import { parseProductDetails } from "@/utils/utils";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();

  if (id == undefined) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductById(id);
      console.log("YYY", result);
      setProduct(result);
    };
    fetchData();
  }, [id]);

  const images = [
    "https://cdn.myshoptet.com/usr/www.jabkolevne.cz/user/shop/big/14830_iphone-14-128gb--stav-a--modra.jpg?6505d8dc",
    "https://www.backmarket.com/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1080/https://d2e6ccujb3mkqf.cloudfront.net/393000c0-1f19-43fc-9f89-e6faf3f3bd46-1_8d781740-b838-4b20-83a0-77ecab2af2f6.jpg",
    "https://cdn.myshoptet.com/usr/www.jabkolevne.cz/user/shop/big/14830_iphone-14-128gb--stav-a--modra.jpg?6505d8dc",
  ];
  return (
    <>
      <StickyProductHeader product={product} />
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full bg-gray-200 mt-20">
          <div className="w-full md:w-1/2 h-[800px] bg-white border-2 text-white flex items-center justify-center p-4 border-b-0">
            <ImageCarousel images={images} />
          </div>
          <div className="w-full md:w-1/2 h-[800px] flex items-center justify-center">
            <ProductConfigurator />
          </div>
        </div>
        <div className="w-full mt-[100px] p-[20px]">
          <h2 className="font-bold text-xl mb-[10px]">You may also like</h2>
          <ProductSwiper />
        </div>
      </div>
    </>
  );
};
