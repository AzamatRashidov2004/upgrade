import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Product } from "@/api/serverCalls";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Mock data based on your product structure
    const mockCartItems = [
      {
        _id: "1",
        model: "iPhone 13 Pro",
        color: "Sierra Blue",
        storage: 128,
        device_type: "iPhone",
        condition: "Excellent",
        price: 699.99, // Price should be a number
        image: "/api/placeholder/100/100",
        battery: "80%", // Add missing `battery` property
      },
      {
        _id: "1",
        model: "iPhone 13 Pro",
        color: "Sierra Blue",
        storage: 128,
        device_type: "iPhone",
        condition: "Excellent",
        price: 699.99, // Price should be a number
        image: "/api/placeholder/100/100",
        battery: "80%", // Add missing `battery` property
      },
      {
        _id: "1",
        model: "iPhone 13 Pro",
        color: "Sierra Blue",
        storage: 128,
        device_type: "iPhone",
        condition: "Excellent",
        price: 699.99, // Price should be a number
        image: "/api/placeholder/100/100",
        battery: "80%", // Add missing `battery` property
      },
    ];
  
    setCartItems(mockCartItems);
  }, []);

    // Calculate subtotal
const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Since `item.price` is a number, no need to use `replace`
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Calculate taxes (example: 8.25%)
  const calculateTax = () => {
    return calculateSubtotal() * 0.0825;
  };

  // Calculate shipping (flat rate example)
  const calculateShipping = () => {
    return cartItems.length > 0 ? 9.99 : 0;
  };

  // Calculate final total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping() - discount;
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item._id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(calculateSubtotal() * 0.1);
    } else {
      alert("Invalid promo code");
      setDiscount(0);
    }
  };

  // Proceed to checkout
  const checkout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-20 mb-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <Button 
            onClick={() => navigate("/products")}
            className="mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cart Items - Simplified List */}
          <div className="md:col-span-7">
            <Card>
              <CardContent className="p-4">
                {cartItems.map((item, index) => (
                  <div key={item._id}>
                    <div className="flex items-start py-3">
                      {/* Product Image */}
                      <div className="h-16 w-16 rounded overflow-hidden bg-gray-50 flex-shrink-0">
                        <img src={item.image} alt={item.model} className="w-full h-full object-contain" />
                      </div>
                      
                      {/* Product Details */}
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.model}</h3>
                          <button 
                            onClick={() => removeItem(item._id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">
                          {item.color}, {item.storage}GB, {item.condition}
                        </p>
                        
                        {/* Quantity and Price */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex border rounded">
                            <button 
                              className="px-2 py-1 border-r"
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button 
                              className="px-2 py-1 border-l"
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className="font-medium">
                            {item.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <Separator className="my-1" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Section - Main Focus */}
          <div className="md:col-span-5">
            <Card className="bg-gray-50 border-blue-200">
              <CardContent className="p-5">
                <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
                
                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${calculateShipping().toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                {/* Total */}
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                {/* Promo Code - Simplified */}
                <div className="flex gap-2 mb-6">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="bg-white"
                  />
                  <Button 
                    onClick={applyPromoCode}
                    variant="outline"
                    disabled={!promoCode}
                  >
                    Apply
                  </Button>
                </div>
                
                {/* Payment Button - Main Focus */}
                <Button 
                  onClick={checkout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                >
                  Checkout Securely
                </Button>
                
                {/* Security Notice */}
                <p className="text-xs text-center mt-4 text-gray-500">
                  Secure checkout powered by Stripe
                </p>
                
                {/* Continue Shopping - Less Prominent */}
                <div className="text-center mt-4">
                  <button 
                    onClick={() => navigate("/products")}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    or continue shopping
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;