import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name?: string;
  color?: string;
  storage?: string;
  condition?: string;
  price?: string;
  colorHex?: string;
  image?: string;
}

const ProductCardGrid = ({
  name = "iPhone 14 Pro",
  color = "Space Black",
  storage = "128 GB",
  condition = "Fair",
  price = "14 490 Kč",
  colorHex = "#000000",
  image = "/api/placeholder/400/400",
}: ProductCardProps) => {
  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new":
        return "bg-green-50 text-green-700";
      case "excellent":
        return "bg-blue-50 text-blue-700";
      case "good":
        return "bg-yellow-50 text-yellow-700";
      case "fair":
        return "bg-orange-50 text-orange-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight">{name}</h3>
            <Badge variant="secondary" className="shrink-0">
              {storage}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div
              className="w-3 h-3 rounded-full ring-1 ring-gray-200"
              style={{ backgroundColor: colorHex }}
            />
            <span>{color}</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="pt-0 border-t border-gray-100">
          <div className="flex items-center gap-0">
            <Badge
              variant="secondary"
              className={`${getConditionColor(condition)} border-none`}
            >
              {condition}
            </Badge>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between pt-0 border-t border-gray-100">
          <span className="text-xl font-bold text-blue-600">{price}</span>
          <Badge variant="outline" className="hover:bg-blue-50 cursor-pointer">
            Add to Cart
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardGrid;
