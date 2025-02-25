'use client';

import { format } from 'date-fns';
import {
  ArrowLeft,
  ArrowRight,
  ListFilter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface PostDetailProps {
  post?: {
    id: number;
    title: string;
    content: string;
    image: string;
    date: string;
    category: string;
  };
}

const postData = [
  {
    id: 1,
    title: '세미나: React로 멋진 UI 만들기',
    content:
      'React를 활용하여 인터랙티브한 UI를 만드는 방법에 대해 배워봅시다.',
    image: '/1.jpg',
    date: '2024-01-05T10:00:00.000Z',
    category: '세미나',
  },
  {
    id: 2,
    title: '행사: 해커톤 대회 개최',
    content: '팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요!',
    image: '/2.jpg',
    date: '2024-01-10T14:00:00.000Z',
    category: '행사',
  },
  {
    id: 3,
    title: '기타: 커뮤니티 모임',
    content: '개발자들과 만나 네트워킹을 하고 다양한 주제에 대해 이야기해봐요.',
    image: '/3.jpg',
    date: '2024-01-15T18:00:00.000Z',
    category: '기타',
  },
  {
    id: 4,
    title: '세미나: TypeScript 마스터하기',
    content:
      'TypeScript를 활용한 타입 안전성과 코드 품질 향상에 대해 알아봅시다.',
    image: '/4.jpg',
    date: '2024-01-20T09:00:00.000Z',
    category: '세미나',
  },
];

export default function PostDetail() {
  const [post, setPost] = useState<PostDetailProps['post'] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const selectedPost = postData.find(
        (post) => post.id === parseInt(params.id as string),
      );
      setPost(selectedPost);
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (!loading && !post) {
      alert('게시물을 찾을 수 없습니다.');
      router.push('/activities');
    }
  }, [loading, post, router]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return null;
  }

  const handleModify = () => {
    router.push(`/activities/edit/${post.id}`);
  };


  const handleNext = () => {
    const currentIndex = postData.findIndex((p) => p.id === post.id);
    const nextPost = postData[currentIndex + 1] || postData[0]; // 다음 게시물이 없으면 첫 번째 게시물로
    router.push(`/activities/${nextPost.id}`);
  };

  const handlePrevious = () => {
    const currentIndex = postData.findIndex((p) => p.id === post.id);
    const prevPost =
      postData[currentIndex - 1] || postData[postData.length - 1]; // 이전 게시물이 없으면 마지막 게시물로
    router.push(`/activities/${prevPost.id}`);
  };

  const handleList = () => {
    router.push(`/activities`);
  };

  return (
    <div className="container mx-auto mt-[70px] max-w-4xl p-4">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="space-y-6">
            <h1 className="text-center text-3xl font-bold">{post.title}</h1>
            <div className="flex items-center justify-between border-b pb-4 text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>작성일: {format(new Date(post.date), 'yyyy.MM.dd')}</span>
                <span>분류: {post.category}</span>
              </div>
              {/* <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <Eye className="h-4 w-4" />
                  <span>{post.views}</span>
                </div>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-600'}`}
                >
                  <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
                  <span>{likes}</span>
                </button>
              </div> */}
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={post.image || '/placeholder.svg'}
                alt=""
                width={500}
                height={500}
                className="h-full w-full rounded-lg object-contain"
                priority
              />
            </div>

            <div className="min-h-[150px] whitespace-pre-line">
              {post.content}
            </div>

            {/* <div className="border-t pt-6">
              <h2 className="text-xl font-semibold">댓글</h2>
              <div className="mt-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{comment.author}</span>
                      <span>
                        {format(new Date(comment.date), 'yyyy.MM.dd HH:mm')}
                      </span>
                    </div>
                    <p className="mt-2">{comment.content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium">댓글 작성</h3>
                <Textarea
                  placeholder="댓글을 입력하세요."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mt-2"
                />
                <Button className="mt-4" onClick={handleAddComment}>
                  댓글 등록
                </Button>
              </div>
            </div> */}

            <div className="flex items-center justify-center">
              <div className="flex gap-5">
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  이전
                </Button>
                <Button variant="outline" onClick={handleList}>
                  <ListFilter className="mr-1 h-4 w-4" />
                  목록
                </Button>
                <Button variant="outline" onClick={handleNext}>
                  다음
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
