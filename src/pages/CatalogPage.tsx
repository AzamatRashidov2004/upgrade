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
import { Filter, SortDesc, Search, Loader2 } from "lucide-react";
import ProductCardGrid from "./components/ProductCardGrid";
import PromoBanner from "./components/PromoBanner";
import { useSearch } from "@/context/SearchProvider";
import { productApi, type Product, type ProductFilter } from "@/api/serverCalls";

// Number of products to load per page
const PRODUCTS_PER_PAGE = 12;

const CatalogPage = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  
  // State for filters
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([100000]);
  const [sortOrder, setSortOrder] = useState<string>("price-asc");
  
  // State for products and pagination
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
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

  // Function to fetch products with current filters
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build filter object from state
      const filter: ProductFilter = {
        page: currentPage,
        limit: PRODUCTS_PER_PAGE
      };

      // Add device type filter (map to the API's device_type parameter)
      if (selectedProductTypes.length === 1) {
        filter.device_type = selectedProductTypes[0] as 'iPhone' | 'MacBook' | 'iPad';
      }

      // Add other filters
      if (selectedColors.length === 1) {
        filter.color = selectedColors[0];
      }

      if (selectedStorages.length === 1) {
        filter.storage = selectedStorages[0];
      }

      if (selectedConditions.length === 1) {
        filter.condition = selectedConditions[0];
      }

      // Add price range
      filter.maxPrice = priceRange[0];

      // Add search query as a model filter
      if (searchQuery) {
        filter.model = searchQuery;
      }

      // Fetch products
      const result = await productApi.getProducts(filter);
      const response = result.data; 
      // Sort products if needed (in case server doesn't support sorting)
      let sortedProducts = [...response];
      if (sortOrder === "price-asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "price-desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } 
      // Note: "newest" sorting would require a timestamp field that I don't see in your schema

      setProducts(sortedProducts);
      setTotalProducts(result.total); // This should ideally come from the API response
      setTotalPages(Math.ceil(result.total / PRODUCTS_PER_PAGE)); // This should ideally be calculated from total count
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on initial load and when filters change
  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    selectedColors,
    selectedStorages,
    selectedConditions,
    selectedProductTypes,
    priceRange,
    sortOrder,
    searchQuery
  ]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedColors,
    selectedStorages,
    selectedConditions,
    selectedProductTypes,
    priceRange,
    searchQuery
  ]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle changing sort order
  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedProductTypes([]);
    setSelectedColors([]);
    setSelectedStorages([]);
    setSelectedConditions([]);
    setPriceRange([100000]);
    setCurrentPage(1);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <Accordion type="multiple" className="w-full">
        {/* Product Type Filter */}
        <AccordionItem value="productType">
          <AccordionTrigger>Product Type</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {["iPhone", "MacBook", "iPad"].map((type) => (
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

// Replace the existing renderPagination function with this
const renderPagination = () => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 gap-2">
    <Button
      variant="outline"
      size="lg"
      className="w-[100px]"
      disabled={currentPage === 1 || loading}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Previous
    </Button>
    <span className="flex items-center px-3">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      variant="outline"
      size="lg"
      className="w-[100px]"
      disabled={currentPage === totalPages || loading}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next
    </Button>
  </div>
  );
};

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
                  <Select value={sortOrder} onValueChange={handleSortChange}>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2 text-gray-500">Loading products...</span>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium text-red-600">{error}</h3>
                <Button
                  onClick={fetchProducts}
                  variant="outline"
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Product Count */}
            {!loading && !error && (
              <div className="mb-4 text-sm text-gray-500">
                Showing {products.length} of {totalProducts} products
                {searchQuery && <span> for "{searchQuery}"</span>}
              </div>
            )}

            {/* Product Grid */}
            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="flex justify-center">
                    <ProductCardGrid product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && !error && totalProducts === 0 && (
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
                  onClick={clearAllFilters}
                  variant="outline"
                  className="mt-4"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination controls */}
            {!loading && !error && products.length > 0 && renderPagination()}
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogPage;