'use client';

import { useState } from 'react';
import { Upload, X, Bold, Italic, List, ImageIcon, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { marked } from 'marked';

interface PostFormData {
  title: string;
  category: string;
  content: string;
  image?: File;
}

export default function CreatePost() {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    category: '',
    content: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isDraft, setIsDraft] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, image: undefined }));
    setImagePreview('');
  };

  const handleTextFormat = (format: string) => {
    const textarea = document.getElementById(
      'post-content',
    ) as HTMLTextAreaElement;
    const { selectionStart, selectionEnd, value } = textarea;

    if (selectionStart !== selectionEnd) {
      const selectedText = value.slice(selectionStart, selectionEnd);
      let formattedText = '';

      // 포맷 옵션에 따른 변환
      if (format === 'bold') {
        formattedText = `**${selectedText}**`; // Markdown 형식 예: **굵게**
      } else if (format === 'italic') {
        formattedText = `*${selectedText}*`; // Markdown 형식 예: *기울임*
      } else if (format === 'list') {
        formattedText = `- ${selectedText.replace(/\n/g, '\n- ')}`; // 목록
      }

      // 새로운 텍스트로 업데이트
      const newText =
        value.slice(0, selectionStart) +
        formattedText +
        value.slice(selectionEnd);

      // 상태 업데이트 및 커서 위치 재설정
      setFormData((prev) => ({ ...prev, content: newText }));
      setTimeout(() => {
        textarea.setSelectionRange(
          selectionStart,
          selectionStart + formattedText.length,
        );
      }, 0);
    }
  };

  const handleSubmit = async (draft: boolean) => {
    setIsDraft(draft);
    console.log('Submit form:', { ...formData, isDraft: draft });
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card>
        <CardContent className="space-y-6 p-6">
          {/* 게시물 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">게시물 제목</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="제목을 입력하세요"
            />
          </div>

          {/* 이미지 */}
          <div className="space-y-2">
            <Label>게시물 이미지</Label>
            <div className="flex items-start gap-4">
              <div className="relative aspect-video flex-1 overflow-hidden rounded-lg bg-gray-100">
                {imagePreview ? (
                  <img
                    src={imagePreview || '/placeholder.svg'}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="relative">
                  <input
                    type="file"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <Upload className="mr-2 h-4 w-4" />
                  업로드
                </Button>
                {imagePreview && (
                  <Button variant="outline" onClick={handleImageRemove}>
                    <X className="mr-2 h-4 w-4" />
                    삭제
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* 유형 선택 */}
          <div className="space-y-2">
            <Label>게시물 유형</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="유형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="세미나">세미나</SelectItem>
                <SelectItem value="행사">행사</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 내용 입력 */}
          <div className="space-y-2">
            <Label>게시물 내용</Label>
            <div className="rounded-lg border">
              <div className="flex gap-2 border-b p-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTextFormat('bold')}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>굵게</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTextFormat('italic')}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>기울임</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTextFormat('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>목록</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="post-content"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="내용을 입력하세요"
                className="min-h-[300px] rounded-none border-0 focus-visible:ring-0"
              />
              {/* 미리보기 */}
              <Label>미리보기</Label>
              <div
                className="rounded-lg border bg-gray-100 p-4"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(formData.content),
                }}
              />
            </div>
          </div>

          {/* 미리보기 */}
          {/* <div className="space-y-2">
            <Label>미리보기</Label>
            <div
              className="border rounded-lg p-4 bg-gray-100"
              dangerouslySetInnerHTML={{ __html: marked.parse(formData.content) }}
            />
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-6">
          <Button variant="outline" onClick={() => handleSubmit(true)}>
            <Save className="mr-2 h-4 w-4" />
            임시저장
          </Button>
          <Button onClick={() => handleSubmit(false)}>업로드</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
