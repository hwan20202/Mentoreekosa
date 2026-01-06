import { useState, useMemo } from "react";
import { Card, CardContent } from "./ui/card";
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
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface Schedule {
  id: string;
  classTitle: string;
  optionName: string;
  menteeNickname: string;
  reservationDate: string;
  status: "대기" | "확정" | "취소" | "완료";
}

interface ScheduleDetail extends Schedule {
  date: string;
  startTime: string;
  endTime: string;
  requestContent: string;
  lessonType: string;
  lessonDescription: string;
  lessonLocation: string;
  lessonCategoryName: string;
  optionMinute: number;
  price: number;
  // Payment info
  totalPrice: number;
  usePoint: number;
  finalPrice: number;
  paidAt: string;
  paymentType: "결제" | "전체환불" | "부분환불";
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
    reservationDate: "2026-01-02 10:00",
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
    reservationDate: "2025-12-28 14:00",
    status: "완료",
  },
  {
    id: "9",
    classTitle: "JavaScript 심화",
    optionName: "1:1 멘토링 90분",
    menteeNickname: "김민준",
    reservationDate: "2025-12-20 16:00",
    status: "완료",
  },
  {
    id: "10",
    classTitle: "Vue.js 시작하기",
    optionName: "1:1 멘토링 60분",
    menteeNickname: "이서연",
    reservationDate: "2026-01-30 10:00",
    status: "확정",
  },
  {
    id: "11",
    classTitle: "Node.js 백엔드",
    optionName: "그룹 세션 120분",
    menteeNickname: "박준호",
    reservationDate: "2026-02-05 14:00",
    status: "대기",
  },
  {
    id: "12",
    classTitle: "React Native 모바일",
    optionName: "1:1 멘토링 90분",
    menteeNickname: "최유진",
    reservationDate: "2026-02-10 16:00",
    status: "확정",
  },
];

const ITEMS_PER_PAGE = 5;

// Mock detailed schedule data
const mockScheduleDetails: { [key: string]: ScheduleDetail } = {
  "1": {
    id: "1",
    classTitle: "React 완벽 가이드",
    optionName: "1:1 멘토링 60분",
    menteeNickname: "김철수",
    reservationDate: "2026-01-15 14:00",
    status: "확정",
    date: "2026-01-15",
    startTime: "14:00",
    endTime: "15:00",
    requestContent: "React Hooks에 대해 깊이 있게 배우고 싶습니다. 특히 useEffect와 커스텀 훅 작성에 대해 질문이 있습니다.",
    lessonType: "1:1 멘토링",
    lessonDescription: "React의 핵심 개념부터 고급 패턴까지 체계적으로 학습하는 완벽 가이드 강의입니다.",
    lessonLocation: "온라인 (Zoom)",
    lessonCategoryName: "프론트엔드",
    optionMinute: 60,
    price: 50000,
    totalPrice: 50000,
    usePoint: 5000,
    finalPrice: 45000,
    paidAt: "2026-01-10 10:30",
    paymentType: "결제",
  },
  "2": {
    id: "2",
    classTitle: "TypeScript 마스터클래스",
    optionName: "그룹 세션 120분",
    menteeNickname: "이영희",
    reservationDate: "2026-01-15 16:00",
    status: "대기",
    date: "2026-01-15",
    startTime: "16:00",
    endTime: "18:00",
    requestContent: "제네릭과 타입 가드에 대해 실무 예제로 배우고 싶습니다.",
    lessonType: "1:N 원데이",
    lessonDescription: "TypeScript의 고급 타입 시스템을 마스터하는 심화 과정입니다.",
    lessonLocation: "온라인 (Google Meet)",
    lessonCategoryName: "프론트엔드",
    optionMinute: 120,
    price: 80000,
    totalPrice: 80000,
    usePoint: 0,
    finalPrice: 80000,
    paidAt: "2026-01-12 14:20",
    paymentType: "결제",
  },
  "3": {
    id: "3",
    classTitle: "알고리즘 코딩테스트",
    optionName: "1:1 멘토링 90분",
    menteeNickname: "박민수",
    reservationDate: "2026-01-20 19:00",
    status: "확정",
    date: "2026-01-20",
    startTime: "19:00",
    endTime: "20:30",
    requestContent: "동적 프로그래밍 문제 풀이 전략을 배우고 싶습니다.",
    lessonType: "1:1 멘토링",
    lessonDescription: "코딩테스트 합격을 위한 알고리즘 문제 해결 전략을 학습합니다.",
    lessonLocation: "온라인 (Zoom)",
    lessonCategoryName: "알고리즘",
    optionMinute: 90,
    price: 70000,
    totalPrice: 70000,
    usePoint: 10000,
    finalPrice: 60000,
    paidAt: "2026-01-18 09:15",
    paymentType: "결제",
  },
};

const statusColors = {
  대기: "bg-yellow-50 text-yellow-700 border-yellow-200",
  확정: "bg-blue-50 text-blue-700 border-blue-200",
  취소: "bg-red-50 text-red-700 border-red-200",
  완료: "bg-[#E6F9F2] text-[#00C471] border-[#00C471]/20",
};

export function ScheduleManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [sortField, setSortField] = useState<keyof Schedule>("reservationDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Temporary filter states (before applying)
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState<string>("all");

  // Get current date for comparison
  const now = new Date().toISOString();

  // Filter and sort schedules
  const filteredAndSortedSchedules = useMemo(() => {
    let filtered = [...mockSchedules];

    // Filter by tab (upcoming or past)
    if (activeTab === "upcoming") {
      filtered = filtered.filter((schedule) => schedule.reservationDate >= now);
    } else {
      filtered = filtered.filter((schedule) => schedule.reservationDate < now);
    }

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

    // Apply default sorting based on tab
    if (sortField === "reservationDate") {
      if (activeTab === "upcoming") {
        // Upcoming: nearest first (ascending)
        filtered.sort((a, b) => 
          a.reservationDate > b.reservationDate ? 1 : -1
        );
      } else {
        // Past: latest first (descending)
        filtered.sort((a, b) => 
          a.reservationDate < b.reservationDate ? 1 : -1
        );
      }
    }

    return filtered;
  }, [searchQuery, statusFilter, activeTab, sortField, sortOrder, now]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedSchedules.length / ITEMS_PER_PAGE);
  const paginatedSchedules = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedSchedules.slice(startIndex, endIndex);
  }, [filteredAndSortedSchedules, currentPage]);

  const handleSort = (field: keyof Schedule) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const applyFilters = () => {
    setSearchQuery(tempSearchQuery);
    setStatusFilter(tempStatusFilter);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleTabChange = (tab: "upcoming" | "past") => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when tab changes
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (schedule: Schedule) => {
    const detail = mockScheduleDetails[schedule.id];
    if (detail) {
      setSelectedSchedule(detail);
      setIsModalOpen(true);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl mb-6">스케줄 관리</h2>

      {/* Tabs - Moved outside Card */}
      <div className="flex items-center gap-2 border-b border-gray-200 mb-6">
        <button
          onClick={() => handleTabChange("upcoming")}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === "upcoming"
              ? "text-[#00C471]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          예정 ({mockSchedules.filter(s => s.reservationDate >= now).length})
          {activeTab === "upcoming" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C471]" />
          )}
        </button>
        <button
          onClick={() => handleTabChange("past")}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === "past"
              ? "text-[#00C471]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          과거 ({mockSchedules.filter(s => s.reservationDate < now).length})
          {activeTab === "past" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C471]" />
          )}
        </button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search by Class Title */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="클래스 제목 검색..."
                  value={tempSearchQuery}
                  onChange={(e) => setTempSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Status Filter */}
              <Select value={tempStatusFilter} onValueChange={setTempStatusFilter}>
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
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                총 <span className="font-medium text-[#00C471]">{filteredAndSortedSchedules.length}</span>건의 스케줄
              </div>
              <Button 
                size="sm" 
                onClick={applyFilters}
                className="bg-[#00C471] hover:bg-[#00B366]"
              >
                적용
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
                {paginatedSchedules.length > 0 ? (
                  paginatedSchedules.map((schedule, index) => (
                    <TableRow 
                      key={schedule.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(schedule)}
                    >
                      <TableCell className="text-center font-medium">
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={currentPage === page ? "bg-[#00C471] hover:bg-[#00B366]" : ""}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">스케줄 상세 정보</DialogTitle>
          </DialogHeader>
          
          {selectedSchedule && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={`${statusColors[selectedSchedule.status]} text-base px-3 py-1`}
                >
                  {selectedSchedule.status}
                </Badge>
              </div>

              {/* Lesson Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">레슨 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">클래스 제목</p>
                    <p className="font-medium">{selectedSchedule.classTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">카테고리</p>
                    <p className="font-medium">{selectedSchedule.lessonCategoryName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">레슨 유형</p>
                    <p className="font-medium">{selectedSchedule.lessonType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">장소</p>
                    <p className="font-medium">{selectedSchedule.lessonLocation}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">레슨 설명</p>
                    <p className="text-gray-700">{selectedSchedule.lessonDescription}</p>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">예약 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">예약 날짜</p>
                    <p className="font-medium">{selectedSchedule.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">시간</p>
                    <p className="font-medium">{selectedSchedule.startTime} - {selectedSchedule.endTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">멘티</p>
                    <p className="font-medium">{selectedSchedule.menteeNickname}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">옵션명 (시간)</p>
                    <p className="font-medium">{selectedSchedule.optionName} ({selectedSchedule.optionMinute}분)</p>
                  </div>
                  {selectedSchedule.requestContent && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 mb-1">요청 사항</p>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedSchedule.requestContent}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">결제 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">총 금액</p>
                    <p className="font-medium">{formatCurrency(selectedSchedule.totalPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">사용 포인트</p>
                    <p className="font-medium text-[#00C471]">-{formatCurrency(selectedSchedule.usePoint)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">최종 결제 금액</p>
                    <p className="font-semibold text-lg">{formatCurrency(selectedSchedule.finalPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">결제 유형</p>
                    <p className="font-medium">{selectedSchedule.paymentType}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">결제 일시</p>
                    <p className="font-medium">{selectedSchedule.paidAt}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  닫기
                </Button>
                {selectedSchedule.status === "대기" && (
                  <Button className="bg-[#00C471] hover:bg-[#00B366]">
                    확정하기
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
