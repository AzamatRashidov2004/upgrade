import { useEffect, useState } from "react";
import ImageCarousel from "./components/ImageCarousel";
import { ProductConfigurator } from "./components/ProductConfigurator";
import { ProductSwiper } from "./components/ProductSwiper";
import StickyProductHeader from "./components/StickyProductHeader";
import { Product } from "@/api/serverCalls";
import { useParams } from "react-router-dom";
import { productApi, ConfigOptionsType } from "@/api/serverCalls";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [configurations, setConfigurations] = useState<ConfigOptionsType>();

  useEffect(() => {
    async function fetchData() {
      const result = await productApi.getProductById(id ? id : "");
      console.log("XX", result);
      setProduct(result.data.product);
      setConfigurations(result.data.configOptions);
    };
    fetchData();
  },[]);

  return (
    <>
      {/*<StickyProductHeader product={product} />*/}
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full bg-gray-200 mt-20">
          <div className="w-full md:w-1/2 h-[800px] bg-white border-2 text-white flex items-center justify-center p-4 border-b-0">
            <ImageCarousel images={[product?.image ? product?.image : ""]} />
          </div>
          <div className="w-full md:w-1/2 h-[800px] flex items-center justify-center">
            <ProductConfigurator product={product} config={configurations} />
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
