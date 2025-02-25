import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  ChevronDown,
  Laptop,
  Apple,
  Tablet,
  Menu,
  User,
  ShoppingCart,
} from "lucide-react";
import { useSearch } from "@/context/SearchProvider";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-600 hover:text-gray-900 transition-colors"
  >
    {children}
  </a>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // Redirect to catalog page with the search query
    navigate("/catalog");
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Mobile Hamburger Menu - visible on mobile */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile Search */}
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center space-x-2 px-2"
                  >
                    <Input
                      placeholder="Search products..."
                      className="flex-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button size="sm" type="submit">
                      <Search className="w-4 h-4" />
                    </Button>
                  </form>
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-2">
                    <SheetClose asChild>
                      <a
                        href="/"
                        className="px-2 py-2 hover:bg-gray-100 rounded-lg"
                      >
                        Home
                      </a>
                    </SheetClose>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="catalog">
                        <AccordionTrigger className="px-2">
                          Catalog
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 ml-4">
                            <SheetClose asChild>
                              <a
                                href="/catalog"
                                className="flex items-center px-2 py-2 hover:bg-gray-100 rounded-lg"
                              >
                                <Apple className="mr-2 w-4 h-4" /> iPhone
                              </a>
                            </SheetClose>
                            <SheetClose asChild>
                              <a
                                href="/catalog"
                                className="flex items-center px-2 py-2 hover:bg-gray-100 rounded-lg"
                              >
                                <Laptop className="mr-2 w-4 h-4" /> MacBook
                              </a>
                            </SheetClose>
                            <SheetClose asChild>
                              <a
                                href="/catalog"
                                className="flex items-center px-2 py-2 hover:bg-gray-100 rounded-lg"
                              >
                                <Tablet className="mr-2 w-4 h-4" /> iPad
                              </a>
                            </SheetClose>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <SheetClose asChild>
                      <a
                        href="/contact"
                        className="px-2 py-2 hover:bg-gray-100 rounded-lg"
                      >
                        Contact
                      </a>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="w-12 h-12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7198 14.3854C18.5395 14.7918 18.3273 15.1707 18.0832 15.522C17.7478 16.0016 17.4727 16.3382 17.2621 16.5321C16.9329 16.8411 16.5789 16.9995 16.1981 17.0095C15.9243 17.0095 15.5935 16.9229 15.2084 16.7463C14.8207 16.5708 14.4617 16.4842 14.1303 16.4842C13.7816 16.4842 13.4097 16.5708 13.0135 16.7463C12.6167 16.9229 12.3034 17.0145 12.0708 17.0221C11.7044 17.0371 11.3427 16.8736 10.9854 16.5321C10.7551 16.3206 10.4673 15.9738 10.1223 15.4917C9.75358 14.9772 9.45336 14.3854 9.22176 13.7139C8.97459 12.995 8.85 12.3012 8.85 11.6322C8.85 10.8677 9.01798 10.2087 9.35444 9.65755C9.61716 9.21854 9.96461 8.87311 10.3989 8.62024C10.8332 8.36736 11.3021 8.23843 11.8069 8.23041C12.0985 8.23041 12.4673 8.33027 12.9153 8.52697C13.3613 8.72468 13.6453 8.82454 13.7657 8.82454C13.8556 8.82454 14.1851 8.70865 14.7503 8.47785C15.2831 8.26307 15.7396 8.17227 16.122 8.20309C17.0836 8.2872 17.8111 8.69287 18.3017 9.42414C17.4395 9.93203 17.014 10.6431 17.0242 11.5546C17.0335 12.2539 17.2755 12.8366 17.7488 13.3C17.9644 13.5187 18.2086 13.6897 18.4838 13.8146C18.5644 13.8473 18.6416 13.876 18.7198 13.9027V14.3854ZM16.2015 4.95226C16.2015 5.49872 16.01 6.01012 15.629 6.48493C15.1664 7.04696 14.6074 7.36232 13.9923 7.31493C13.982 7.24471 13.9759 7.17047 13.9759 7.09212C13.9759 6.56775 14.1932 6.00572 14.5888 5.53994C14.786 5.30211 15.0371 5.10089 15.3413 4.93614C15.6446 4.77441 15.9334 4.68262 16.2066 4.66154C16.2168 4.75935 16.2015 4.85716 16.2015 4.95226Z"
                fill="#34D399"
                transform="translate(-1.9 0)"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#34D399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl font-bold text-gray-800">upgradeKZ</span>
          </a>

          {/* Desktop Navigation - visible on md and up */}
          <nav className="hidden md:flex items-center justify-between">
            {/* Left navigation links */}
            <div className="flex items-center space-x-8">
              <NavLink href="/">Home</NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1"
                  >
                    Catalog <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="flex items-center">
                    <a href="/catalog" className="flex row">
                      <Apple className="mr-2 w-4 h-4" /> iPhone
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <a href="/catalog" className="flex row">
                      <Laptop className="mr-2 w-4 h-4" /> MacBook
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <a href="/catalog" className="flex row">
                      <Tablet className="mr-2 w-4 h-4" /> iPad
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Centered Search Form */}
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2 min-w-[300px]"
              >
                <Input
                  placeholder="Search products..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button type="submit">
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </nav>

          {/* Right icons (Account & Cart) - always visible */}
          <div className="flex items-center space-x-4 shrink-0">
            <a href="/account">
              <User className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            </a>
            <a href="/cart">
              <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
