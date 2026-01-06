import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Camera, User } from "lucide-react";

interface ProfileManagementProps {
  user: { email: string; name: string };
}

export function ProfileManagement({ user }: ProfileManagementProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "introduction">("basic");
  const [nickname, setNickname] = useState(user.name);
  const [phone, setPhone] = useState("010-9342-3631");
  const [introduction, setIntroduction] = useState(
    "안녕하세요! 5년 경력의 프론트엔드 개발자입니다.\n\nReact, TypeScript, Next.js를 주로 사용하며, 사용자 경험을 중시하는 개발을 지향합니다.\n멘티분들과 함께 성장하는 것을 즐기며, 실무에서 바로 적용할 수 있는 실용적인 지식을 전달하고자 합니다."
  );
  const [category, setCategory] = useState("웹 개발");

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingIntroduction, setIsEditingIntroduction] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl">프로필 정보</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("basic")}
            className={`pb-2 transition-colors relative ${
              activeTab === "basic"
                ? "text-[#00C471] font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            기본정보
            {activeTab === "basic" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C471]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("introduction")}
            className={`pb-2 transition-colors relative ${
              activeTab === "introduction"
                ? "text-[#00C471] font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            자기소개
            {activeTab === "introduction" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C471]" />
            )}
          </button>
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          {activeTab === "basic" ? (
            <div className="space-y-8">
              <h3 className="text-xl">기본정보</h3>

              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00C471] to-[#00B366] flex items-center justify-center">
                    <User className="size-16 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 hover:border-[#00C471] transition-colors">
                    <Camera className="size-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Nickname */}
              <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-8 flex-1">
                  <label className="text-gray-600 w-24">닉네임</label>
                  {isEditingNickname ? (
                    <Input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="max-w-md"
                      autoFocus
                    />
                  ) : (
                    <span>{nickname}</span>
                  )}
                </div>
                {isEditingNickname ? (
                  <Button
                    onClick={() => setIsEditingNickname(false)}
                    className="bg-[#00C471] hover:bg-[#00B366]"
                  >
                    저장
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingNickname(true)}
                  >
                    수정
                  </Button>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center py-4 border-b">
                <div className="flex items-center gap-8 flex-1">
                  <label className="text-gray-600 w-24">계정 이메일</label>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">●</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-8 flex-1">
                  <label className="text-gray-600 w-24">연락처</label>
                  {isEditingPhone ? (
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="max-w-md"
                      autoFocus
                    />
                  ) : (
                    <span>{phone}</span>
                  )}
                </div>
                {isEditingPhone ? (
                  <Button
                    onClick={() => setIsEditingPhone(false)}
                    className="bg-[#00C471] hover:bg-[#00B366]"
                  >
                    저장
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingPhone(true)}
                  >
                    수정
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <h3 className="text-xl">자기소개</h3>

              {/* Category */}
              <div className="space-y-3">
                <label className="text-gray-600">카테고리</label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="예: 웹 개발, 데이터 분석 등"
                />
                <p className="text-sm text-gray-500">
                  * 카테고리는 추후 논의 예정입니다.
                </p>
              </div>

              {/* Introduction */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-gray-600">간단한 소개</label>
                  {isEditingIntroduction ? (
                    <Button
                      onClick={() => setIsEditingIntroduction(false)}
                      className="bg-[#00C471] hover:bg-[#00B366]"
                      size="sm"
                    >
                      저장
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditingIntroduction(true)}
                      size="sm"
                    >
                      수정
                    </Button>
                  )}
                </div>
                {isEditingIntroduction ? (
                  <Textarea
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    className="min-h-[300px]"
                    placeholder="자신을 간단히 소개해주세요"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-6 rounded-lg min-h-[300px] whitespace-pre-wrap">
                    {introduction}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-[#00C471] hover:bg-[#00B366]">
                  자기소개 저장
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
