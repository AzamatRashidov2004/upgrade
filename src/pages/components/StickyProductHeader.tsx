import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { parseProductDetails } from "@/utils/utils";

interface props {
  product: Product | undefined;
}

const StickyProductHeader = ({ product }: props) => {
  const [isVisible, setIsVisible] = useState(false);
  const details = parseProductDetails(
    product?.product_title ? product?.product_title : ""
  );
  console.log("details", details);
  useEffect(() => {
    const handleScroll = () => {
      // Adjust this value based on when you want the header to appear
      const showOffset = 500;
      setIsVisible(window.scrollY > showOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 transform transition-transform duration-300 ease-in-out mt-20 border-t-2">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-row md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <h2 className="text-lg md:text-xl font-medium">{details?.model}</h2>
          <p className="text-sm md:text-base text-gray-600">
            {details?.color} | {details?.storage} | Fair
          </p>
        </div>

        <div className="flex flex-row md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="text-center md:text-right">
            <p className="text-xl md:text-2xl font-bold text-indigo-800 mr-[10px]">
              14 490 Kč
            </p>
            <p className="text-xs md:text-sm text-gray-500">incl. tax</p>
          </div>
          <Button className="bg-blue-900 hover:bg-blue-800 text-white py-6 text-lg">
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyProductHeader;
