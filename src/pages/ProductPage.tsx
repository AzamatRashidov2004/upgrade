import { useEffect, useState } from "react";
import ImageCarousel from "./components/ImageCarousel";
import { ProductConfigurator } from "./components/ProductConfigurator";
import { ProductSwiper } from "./components/ProductSwiper";
import StickyProductHeader from "./components/StickyProductHeader";
import { Combination, Product } from "@/api/serverCalls";
import { useParams } from "react-router-dom";
import { productApi } from "@/api/serverCalls";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [validCombinations, setValidCombinations] = useState<Combination[]>([]);
  const [image, setImage] = useState<string|undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const result = await productApi.getProductById(id ? id : "");
      setProduct(result.data.product);
      setImage(result.data.product.image);
      const comb = await productApi.getValidCombinations(result.data.product.model, result.data.product.device_type);
      setValidCombinations(comb.data);
      console.log("THE PRODUCT: ", result.data.product);
      console.log("THE COMBINATIONS: ", comb.data);
    };
    fetchData();
  },[id]);

  useEffect(() => {
    console.log("IMAGE : ", image);
  }, [image]);
  
  return (
    <>
      <StickyProductHeader product={product} />
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full mt-20">
          {/* Keep original image height */}
          <div className="w-full md:w-1/2 h-[800px] bg-white border-2 text-white flex items-center justify-center p-4 border-b-0">
            <ImageCarousel images={[image ? image : ""]} />
          </div>
          
          {/* Make configurator section responsive */}
          <div className="w-full md:w-1/2 overflow-auto md:h-[800px] flex items-center justify-center">
            <ProductConfigurator validCombinations={validCombinations}/>
          </div>
        </div>
        
        <div className="w-full mt-8 md:mt-16 p-4 md:p-5">
          <h2 className="font-bold text-xl mb-3 md:mb-4">You may also like</h2>
          <ProductSwiper />
        </div>
      </div>
    </>
  );
};