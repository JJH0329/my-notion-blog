import { Container } from '@/components/layout/container';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RecipeCard } from '@/components/recipe-card';
import { RecipeFiltersClient } from '@/components/recipe-filters-client';
import type { Recipe } from '@/lib/notion';
import { getAllRecipes, getCategories } from '@/lib/notion';

export const revalidate = 3600; // 1시간 캐시

export default async function Home() {
  // 서버에서 데이터 페칭
  const recipes = await getAllRecipes();
  const categories = await getCategories(recipes);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-white py-12">
        <Container>
          {/* 페이지 제목 */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900">🍳 레시피 모음</h1>
            <p className="mt-3 text-gray-600">
              다양한 레시피를 찾아보고 요리를 시작하세요
            </p>
          </div>

          {/* 필터 & 검색 (클라이언트 컴포넌트) */}
          <RecipeFiltersClient recipes={recipes} categories={categories} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
