import {
  Layers,
  Code,
  Palette,
  Database,
  TrendingUp,
  Briefcase,
  Bot,
  MonitorPlay,
  ShoppingCart,
  Coffee,
  BookOpen,
  Camera,
  GraduationCap,
  Award,
} from "lucide-react";

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "전체", icon: Layers },
  { id: "programming", label: "개발 · 프로그래밍", icon: Code },
  { id: "ai", label: "AI 기술", icon: Bot },
  { id: "data", label: "AI 활용", icon: Database },
  { id: "design", label: "게임 개발", icon: Palette },
  { id: "marketing", label: "데이터 사이언스", icon: TrendingUp },
  { id: "business", label: "보안 · 네트워크", icon: Briefcase },
  { id: "video", label: "워드레버", icon: MonitorPlay },
  { id: "commerce", label: "디자인 · 아트", icon: ShoppingCart },
  { id: "lifestyle", label: "기획 · 창작 · 마케팅", icon: Coffee },
  { id: "education", label: "직군 · 업계", icon: BookOpen },
  { id: "photo", label: "업무 생산성", icon: Camera },
  { id: "career", label: "커리어 · 자기개발", icon: GraduationCap },
  { id: "certificate", label: "대외 교육", icon: Award },
];

export function CategoryTabs({
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="border-b bg-white sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex flex-col items-center gap-1.5 px-4 py-2.5 min-w-[80px] whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "text-[#00C471]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="size-6" strokeWidth={1.5} />
                <span className="text-xs">{category.label}</span>
                {selectedCategory === category.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C471]"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}