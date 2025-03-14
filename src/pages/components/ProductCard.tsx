import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/api/serverCalls";

interface T {
  product: Product;
}

const ProductCard = ({ product }: T) => {
  const [fontSize, setFontSize] = useState("1.125rem");
  const modelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (modelRef.current) {
      const computedStyle = window.getComputedStyle(modelRef.current);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const currentHeight = modelRef.current.clientHeight;
      if (currentHeight > lineHeight * 2.5) {
        setFontSize("0.8rem");
      } else if (currentHeight > lineHeight * 2) {
        setFontSize("0.90rem");
      }else if (currentHeight > lineHeight * 1.5) {
        setFontSize("1rem");
      }
       else {
        setFontSize("1.125rem");
      }
    }
  }, [product.model]);

  const handleClick = () => {
    // Navigate to the product detail page; adjust the URL as needed.
    window.location.href = `/product/${product._id}`;
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer w-full bg-white rounded-3xl p-6 h-[400px]
      sm:w-30 md:w-50 lg:w-50 xl:w-64 transition transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <CardContent className="p-0">
        {/* Product Image Container */}
        <div className="relative flex flex-col items-center mb-6">
          <div className="w-full h-32 flex items-center justify-center mb-4">
            <img
              src={product.image}
              alt="product card"
              className="w-full h-full object-contain rounded-3xl"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{product.color}</span>
          </div>
        </div>
        {/* Product Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span ref={modelRef} style={{ fontSize }} className="font-semibold">
                {product.model}
              </span>
            </div>
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
              {product.device_type === "iPad"
                ? product.storage
                : product.storage + "GB"}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-px bg-gray-200" />
            <div className="flex items-center">
              <span className="text-gray-500">Condition:</span>
              <span className="font-medium ml-1">{product.condition}</span>
            </div>
            <div className="h-px bg-gray-200" />
          </div>
          <div className="flex align-self-center text-blue-700 text-xl font-bold">
            {product.price}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
