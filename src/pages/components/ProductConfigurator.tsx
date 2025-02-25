import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Package, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { parseProductDetails } from "@/utils/utils";

type CapacityOption = {
  label: string;
  priceDiff: string;
  value: string;
};

type ConditionOption = {
  label: string;
  priceDiff: string;
  value: string;
  description: string;
};

type BatteryOption = {
  label: string;
  priceDiff: string;
  value: string;
  description: string;
};

// ... (previous type definitions remain the same)

export default function ProductConfigurator(product: Product) {
  const [selectedCapacity, setSelectedCapacity] = useState("128GB");
  const [selectedCondition, setSelectedCondition] = useState("fair");
  const [selectedBattery, setSelectedBattery] = useState("standard");
  const [selectedColor, setSelectedColor] = useState("space-black");

  const details = parseProductDetails(product?.product_title);

  // Base product info
  const productName = details?.model;
  const basePrice = 0;
  const color = "Space Black";

  // Capacity options
  const capacities: CapacityOption[] = [
    { label: "128 GB", priceDiff: "+ 0 Kč", value: "128GB" },
    { label: "256 GB", priceDiff: "+ 500 Kč", value: "256GB" },
    { label: "512 GB", priceDiff: "+ 2 000 Kč", value: "512GB" },
    { label: "1 TB", priceDiff: "+ 2 500 Kč", value: "1TB" },
  ];

  const colors: ColorOption[] = [
    {
      label: "Space Black",
      value: "space-black",
      priceDiff: "+ 0 Kč",
      bgColor: "bg-zinc-900",
      borderColor: "border-zinc-900",
    },
    {
      label: "Deep Purple",
      value: "deep-purple",
      priceDiff: "- 400 Kč",
      bgColor: "bg-[#4A4E69]",
      borderColor: "border-[#4A4E69]",
    },
    {
      label: "Gold",
      value: "gold",
      priceDiff: "- 200 Kč",
      bgColor: "bg-[#E6D5B8]",
      borderColor: "border-[#E6D5B8]",
    },
    {
      label: "Silver",
      value: "silver",
      priceDiff: "- 200 Kč",
      bgColor: "bg-gray-200",
      borderColor: "border-gray-200",
    },
  ];

  const conditions: ConditionOption[] = [
    {
      label: "Fair",
      priceDiff: "+ 0 Kč",
      value: "fair",
      description:
        "The phone will have visible wear, such as deeper scratches, dents, and other marks. The phone is unlocked, fully tested and works like new.",
    },
    {
      label: "Very Good",
      priceDiff: "+ 800 Kč",
      value: "very_good",
      description:
        "Better condition with fewer visible marks. The phone is unlocked, fully tested, and works like new.",
    },
    {
      label: "Excellent",
      priceDiff: "+ 1 800 Kč",
      value: "excellent",
      description:
        "Minimal to no visible wear. The phone is unlocked, fully tested, and works like new.",
    },
  ];

  const batteryOptions: BatteryOption[] = [
    {
      label: "Standard",
      priceDiff: "+ 0 Kč",
      value: "standard",
      description:
        "Battery capacity is at minimum 80%, so it should last a full day or longer. You'll likely save a perfectly usable battery from being discarded.",
    },
    {
      label: "New",
      priceDiff: "+ 1 500 Kč",
      value: "new",
      description:
        "A brand new battery replacement for maximum battery life and longevity.",
    },
  ];

  // Calculate total price
  const totalPrice = useMemo(() => {
    const getPriceDiff = (str: string) => {
      const match = str.match(/[+-]\s*(\d+)/);
      return match ? parseInt(match[1]) * (str.startsWith("-") ? -1 : 1) : 0;
    };

    const capacityPrice = getPriceDiff(
      capacities.find((c) => c.value === selectedCapacity)?.priceDiff || "0"
    );
    const conditionPrice = getPriceDiff(
      conditions.find((c) => c.value === selectedCondition)?.priceDiff || "0"
    );
    const batteryPrice = getPriceDiff(
      batteryOptions.find((b) => b.value === selectedBattery)?.priceDiff || "0"
    );
    const colorPrice = getPriceDiff(
      colors.find((c) => c.value === selectedColor)?.priceDiff || "0"
    );

    return (
      basePrice + capacityPrice + conditionPrice + batteryPrice + colorPrice
    );
  }, [selectedCapacity, selectedCondition, selectedBattery, selectedColor]);

  const currentConditionData = conditions.find(
    (c) => c.value === selectedCondition
  );
  const currentColor = colors.find((c) => c.value === selectedColor);

  return (
    <Card className="w-[100%] h-[100%] bg-white rounded-none p-5 shadow-none border-b-0">
      <CardContent className="space-y-5">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {productName}
              </h1>
              <div className="flex items-center mt-2 text-green-600">
                <Package className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Ready to be shipped</span>
              </div>
            </div>
            <Badge className="text-lg font-semibold bg-blue-100 text-blue-700 hover:bg-blue-100">
              {totalPrice.toLocaleString()} Kč
            </Badge>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 hover:bg-gray-100"
            >
              {currentColor?.label}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 hover:bg-gray-100"
            >
              {selectedCapacity}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 hover:bg-gray-100"
            >
              {currentConditionData?.label}
            </Badge>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Rest of the sections remain the same */}
        {/* Capacity Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Storage Capacity
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {capacities.map((cap) => (
              <Button
                key={cap.value}
                variant={
                  selectedCapacity === cap.value ? "secondary" : "outline"
                }
                onClick={() => setSelectedCapacity(cap.value)}
                className={`h-20 relative ${
                  selectedCapacity === cap.value
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="font-medium">{cap.label}</span>
                  <span
                    className={`text-sm ${
                      selectedCapacity === cap.value
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {cap.priceDiff}
                  </span>
                </div>
                {selectedCapacity === cap.value && (
                  <Check className="w-4 h-4 absolute top-2 right-2 text-blue-600" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Condition Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Condition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {conditions.map((cond) => (
              <Button
                key={cond.value}
                variant={
                  selectedCondition === cond.value ? "secondary" : "outline"
                }
                onClick={() => setSelectedCondition(cond.value)}
                className={`h-18 relative ${
                  selectedCondition === cond.value
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="font-medium">{cond.label}</span>
                  <span
                    className={`text-sm ${
                      selectedCondition === cond.value
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {cond.priceDiff}
                  </span>
                </div>
                {selectedCondition === cond.value && (
                  <Check className="w-4 h-4 absolute top-2 right-2 text-blue-600" />
                )}
              </Button>
            ))}
          </div>
          {currentConditionData && (
            <p className="text-sm text-gray-600">
              {currentConditionData.description}
            </p>
          )}
        </div>

        {/* Color Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Colour: {currentColor?.label}
          </h2>
          <div className="flex gap-4">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`relative group`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${color.bgColor} border-2 
                  ${
                    selectedColor === color.value
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : `${color.borderColor} hover:ring-2 hover:ring-gray-200`
                  } transition-all duration-200`}
                />
                {selectedColor === color.value && (
                  <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                )}
                <div className="mt-2 text-center">
                  <span
                    className={`text-sm ${
                      selectedColor === color.value
                        ? "text-blue-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {color.priceDiff}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <Button
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-6 text-lg"
            onClick={() => console.log("Added to cart")}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
