import { CourseCard, type Course } from "./CourseCard";
import { Pagination } from "./Pagination";

interface SearchResultsProps {
  courses: Course[];
  searchQuery: string;
  onCourseClick?: (courseId: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function SearchResults({ courses, searchQuery, onCourseClick, currentPage, totalPages, onPageChange }: SearchResultsProps) {
  if (courses.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery && (
                <>
                  "<span className="text-[#00C471]">{searchQuery}</span>"에 대한 검색
                  결과를 찾을 수 없습니다.
                  <br />
                </>
              )}
              다른 키워드로 검색해보세요.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500">추천 키워드:</span>
              {["웹 개발", "Python", "디자인", "마케팅"].map((keyword) => (
                <button
                  key={keyword}
                  className="px-3 py-1.5 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onClick={() => onCourseClick?.(course.id)} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}