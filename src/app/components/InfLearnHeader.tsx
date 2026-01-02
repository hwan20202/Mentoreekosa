import {
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  Menu,
  Bell,
  LogOut,
  Settings,
  BookOpen,
  Heart,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

interface InfLearnHeaderProps {
  user: { email: string; name: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onNavigateToMyPage?: () => void;
  onNavigateToMain?: () => void;
  onNavigateToServiceRegistration?: () => void;
}

export function InfLearnHeader({
  user,
  onLoginClick,
  onLogout,
  onNavigateToMyPage,
  onNavigateToMain,
  onNavigateToServiceRegistration,
}: InfLearnHeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1
              className="text-2xl text-[#00C471] cursor-pointer"
              onClick={onNavigateToMain}
            >
              로고
            </h1>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              {/* <button className="flex items-center gap-1 hover:text-[#00C471] transition-colors">
                강의
                <ChevronDown className="size-4" />
              </button> */}
              <a
                href="#"
                className="hover:text-[#00C471] transition-colors"
              >
                1대1 멘토링
              </a>
              <a
                href="#"
                className="hover:text-[#00C471] transition-colors"
              >
                원데이 클래스
              </a>
              <a
                href="#"
                className="hover:text-[#00C471] transition-colors"
              >
                스터디
              </a>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
            >
              <Search className="size-5" />
            </Button> */}

            {user ? (
              <>
                {/* <Button variant="ghost" size="icon" className="relative">
                  <Bell className="size-5" />
                  <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
                </Button>
                
                <Button variant="ghost" size="icon">
                  <ShoppingBag className="size-5" />
                </Button> */}

                <Button
                  className="bg-[#00C471] hover:bg-[#00B366] gap-2"
                  onClick={onNavigateToServiceRegistration}
                >
                  <Plus className="size-4" />
                  <span className="hidden sm:inline">서비스 등록</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="gap-2 hidden sm:flex items-center hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 rounded-md text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    >
                      <Avatar className="size-7">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[#00C471] text-white text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                      <ChevronDown className="size-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56"
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {user.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onNavigateToMyPage}>
                      <User className="size-4 mr-2" />
                      마이페이지
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BookOpen className="size-4 mr-2" />
                      내 강의실
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Heart className="size-4 mr-2" />
                      관심 강의
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShoppingBag className="size-4 mr-2" />
                      장바구니
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="size-4 mr-2" />
                      설정
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={onLogout}
                      className="text-red-600"
                    >
                      <LogOut className="size-4 mr-2" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon">
                  <ShoppingBag className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden sm:flex"
                  onClick={onLoginClick}
                >
                  로그인
                </Button>
                <Button
                  className="hidden sm:flex bg-[#00C471] hover:bg-[#00B368]"
                  onClick={onLoginClick}
                >
                  회원가입
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}