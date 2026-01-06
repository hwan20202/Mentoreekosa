import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface Schedule {
  id: string;
  title: string;
  time: string;
  location?: string;
  type: "mentoring" | "class" | "study";
}

// Mock schedule data
const mockSchedules: Record<string, Schedule[]> = {
  "2026-01-04": [
    {
      id: "1",
      title: "React 심화 학습 멘토링",
      time: "14:00 - 15:00",
      location: "온라인",
      type: "mentoring",
    },
    {
      id: "2",
      title: "Next.js 프로젝트 리뷰",
      time: "16:00 - 18:00",
      location: "온라인",
      type: "mentoring",
    },
  ],
  "2026-01-06": [
    {
      id: "3",
      title: "TypeScript 기초부터 실전까지",
      time: "10:00 - 12:00",
      location: "강남 캠퍼스",
      type: "class",
    },
  ],
  "2026-01-08": [
    {
      id: "4",
      title: "웹 개발 멘토링",
      time: "14:00 - 16:00",
      location: "온라인",
      type: "mentoring",
    },
  ],
  "2026-01-10": [
    {
      id: "5",
      title: "알고리즘 스터디 - 1회차",
      time: "15:00 - 17:00",
      location: "온라인",
      type: "study",
    },
  ],
  "2026-01-12": [
    {
      id: "6",
      title: "프론트엔드 커리어 상담",
      time: "10:00 - 11:00",
      location: "온라인",
      type: "mentoring",
    },
  ],
  "2026-01-15": [
    {
      id: "7",
      title: "React 멘토링",
      time: "14:00 - 15:00",
      location: "온라인",
      type: "mentoring",
    },
  ],
  "2026-01-17": [
    {
      id: "8",
      title: "알고리즘 스터디 - 2회차",
      time: "15:00 - 17:00",
      location: "온라인",
      type: "study",
    },
  ],
  "2026-01-20": [
    {
      id: "9",
      title: "JavaScript 심화 클래스",
      time: "10:00 - 12:00",
      location: "강남 캠퍼스",
      type: "class",
    },
    {
      id: "10",
      title: "풀스택 개발 멘토링",
      time: "14:00 - 16:00",
      location: "온라인",
      type: "mentoring",
    },
  ],
  "2026-01-24": [
    {
      id: "11",
      title: "알고리즘 스터디 - 3회차",
      time: "15:00 - 17:00",
      location: "온라인",
      type: "study",
    },
  ],
};

const typeColors = {
  mentoring: "bg-blue-100 text-blue-700 border-blue-200",
  class: "bg-purple-100 text-purple-700 border-purple-200",
  study: "bg-green-100 text-green-700 border-green-200",
};

const typeLabels = {
  mentoring: "멘토링",
  class: "클래스",
  study: "스터디",
};

export function MyPageCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const schedules = mockSchedules[dateKey] || [];

  // Dates with schedules - ensure proper date creation without timezone issues
  const scheduleDates = Object.keys(mockSchedules).map((key) => {
    const [year, month, day] = key.split('-').map(Number);
    return new Date(year, month - 1, day);
  });

  return (
    <div className="space-y-4">
      {/* Calendar Card */}
      <Card>
        <CardHeader>
          <CardTitle>스케줄 캘린더</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            locale={ko}
            className="border rounded-lg"
            modifiers={{
              hasSchedule: scheduleDates,
            }}
            modifiersClassNames={{
              hasSchedule: "bg-[#00C471]/10 hover:bg-[#00C471]/20 font-semibold text-[#00C471]",
            }}
          />
        </CardContent>
      </Card>

      {/* Schedule List Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {format(selectedDate, "M월 d일 (E)", { locale: ko })} 일정
            </span>
            <span className="text-sm font-normal text-gray-500">
              {schedules.length}건
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {schedules.length > 0 ? (
            <div className="space-y-3">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="p-4 border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{schedule.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 border ${
                        typeColors[schedule.type]
                      }`}
                    >
                      {typeLabels[schedule.type]}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="size-4" />
                      <span>{schedule.time}</span>
                    </div>
                    {schedule.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="size-4" />
                        <span>{schedule.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400">
              선택한 날짜에 일정이 없습니다.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}