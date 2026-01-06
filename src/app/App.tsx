import { useState, useMemo } from "react";
import { InfLearnHeader } from "./components/InfLearnHeader";
import { SearchSection } from "./components/SearchSection";
import { CategoryTabs } from "./components/CategoryTabs";
import { SearchFilters } from "./components/SearchFilters";
import { SearchResults } from "./components/SearchResults";
import { InfLearnFooter } from "./components/InfLearnFooter";
import { LoginDialog } from "./components/LoginDialog";
import { SignupDialog } from "./components/SignupDialog";
import { MyPage } from "./components/MyPage";
import { ServiceRegistration } from "./components/ServiceRegistration";
import { ServiceDetail } from "./components/ServiceDetail";
import { ServiceApplication } from "./components/ServiceApplication";
import type { Course } from "./components/CourseCard";

// Mock course data
const allCourses: Course[] = [
  {
    id: 1,
    title: "처음 만난 React - 리액트 완벽 가이드 with Redux, Next.js, TypeScript",
    instructor: "김개발",
    price: 49500,
    originalPrice: 99000,
    rating: 4.9,
    studentCount: 2854,
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjcxODA4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "programming",
    level: "입문",
    tags: ["React", "JavaScript", "Web"],
    isNew: true,
    isBest: true,
    serviceType: "study",
  },
  {
    id: 2,
    title: "Python 데이터 분석 완벽 가이드 - Pandas, NumPy, Matplotlib",
    instructor: "박데이터",
    price: 39000,
    originalPrice: 78000,
    rating: 4.8,
    studentCount: 3241,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2NzI0NjAwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "data",
    level: "초급",
    tags: ["Python", "데이터분석"],
    isBest: true,
    serviceType: "study",
  },
  {
    id: 3,
    title: "UI/UX 디자인 입문 - Figma로 시작하는 디자인",
    instructor: "이디자인",
    price: 35000,
    originalPrice: 70000,
    rating: 4.7,
    studentCount: 1892,
    thumbnail: "https://images.unsplash.com/photo-1716703435551-4326ab111ae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY3MTU0NjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "design",
    level: "입문",
    tags: ["Figma", "UI", "UX"],
    isNew: true,
    serviceType: "oneday",
  },
  {
    id: 4,
    title: "실전! 디지털 마케팅 A to Z - 구글 애널리틱스부터 광고 운영까지",
    instructor: "최마케터",
    price: 59000,
    originalPrice: 118000,
    rating: 4.6,
    studentCount: 1567,
    thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2NzE2MDQzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "marketing",
    level: "중급",
    tags: ["마케팅", "광고", "분석"],
    serviceType: "mentoring",
  },
  {
    id: 5,
    title: "머신러닝과 딥러닝 기초 - AI 개발자로 가는 첫 걸음",
    instructor: "정인공지능",
    price: 69000,
    originalPrice: 138000,
    rating: 4.8,
    studentCount: 2134,
    thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NzI0NjAwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "ai",
    level: "초급",
    tags: ["AI", "ML", "Python"],
    isBest: true,
    serviceType: "study",
  },
  {
    id: 6,
    title: "앱 개발 입문 - React Native로 크로스 플랫폼 앱 만들기",
    instructor: "강모바일",
    price: 54000,
    originalPrice: 108000,
    rating: 4.7,
    studentCount: 1789,
    thumbnail: "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjcyMzcxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "programming",
    level: "중급",
    tags: ["ReactNative", "앱개발"],
    isNew: true,
    serviceType: "oneday",
  },
  {
    id: 7,
    title: "스타트업 비즈니스 전략 - 린 스타트업으로 성공하기",
    instructor: "윤비즈니스",
    price: 44000,
    originalPrice: 88000,
    rating: 4.5,
    studentCount: 987,
    thumbnail: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzY3MTQxNDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "business",
    level: "중급",
    tags: ["스타트업", "비즈니스"],
    serviceType: "mentoring",
  },
  {
    id: 8,
    title: "풀스택 웹 개발 - Node.js, Express, MongoDB로 완성하는 웹 서비스",
    instructor: "송풀스택",
    price: 64000,
    originalPrice: 128000,
    rating: 4.9,
    studentCount: 3456,
    thumbnail: "https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NjcxOTUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "programming",
    level: "고급",
    tags: ["Node.js", "MongoDB"],
    isBest: true,
    serviceType: "study",
  },
  {
    id: 9,
    title: "브랜드 디자인 실무 - 아이덴티티 디자인부터 가이드라인까지",
    instructor: "한브랜드",
    price: 47000,
    originalPrice: 94000,
    rating: 4.6,
    studentCount: 1234,
    thumbnail: "https://images.unsplash.com/photo-1716703435551-4326ab111ae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY3MTU0NjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "design",
    level: "중급",
    tags: ["브랜딩", "디자인"],
    serviceType: "oneday",
  },
  {
    id: 10,
    title: "SQL 기초부터 실무까지 - 데이터베이스 마스터하기",
    instructor: "오데이터베이스",
    price: 0,
    rating: 4.8,
    studentCount: 5678,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2NzI0NjAwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "data",
    level: "입문",
    tags: ["SQL", "Database"],
    isNew: true,
    isBest: true,
    serviceType: "study",
  },
  {
    id: 11,
    title: "SNS 마케팅 실전 - 인스타그램, 페이스북 광고 마스터",
    instructor: "조SNS",
    price: 39000,
    originalPrice: 78000,
    rating: 4.5,
    studentCount: 2341,
    thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2NzE2MDQzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "marketing",
    level: "초급",
    tags: ["SNS", "마케팅"],
    serviceType: "mentoring",
  },
  {
    id: 12,
    title: "챗GPT 활용 AI 프롬프트 엔지니어링 - 업무 생산성 10배 높이기",
    instructor: "임AI활용",
    price: 29000,
    originalPrice: 58000,
    rating: 4.7,
    studentCount: 4567,
    thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NzI0NjAwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "ai",
    level: "입문",
    tags: ["ChatGPT", "AI", "생산성"],
    isNew: true,
    isBest: true,
    serviceType: "oneday",
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [priceFilter, setPriceFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"main" | "mypage" | "service-registration" | "service-detail" | "service-application">("main");
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<"mentee" | "mentor">("mentee");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handleLogin = (userData: { email: string; name: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("main");
  };

  const handleCourseClick = (courseId: number) => {
    setSelectedServiceId(courseId);
    setCurrentPage("service-detail");
  };

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = allCourses;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by price
    if (priceFilter === "free") {
      filtered = filtered.filter((course) => course.price === 0);
    } else if (priceFilter === "paid") {
      filtered = filtered.filter((course) => course.price > 0);
    } else if (priceFilter === "discount") {
      filtered = filtered.filter((course) => course.originalPrice);
    }

    // Filter by level
    if (levelFilter !== "all") {
      filtered = filtered.filter((course) => course.level === levelFilter);
    }

    // Filter by service type
    if (serviceTypeFilter !== "all") {
      filtered = filtered.filter((course) => course.serviceType === serviceTypeFilter);
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "latest":
        sorted.reverse();
        break;
      case "popular":
        sorted.sort((a, b) => b.studentCount - a.studentCount);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "relevant":
      default:
        // Keep original order or implement relevance logic
        break;
    }

    return sorted;
  }, [searchQuery, selectedCategory, sortBy, priceFilter, levelFilter, serviceTypeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedCourses.length / itemsPerPage);
  const paginatedCourses = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedCourses.slice(startIndex, endIndex);
  }, [filteredAndSortedCourses, page, itemsPerPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (callback: () => void) => {
    setPage(1);
    callback();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show ServiceRegistration page
  if (currentPage === "service-registration") {
    return (
      <ServiceRegistration
        onBack={() => setCurrentPage("main")}
      />
    );
  }

  // Show ServiceDetail page
  if (currentPage === "service-detail" && selectedServiceId) {
    return (
      <ServiceDetail
        serviceId={selectedServiceId}
        onBack={() => setCurrentPage("main")}
        onNavigateToApplication={() => {
          setCurrentPage("service-application");
        }}
      />
    );
  }

  // Show ServiceApplication page
  if (currentPage === "service-application" && selectedServiceId) {
    return (
      <ServiceApplication
        serviceId={selectedServiceId}
        onBack={() => setCurrentPage("main")}
      />
    );
  }

  // Show MyPage if user is logged in and on mypage
  if (currentPage === "mypage" && user) {
    return (
      <MyPage
        user={user}
        onLoginClick={() => setIsLoginDialogOpen(true)}
        onLogout={handleLogout}
        onNavigateToMain={() => setCurrentPage("main")}
        onNavigateToServiceRegistration={() => setCurrentPage("service-registration")}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <InfLearnHeader 
        user={user}
        onLoginClick={() => setIsLoginDialogOpen(true)}
        onSignupClick={() => setIsSignupDialogOpen(true)}
        onLogout={handleLogout}
        onNavigateToMyPage={() => setCurrentPage("mypage")}
        onNavigateToMain={() => setCurrentPage("main")}
        onNavigateToServiceRegistration={() => setCurrentPage("service-registration")}
      />
      <SearchSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <SearchFilters
        sortBy={sortBy}
        onSortChange={setSortBy}
        serviceTypeFilter={serviceTypeFilter}
        onServiceTypeFilterChange={setServiceTypeFilter}
        resultCount={filteredAndSortedCourses.length}
      />
      <SearchResults
        courses={paginatedCourses}
        searchQuery={searchQuery}
        onCourseClick={handleCourseClick}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <InfLearnFooter />
      
      <LoginDialog
        open={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
        onLogin={handleLogin}
      />
      <SignupDialog
        open={isSignupDialogOpen}
        onOpenChange={setIsSignupDialogOpen}
        onSignup={handleLogin}
        onSwitchToLogin={() => {
          setIsSignupDialogOpen(false);
          setIsLoginDialogOpen(true);
        }}
      />
    </div>
  );
}