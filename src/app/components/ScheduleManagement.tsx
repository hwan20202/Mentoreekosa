import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Search, Calendar as CalendarIcon, ArrowUpDown } from "lucide-react";
import { Badge } from "./ui/badge";

interface Schedule {
  id: string;
  classTitle: string;
  optionName: string;
  menteeNickname: string;
  reservationDate: string;
  status: "대기" | "확정" | "취소" | "완료";
}

// Mock data
const mockSchedules: Schedule[] = [
  {
    id: "1",
    classTitle: "React 완벽 가이드",
    optionName: "1:1 멘토링 60분",
    menteeNickname: "김철수",
    reservationDate: "2026-01-15 14:00",
    status: "확정",
  },
  {
    id: "2",
    classTitle: "TypeScript 마스터클래스",
    optionName: "그룹 세션 120분",
    menteeNickname: "이영희",
    reservationDate: "2026-01-15 16:00",
    status: "대기",
  },
  {
    id: "3",
    classTitle: "알고리즘 코딩테스트",
    optionName: "1:1 멘토링 90분",
    menteeNickname: "박민수",
    reservationDate: "2026-01-20 19:00",
    status: "확정",
  },
  {
    id: "4",
    classTitle: "React 완벽 가이드",
    optionName: "1:1 멘토링 60분",
    menteeNickname: "최지원",
    reservationDate: "2026-01-12 10:00",
    status: "완료",
  },
  {
    id: "5",
    classTitle: "Next.js 실전 프로젝트",
    optionName: "프로젝트 리뷰 45분",
    menteeNickname: "정수현",
    reservationDate: "2026-01-18 15:30",
    status: "취소",
  },
  {
    id: "6",
    classTitle: "Python 데이터 분석",
    optionName: "1:1 멘토링 120분",
    menteeNickname: "강민지",
    reservationDate: "2026-01-22 13:00",
    status: "대기",
  },
  {
    id: "7",
    classTitle: "웹 디자인 기초",
    optionName: "그룹 세션 90분",
    menteeNickname: "송하늘",
    reservationDate: "2026-01-25 11:00",
    status: "확정",
  },
  {
    id: "8",
    classTitle: "React 완벽 가이드",
    optionName: "1:1 멘토링 60분",
    menteeNickname: "윤서진",
    reservationDate: "2026-01-10 14:00",
    status: "완료",
  },
];

const statusColors = {
  대기: "bg-yellow-50 text-yellow-700 border-yellow-200",
  확정: "bg-blue-50 text-blue-700 border-blue-200",
  취소: "bg-red-50 text-red-700 border-red-200",
  완료: "bg-[#E6F9F2] text-[#00C471] border-[#00C471]/20",
};

export function ScheduleManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState<keyof Schedule>("reservationDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort schedules
  const filteredAndSortedSchedules = useMemo(() => {
    let filtered = [...mockSchedules];

    // Search by class title
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((schedule) =>
        schedule.classTitle.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((schedule) => schedule.status === statusFilter);
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(
        (schedule) => schedule.reservationDate >= startDate
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (schedule) => schedule.reservationDate <= endDate + " 23:59"
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, startDate, endDate, sortField, sortOrder]);

  const handleSort = (field: keyof Schedule) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setStartDate("");
    setEndDate("");
    setSortField("reservationDate");
    setSortOrder("desc");
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl mb-6">스케줄 관리</h2>

      <Card>
        <CardHeader>
          <CardTitle>전체 스케줄</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search by Class Title */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="클래스 제목 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="진행 상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="대기">대기</SelectItem>
                  <SelectItem value="확정">확정</SelectItem>
                  <SelectItem value="취소">취소</SelectItem>
                  <SelectItem value="완료">완료</SelectItem>
                </SelectContent>
              </Select>

              {/* Start Date */}
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                <Input
                  type="date"
                  placeholder="시작일"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* End Date */}
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                <Input
                  type="date"
                  placeholder="종료일"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                총 <span className="font-medium text-[#00C471]">{filteredAndSortedSchedules.length}</span>건의 스케줄
              </div>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                필터 초기화
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-20 text-center">순번</TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("classTitle")}
                      className="flex items-center gap-1 hover:text-gray-900"
                    >
                      클래스 제목
                      <ArrowUpDown className="size-4" />
                    </button>
                  </TableHead>
                  <TableHead>옵션명</TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("menteeNickname")}
                      className="flex items-center gap-1 hover:text-gray-900"
                    >
                      멘티 닉네임
                      <ArrowUpDown className="size-4" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("reservationDate")}
                      className="flex items-center gap-1 hover:text-gray-900"
                    >
                      예약일자
                      <ArrowUpDown className="size-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-center">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1 hover:text-gray-900 mx-auto"
                    >
                      진행상태
                      <ArrowUpDown className="size-4" />
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedSchedules.length > 0 ? (
                  filteredAndSortedSchedules.map((schedule, index) => (
                    <TableRow key={schedule.id} className="hover:bg-gray-50">
                      <TableCell className="text-center font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {schedule.classTitle}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {schedule.optionName}
                      </TableCell>
                      <TableCell>{schedule.menteeNickname}</TableCell>
                      <TableCell className="text-gray-600">
                        {schedule.reservationDate}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={statusColors[schedule.status]}
                        >
                          {schedule.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-gray-400">
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}