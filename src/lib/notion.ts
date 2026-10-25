import { Client } from '@notionhq/client';

// Notion 클라이언트 초기화 (서버 사이드만)
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
}) as any;

const databaseId = process.env.NOTION_DATABASE_ID || '';

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

// 샘플 데이터 (Notion 미설정 시)
const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: '크림 파스타',
    slug: 'cream-pasta',
    category: '양식',
    difficulty: 'easy',
    cookingTime: 20,
    servings: '2인분',
    description: '부드러운 크림 소스가 일품인 간단한 파스타',
    status: '게시됨',
    publishedDate: '2026-10-25',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4ee32510b8?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: '된장찌개',
    slug: 'doenjang-jjigae',
    category: '한식',
    difficulty: 'easy',
    cookingTime: 25,
    servings: '3인분',
    description: '깊고 진한 맛의 우리 음식 대표 요리',
    status: '게시됨',
    publishedDate: '2026-10-24',
    image: 'https://images.unsplash.com/photo-1585238341710-4b4e6ceaf302?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: '마라탕',
    slug: 'mala-tang',
    category: '중식',
    difficulty: 'medium',
    cookingTime: 30,
    servings: '4인분',
    description: '얼얼하고 자극적인 중국 요리의 정수',
    status: '게시됨',
    publishedDate: '2026-10-23',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: '오므라이스',
    slug: 'omurice',
    category: '일식',
    difficulty: 'medium',
    cookingTime: 35,
    servings: '1인분',
    description: '계란으로 감싼 맛있는 밥 요리',
    status: '게시됨',
    publishedDate: '2026-10-22',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    title: '짜장면',
    slug: 'jajangmyeon',
    category: '중식',
    difficulty: 'easy',
    cookingTime: 15,
    servings: '1인분',
    description: '국민 음식! 빠르고 쉽게 만드는 짜장면',
    status: '게시됨',
    publishedDate: '2026-10-21',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcde3?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    title: '김밥',
    slug: 'kimbap',
    category: '한식',
    difficulty: 'easy',
    cookingTime: 40,
    servings: '4인분',
    description: '소풍 가는 날, 도시락으로 최고의 한식 요리',
    status: '게시됨',
    publishedDate: '2026-10-20',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
  },
];

// 모든 레시피 조회
export async function getAllRecipes(): Promise<Recipe[]> {
  // Notion API 키가 없으면 샘플 데이터 반환
  if (!databaseId || !process.env.NEXT_PUBLIC_NOTION_API_KEY) {
    console.info('샘플 데이터를 표시 중입니다. Notion 설정을 완료하려면 .env.local을 업데이트하세요.');
    return sampleRecipes;
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
    // 오류 발생 시에도 샘플 데이터 반환
    return sampleRecipes;
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
