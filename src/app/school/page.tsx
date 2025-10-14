import { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import CalendarWidget from "@/components/calendar/CalendarWidget";
import { sanityFetch } from '@/lib/sanity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'スクール - Cafe Kinesi',
  description: 'カフェキネシのスクール情報',
};

// 講座の型定義
interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  courseId: string;
  order: number;
  courseType: 'main' | 'auxiliary';
  price?: {
    amount?: number;
    unit?: string;
    note?: string;
  };
  duration?: {
    hours?: number;
    sessions?: number;
    note?: string;
  };
  childCourses?: Course[];
}

// 講座データを取得するGROQクエリ
const coursesQuery = `
  *[_type == "course" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    courseId,
    order,
    courseType,
    price,
    duration,
    "childCourses": *[_type == "course" && parentCourse._ref == ^._id && isActive == true] | order(order asc) {
      _id,
      title,
      subtitle,
      description,
      courseId,
      order,
      courseType,
      price,
      duration
    }
  }
`;

export default async function SchoolPage() {
  // Sanityから講座データを取得
  const allCourses = await sanityFetch<Course[]>({
    query: coursesQuery,
  });

  // 主要講座のみをフィルタリング（補助講座は childCourses に含まれる）
  const mainCourses = allCourses.filter(course => course.courseType === 'main');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-noto-serif text-3xl md:text-4xl font-medium text-center mb-8">
            スクール
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-6">
                  Cafe Kinesiでは、心と体の健康をサポートする様々な講座を開催しています。
                  初心者から上級者まで、レベルに合わせた講座をご用意しております。
                </p>

                <h2 className="text-2xl font-semibold mb-6">開催中の講座</h2>

                <div className="space-y-8">
                  {mainCourses.map((course) => (
                    <div key={course._id}>
                      {/* 主要講座カード */}
                      <div className="border-2 border-[#8B5A3C] rounded-lg p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-orange-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#8B5A3C] text-white rounded-full">
                                主要講座
                              </span>
                              <span className="text-sm text-gray-500">No.{course.order}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#8B5A3C] mb-1">
                              {course.title}
                            </h3>
                            <p className="text-lg text-gray-600 font-medium mb-3">
                              {course.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          {course.duration?.note && (
                            <span className="flex items-center gap-1">
                              ⏱️ {course.duration.note}
                            </span>
                          )}
                          {course.price?.amount && (
                            <span className="flex items-center gap-1">
                              💰 ¥{course.price.amount.toLocaleString()}
                              {course.price.note && ` (${course.price.note})`}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/school/${course.courseId}`}
                          className="inline-block px-6 py-2 bg-[#8B5A3C] text-white rounded-lg hover:bg-[#6d4730] transition-colors font-medium"
                        >
                          詳細を見る →
                        </Link>
                      </div>

                      {/* 補助講座（子講座）があれば表示 */}
                      {course.childCourses && course.childCourses.length > 0 && (
                        <div className="ml-8 mt-4 space-y-4">
                          {course.childCourses.map((childCourse) => (
                            <div
                              key={childCourse._id}
                              className="border border-gray-300 rounded-lg p-5 hover:shadow-lg transition-shadow bg-white relative before:content-['└'] before:absolute before:-left-6 before:top-6 before:text-gray-400 before:text-xl"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-500 text-white rounded-full">
                                      補助講座
                                    </span>
                                    <span className="text-xs text-gray-500">No.{childCourse.order}</span>
                                  </div>
                                  <h4 className="text-xl font-bold text-gray-800 mb-1">
                                    {childCourse.title}
                                  </h4>
                                  <p className="text-md text-gray-600 font-medium mb-2">
                                    {childCourse.subtitle}
                                  </p>
                                </div>
                              </div>

                              <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                                {childCourse.description}
                              </p>

                              <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-3">
                                {childCourse.duration?.note && (
                                  <span>⏱️ {childCourse.duration.note}</span>
                                )}
                                {childCourse.price?.amount && (
                                  <span>
                                    💰 ¥{childCourse.price.amount.toLocaleString()}
                                    {childCourse.price.note && ` (${childCourse.price.note})`}
                                  </span>
                                )}
                              </div>

                              <Link
                                href={`/school/${childCourse.courseId}`}
                                className="inline-block px-4 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors font-medium"
                              >
                                詳細を見る →
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <CalendarWidget className="mb-6" />

              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">お知らせ</h3>
                <ul className="space-y-2 text-sm">
                  <li className="border-b pb-2">
                    <span className="text-gray-500">2025.10.01</span>
                    <p className="text-gray-700">新講座開講のお知らせ</p>
                  </li>
                  <li className="border-b pb-2">
                    <span className="text-gray-500">2025.09.15</span>
                    <p className="text-gray-700">講師紹介ページを更新しました</p>
                  </li>
                </ul>
              </div>

              <div className="bg-[#8B5A3C] text-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">お問い合わせ</h3>
                <p className="text-sm mb-4">講座に関するご質問はお気軽にお問い合わせください。</p>
                <button className="w-full bg-white text-[#8B5A3C] py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                  お問い合わせ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}