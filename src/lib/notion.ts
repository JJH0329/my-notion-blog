import { Client } from '@notionhq/client';

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
}) as any;

const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID || '';

// 레시피 타입 정의
export interface Recipe {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | '';
  cookingTime: number;
  servings: string;
  description: string;
  status: string;
  publishedDate: string;
  image?: string;
}

// Notion 페이지를 레시피 객체로 변환
function pageToRecipe(page: any): Recipe {
  const props = page.properties;

  return {
    id: page.id,
    title: props.Title?.title?.[0]?.plain_text || '제목 없음',
    slug: props.Slug?.rich_text?.[0]?.plain_text || '',
    category: props.Category?.select?.name || '',
    difficulty: (props.Difficulty?.select?.name?.toLowerCase() || '') as 'easy' | 'medium' | 'hard' | '',
    cookingTime: props.CookingTime?.number || 0,
    servings: props.Servings?.rich_text?.[0]?.plain_text || '',
    description: props.Description?.rich_text?.[0]?.plain_text || '',
    status: props.Status?.select?.name || '',
    publishedDate: props.PublishedDate?.date?.start || '',
    image: props.Image?.files?.[0]?.file?.url || '',
  };
}

// 모든 레시피 조회
export async function getAllRecipes(): Promise<Recipe[]> {
  if (!databaseId) {
    console.warn('Notion Database ID가 설정되지 않았습니다');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              equals: '게시됨',
            },
          },
        ],
      },
      sorts: [
        {
          property: 'PublishedDate',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page: any) => pageToRecipe(page));
  } catch (error) {
    console.error('Notion 데이터 조회 실패:', error);
    return [];
  }
}

// 특정 슬러그로 레시피 조회
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  if (!databaseId) return null;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) return null;
    return pageToRecipe(response.results[0]);
  } catch (error) {
    console.error('레시피 조회 실패:', error);
    return null;
  }
}

// 카테고리 목록 조회
export async function getCategories(recipes: Recipe[]): Promise<string[]> {
  const categories = new Set(recipes.map((r) => r.category).filter(Boolean));
  return Array.from(categories).sort();
}

// 난이도 목록 조회
export async function getDifficulties(): Promise<{ label: string; value: string }[]> {
  return [
    { label: '초급', value: 'easy' },
    { label: '중급', value: 'medium' },
    { label: '고급', value: 'hard' },
  ];
}
