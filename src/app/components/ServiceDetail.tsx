import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Star,
  Clock,
  Calendar,
  Users,
  ChevronLeft,
  MessageSquare,
  Award,
  ChevronRight,
} from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";
import { ko } from "date-fns/locale";

interface ServiceDetailProps {
  serviceId: number;
  onBack: () => void;
  onNavigateToApplication: () => void;
}

// Mock data - 실제로는 API에서 가져올 데이터
const mockServiceData = {
  id: 1,
  title: "React 완벽 가이드 - 실전 프로젝트로 배우는 리액트",
  serviceType: "1:1 멘토링",
  description: `이 강의는 React의 기초부터 고급 기능까지 단계별로 학습할 수 있도록 설계되었습니다.

<strong>무엇을 배우나요?</strong>
• React 기본 개념 및 컴포넌트 설계
• Hooks를 활용한 상태 관리
• Redux를 이용한 전역 상태 관리
• Next.js를 활용한 SSR/SSG
• TypeScript와 React 통합
• 실전 프로젝트 구현

<strong>이런 분들께 추천합니다</strong>
• JavaScript 기초를 학습하신 분
• React를 처음 시작하시는 분
• 실무에서 사용할 수 있는 React 기술을 배우고 싶으신 분`,
  
  mentor: {
    name: "김개발",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
    title: "Senior Frontend Developer",
    company: "테크 스타트업",
    experience: "10년차 프론트엔드 개발자",
    introduction: "실무 중심의 실용적인 개발 지식을 공유합니다. 여러분의 성장을 함께하겠습니다.",
  },
  
  rating: 4.9,
  reviewCount: 127,
  studentCount: 2854,
  
  price: 50000,
  originalPrice: 100000,
  
  // 일정 정보 (모든 타입 포함)
  schedules: {
    "1-1": {
      availableTimes: [
        { day: "월", times: ["09:00-12:00", "14:00-18:00"] },
        { day: "화", times: ["10:00-13:00", "15:00-17:00"] },
        { day: "수", times: ["09:00-12:00", "14:00-18:00"] },
        { day: "목", times: ["13:00-16:00", "19:00-21:00"] },
        { day: "금", times: ["09:00-12:00", "16:00-18:00"] },
        { day: "토", times: ["10:00-14:00"] },
      ],
    },
    "1-n-oneday": {
      sessions: [
        { date: "2026-01-10", time: "10:00-12:00", remaining: 8, maxSeats: 10 },
        { date: "2026-01-10", time: "14:00-16:00", remaining: 3, maxSeats: 10 },
        { date: "2026-01-15", time: "14:00-16:00", remaining: 5, maxSeats: 10 },
        { date: "2026-01-20", time: "10:00-12:00", remaining: 2, maxSeats: 10 },
        { date: "2026-01-20", time: "15:00-17:00", remaining: 4, maxSeats: 10 },
        { date: "2026-01-20", time: "19:00-21:00", remaining: 6, maxSeats: 10 },
        { date: "2026-01-25", time: "15:00-17:00", remaining: 7, maxSeats: 10 },
        { date: "2026-01-28", time: "13:00-15:00", remaining: 9, maxSeats: 10 },
        { date: "2026-01-28", time: "16:00-18:00", remaining: 5, maxSeats: 10 },
        { date: "2026-01-28", time: "19:00-21:00", remaining: 2, maxSeats: 10 },
        { date: "2026-01-28", time: "21:00-23:00", remaining: 8, maxSeats: 10 },
        { date: "2026-02-03", time: "10:00-12:00", remaining: 6, maxSeats: 10 },
        { date: "2026-02-08", time: "14:00-16:00", remaining: 4, maxSeats: 10 },
        { date: "2026-02-12", time: "10:00-12:00", remaining: 1, maxSeats: 10 },
        { date: "2026-02-18", time: "16:00-18:00", remaining: 8, maxSeats: 10 },
        { date: "2026-02-22", time: "11:00-13:00", remaining: 5, maxSeats: 10 },
        { date: "2026-02-27", time: "15:00-17:00", remaining: 3, maxSeats: 10 },
      ],
    },
    "1-n-study": {
      totalSessions: 8,
      duration: "8주",
      sessions: [
        { session: 1, date: "2026-01-10", time: "19:00-21:00", topic: "React 기초 - JSX와 컴포넌트" },
        { session: 2, date: "2026-01-17", time: "19:00-21:00", topic: "State와 Props 이해하기" },
        { session: 3, date: "2026-01-24", time: "19:00-21:00", topic: "Hooks - useState, useEffect" },
        { session: 4, date: "2026-01-31", time: "19:00-21:00", topic: "Custom Hooks와 성능 최적화" },
        { session: 5, date: "2026-02-07", time: "19:00-21:00", topic: "Redux를 활용한 상태 관리" },
        { session: 6, date: "2026-02-14", time: "19:00-21:00", topic: "Next.js와 SSR/SSG" },
        { session: 7, date: "2026-02-21", time: "19:00-21:00", topic: "TypeScript와 React 통합" },
        { session: 8, date: "2026-02-28", time: "19:00-21:00", topic: "실전 프로젝트 완성" },
      ],
      remaining: 3,
      maxSeats: 15,
    },
  },
  
  reviews: [
    {
      id: 1,
      userName: "홍길동",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop",
      rating: 5,
      date: "2025-01-02",
      content: "정말 유익한 멘토링이었습니다! 실무에서 바로 적용할 수 있는 내용들을 배웠고, 멘토님께서 친절하게 설명해주셔서 이해하기 쉬웠습니다. 강력 추천합니다!",
      helpful: 24,
    },
    {
      id: 2,
      userName: "김영희",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
      rating: 5,
      date: "2024-12-28",
      content: "React를 처음 배우는데 너무 좋았어요. 개념부터 실전까지 체계적으로 배울 수 있었습니다.",
      helpful: 18,
    },
    {
      id: 3,
      userName: "박민수",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop",
      rating: 4,
      date: "2024-12-20",
      content: "내용은 정말 좋은데, 시간이 조금 부족했던 것 같아요. 그래도 전반적으로 만족스러운 멘토링이었습니다.",
      helpful: 12,
    },
    {
      id: 4,
      userName: "이수진",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
      rating: 5,
      date: "2024-12-20",
      content: "멘토님이 실무 경험을 바탕으로 설명해주셔서 이해가 잘 됐습니다. 프로젝트 예시도 실용적이었어요!",
      helpful: 31,
    },
  ],
};

export function ServiceDetail({ serviceId, onBack, onNavigateToApplication }: ServiceDetailProps) {
  const [activeTab, setActiveTab] = useState<"description" | "schedule">("description");
  const [scheduleType, setScheduleType] = useState<"1-1" | "1-n-oneday" | "1-n-study">("1-1");
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const service = mockServiceData; // 실제로는 serviceId로 데이터 fetch

  // 현재 주의 월요일 계산
  const getWeekStart = (offset: number) => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 월요일 시작
    return addWeeks(weekStart, offset);
  };

  // 일주일의 날짜 생성 (월-일)
  const getWeekDates = (offset: number) => {
    const weekStart = getWeekStart(offset);
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  };

  // 특정 날짜에 가능한 시간대 찾기
  const getAvailableTimesForDate = (date: Date) => {
    const dayMap: { [key: string]: string } = {
      '0': '일', '1': '월', '2': '화', '3': '수', '4': '목', '5': '금', '6': '토'
    };
    const dayOfWeek = dayMap[date.getDay().toString()];
    const slot = service.schedules["1-1"].availableTimes.find(s => s.day === dayOfWeek);
    return slot?.times || [];
  };

  // 시간 문자열을 분으로 변환 (예: "09:00" -> 540)
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // 시간 범위를 바 위치와 너비로 변환 (0-24시간 기준)
  const getBarStyle = (timeRange: string) => {
    const [start, end] = timeRange.split('-');
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    
    const totalMinutesInDay = 24 * 60;
    const left = (startMinutes / totalMinutesInDay) * 100;
    const width = ((endMinutes - startMinutes) / totalMinutesInDay) * 100;
    
    return { left: `${left}%`, width: `${width}%` };
  };

  const weekDates = getWeekDates(currentWeekOffset);
  const weekStart = getWeekStart(currentWeekOffset);

  // 지난 날짜 제외 - 오늘 이후 날짜만 필터링
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const futureDates = weekDates.filter(date => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate >= today;
  });

  // 1:N 원데이 캘린더 관련 함수
  const getOnedaySessionsForDate = (date: Date) => {
    return service.schedules["1-n-oneday"].sessions.filter(session => {
      const [year, month, day] = session.date.split('-').map(Number);
      const sessionDate = new Date(year, month - 1, day);
      return isSameDay(sessionDate, date);
    });
  };

  const hasOnedaySession = (date: Date) => {
    return getOnedaySessionsForDate(date).length > 0;
  };

  // 1:N 스터디 캘린더 관련 함수
  const getStudySessionsForDate = (date: Date) => {
    return service.schedules["1-n-study"].sessions.filter(session => {
      const [year, month, day] = session.date.split('-').map(Number);
      const sessionDate = new Date(year, month - 1, day);
      return isSameDay(sessionDate, date);
    });
  };

  const hasStudySession = (date: Date) => {
    return getStudySessionsForDate(date).length > 0;
  };

  // 캘린더에 표시할 날짜들 생성
  const getCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // 일요일 시작
    const endDate = addDays(startDate, 41); // 6주 표시 (42일)
    
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const calendarDays = getCalendarDays();
  const selectedDateSessions = selectedDate ? getOnedaySessionsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* 헤더 */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="size-5" />
            돌아가기
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 영역 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 상단: 멘토 프로필 & 서비스 정보 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={service.mentor.avatar}
                    alt={service.mentor.name}
                    className="size-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold">{service.mentor.name}</h2>
                      <Award className="size-5 text-[#00C471]" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{service.mentor.title}</p>
                    <p className="text-sm text-gray-500">{service.mentor.company} • {service.mentor.experience}</p>
                    <p className="text-sm text-gray-700 mt-2">{service.mentor.introduction}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h1 className="text-2xl font-bold mb-3">{service.title}</h1>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-gray-500">({service.reviewCount}개 리뷰)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="size-4" />
                      <span>{service.studentCount.toLocaleString()}명 수강</span>
                    </div>
                    <div className="px-3 py-1 bg-[#E6F9F2] text-[#00C471] rounded-full text-xs font-medium">
                      {service.serviceType}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 중반: 탭 메뉴 (서비스 설명 / 일정) */}
            <Card>
              <CardContent className="p-0">
                {/* 탭 헤더 */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`flex-1 px-6 py-4 font-medium transition-colors ${
                        activeTab === "description"
                          ? "text-[#00C471] border-b-2 border-[#00C471]"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      서비스 설명
                    </button>
                    <button
                      onClick={() => setActiveTab("schedule")}
                      className={`flex-1 px-6 py-4 font-medium transition-colors ${
                        activeTab === "schedule"
                          ? "text-[#00C471] border-b-2 border-[#00C471]"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      일정
                    </button>
                  </div>
                </div>

                {/* 탭 컨텐츠 */}
                <div className="p-6">
                  {activeTab === "description" ? (
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: service.description.replace(/\n/g, '<br/>').replace(/<strong>/g, '<strong class="text-gray-900">') 
                      }}
                    />
                  ) : (
                    <div className="space-y-6">
                      {/* 일정 타입 선택 탭 */}
                      <div className="flex gap-2 border-b border-gray-200 pb-2">
                        <button
                          onClick={() => setScheduleType("1-1")}
                          className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                            scheduleType === "1-1"
                              ? "bg-[#E6F9F2] text-[#00C471]"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          1:1 멘토링
                        </button>
                        <button
                          onClick={() => setScheduleType("1-n-oneday")}
                          className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                            scheduleType === "1-n-oneday"
                              ? "bg-[#E6F9F2] text-[#00C471]"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          1:N 원데이
                        </button>
                        <button
                          onClick={() => setScheduleType("1-n-study")}
                          className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                            scheduleType === "1-n-study"
                              ? "bg-[#E6F9F2] text-[#00C471]"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          1:N 스터디
                        </button>
                      </div>

                      {/* 1:1 멘토링 타입 */}
                      {scheduleType === "1-1" && (
                        <div>
                          {/* 주간 네비게이션 */}
                          <div className="flex items-center justify-between mb-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                              className="gap-1"
                            >
                              <ChevronLeft className="size-4" />
                              이전 주
                            </Button>
                            <div className="text-center">
                              <h3 className="font-medium">
                                {format(weekStart, "yyyy년 M월", { locale: ko })}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {format(weekStart, "M/d", { locale: ko })} - {format(addDays(weekStart, 6), "M/d", { locale: ko })}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                              className="gap-1"
                            >
                              다음 주
                              <ChevronRight className="size-4" />
                            </Button>
                          </div>

                          {/* 일주일 일정 세로 표시 */}
                          <div className="space-y-2">
                            {futureDates.map((date, idx) => {
                              const availableTimes = getAvailableTimesForDate(date);
                              const isToday = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                              const isPast = date < new Date() && !isToday;

                              return (
                                <div 
                                  key={idx} 
                                  className={`border rounded-lg p-4 transition-colors ${
                                    isPast 
                                      ? "bg-gray-50 border-gray-200" 
                                      : availableTimes.length > 0 
                                        ? "border-gray-200 hover:border-[#00C471] bg-white" 
                                        : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-start gap-4">
                                    {/* 날짜 표시 */}
                                    <div className={`text-center min-w-[60px] ${
                                      isToday ? "text-[#00C471]" : isPast ? "text-gray-400" : "text-gray-900"
                                    }`}>
                                      <div className={`text-xs mb-1 ${
                                        isToday ? "font-medium" : ""
                                      }`}>
                                        {format(date, "EEE", { locale: ko })}
                                      </div>
                                      <div className={`text-2xl font-bold ${
                                        isToday ? "bg-[#00C471] text-white rounded-full size-12 flex items-center justify-center mx-auto" : ""
                                      }`}>
                                        {format(date, "d")}
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        {format(date, "M월", { locale: ko })}
                                      </div>
                                    </div>

                                    {/* 시간대 표시 */}
                                    <div className="flex-1">
                                      {isPast ? (
                                        <div className="text-sm text-gray-400 py-2">지난 날짜</div>
                                      ) : availableTimes.length > 0 ? (
                                        <div className="space-y-3">
                                          {/* 24시간 타임라인 레이블 */}
                                          <div className="flex justify-between text-xs text-gray-400 px-1">
                                            <span>0:00</span>
                                            <span>6:00</span>
                                            <span>12:00</span>
                                            <span>18:00</span>
                                            <span>24:00</span>
                                          </div>
                                          
                                          {/* 타임라인 바 컨테이너 */}
                                          <div className="relative h-10 bg-gray-100 rounded-lg">
                                            {/* 시간 구분선 - 1시간 단위 (얇은 선), 3시간 단위 (굵은 선) */}
                                            <div className="absolute inset-0 flex">
                                              {Array.from({ length: 25 }, (_, i) => i).map((hour) => (
                                                <div
                                                  key={hour}
                                                  className={`absolute h-full border-l ${
                                                    hour % 3 === 0 
                                                      ? "border-gray-400" // 3시간 단위: 굵은 선
                                                      : "border-gray-300" // 1시간 단위: 얇은 선
                                                  }`}
                                                  style={{ left: `${(hour / 24) * 100}%` }}
                                                />
                                              ))}
                                            </div>
                                            
                                            {/* 가능한 시간대 바 */}
                                            {availableTimes.map((timeRange, timeIdx) => {
                                              const barStyle = getBarStyle(timeRange);
                                              return (
                                                <div
                                                  key={timeIdx}
                                                  className="absolute h-full bg-[#00C471] hover:bg-[#00B366] rounded cursor-pointer transition-colors group"
                                                  style={{
                                                    left: barStyle.left,
                                                    width: barStyle.width,
                                                  }}
                                                >
                                                  {/* 시간 레이블 (hover 시 표시) */}
                                                  <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                      {timeRange}
                                                    </span>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                          
                                          {/* 시간대 텍스트 목록 */}
                                          <div className="flex flex-wrap gap-2">
                                            {availableTimes.map((time, timeIdx) => (
                                              <div
                                                key={timeIdx}
                                                className="flex items-center gap-1 text-xs text-gray-600"
                                              >
                                                <Clock className="size-3 text-[#00C471]" />
                                                <span>{time}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="text-sm text-gray-400 py-2">멘토링 불가</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-900">
                              💡 <strong>신청 방법:</strong> 원하는 날짜와 시간을 선택하여 1:1 맞춤 멘토링을 신청할 수 있습니다.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 1:N 원데이 타입 */}
                      {scheduleType === "1-n-oneday" && (
                        <div>
                          {/* 월 네비게이션 */}
                          <div className="flex items-center justify-between mb-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                              className="gap-1"
                            >
                              <ChevronLeft className="size-4" />
                              이전 달
                            </Button>
                            <h3 className="font-medium">
                              {format(currentMonth, "yyyy년 M월", { locale: ko })}
                            </h3>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                              className="gap-1"
                            >
                              다음 달
                              <ChevronRight className="size-4" />
                            </Button>
                          </div>

                          {/* 캘린더 */}
                          <div className="mb-6">
                            {/* 요일 헤더 */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
                                <div 
                                  key={day} 
                                  className={`text-center text-sm font-medium py-2 ${
                                    idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : "text-gray-700"
                                  }`}
                                >
                                  {day}
                                </div>
                              ))}
                            </div>

                            {/* 캘린더 날짜 그리드 */}
                            <div className="grid grid-cols-7 gap-1">
                              {calendarDays.map((day, idx) => {
                                const isCurrentMonth = isSameMonth(day, currentMonth);
                                const isToday = isSameDay(day, new Date());
                                const isPast = day < new Date() && !isToday;
                                const daySessions = getOnedaySessionsForDate(day);
                                const hasSession = daySessions.length > 0;
                                const isSelected = selectedDate && isSameDay(day, selectedDate);
                                const dayOfWeek = day.getDay();

                                return (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      if (hasSession && !isPast) {
                                        setSelectedDate(day);
                                      }
                                    }}
                                    disabled={!hasSession || isPast}
                                    className={`
                                      min-h-[100px] p-2 rounded-lg text-sm transition-all relative flex flex-col items-start
                                      ${!isCurrentMonth ? "text-gray-300" : ""}
                                      ${isPast ? "opacity-40 cursor-not-allowed" : ""}
                                      ${isToday ? "ring-2 ring-[#00C471]" : ""}
                                      ${isSelected ? "bg-[#00C471] text-white" : ""}
                                      ${hasSession && !isPast && !isSelected ? "bg-[#E6F9F2] hover:bg-[#D0F5E9]" : ""}
                                      ${!hasSession && !isPast && !isSelected ? "hover:bg-gray-100" : ""}
                                    `}
                                  >
                                    {/* 날짜 숫자 */}
                                    <div className={`font-medium mb-1 ${
                                      isToday ? "font-bold" : ""
                                    } ${
                                      dayOfWeek === 0 && isCurrentMonth && !isSelected ? "text-red-500" : ""
                                    } ${
                                      dayOfWeek === 6 && isCurrentMonth && !isSelected ? "text-blue-500" : ""
                                    }`}>
                                      {format(day, "d")}
                                    </div>
                                    
                                    {/* 세션 정보 표시 (최대 3개) */}
                                    {hasSession && !isPast && (
                                      <div className="w-full space-y-1">
                                        {daySessions.slice(0, 3).map((session, sessionIdx) => (
                                          <div 
                                            key={sessionIdx}
                                            className={`text-xs px-1 py-0.5 rounded truncate ${
                                              isSelected 
                                                ? "bg-white/20 text-white" 
                                                : "bg-[#00C471] text-white"
                                            }`}
                                            title={`${session.time} (잔여 ${session.remaining}/${session.maxSeats}석)`}
                                          >
                                            {session.time.split('-')[0]}
                                          </div>
                                        ))}
                                        {/* 4개 이상일 경우 "+N개 더" 표시 */}
                                        {daySessions.length > 3 && (
                                          <div className={`text-xs px-1 py-0.5 rounded font-medium ${
                                            isSelected 
                                              ? "text-white/80" 
                                              : "text-[#00C471]"
                                          }`}>
                                            +{daySessions.length - 3}개 더
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 선택된 날짜의 세션 정보 */}
                          {selectedDate && selectedDateSessions.length > 0 ? (
                            <div>
                              <h3 className="font-medium mb-3">
                                {format(selectedDate, "M월 d일 (EEE)", { locale: ko })} 일정
                              </h3>
                              <div className="space-y-3">
                                {selectedDateSessions.map((session, idx) => (
                                  <div 
                                    key={idx} 
                                    className="border border-[#00C471] bg-[#E6F9F2] rounded-lg p-4 flex items-center justify-between"
                                  >
                                    <div className="flex items-center gap-3">
                                      <Clock className="size-5 text-[#00C471]" />
                                      <div>
                                        <div className="font-medium text-[#00C471]">{session.time}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                          원데이 클래스
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm text-[#00C471] font-medium">
                                        잔여 {session.remaining}/{session.maxSeats}석
                                      </div>
                                      {session.remaining <= 3 && (
                                        <div className="text-xs text-red-500 mt-1">마감 임박</div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <Calendar className="size-12 mx-auto text-gray-300 mb-3" />
                              <p className="text-gray-500">
                                캘린더에서 날짜를 선택하면<br />
                                해당 일자의 원데이 클래스 일정을 확인할 수 있습니다.
                              </p>
                            </div>
                          )}
                          
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-900">
                              💡 <strong>원데이 클래스:</strong> 캘린더에서 날짜를 선택하면 해당 일자의 상세 일정을 확인할 수 있습니다.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 1:N 스터디 타입 */}
                      {scheduleType === "1-n-study" && (
                        <div>
                          <div className="mb-4 p-4 bg-[#E6F9F2] rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-[#00C471]">전체 {service.schedules["1-n-study"].totalSessions}회차 스터디</h3>
                                <p className="text-sm text-gray-700 mt-1">기간: {service.schedules["1-n-study"].duration}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-[#00C471] font-medium">
                                  잔여 {service.schedules["1-n-study"].remaining}/{service.schedules["1-n-study"].maxSeats}석
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="font-medium mb-3">커리큘럼</h4>
                          <div className="space-y-2">
                            {service.schedules["1-n-study"].sessions.map((session, idx) => {
                              const [year, month, day] = session.date.split('-').map(Number);
                              const dateObj = new Date(year, month - 1, day);
                              
                              return (
                                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-[#00C471] transition-colors">
                                  <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 size-10 rounded-full bg-[#E6F9F2] text-[#00C471] flex items-center justify-center font-bold">
                                      {session.session}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium mb-1">{session.topic}</div>
                                      <div className="text-sm text-gray-500 flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                          <Calendar className="size-3" />
                                          {format(dateObj, "M월 d일 (EEE)", { locale: ko })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Clock className="size-3" />
                                          {session.time}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-900">
                              💡 <strong>스터디 과정:</strong> 전체 {service.schedules["1-n-study"].totalSessions}회차를 모두 수강해야 하며, 체계적인 학습을 위해 순차적으로 진행됩니다.
                            </p>
                          </div>

                          {/* 스터디 일정 캘린더 */}
                          <div className="mt-6">
                            <h4 className="font-medium mb-4">일정 캘린더</h4>
                            
                            {/* 월 네비게이션 */}
                            <div className="flex items-center justify-between mb-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                className="gap-1"
                              >
                                <ChevronLeft className="size-4" />
                                이전 달
                              </Button>
                              <h3 className="font-medium">
                                {format(currentMonth, "yyyy년 M월", { locale: ko })}
                              </h3>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                className="gap-1"
                              >
                                다음 달
                                <ChevronRight className="size-4" />
                              </Button>
                            </div>

                            {/* 캘린더 */}
                            <div className="mb-6">
                              {/* 요일 헤더 */}
                              <div className="grid grid-cols-7 gap-1 mb-2">
                                {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
                                  <div 
                                    key={day} 
                                    className={`text-center text-sm font-medium py-2 ${
                                      idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : "text-gray-700"
                                    }`}
                                  >
                                    {day}
                                  </div>
                                ))}
                              </div>

                              {/* 캘린더 날짜 그리드 */}
                              <div className="grid grid-cols-7 gap-1">
                                {calendarDays.map((day, idx) => {
                                  const isCurrentMonth = isSameMonth(day, currentMonth);
                                  const isToday = isSameDay(day, new Date());
                                  const studySessions = getStudySessionsForDate(day);
                                  const hasSession = studySessions.length > 0;
                                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                                  const dayOfWeek = day.getDay();

                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        if (hasSession) {
                                          setSelectedDate(day);
                                        }
                                      }}
                                      disabled={!hasSession}
                                      className={`
                                        min-h-[100px] p-2 rounded-lg text-sm transition-all relative flex flex-col items-start
                                        ${!isCurrentMonth ? "text-gray-300" : ""}
                                        ${isToday ? "ring-2 ring-[#00C471]" : ""}
                                        ${isSelected ? "bg-[#00C471] text-white" : ""}
                                        ${hasSession && !isSelected ? "bg-[#FFF4E6] hover:bg-[#FFE8CC]" : ""}
                                        ${!hasSession && !isSelected ? "hover:bg-gray-100" : ""}
                                      `}
                                    >
                                      {/* 날짜 숫자 */}
                                      <div className={`font-medium mb-1 ${
                                        isToday ? "font-bold" : ""
                                      } ${
                                        dayOfWeek === 0 && isCurrentMonth && !isSelected ? "text-red-500" : ""
                                      } ${
                                        dayOfWeek === 6 && isCurrentMonth && !isSelected ? "text-blue-500" : ""
                                      }`}>
                                        {format(day, "d")}
                                      </div>
                                      
                                      {/* 스터디 회차 정보 표시 */}
                                      {hasSession && studySessions.map((session, sessionIdx) => (
                                        <div key={sessionIdx} className="w-full space-y-1">
                                          <div 
                                            className={`text-xs px-1.5 py-1 rounded font-medium ${
                                              isSelected 
                                                ? "bg-white/20 text-white" 
                                                : "bg-[#FF9500] text-white"
                                            }`}
                                            title={`${session.session}회차: ${session.topic}`}
                                          >
                                            {session.session}회차
                                          </div>
                                          <div 
                                            className={`text-xs px-1 py-0.5 rounded truncate ${
                                              isSelected 
                                                ? "text-white/90" 
                                                : "text-gray-700"
                                            }`}
                                            title={session.time}
                                          >
                                            {session.time.split('-')[0]}
                                          </div>
                                        </div>
                                      ))}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 선택된 날짜의 스터디 세션 정보 */}
                            {selectedDate && (() => {
                              const selectedStudySessions = getStudySessionsForDate(selectedDate);
                              return selectedStudySessions.length > 0 ? (
                                <div>
                                  <h3 className="font-medium mb-3">
                                    {format(selectedDate, "M월 d일 (EEE)", { locale: ko })} 일정
                                  </h3>
                                  <div className="space-y-3">
                                    {selectedStudySessions.map((session, idx) => (
                                      <div 
                                        key={idx} 
                                        className="border border-[#FF9500] bg-[#FFF4E6] rounded-lg p-4"
                                      >
                                        <div className="flex items-start gap-3">
                                          <div className="flex-shrink-0 size-10 rounded-full bg-[#FF9500] text-white flex items-center justify-center font-bold">
                                            {session.session}
                                          </div>
                                          <div className="flex-1">
                                            <div className="font-medium text-[#FF9500] mb-1">{session.topic}</div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                              <span className="flex items-center gap-1">
                                                <Clock className="size-3" />
                                                {session.time}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : null;
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 하단: 리뷰 섹션 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <MessageSquare className="size-5" />
                    수강생 리뷰
                  </h3>
                  <div className="flex items-center gap-2">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{service.rating}</span>
                    <span className="text-gray-500">({service.reviewCount}개)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {service.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.avatar}
                          alt={review.userName}
                          className="size-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium">{review.userName}</div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star
                                      key={idx}
                                      className={`size-3 ${
                                        idx < review.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span>•</span>
                                <span>{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{review.content}</p>
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            도움이 돼요 ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 우측 사이드바: 신청 버튼 */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      {service.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₩{service.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">₩{service.price.toLocaleString()}</span>
                      {service.originalPrice && (
                        <span className="text-sm font-medium text-red-500">
                          {Math.round((1 - service.price / service.originalPrice) * 100)}% 할인
                        </span>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={onNavigateToApplication}
                    className="w-full bg-[#00C471] hover:bg-[#00B366] text-white py-6 text-lg font-medium"
                  >
                    서비스 신청하기
                  </Button>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="size-4" />
                      <span>평균 응답 시간: 1시간 이내</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="size-4" />
                      <span>현재 {service.studentCount}명 수강 중</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="size-4" />
                      <span>만족도 {service.rating}/5.0</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium mb-3">이런 점이 좋아요</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C471] mt-1">✓</span>
                        <span>실무 경험 10년차 전문가</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C471] mt-1">✓</span>
                        <span>체계적인 커리큘럼</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C471] mt-1">✓</span>
                        <span>실전 프로젝트 포함</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C471] mt-1">✓</span>
                        <span>평생 수강 가능</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}