import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, SortDesc, Search } from "lucide-react";
import ProductCardGrid from "./components/ProductCardGrid";
import PromoBanner from "./components/PromoBanner";
import { useSearch } from "@/context/SearchProvider";

interface Product {
  id: number;
  name: string;
  type: string;
  color: string;
  storage: string;
  condition: string;
  price: string;
  colorHex: string;
  image: string;
  warranty?: string;
  shippingInfo?: string;
}

const CatalogPage = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [priceRange, setPriceRange] = useState([100000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // Check screen size on component mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 767);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Mock data with product types added
  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      type: "iPhone",
      color: "Titanium Black",
      storage: "1TB",
      condition: "New",
      price: "34 990 Kč",
      colorHex: "#2D2D2D",
      image: "/iphone15.jpg",
      warranty: "2 years",
      shippingInfo: "Free shipping",
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      type: "iPhone",
      color: "Space Black",
      storage: "128 GB",
      condition: "Excellent",
      price: "24 490 Kč",
      colorHex: "#000000",
      image: "https://example.com/iphone-black.jpg",
    },
    {
      id: 3,
      name: 'MacBook Pro 16"',
      type: "MacBook",
      color: "Space Gray",
      storage: "1 TB",
      condition: "New",
      price: "64 990 Kč",
      colorHex: "#1E1E1E",
      image: "/macbook-pro.jpg",
    },
    {
      id: 4,
      name: 'iPad Pro 12.9"',
      type: "iPad",
      color: "Silver",
      storage: "256 GB",
      condition: "New",
      price: "29 990 Kč",
      colorHex: "#E3E3E3",
      image: "/ipad-pro.jpg",
    },
    {
      id: 5,
      name: "MacBook Air",
      type: "MacBook",
      color: "Midnight",
      storage: "512 GB",
      condition: "Excellent",
      price: "27 490 Kč",
      colorHex: "#1D1D1F",
      image: "/macbook-air.jpg",
    },
    {
      id: 6,
      name: "iPad Air",
      type: "iPad",
      color: "Blue",
      storage: "64 GB",
      condition: "Good",
      price: "14 990 Kč",
      colorHex: "#0071E3",
      image: "/ipad-air.jpg",
    },
    {
      id: 7,
      name: "iPhone 13 Mini",
      type: "iPhone",
      color: "Pink",
      storage: "128 GB",
      condition: "Good",
      price: "15 490 Kč",
      colorHex: "#FFC0CB",
      image: "/iphone-mini.jpg",
    },
    // ... other products
  ];

  // Get unique product types for the filter
  const productTypes = Array.from(
    new Set(products.map((product) => product.type))
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesColor =
      selectedColors.length === 0 || selectedColors.includes(product.color);

    const matchesStorage =
      selectedStorages.length === 0 ||
      selectedStorages.includes(product.storage);

    const matchesCondition =
      selectedConditions.length === 0 ||
      selectedConditions.includes(product.condition);

    const matchesPrice =
      parseInt(product.price.replace(/\D/g, "")) <= priceRange[0];

    const matchesProductType =
      selectedProductTypes.length === 0 ||
      selectedProductTypes.includes(product.type);

    return (
      matchesSearch &&
      matchesColor &&
      matchesStorage &&
      matchesCondition &&
      matchesPrice &&
      matchesProductType
    );
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <Accordion type="multiple" className="w-full">
        {/* Product Type Filter */}
        <AccordionItem value="productType">
          <AccordionTrigger>Product Type</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {productTypes.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  id={`${type}-type`}
                  checked={selectedProductTypes.includes(type)}
                  onCheckedChange={(checked) =>
                    setSelectedProductTypes((prev) =>
                      checked ? [...prev, type] : prev.filter((t) => t !== type)
                    )
                  }
                />
                <label htmlFor={`${type}-type`}>{type}</label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100000}
              step={1000}
            />
            <div className="text-sm mt-2">Max Price: {priceRange[0]} Kč</div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {[
              "Space Black",
              "Silver",
              "Gold",
              "Deep Purple",
              "Space Gray",
              "Midnight",
              "Blue",
              "Pink",
              "Titanium Black",
            ].map((color) => (
              <div key={color} className="flex items-center gap-2">
                <Checkbox
                  id={`${color}-mobile`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={(checked) =>
                    setSelectedColors((prev) =>
                      checked
                        ? [...prev, color]
                        : prev.filter((c) => c !== color)
                    )
                  }
                />
                <label htmlFor={`${color}-mobile`}>{color}</label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Storage Filter */}
        <AccordionItem value="storage">
          <AccordionTrigger>Storage</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {["64 GB", "128 GB", "256 GB", "512 GB", "1 TB", "1TB"].map(
              (storage) => (
                <div key={storage} className="flex items-center gap-2">
                  <Checkbox
                    id={`${storage}-mobile`}
                    checked={selectedStorages.includes(storage)}
                    onCheckedChange={(checked) => {
                      setSelectedStorages((prev) =>
                        checked
                          ? [...prev, storage]
                          : prev.filter((s) => s !== storage)
                      );
                    }}
                  />
                  <label htmlFor={`${storage}-mobile`}>{storage}</label>
                </div>
              )
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Condition Filter */}
        <AccordionItem value="condition">
          <AccordionTrigger>Condition</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {["New", "Excellent", "Good", "Fair"].map((condition) => (
              <div key={condition} className="flex items-center gap-2">
                <Checkbox
                  id={`${condition}-mobile`}
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={(checked) =>
                    setSelectedConditions((prev) =>
                      checked
                        ? [...prev, condition]
                        : prev.filter((c) => c !== condition)
                    )
                  }
                />
                <label htmlFor={`${condition}-mobile`}>{condition}</label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <>
      <div className="mt-20">
        <PromoBanner />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-72 space-y-6">
            <h2 className="text-2xl font-bold">Filters</h2>
            <FiltersContent />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with title and actions */}
            <div className="flex flex-col space-y-4 mb-6">
              <h1 className="text-3xl font-bold">Apple Products</h1>

              {/* Mobile Actions - Always in column on small screens */}
              <div
                className={`flex ${
                  isSmallScreen ? "flex-col" : "flex-row"
                } gap-2 items-${isSmallScreen ? "stretch" : "center"}`}
              >
                {/* Mobile Filter Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Filters</DialogTitle>
                    </DialogHeader>
                    <FiltersContent />
                  </DialogContent>
                </Dialog>

                {/* Sort Dropdown */}
                <div className={isSmallScreen ? "w-full" : "w-48"}>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SortDesc className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Bar for Small Screens */}
              {isSmallScreen && (
                <div className="w-full mt-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-8"
                    />
                  </div>
                </div>
              )}

              {/* Selected Filters Display */}
              {(selectedProductTypes.length > 0 ||
                selectedColors.length > 0 ||
                selectedStorages.length > 0 ||
                selectedConditions.length > 0) && (
                <div className="flex flex-wrap gap-2 my-3">
                  {selectedProductTypes.map((type) => (
                    <Button
                      key={`filter-${type}`}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedProductTypes((prev) =>
                          prev.filter((t) => t !== type)
                        )
                      }
                      className="text-xs"
                    >
                      {type} ×
                    </Button>
                  ))}
                  {selectedColors.map((color) => (
                    <Button
                      key={`filter-${color}`}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedColors((prev) =>
                          prev.filter((c) => c !== color)
                        )
                      }
                      className="text-xs"
                    >
                      {color} ×
                    </Button>
                  ))}
                  {selectedStorages.map((storage) => (
                    <Button
                      key={`filter-${storage}`}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedStorages((prev) =>
                          prev.filter((s) => s !== storage)
                        )
                      }
                      className="text-xs"
                    >
                      {storage} ×
                    </Button>
                  ))}
                  {selectedConditions.map((condition) => (
                    <Button
                      key={`filter-${condition}`}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedConditions((prev) =>
                          prev.filter((c) => c !== condition)
                        )
                      }
                      className="text-xs"
                    >
                      {condition} ×
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Count */}
            <div className="mb-4 text-sm text-gray-500">
              Showing {filteredProducts.length} products
              {searchQuery && <span> for "{searchQuery}"</span>}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCardGrid {...product} />
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">
                  No products match your criteria
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? `No results found for "${searchQuery}"`
                    : "Try adjusting your filter criteria"}
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedProductTypes([]);
                    setSelectedColors([]);
                    setSelectedStorages([]);
                    setSelectedConditions([]);
                    setPriceRange([100000]);
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
