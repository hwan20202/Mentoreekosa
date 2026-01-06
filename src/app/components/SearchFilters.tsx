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
            {/* Sort */}
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="price-low">가격 낮은순</SelectItem>
                <SelectItem value="price-high">가격 높은순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}