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
  "2026-01-15": [
    {
      id: "1",
      title: "React 고급 패턴 멘토링",
      time: "14:00 - 15:00",
      location: "온라인",
      type: "mentoring",
    },
    {
      id: "2",
      title: "TypeScript 실습 클래스",
      time: "16:00 - 18:00",
      location: "강남 캠퍼스",
      type: "class",
    },
  ],
  "2026-01-20": [
    {
      id: "3",
      title: "알고리즘 스터디",
      time: "19:00 - 21:00",
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
  study: "스터���",
};

export function MyPageCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const schedules = mockSchedules[dateKey] || [];

  // Dates with schedules
  const scheduleDates = Object.keys(mockSchedules).map(
    (key) => new Date(key)
  );

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
            className="border"
            modifiers={{
              hasSchedule: scheduleDates,
            }}
            modifiersClassNames={{
              hasSchedule: "bg-[#00C471]/10 font-bold text-[#00C471]",
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