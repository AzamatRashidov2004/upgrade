import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Package, ShoppingCart } from "lucide-react";
import { ConfigOptionsType, Product } from "@/api/serverCalls";
import { Badge } from "@/components/ui/badge";

type CapacityOption = {
  label: string;
  value: string | number;
};

type ConditionOption = {
  label: string;
  value: string;
};

type ColorOption = {
  label: string;
  value: string;
};

const colorMap: Record<string, { bg: string; border: string }> = {
  "space-black": { bg: "bg-gray-900", border: "border-gray-900" },
  silver: { bg: "bg-gray-200", border: "border-gray-200" },
  gold: { bg: "bg-amber-300", border: "border-amber-300" },
  blue: { bg: "bg-blue-600", border: "border-blue-600" },
};

interface Props {
  product: Product | undefined;
  config: ConfigOptionsType | undefined;
}

export const ProductConfigurator = ({ product, config }: Props) => {
  // State Initialization
  const [selectedCapacity, setSelectedCapacity] = useState<string | number | undefined>(undefined);
  const [selectedCondition, setSelectedCondition] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedRam, setSelectedRam] = useState<number | undefined>(undefined);
  const [selectedCpu, setSelectedCpu] = useState<string | undefined>(undefined);
  const [selectedConnectivity, setSelectedConnectivity] = useState<string | undefined>(undefined);

  // Sync state with `product` when it becomes available
  useEffect(() => {
    if (product) {
      setSelectedCapacity(product.storage);
      setSelectedCondition(product.condition);
      setSelectedColor(product.color);
      setSelectedRam(product.ram);
      setSelectedCpu(product.cpu);
      setSelectedConnectivity(product.connectivity);
    }
  }, [product]); // Runs whenever `product` changes

  // Map API config to UI options
  const capacities: CapacityOption[] | undefined = config?.storage.map((s) => ({
    label: `${s}${typeof s === "number" ? "GB" : ""}`,
    value: s,
  }));

  const conditions: ConditionOption[] | undefined = config?.condition.map((c) => ({
    label: c,
    value: c,
  }));

  const colors: ColorOption[] | undefined = config?.color.map((c) => ({
    label: c,
    value: c,
  }));

  // Calculate total price (simplified example)
  const totalPrice = useMemo(() => {
    return product?.price; // Add logic for price adjustments if needed
  }, [product?.price]);

  return (
    <Card className="w-[100%] h-[100%] bg-white rounded-none p-5 shadow-none border-b-0">
      <CardContent className="space-y-5">
        {/* Header (unchanged) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product?.model}
              </h1>
              <div className="flex items-center mt-2 text-green-600">
                <Package className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Ready to be shipped</span>
              </div>
            </div>
            <Badge className="text-lg font-semibold bg-blue-100 text-blue-700 hover:bg-blue-100">
              {totalPrice?.toLocaleString()} Kč
            </Badge>
          </div>
        </div>
        <Separator className="bg-gray-200" />

        {/* Storage Capacity Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Storage</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {capacities !== undefined && capacities.map((cap) => (
              <Button
                key={cap.value}
                variant={selectedCapacity === cap.value ? "secondary" : "outline"}
                onClick={() => setSelectedCapacity(cap.value)}
                className={`h-20 relative ${
                  selectedCapacity === cap.value
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="font-medium">{cap.label}</span>
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
            {conditions !== undefined && conditions.map((cond) => (
              <Button
                key={cond.value}
                variant={selectedCondition === cond.value ? "secondary" : "outline"}
                onClick={() => setSelectedCondition(cond.value)}
                className={`h-18 relative ${
                  selectedCondition === cond.value
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="font-medium">{cond.label}</span>
                </div>
                {selectedCondition === cond.value && (
                  <Check className="w-4 h-4 absolute top-2 right-2 text-blue-600" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Color Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Colour: {selectedColor}
          </h2>
          <div className="flex gap-4">
            {colors !== undefined && colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className="relative group"
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    colorMap[color.value]?.bg || "bg-gray-500"
                  } border-2 ${
                    selectedColor === color.value
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : `${colorMap[color.value]?.border || "border-gray-500"} hover:ring-2 hover:ring-gray-200`
                  } transition-all duration-200`}
                />
                {selectedColor === color.value && (
                  <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Device-Specific Options */}
        {product?.device_type === "MacBook" && (
          <>
            {/* RAM Section */}
            {config !== undefined && config.ram && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">RAM</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {config.ram.map((ram) => (
                    <Button
                      key={ram}
                      variant={selectedRam === ram ? "secondary" : "outline"}
                      className={`h-18 relative ${
                        selectedRam === ram
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                      onClick={() => setSelectedRam(ram)}
                    >
                      {ram}GB
                      {selectedRam === ram && (
                        <Check className="w-4 h-4 absolute top-2 right-2 text-blue-600" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* CPU Section */}
            {config !== undefined && config.cpu && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">CPU</h2>
                <div className="grid grid-cols-1 gap-2">
                  {config.cpu.map((cpu) => (
                    <Button
                      key={cpu}
                      variant={selectedCpu === cpu ? "secondary" : "outline"}
                      onClick={() => setSelectedCpu(cpu)}
                      className={`h-18 w-[350px] relative ${
                        selectedCpu === cpu
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      {cpu}
                      {selectedCpu === cpu && (
                        <Check className="w-4 h-4 absolute top-2 right-2 text-blue-600" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {product?.device_type === "iPad" && config?.connectivity && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Connectivity</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {config !== undefined && config.connectivity.map((conn) => (
                <Button
                  key={conn}
                  variant={selectedConnectivity === conn ? "secondary" : "outline"}
                  onClick={() => setSelectedConnectivity(conn)}
                >
                  {conn}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
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
};