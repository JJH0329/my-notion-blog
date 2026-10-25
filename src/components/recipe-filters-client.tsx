'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RecipeCard } from '@/components/recipe-card';
import type { Recipe } from '@/lib/notion';

interface RecipeFiltersClientProps {
  recipes: Recipe[];
  categories: string[];
}

export function RecipeFiltersClient({
  recipes,
  categories,
}: RecipeFiltersClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // 필터링된 레시피 계산
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      if (
        searchQuery &&
        !recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (
        selectedCategory !== 'all' &&
        recipe.category !== selectedCategory
      ) {
        return false;
      }

      if (
        selectedDifficulty !== 'all' &&
        recipe.difficulty !== selectedDifficulty
      ) {
        return false;
      }

      return true;
    });
  }, [recipes, searchQuery, selectedCategory, selectedDifficulty]);

  const hasFilters = searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all';

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  };

  return (
    <div className="space-y-8">
      {/* 필터 섹션 */}
      <div className="space-y-4 rounded-lg border bg-gray-50 p-6">
        <h2 className="font-semibold">필터 및 검색</h2>

        {/* 검색 */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="레시피 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 필터 */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedDifficulty}
            onValueChange={setSelectedDifficulty}
          >
            <SelectTrigger>
              <SelectValue placeholder="난이도" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="easy">초급</SelectItem>
              <SelectItem value="medium">중급</SelectItem>
              <SelectItem value="hard">고급</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 초기화 버튼 */}
        {hasFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="w-full"
          >
            <X className="mr-2 h-4 w-4" />
            필터 초기화
          </Button>
        )}
      </div>

      {/* 결과 표시 */}
      {filteredRecipes.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-gray-50 py-12 text-center">
          <p className="text-gray-500">
            {recipes.length === 0
              ? 'Notion에서 레시피를 불러올 수 없습니다. 환경 설정을 확인해주세요.'
              : '검색 조건에 맞는 레시피가 없습니다.'}
          </p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600">
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
    </div>
  );
}
