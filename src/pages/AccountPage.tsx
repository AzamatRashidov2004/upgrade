import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Package, Truck, Clock, User, Lock, CreditCard, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

const UserAccountDashboard = () => {
  // Example user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    avatarUrl: '/api/placeholder/100/100',
    savedAmount: 152.75,
  };

  // Example current order
  const currentOrder = {
    id: 'ORD-12345',
    date: '2025-03-12',
    total: 79.99,
    status: 'In Delivery',
    trackingNumber: 'TRK-987654321',
    estimatedDelivery: '2025-03-22',
    items: [
      { id: 1, name: 'Wireless Headphones', price: 49.99, quantity: 1 },
      { id: 2, name: 'Phone Case', price: 15.00, quantity: 2 },
    ]
  };

  // Example order history
  const orderHistory = [
    {
      id: 'ORD-12344',
      date: '2025-02-27',
      total: 124.50,
      status: 'Delivered',
    },
    {
      id: 'ORD-12343',
      date: '2025-01-15',
      total: 67.25,
      status: 'Delivered',
    },
  ];

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Active section state
  const [activeSection, setActiveSection] = useState('overview');

  // Status badge color mapping
const getStatusColor = (status: string): string => {
    const statusMap: Record<string, string> = {
      ordered: "bg-gray-500",
      processed: "bg-blue-500",
      shipped: "bg-indigo-500",
      "in delivery": "bg-purple-500",
      delivered: "bg-green-500",
      cancelled: "bg-red-500",
    };
  
    return statusMap[status.toLowerCase()] || "bg-gray-500";
  };

  // Simplified sections render
  const renderSection = () => {
    switch(activeSection) {
      case 'overview':
        return renderOverview();
      case 'current-order':
        return renderCurrentOrder();
      case 'history':
        return renderOrderHistory();
      case 'profile':
        return renderProfile();
      case 'security':
        return renderSecurity();
      default:
        return renderOverview();
    }
  };

  // Overview section - simplified dashboard
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}</h2>
              <p className="text-gray-500">What would you like to do today?</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current order preview */}
      {currentOrder && (
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveSection('current-order')}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-medium">Current Order</h3>
                  <p className="text-sm text-gray-500">#{currentOrder.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(currentOrder.status)} text-white`}>
                  {currentOrder.status}
                </Badge>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveSection('history')}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Package className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium">Order History</h3>
            <p className="text-sm text-gray-500">View past purchases</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveSection('profile')}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <User className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium">Edit Profile</h3>
            <p className="text-sm text-gray-500">Update your information</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveSection('security')}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Lock className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium">Security</h3>
            <p className="text-sm text-gray-500">Change password</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <CreditCard className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium">Saved</h3>
            <p className="text-sm text-gray-500">${user.savedAmount.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Current order section
  const renderCurrentOrder = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setActiveSection('overview')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Current Order</CardTitle>
        </div>
        <Badge className={`${getStatusColor(currentOrder.status)} text-white`}>
          {currentOrder.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">Order #{currentOrder.id}</p>
            <p className="text-sm text-gray-500">Placed on {currentOrder.date}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Package is on its way</p>
                <p className="text-sm text-gray-500">
                  <span className="inline-block mr-2">•</span>
                  Tracking: {currentOrder.trackingNumber}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Estimated delivery</p>
                <p className="text-sm text-gray-500">
                  <span className="inline-block mr-2">•</span>
                  {currentOrder.estimatedDelivery}
                </p>
              </div>
            </div>

            <Button 
              className="w-full mt-2" 
              onClick={() => window.open(`https://trackingwebsite.com/${currentOrder.trackingNumber}`, '_blank')}
            >
              Track Package
            </Button>
          </div>
        </div>

        <Separator />
        
        <div>
          <h3 className="font-medium mb-4">Items</h3>
          <div className="space-y-4">
            {currentOrder.items.map(item => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <p className="font-medium">Total</p>
              <p className="font-bold">${currentOrder.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Order history section
  const renderOrderHistory = () => (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" size="icon" onClick={() => setActiveSection('overview')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orderHistory.map(order => (
            <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {order.status}
                  </Badge>
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Profile section
  const renderProfile = () => (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" size="icon" onClick={() => setActiveSection('overview')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input type="text" defaultValue={user.name} />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input type="email" defaultValue={user.email} />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Shipping Address</label>
            <Input type="text" defaultValue={user.address} />
          </div>
          
          <Button className="w-full">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );

  // Security section
  const renderSecurity = () => (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" size="icon" onClick={() => setActiveSection('overview')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <Input 
              type="password" 
              value={passwordForm.currentPassword} 
              onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <Input 
              type="password" 
              value={passwordForm.newPassword} 
              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <Input 
              type="password" 
              value={passwordForm.confirmPassword} 
              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} 
            />
          </div>
          
          <Button className="w-full">Update Password</Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-6 px-4 max-w-2xl mt-20 mb-10">
      {renderSection()}
    </div>
  );
};

export default UserAccountDashboard;