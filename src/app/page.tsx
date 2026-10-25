'use client';

import { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RecipeCard } from '@/components/recipe-card';
import { RecipeFilters } from '@/components/recipe-filters';
import type { Recipe } from '@/lib/notion';
import { useEffect } from 'react';
import { getAllRecipes, getCategories } from '@/lib/notion';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  // Notion에서 레시피 데이터 로드
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
        const cats = await getCategories(data);
        setCategories(cats);
      } catch (error) {
        console.error('레시피 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  // 필터링된 레시피 계산
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // 검색어 필터
      if (
        searchQuery &&
        !recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 카테고리 필터
      if (selectedCategory && recipe.category !== selectedCategory) {
        return false;
      }

      // 난이도 필터
      if (selectedDifficulty && recipe.difficulty !== selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [recipes, searchQuery, selectedCategory, selectedDifficulty]);

  // 필터 초기화
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

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

          {/* 필터 & 검색 */}
          <div className="mb-8">
            <RecipeFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              categories={categories}
              onReset={handleReset}
            />
          </div>

          {/* 결과 표시 */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-gray-50 py-12 text-center">
              <p className="text-gray-500">
                {recipes.length === 0
                  ? 'Notion에서 레시피를 불러올 수 없습니다. 환경 설정을 확인해주세요.'
                  : '검색 조건에 맞는 레시피가 없습니다.'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredRecipes.length}
                </span>
                개의 레시피를 찾았습니다
              </div>

              {/* 레시피 그리드 */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
