import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Battery, Check, Package, ShoppingCart } from "lucide-react";
import { Combination, ConfigOptionsType, Product, productApi } from "@/api/serverCalls";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";

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

type BatteryOption = {
  label: string;
  value: string;
};

interface p {
  validCombinations: Combination[];
}

const appleColorHexMap: Record<string, string> = {
  // TODO add more colors : https://apple.fandom.com/wiki/List_of_Apple_product_colors
  "Black": "#000000",
  "Blue": "#007AFF",
  "Blueberry": "#6699CC",
  "Bondi Blue": "#0095B6",
  "Gold": "#FFD700",
  "Grape": "#660066",
  "Green": "#34C759",
  "Indigo": "#4B0082",
  "Lime/Key Lime": "#CCFF00",
  "Midnight": "#171E27",
  "Pink": "#FF3B89",
  "Product Red": "#FF0000",
  "Purple": "#800080",
  "Rose Gold": "#B76E79",
  "Silver": "#C0C0C0",
  "Snow": "#F0F0F0",
  "Space Gray": "#444444",
  "Starlight": "#FAF6F2",
  "Strawberry": "#FF3333",
  "Tangerine": "#FF9933",
  "Teal": "#008080",
  "Titanium": "#B5B5B5",
  "Ultramarine": "#120A8F",
  "White": "#FFFFFF",
  "Yellow": "#FFCC00"
};

export const ProductConfigurator = ({ validCombinations }: p) => {
  const navigate = useNavigate();

  // State Initialization for selected options
  const [selectedCapacity, setSelectedCapacity] = useState<string | number | undefined>(undefined);
  const [selectedCondition, setSelectedCondition] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedRam, setSelectedRam] = useState<number | undefined>(undefined);
  const [selectedCpu, setSelectedCpu] = useState<string | undefined>(undefined);
  const [selectedConnectivity, setSelectedConnectivity] = useState<string | undefined>(undefined);
  const [selectedBattery, setSelectedBattery] = useState<string | undefined>(undefined);

  // State for product and configuration options
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [config, setConfigurations] = useState<ConfigOptionsType | undefined>(undefined);

  // State for mapped UI options
  const [capacities, setCapacities] = useState<CapacityOption[] | undefined>(undefined);
  const [conditions, setConditions] = useState<ConditionOption[] | undefined>(undefined);
  const [colors, setColors] = useState<ColorOption[] | undefined>(undefined);
  const [batteries, setBatteries] = useState<BatteryOption[] | undefined>(undefined);

  const { id } = useParams<{ id: string }>();

  // Helper: given a candidate configuration, check if it's valid.
  const isCandidateValid = (candidate: Partial<Combination>): boolean => {
    return validCombinations.some((combination) =>
      Object.entries(candidate).every(([key, candidateValue]) => {
        if (candidateValue === undefined) return true;
        return combination[key as keyof Combination] === candidateValue;
      })
    );
  };

  // New helper: update configuration to a valid combination that includes the given field/value.
  const updateConfiguration = (field: keyof Combination, value: string | number) => {
    // Build a candidate with current selections, but override with the new value.
    const candidate: Partial<Combination> = {
      storage: selectedCapacity,
      condition: selectedCondition,
      color: selectedColor,
      battery: selectedBattery,
      ram: selectedRam,
      cpu: selectedCpu,
      connectivity: selectedConnectivity,
      [field]: value,
    };

    // If candidate is valid as-is, we can update just the field.
    if (isCandidateValid(candidate)) {
      switch (field) {
        case "storage":
          setSelectedCapacity(value);
          break;
        case "condition":
          setSelectedCondition(value as string);
          break;
        case "color":
          setSelectedColor(value as string);
          break;
        case "battery":
          setSelectedBattery(value as string);
          break;
        case "ram":
          setSelectedRam(value as number);
          break;
        case "cpu":
          setSelectedCpu(value as string);
          break;
        case "connectivity":
          setSelectedConnectivity(value as string);
          break;
        default:
          break;
      }
      return;
    }

    // Otherwise, find a valid combination that contains the desired value for the given field.
    const validCombo = validCombinations.find((combination) => {
      return combination[field] === value;
    });

    // If found, update all fields from the valid combination.
    if (validCombo) {
      setSelectedCapacity(validCombo.storage);
      setSelectedCondition(validCombo.condition);
      setSelectedColor(validCombo.color);
      setSelectedBattery(validCombo.battery);
      if (product?.device_type === "MacBook") {
        setSelectedRam(validCombo.ram);
        setSelectedCpu(validCombo.cpu);
      }
      if (product?.device_type === "iPad") {
        setSelectedConnectivity(validCombo.connectivity);
      }
    }
  };

  // Fetch initial product info and config options.
  useEffect(() => {
    async function fetchData() {
      const result = await productApi.getProductById(id ? id : "");
      console.log("gets product info and config options : ", result);
      setProduct(result.data.product);
      setConfigurations(result.data.configOptions);

      const newCapacities = result.data.configOptions?.storage.map((s) => ({
        label: `${s}${typeof s === "number" ? "GB" : ""}`,
        value: s,
      }));
      setCapacities(newCapacities);

      const newConditions = result.data.configOptions?.condition.map((c) => ({
        label: c,
        value: c,
      }));
      setConditions(newConditions);

      const newColors = result.data.configOptions?.color.map((c) => ({
        label: c,
        value: c,
      }));
      setColors(newColors);

      const newBatteries = result.data.configOptions?.battery.map((c) => ({
        label: c,
        value: c,
      }));
      setBatteries(newBatteries);

      setSelectedCapacity(result.data.product.storage);
      setSelectedCondition(result.data.product.condition);
      setSelectedColor(result.data.product.color);
      setSelectedBattery(result.data.product.battery);
      if (result.data.product.device_type === "MacBook") {
        setSelectedRam(result.data.product.ram);
        setSelectedCpu(result.data.product.cpu);
      }
      if (result.data.product.device_type === "iPad") {
        setSelectedConnectivity(result.data.product.connectivity);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (product === undefined) return; // Wait until initial product is loaded

    async function fetchFilteredProduct() {
      const filterIphone = {
        device_type: product?.device_type,
        model: product?.model,
        storage: selectedCapacity,
        color: selectedColor,
        condition: selectedCondition,
        battery: selectedBattery,
      };
      const filterIpad = {
        device_type: product?.device_type,
        model: product?.model,
        storage: selectedCapacity,
        color: selectedColor,
        condition: selectedCondition,
        connectivity: selectedConnectivity,
        battery: selectedBattery,
      };
      const filterMacbook = {
        device_type: product?.device_type,
        model: product?.model,
        storage: selectedCapacity,
        color: selectedColor,
        condition: selectedCondition,
        ram: selectedRam,
        cpu: selectedCpu,
        battery: selectedBattery,
      };

      try {
        const response = await productApi.getProducts(
          product?.device_type === "iPhone"
            ? filterIphone
            : product?.device_type === "iPad"
            ? filterIpad
            : filterMacbook
        );
        console.log("MATCHED PRODUCTS: ", response);
        const matchedProduct = response.data[0];
        navigate(`/product/${matchedProduct._id}`, { replace: true });
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    }
    fetchFilteredProduct();
  }, [
    selectedCapacity,
    selectedCondition,
    selectedColor,
    selectedBattery,
    selectedConnectivity,
    selectedRam,
    selectedCpu,
    product,
    navigate,
  ]);

  const totalPrice = useMemo(() => product?.price, [product?.price]);

  return (
    <Card className="w-[100%] h-[100%] bg-white rounded-none p-5 shadow-none border-b-0">
      <CardContent className="space-y-5">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product?.model}</h1>
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
            {capacities &&
              capacities.map((cap) => (
                <Button
                  key={cap.value}
                  variant={selectedCapacity === cap.value ? "secondary" : "outline"}
                  onClick={() => updateConfiguration("storage", cap.value)}
                  className={`h-20 relative ${
                    selectedCapacity === cap.value
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : !isCandidateValid({ storage: cap.value })
                      ? "bg-gray-100 text-gray-500 border-gray-300"
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
            {conditions &&
              conditions.map((cond) => (
                <Button
                  key={cond.value}
                  variant={selectedCondition === cond.value ? "secondary" : "outline"}
                  onClick={() => updateConfiguration("condition", cond.value)}
                  className={`h-18 relative ${
                    selectedCondition === cond.value
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : !isCandidateValid({ condition: cond.value })
                      ? "bg-gray-100 text-gray-500 border-gray-300"
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
            Color: {selectedColor}
          </h2>
          <div className="flex gap-4">
            {colors &&
              colors.map((color) => {
                const bgColor = appleColorHexMap[color.value] || "#6B7280";
                return (
                  <button
                    key={color.value}
                    onClick={() => updateConfiguration("color", color.value)}
                    className="relative group"
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color.value
                          ? "border-blue-600 ring-2 ring-blue-200"
                          : !isCandidateValid({ color: color.value })
                          ? "border-gray-300"
                          : "hover:ring-2 hover:ring-gray-200"
                      }`}
                      style={{ backgroundColor: bgColor }}
                    />
                    {selectedColor === color.value && (
                      <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                    )}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Battery Health Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Battery Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {batteries &&
              batteries.map((battery) => (
                <Button
                  key={battery.value}
                  variant={selectedBattery === battery.value ? "secondary" : "outline"}
                  onClick={() => updateConfiguration("battery", battery.value)}
                  className={`h-18 relative ${
                    selectedBattery === battery.value
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : !isCandidateValid({ battery: battery.value })
                      ? "bg-gray-100 text-gray-500 border-gray-300"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Battery
                      className={`w-5 h-5 mb-1 ${
                        battery.value === "95-100"
                          ? "text-green-500"
                          : battery.value === "90-94"
                          ? "text-yellow-500"
                          : "text-orange-500"
                      }`}
                    />
                    <span className="font-medium">{battery.label}</span>
                  </div>
                  {selectedBattery === battery.value && (
                    <Check className="w-4 h-4 absolute top-2 right-2 text-blue-600" />
                  )}
                </Button>
              ))}
          </div>
        </div>

        {/* Device-Specific Options */}
        {product?.device_type === "MacBook" && (
          <>
            {/* RAM Section */}
            {config?.ram && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">RAM</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {config.ram.map((ram) => (
                    <Button
                      key={ram}
                      variant={selectedRam === ram ? "secondary" : "outline"}
                      onClick={() => updateConfiguration("ram", ram)}
                      className={`h-18 relative ${
                        selectedRam === ram
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : !isCandidateValid({ ram: ram })
                          ? "bg-gray-100 text-gray-500 border-gray-300"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
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
            {config?.cpu && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">CPU</h2>
                <div className="grid grid-cols-1 gap-2">
                  {config.cpu.map((cpu) => (
                    <Button
                      key={cpu}
                      variant={selectedCpu === cpu ? "secondary" : "outline"}
                      onClick={() => updateConfiguration("cpu", cpu)}
                      className={`h-18 w-[350px] relative ${
                        selectedCpu === cpu
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : !isCandidateValid({ cpu: cpu })
                          ? "bg-gray-100 text-gray-500 border-gray-300"
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
              {config.connectivity.map((conn) => (
                <Button
                  key={conn}
                  variant={selectedConnectivity === conn ? "secondary" : "outline"}
                  onClick={() => updateConfiguration("connectivity", conn)}
                  className={`h-18 relative ${
                    selectedConnectivity === conn
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : !isCandidateValid({ connectivity: conn })
                      ? "bg-gray-100 text-gray-500 border-gray-300"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  {conn}
                  {selectedConnectivity === conn && (
                    <Check className="w-4 h-4 absolute top-2 right-2 text-blue-600" />
                  )}
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
