import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Metadata from "@/utils/Metadata";
import { CookiesProvider } from "react-cookie";
import { AuthProvider, useAuth } from "@/features/(Auth)/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  className?: string;
}

export function HeaderLayout() {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

function Header({ className }: HeaderProps) {
  const { decodedToken } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    console.log("Clicked!");
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn("bg-white shadow-sm border-b border-gray-200", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                CV Builder
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* <a
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="/features"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="/features/choose-templates"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Templates
            </a>
            <a
              href="/features/build-cv"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Build CV
            </a> */}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {decodedToken ? (
              <>
                <UserSetting />
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  <a href={`${Metadata.base_url}/sign-in`}>Đăng nhập</a>
                </Button>
                <Button variant="ghost" size="sm">
                  <a href={`${Metadata.base_url}/sign-up`}>Đăng ký</a>
                </Button>
              </>
            )}
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <a href={`${Metadata.base_url}/choose-templates`}>
                Bắt đầu tạo CV
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className={cn("h-6 w-6", isMobileMenuOpen ? "hidden" : "block")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={cn("h-6 w-6", isMobileMenuOpen ? "block" : "hidden")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            Home
          </a>
          <a
            href="/features"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            Features
          </a>
          <a
            href="/features/choose-templates"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            Templates
          </a>
          <a
            href="/features/build-cv"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            Build CV
          </a>
          <div className="pt-4 pb-2 space-y-2">
            <Button variant="ghost" className="w-full justify-center">
              Sign In
            </Button>
            <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function UserSetting() {
  const { decodedToken, removeToken } = useAuth();

  const displayName =
    decodedToken?.fullName ||
    decodedToken?.username ||
    decodedToken?.email ||
    "Tài khoản";

  const avatarUrl = decodedToken?.avatarUrl || "";

  const initials =
    displayName
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase() || "U";

  const handleLogout = () => {
    removeToken();
    window.location.href = `${Metadata.base_url}/sign-in`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 focus:outline-none">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium max-w-[160px] truncate">
              {displayName}
            </span>
          </div>
          {/* <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage alt={displayName} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar> */}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            {/* <Avatar className="h-8 w-8">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar> */}
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate">
                {displayName}
              </span>
              {decodedToken?.email && (
                <span className="text-xs text-gray-500 truncate">
                  {decodedToken.email}
                </span>
              )}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <a href={`${Metadata.base_url}/settings`} className="w-full">
            Cài đặt tài khoản
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href={`${Metadata.base_url}/choose-templates`} className="w-full">
            CV của tôi
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 focus:text-red-600"
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Header;
