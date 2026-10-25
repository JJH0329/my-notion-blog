'use client';

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

interface RecipeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (value: string) => void;
  categories: string[];
  onReset: () => void;
}

export function RecipeFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  categories,
  onReset,
}: RecipeFiltersProps) {
  const hasFilters = searchQuery || selectedCategory || selectedDifficulty;

  return (
    <div className="space-y-4 rounded-lg border bg-gray-50 p-6">
      <h2 className="font-semibold">필터 및 검색</h2>

      {/* 검색 */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="레시피 검색..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* 필터 */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* 카테고리 */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 난이도 */}
        <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger>
            <SelectValue placeholder="난이도" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
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
          onClick={onReset}
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          필터 초기화
        </Button>
      )}
    </div>
  );
}
