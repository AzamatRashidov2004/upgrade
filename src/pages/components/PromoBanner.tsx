import { Battery, Wallet, Camera, Star, Diamond } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

const PromoBanner: React.FC = () => {
  return (
    <div className="w-full">
      {/* Top notification banner */}
      <div className="w-full bg-pink-200 py-3 text-center">
        <p className="text-purple-900 font-medium">
          Best deals! Right now extra low prices on many iPhone models
        </p>
      </div>

      {/* Main promo section with yellow blob background */}
      <div className="relative w-full bg-blue-50 py-8 overflow-hidden">
        {/* Yellow blob in background */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-yellow-200 rounded-full -translate-y-1/4 translate-x-1/4 opacity-70"></div>

        {/* Content */}
        <div className="relative container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Buy refurbished Apple devices
          </h1>
          <p className="text-lg text-blue-800 mb-6 max-w-2xl mx-auto">
            Refurbished in-house by experts and guaranteed to perform like new!
          </p>
        </div>
      </div>

      {/* Category cards */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-3">
            <CategoryCard
              icon={<Wallet className="h-8 w-8 text-green-600" />}
              title="Budget friendly"
              bgColor="bg-green-100"
            />
            <CategoryCard
              icon={<Camera className="h-8 w-8 text-pink-600" />}
              title="Best cameras"
              bgColor="bg-pink-100"
            />
            <CategoryCard
              icon={<Star className="h-8 w-8 text-amber-500" />}
              title="Parents choice"
              bgColor="bg-yellow-100"
            />
            <CategoryCard
              icon={<Diamond className="h-8 w-8 text-indigo-700" />}
              title="Premium series"
              bgColor="bg-indigo-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// TypeScript Interface for Props
interface CategoryCardProps {
  icon: ReactNode;
  title: string;
  bgColor: string;
}

// Category Card Component
const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  bgColor,
}) => {
  return (
    <Card
      className={`${bgColor} p-4 flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer border-none shadow-sm hover:shadow-md`}
    >
      <div className="mb-3">{icon}</div>
      <p className="font-medium text-center text-gray-800">{title}</p>
    </Card>
  );
};

export default PromoBanner;
