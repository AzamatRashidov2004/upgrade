import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/api/serverCalls";

interface ProductCardProps {
  product: Product;
}

const ProductCardGrid = ({ product }: ProductCardProps) => {
  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "premium":
        return "bg-green-50 text-green-700";
      case "excellent":
        return "bg-blue-50 text-blue-700";
      case "good":
        return "bg-yellow-50 text-yellow-700";
      case "acceptable":
        return "bg-orange-50 text-orange-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const { model, color, storage, condition, price, image } = product;

  // When the card is clicked, navigate to a target page
  const handleCardClick = () => {
    // console.log("AAA", product);
    window.location.href = `/product/${product._id}`; 
  };

  // Prevent the card's onClick from triggering when clicking "Add to Cart"
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add your add-to-cart logic here
  };

  return (
    <Card
      onClick={handleCardClick}
      className="overflow-hidden group hover:shadow-lg transition-shadow duration-200 flex flex-col h-full cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-3">
        <img
          src={image}
          alt={model}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <CardContent className="p-4 space-y-0 flex-grow flex flex-col">
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight">{`${model} ${storage}`}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">{color}</span>
          </div>
        </div>
        {/* Details Section */}
        <div className="flex flex-row gap-9 pt-[5px] pb-0 border-t border-gray-100">
          <span className="text-[19px] font-bold text-blue-600">{price}</span>
          <div className="flex items-center gap-0">
            <Badge
              variant="secondary"
              className={`${getConditionColor(condition)} border-none h-[40px] text-[14px]`}
            >
              {condition}
            </Badge>
          </div>
        </div>
        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>
        {/* Price Section */}
        <div className="pt-3 border-t border-gray-100 mt-auto">
          <Button
            variant="outline"
            onClick={handleAddToCartClick}
            className="w-full hover:bg-blue-50 cursor-pointer bg-blue-500 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardGrid;
