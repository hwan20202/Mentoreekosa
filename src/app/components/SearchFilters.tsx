import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

interface SearchFiltersProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  priceFilter: string;
  onPriceFilterChange: (value: string) => void;
  levelFilter: string;
  onLevelFilterChange: (value: string) => void;
  resultCount: number;
}

export function SearchFilters({
  sortBy,
  onSortChange,
  priceFilter,
  onPriceFilterChange,
  levelFilter,
  onLevelFilterChange,
  resultCount,
}: SearchFiltersProps) {
  return (
    <div className="bg-white border-b py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Result Count */}
          <div className="text-gray-600">
            <span className="text-[#00C471]">{resultCount.toLocaleString()}</span>개의 강의
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={onPriceFilterChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="가격" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 가격</SelectItem>
                <SelectItem value="free">무료</SelectItem>
                <SelectItem value="paid">유료</SelectItem>
                <SelectItem value="discount">할인 중</SelectItem>
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select value={levelFilter} onValueChange={onLevelFilterChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="난이도" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 난이도</SelectItem>
                <SelectItem value="입문">입문</SelectItem>
                <SelectItem value="초급">초급</SelectItem>
                <SelectItem value="중급">중급</SelectItem>
                <SelectItem value="고급">고급</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">관련도순</SelectItem>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="rating">평점순</SelectItem>
                <SelectItem value="price-low">가격 낮은순</SelectItem>
                <SelectItem value="price-high">가격 높은순</SelectItem>
              </SelectContent>
            </Select>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onPriceFilterChange("all");
                onLevelFilterChange("all");
                onSortChange("relevant");
              }}
            >
              초기화
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
