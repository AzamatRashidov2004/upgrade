import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  name?: string;
  color?: string;
  storage?: string;
  condition?: string;
  price?: string;
  colorHex?: string;
  image?: string;
}

const ProductCard = ({
  name = "iPhone 14 Pro",
  color = "Space Black",
  storage = "128 GB",
  condition = "Fair",
  price = "14 490 Kč",
  colorHex = "#000000",
  image = "https://cdn.myshoptet.com/usr/www.jabkolevne.cz/user/shop/big/14830_iphone-14-128gb--stav-a--modra.jpg?6505d8dc",
}: ProductCardProps) => {
  return (
    <Card
      className="w-full bg-white rounded-3xl p-6
      sm:w-30 md:w-50 lg:w-50 xl:w-64"
    >
      <CardContent className="p-0">
        {/* Product Image Container */}
        <div className="relative flex flex-col items-center mb-6">
          <div className="w-full h-32 flex items-center justify-center mb-4">
            <img
              src={image}
              alt="iPhone 14 Pro"
              className="w-full h-full object-contain rounded-3xl"
            />
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colorHex }}
            />
            <span className="text-gray-600">{color}</span>
          </div>
        </div>
        {/* Product Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold">{name}</span>
            </div>
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
              {storage}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-px bg-gray-200" />
            <div className="flex items-center">
              <span className="text-gray-500">Condition:</span>
              <span className="font-medium ml-1">{condition}</span>
            </div>
            <div className="h-px bg-gray-200" />
          </div>
          <div className="text-blue-700 text-xl font-bold">{price}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
