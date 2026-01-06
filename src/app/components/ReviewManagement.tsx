import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Star, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface PendingReview {
  id: string;
  classTitle: string;
  optionName: string;
  mentorNickname: string;
  reservationDate: string;
}

interface WrittenReview {
  id: string;
  classTitle: string;
  optionName: string;
  menteeNickname: string;
  reservationDate: string;
  rating: number;
  content: string;
}

// Mock data for pending reviews
const mockPendingReviews: PendingReview[] = [
  {
    id: "1",
    classTitle: "React 완벽 가이드",
    optionName: "1:1 멘토링 60분",
    mentorNickname: "리액트마스터",
    reservationDate: "2026-01-10 14:00",
  },
  {
    id: "2",
    classTitle: "TypeScript 마스터클래스",
    optionName: "그룹 세션 120분",
    mentorNickname: "TS전문가",
    reservationDate: "2026-01-08 16:00",
  },
  {
    id: "3",
    classTitle: "Next.js 실전 프로젝트",
    optionName: "프로젝트 리뷰 45분",
    mentorNickname: "넥스트프로",
    reservationDate: "2026-01-05 15:30",
  },
];

// Mock data for written reviews
const mockWrittenReviews: WrittenReview[] = [
  {
    id: "1",
    classTitle: "알고리즘 코딩테스트",
    optionName: "1:1 멘토링 90분",
    menteeNickname: "코딩초보",
    reservationDate: "2025-12-20 19:00",
    rating: 5,
    content: "정말 유익한 시간이었습니다. 알고리즘 문제 접근법을 배울 수 있었어요!",
  },
  {
    id: "2",
    classTitle: "웹 디자인 기초",
    optionName: "그룹 세션 90분",
    menteeNickname: "디자인러버",
    reservationDate: "2025-12-15 11:00",
    rating: 4.5,
    content: "기초부터 탄탄하게 배울 수 있었습니다. 조금 더 실습이 많았으면 좋았을 것 같아요.",
  },
  {
    id: "3",
    classTitle: "Python 데이터 분석",
    optionName: "1:1 멘토링 120분",
    menteeNickname: "데이터분석가",
    reservationDate: "2025-12-10 13:00",
    rating: 3.5,
    content: "실무 예제가 많아서 이해하기 쉬웠습니다. 강력 추천합니다!",
  },
  {
    id: "4",
    classTitle: "React 완벽 가이드",
    optionName: "1:1 멘토링 60분",
    menteeNickname: "프론트개발자",
    reservationDate: "2025-12-05 10:00",
    rating: 4,
    content: "멘토님이 정말 친절하게 설명해주셨어요. React의 핵심 개념을 확실히 이해했습니다.",
  },
];

export function ReviewManagement() {
  const [activeTab, setActiveTab] = useState<"pending" | "written">("pending");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<PendingReview | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");

  const handleOpenReviewModal = (review: PendingReview) => {
    setSelectedReview(review);
    setRating(0);
    setHoverRating(0);
    setReviewContent("");
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }
    if (reviewContent.trim() === "") {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    
    // TODO: API 호출하여 리뷰 저장
    console.log("리뷰 제출:", {
      reviewId: selectedReview?.id,
      rating,
      content: reviewContent,
    });
    
    alert("리뷰가 성공적으로 작성되었습니다!");
    setIsReviewModalOpen(false);
  };

  const renderStarRating = (currentRating: number) => {
    const fullStars = Math.floor(currentRating);
    const hasHalfStar = currentRating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= fullStars) {
            // Full star
            return (
              <Star
                key={star}
                className="size-4 fill-yellow-400 text-yellow-400"
              />
            );
          } else if (star === fullStars + 1 && hasHalfStar) {
            // Half star
            return (
              <div key={star} className="relative size-4">
                <Star className="size-4 text-gray-300" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            );
          } else {
            // Empty star
            return <Star key={star} className="size-4 text-gray-300" />;
          }
        })}
        <span className="ml-1 text-sm text-gray-600">({currentRating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl mb-6">리뷰 및 평점</h2>

      <Card>
        <CardHeader>
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === "pending"
                  ? "text-[#00C471]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              작성가능한 리뷰
              {activeTab === "pending" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C471]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("written")}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === "written"
                  ? "text-[#00C471]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              작성한 리뷰
              {activeTab === "written" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C471]" />
              )}
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {activeTab === "pending" ? (
            <div>
              <div className="mb-4 text-sm text-gray-600">
                총{" "}
                <span className="font-medium text-[#00C471]">
                  {mockPendingReviews.length}
                </span>
                건의 작성 가능한 리뷰
              </div>
              <div className="border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-20 text-center">순번</TableHead>
                      <TableHead>클래스 제목</TableHead>
                      <TableHead>옵션명</TableHead>
                      <TableHead>멘토 닉네임</TableHead>
                      <TableHead>예약일자</TableHead>
                      <TableHead className="w-32 text-center">액션</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPendingReviews.length > 0 ? (
                      mockPendingReviews.map((review, index) => (
                        <TableRow key={review.id} className="hover:bg-gray-50">
                          <TableCell className="text-center font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {review.classTitle}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {review.optionName}
                          </TableCell>
                          <TableCell>{review.mentorNickname}</TableCell>
                          <TableCell className="text-gray-600">
                            {review.reservationDate}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button 
                              size="sm" 
                              className="bg-[#00C471] hover:bg-[#00B366]"
                              onClick={() => handleOpenReviewModal(review)}
                            >
                              <Pencil className="size-4 mr-1" />
                              리뷰 작성
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-32 text-center text-gray-400"
                        >
                          작성 가능한 리뷰가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4 text-sm text-gray-600">
                총{" "}
                <span className="font-medium text-[#00C471]">
                  {mockWrittenReviews.length}
                </span>
                건의 작성한 리뷰
              </div>
              <div className="border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-20 text-center">순번</TableHead>
                      <TableHead>클래스 제목</TableHead>
                      <TableHead>옵션명</TableHead>
                      <TableHead>멘티 닉네임</TableHead>
                      <TableHead>예약일자</TableHead>
                      <TableHead className="w-40">별점</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWrittenReviews.length > 0 ? (
                      mockWrittenReviews.map((review, index) => (
                        <TableRow key={review.id} className="hover:bg-gray-50">
                          <TableCell className="text-center font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {review.classTitle}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {review.optionName}
                          </TableCell>
                          <TableCell>{review.menteeNickname}</TableCell>
                          <TableCell className="text-gray-600">
                            {review.reservationDate}
                          </TableCell>
                          <TableCell>{renderStarRating(review.rating)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-32 text-center text-gray-400"
                        >
                          작성한 리뷰가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 리뷰 작성 모달 */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">리뷰 작성</DialogTitle>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-6">
              {/* 클래스 정보 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{selectedReview.classTitle}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>옵션: {selectedReview.optionName}</p>
                  <p>멘토: {selectedReview.mentorNickname}</p>
                  <p>수강일: {selectedReview.reservationDate}</p>
                </div>
              </div>

              {/* 별점 선택 */}
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">별점 선택</span>
                  {rating > 0 && (
                    <span className="text-sm text-gray-600">({rating.toFixed(1)}점)</span>
                  )}
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const fullStars = Math.floor(hoverRating || rating);
                    const hasHalfStar = (hoverRating || rating) % 1 !== 0;
                    const currentRating = hoverRating || rating;

                    return (
                      <div key={star} className="relative">
                        {/* 별 하나를 두 개의 버튼으로 분할 (왼쪽 절반, 오른쪽 절반) */}
                        <div className="flex">
                          {/* 왼쪽 절반 - 0.5점 */}
                          <button
                            type="button"
                            className="relative w-4 h-8 transition-transform hover:scale-110"
                            onMouseEnter={() => setHoverRating(star - 0.5)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star - 0.5)}
                          >
                            <div className="absolute inset-0 flex items-center">
                              <div className="relative size-8">
                                {/* 배경 (빈 별) */}
                                <Star className="size-8 fill-gray-200 text-gray-300 absolute" />
                                {/* 왼쪽 절반만 채워진 별 */}
                                {(star - 0.5 <= currentRating) && (
                                  <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                                    <Star className="size-8 fill-yellow-400 text-yellow-400" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                          {/* 오른쪽 절반 - 1.0점 */}
                          <button
                            type="button"
                            className="relative w-4 h-8 transition-transform hover:scale-110"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                          >
                            <div className="absolute inset-0 flex items-center" style={{ left: '-16px' }}>
                              <div className="relative size-8">
                                {/* 배경 (빈 별) */}
                                <Star className="size-8 fill-gray-200 text-gray-300 absolute" />
                                {/* 전체 별 */}
                                {star <= currentRating && (
                                  <Star className="size-8 fill-yellow-400 text-yellow-400 absolute" />
                                )}
                                {/* 오른쪽 절반만 채워진 별 (왼쪽 절반이 이미 채워진 경우) */}
                                {star > currentRating && star - 0.5 === currentRating && (
                                  <div className="absolute inset-0 overflow-hidden" style={{ width: "50%", left: "50%" }}>
                                    <Star className="size-8 fill-yellow-400 text-yellow-400" style={{ marginLeft: "-50%" }} />
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 리뷰 내용 */}
              <div className="space-y-3">
                <label className="font-medium block">
                  리뷰 내용
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Textarea
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="멘토링에 대한 솔직한 후기를 남겨주세요. 구체적인 내용일수록 다른 수강생들에게 도움이 됩니다."
                  className="min-h-[150px] resize-none"
                />
                <div className="text-sm text-gray-500 text-right">
                  {reviewContent.length} / 1000자
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsReviewModalOpen(false)}
                >
                  취소
                </Button>
                <Button
                  className="bg-[#00C471] hover:bg-[#00B366]"
                  onClick={handleSubmitReview}
                >
                  리뷰 제출
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}