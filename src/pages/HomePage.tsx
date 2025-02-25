import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck, Recycle, Shield, Sparkles } from "lucide-react";
import { ProductSwiper } from "./components/ProductSwiper";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Hero Section with creative background */}
      <div className="relative overflow-hidden bg-yellow-50">
        {/* Background shapes - Hidden on mobile */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-100 rounded-bl-[100px] hidden md:block" />
        <div className="absolute top-0 left-0 w-full h-full bg-yellow-100 md:w-1/2 md:rounded-br-[200px]" />

        {/* Decorative circles for mobile */}
        <div className="md:hidden">
          {/* Top right circle */}
          <div className="absolute top-4 right-4 w-40 h-40 bg-blue-400 rounded-full opacity-50" />
          {/* Bottom left circle */}
          <div className="absolute bottom-8 left-4 w-32 h-32 bg-blue-400 rounded-full opacity-60" />
          {/* Middle right circle */}
          <div className="absolute top-1/2 right-8 w-20 h-20 bg-blue-400 rounded-full opacity-40" />
          {/* Small floating circles */}
          <div className="absolute top-20 left-8 w-15 h-15 bg-blue-400 rounded-full opacity-30" />
          <div className="absolute bottom-20 right-20 w-10 h-10 bg-blue-400 rounded-full opacity-25" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left content */}
            <div className="space-y-6 relative z-10 p-6 md:p-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
                Buy refurbished iPhones, Macbooks, iPads today
              </h1>
              <div className="space-y-4">
                <p className="text-lg text-blue-900/80">
                  Performs like new | Refurbished by experts | 12 month warranty
                  & free returns
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-800 hover:bg-blue-700">
                  BUY YOUR NEXT APPLE PRODUCT
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-800 text-blue-800 hover:bg-blue-50"
                >
                  SEARCH
                </Button>
              </div>
            </div>

            {/* Right side - Hidden on mobile */}
            <div className="relative h-[400px] items-center justify-center hidden md:flex">
              <div className="w-[300px] h-[300px] rounded-full bg-orange-100" />
              <img
                src="../../../public/girl.png"
                alt="iPhone user"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same... */}
      <div className="p-5">
        <ProductSwiper />
      </div>
      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <BenefitCard
              icon={<CircleCheck size={32} />}
              title="Quality Guaranteed"
              description="Every device passes our rigorous 40+ point inspection process"
            />
            <BenefitCard
              icon={<Shield size={32} />}
              title="1 Year Warranty"
              description="Full coverage just like new devices, with expert support"
            />
            <BenefitCard
              icon={<Recycle size={32} />}
              title="Eco-Friendly Choice"
              description="Reduce e-waste and your carbon footprint while saving money"
            />
          </div>

          <div className="space-y-6">
            <CategoryCard
              title="iPhones"
              description="Premium smartphones with amazing cameras and powerful performance"
              icon={<Sparkles size={32} color="white" />}
              gradient="bg-gradient-to-r from-blue-600 to-blue-400"
            />
            <CategoryCard
              title="MacBooks"
              description="Professional laptops for work, creativity, and everything in between"
              icon={<Sparkles size={32} color="white" />}
              gradient="bg-gradient-to-r from-purple-600 to-purple-400"
            />
            <CategoryCard
              title="iPads"
              description="Versatile tablets that combine power with portability"
              icon={<Sparkles size={32} color="white" />}
              gradient="bg-gradient-to-r from-green-600 to-green-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Existing card components remain unchanged...
const BenefitCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="p-6">
    <CardContent className="p-0 space-y-4">
      <div className="text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const CategoryCard = ({
  title,
  description,
  icon,
  gradient,
  image = "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,dpr=2,fit=contain,format=auto/swappie-iphone-14-pro-space-black.png?v=5ffdbad1",
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  image?: string;
}) => (
  <Card
    className={`w-full h-80 relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${gradient}`}
  >
    {/* Image - Initially transparent, becomes fully visible on hover */}
    <div className="relative h-full w-full group overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-contain opacity-100 
              transition-opacity duration-300 group-hover:opacity-100 
              scale-95 group-hover:scale-100 transition-transform"
      />
    </div>
  </Card>
);

export default HomePage;
