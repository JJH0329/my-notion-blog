import { Clock, ChefHat } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Recipe } from '@/lib/notion';

interface RecipeCardProps {
  recipe: Recipe;
}

const difficultyLabels: Record<string, string> = {
  easy: '초급',
  medium: '중급',
  hard: '고급',
};

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {recipe.image && (
        <div className="h-48 w-full overflow-hidden bg-gray-200">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="line-clamp-2 text-lg">{recipe.title}</CardTitle>
            {recipe.category && (
              <CardDescription className="mt-1">{recipe.category}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recipe.description && (
          <p className="line-clamp-2 text-sm text-gray-600">{recipe.description}</p>
        )}

        <div className="flex flex-wrap gap-2">
          {recipe.difficulty && (
            <Badge className={`${difficultyColors[recipe.difficulty] || 'bg-gray-100'} text-xs`}>
              {difficultyLabels[recipe.difficulty] || recipe.difficulty}
            </Badge>
          )}
          {recipe.category && (
            <Badge variant="secondary" className="text-xs">
              {recipe.category}
            </Badge>
          )}
        </div>

        <div className="flex gap-4 border-t pt-3 text-xs text-gray-500">
          {recipe.cookingTime > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookingTime}분</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              <span>{recipe.servings}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
