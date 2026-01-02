import { Sparkles, Calendar, FileText, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MyPageCalendar } from "./MyPageCalendar";

interface MyPageHomeProps {
  userName: string;
}

export function MyPageHome({ userName }: MyPageHomeProps) {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Message */}
          <h1 className="text-3xl">
            <span className="font-bold">{userName}</span>님 안녕하세요!
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: 확정 대기 */}
            <Card className="bg-gradient-to-br from-[#00C471] to-[#00B366] text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="size-6" />
                  <span className="text-lg">확정 대기</span>
                </div>
                <div className="text-4xl">00 건</div>
              </CardContent>
            </Card>

            {/* Card 2: 예정 스케줄 */}
            <Card className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="size-6" />
                  <span className="text-lg">예정 스케줄</span>
                </div>
                <div className="text-4xl">00 건</div>
              </CardContent>
            </Card>

            {/* Card 3: 이력서/포폴 */}
            <Card className="border bg-gradient-to-br from-gray-50 to-gray-100">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="size-6 text-gray-600" />
                  <span className="text-lg text-gray-700">이력서/포폴</span>
                </div>
                <div className="text-4xl text-gray-900">00 개</div>
              </CardContent>
            </Card>
          </div>

          {/* 24시간 내 일정 */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle>24시간 내 일정</CardTitle>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm">
                    00 건
                  </span>
                </div>
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                  이력서(포트폴리오) 관리
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="py-20 text-center text-gray-400">
                24시간 내 일정이 없습니다.
              </div>
            </CardContent>
          </Card>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 예정 스케줄 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle>예정 스케줄</CardTitle>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                      00 건
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                    스케줄 관리
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="py-16 text-center text-gray-400">
                  예정된 스케줄이 없습니다.
                </div>
              </CardContent>
            </Card>

            {/* 확정 대기 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle>확정 대기</CardTitle>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
                      00 명
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                    스케줄 관리
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="py-16 text-center text-gray-400">
                  확정 대기 목록이 없습니다.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Calendar */}
        <div className="lg:col-span-1">
          <MyPageCalendar />
        </div>
      </div>
    </div>
  );
}