import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Bold, Italic, Underline, Quote, ListOrdered, List, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBlur?: (value: string) => void;
  uploadMedia: (file: File) => Promise<{ fileUrl: string }>;
}

export const RichTextEditor = ({ value, onChange, error, onBlur, uploadMedia }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Write your article content here...' }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none w-full p-4 min-h-[200px] outline-none text-admin-base text-admin-netral-90 resize-y bg-white focus:outline-none',
      },
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  const handleBlur = () => {
    if (editor && onBlur) {
      onBlur(editor.getHTML());
    }
  };

  if (!editor) return null;

  const insertImage = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are supported.');
      setTimeout(() => setUploadError(null), 3000);
      return;
    }
    setUploadError(null);
    setIsUploading(true);
    try {
      const result = await uploadMedia(file);
      insertImage(result.fileUrl);
    } catch (err) {
      console.error('Image upload failed:', err);
      setUploadError('Image upload failed. Please try again.');
      setTimeout(() => setUploadError(null), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = '';
  };

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [editor]);

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div
      className={`border rounded-lg flex flex-col transition-colors overflow-hidden relative ${
        error ? 'border-admin-error-100' : 'border-admin-netral-20 focus-within:border-admin-primary-100'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="border-b border-admin-netral-20 p-2 flex items-center justify-center gap-6 bg-white flex-wrap">
        <div className="flex gap-3 text-xs font-admin-semibold">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-admin-netral-20 text-admin-primary-100' : ''}`}
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-admin-netral-20 text-admin-primary-100' : ''}`}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-admin-netral-20 text-admin-primary-100' : ''}`}
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={`px-2 py-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('heading', { level: 4 }) ? 'bg-admin-netral-20 text-admin-primary-100' : ''}`}
          >
            H4
          </button>
        </div>
        <div className="w-px h-4 bg-admin-netral-30"></div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('bold') ? 'bg-admin-netral-20 text-admin-primary-100' : 'text-admin-netral-60'}`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('italic') ? 'bg-admin-netral-20 text-admin-primary-100' : 'text-admin-netral-60'}`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('strike') ? 'bg-admin-netral-20 text-admin-primary-100' : 'text-admin-netral-60'}`}
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>
        <div className="w-px h-4 bg-admin-netral-30"></div>
        <div className="flex gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => !isUploading && fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-1 rounded hover:bg-admin-netral-20 transition-colors text-admin-netral-60 disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ImageIcon className="w-4 h-4" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('blockquote') ? 'bg-admin-netral-20 text-admin-primary-100' : 'text-admin-netral-60'}`}
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('orderedList') ? 'bg-admin-netral-20 text-admin-primary-100' : 'text-admin-netral-60'}`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('bulletList') ? 'bg-admin-netral-20 text-admin-primary-100' : 'text-admin-netral-60'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={addLink}
            className={`p-1 rounded hover:bg-admin-netral-20 transition-colors ${editor.isActive('link') ? 'bg-admin-netral-20 text-admin-primary-100' : 'text-admin-netral-60'}`}
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="absolute bottom-2 left-4 right-4 bg-admin-error-100 text-white text-xs px-3 py-2 rounded-md z-10">
          {uploadError}
        </div>
      )}

      {isDragging && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-admin-primary-100/10 border-2 border-dashed border-admin-primary-100 rounded-lg pointer-events-none">
          <ImageIcon className="w-8 h-8 text-admin-primary-100 mb-2" />
          <span className="text-admin-base font-admin-semibold text-admin-primary-100">Drop image here</span>
        </div>
      )}

      <EditorContent
        editor={editor}
        onBlur={handleBlur}
        className={`relative ${error ? 'bg-admin-error-10/5' : ''}`}
      />
    </div>
  );
};
