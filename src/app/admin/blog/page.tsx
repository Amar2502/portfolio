"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import {
  Bold, Italic, List, ListOrdered, Heading1, Heading2,
  Code, Quote, Link as LinkIcon, Image as ImageIcon,
  Undo, Redo, Save, Trash2, Eye, Layout, LayoutList,
  Calendar, Clock, Hash, Loader2, X, Upload, Link2,
} from 'lucide-react';
import Auth from './auth';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageAdd: (url: string, width?: string, height?: string) => void;
}

const ImageModal = ({ isOpen, onClose, onImageAdd }: ImageModalProps) => {
  const [tab, setTab] = useState<'url' | 'upload'>('url');
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    if (url) {
      onImageAdd(url, width, height);
      onClose();
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      setUploadedImageUrl(data.url);
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };

  const handleConfirmUpload = () => {
    if (uploadedImageUrl) {
      onImageAdd(uploadedImageUrl, width, height);
      onClose();
    }
  };

  const resetState = () => {
    setUrl('');
    setWidth('');
    setHeight('');
    setUploadedImageUrl('');
    setIsUploading(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Add Image</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex space-x-2 sm:space-x-4 mb-4">
            <button
              onClick={() => {
                setTab('url');
                resetState();
              }}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-sm sm:text-base ${
                tab === 'url'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Link2 className="w-4 h-4 inline-block mr-1 sm:mr-2" />
              URL
            </button>
            <button
              onClick={() => {
                setTab('upload');
                resetState();
              }}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-sm sm:text-base ${
                tab === 'upload'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Upload className="w-4 h-4 inline-block mr-1 sm:mr-2" />
              Upload
            </button>
          </div>

          <div className="space-y-4">
            {tab === 'url' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
                {!uploadedImageUrl ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-6 sm:py-8 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="w-5 sm:w-6 h-5 sm:h-6 mx-auto animate-spin text-blue-500" />
                    ) : (
                      <>
                        <Upload className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Click to upload an image
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="relative w-full aspect-video mb-4">
                    <img
                      src={uploadedImageUrl}
                      alt="Uploaded preview"
                      className="w-full h-full object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Width
                </label>
                <input
                  type="text"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="e.g., 500px or 100%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Height
                </label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="e.g., 300px"
                />
              </div>
            </div>

            {(tab === 'url' || uploadedImageUrl) && (
              <button
                onClick={tab === 'url' ? handleUrlSubmit : handleConfirmUpload}
                className="w-full py-2 px-4 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Add Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Resizable Image Extension
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: attributes => {
          if (!attributes.width) return {};
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        renderHTML: attributes => {
          if (!attributes.height) return {};
          return { height: attributes.height };
        },
      },
      alignment: {
        default: 'center',
        renderHTML: attributes => {
          const align = attributes.alignment || 'center';
          return { 'data-align': align };
        },
      },
      float: {
        default: 'none',
        renderHTML: attributes => {
          const float = attributes.float || 'none';
          return { style: `float: ${float}; margin: ${float === 'left' ? '0 1em 1em 0' : float === 'right' ? '0 0 1em 1em' : '0'}` };
        },
      },
      style: {
        default: null,
        renderHTML: attributes => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div');
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      container.className = 'image-resizer-container';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.className = this.options.HTMLAttributes.class;
      if (node.attrs.width) img.style.width = node.attrs.width;
      if (node.attrs.height) img.style.height = node.attrs.height;
      if (node.attrs.float !== 'none') {
        img.style.float = node.attrs.float;
        img.style.margin = node.attrs.float === 'left' ? '0 1em 1em 0' : '0 0 1em 1em';
      }

      const controls = document.createElement('div');
      controls.className = 'image-controls';
      controls.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: none;
        gap: 4px;
        padding: 4px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 4px 4px 0 0;
      `;

      // Alignment controls
      const alignLeft = document.createElement('button');
      alignLeft.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 6H3M15 12H3M17 18H3"/></svg>';
      alignLeft.className = 'control-button';
      alignLeft.style.cssText = 'padding: 2px; background: none; border: none; color: white; cursor: pointer;';
      alignLeft.onclick = (e) => {
        e.preventDefault();
        if (!getPos || typeof getPos !== 'function') return;
        editor.commands.updateAttributes('image', { float: 'left' });
      };

      const alignCenter = document.createElement('button');
      alignCenter.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6H6M21 12H3M18 18H6"/></svg>';
      alignCenter.className = 'control-button';
      alignCenter.style.cssText = 'padding: 2px; background: none; border: none; color: white; cursor: pointer;';
      alignCenter.onclick = (e) => {
        e.preventDefault();
        if (!getPos || typeof getPos !== 'function') return;
        editor.commands.updateAttributes('image', { float: 'none' });
      };

      const alignRight = document.createElement('button');
      alignRight.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6H21M3 12H15M3 18H17"/></svg>';
      alignRight.className = 'control-button';
      alignRight.style.cssText = 'padding: 2px; background: none; border: none; color: white; cursor: pointer;';
      alignRight.onclick = (e) => {
        e.preventDefault();
        if (!getPos || typeof getPos !== 'function') return;
        editor.commands.updateAttributes('image', { float: 'right' });
      };

      controls.appendChild(alignLeft);
      controls.appendChild(alignCenter);
      controls.appendChild(alignRight);

      const resizeHandle = document.createElement('div');
      resizeHandle.className = 'resize-handle';
      resizeHandle.style.cssText = `
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        background-color: #0000ff;
        cursor: se-resize;
        border-radius: 2px;
        display: none;
      `;

      container.appendChild(img);
      container.appendChild(controls);
      container.appendChild(resizeHandle);

      let startX: number, startY: number, startWidth: number, startHeight: number;

      const startResize = (e: MouseEvent) => {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        startWidth = img.offsetWidth;
        startHeight = img.offsetHeight;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
      };

      const resize = (e: MouseEvent) => {
        if (!getPos || typeof getPos !== 'function') return;
        
        const newWidth = startWidth + (e.clientX - startX);
        const newHeight = startHeight + (e.clientY - startY);
        
        const widthInPx = `${newWidth}px`;
        const heightInPx = `${newHeight}px`;
        
        img.style.width = widthInPx;
        img.style.height = heightInPx;
        
        editor.commands.updateAttributes('image', {
          width: widthInPx,
          height: heightInPx,
          style: `width: ${widthInPx}; height: ${heightInPx};`
        });
      };

      const stopResize = () => {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
      };

      resizeHandle.addEventListener('mousedown', startResize);

      // Show/hide controls and resize handle on hover
      container.addEventListener('mouseenter', () => {
        controls.style.display = 'flex';
        resizeHandle.style.display = 'block';
      });
      container.addEventListener('mouseleave', () => {
        controls.style.display = 'none';
        resizeHandle.style.display = 'none';
      });

      return {
        dom: container,
        destroy: () => {
          resizeHandle.removeEventListener('mousedown', startResize);
          document.removeEventListener('mousemove', resize);
          document.removeEventListener('mouseup', stopResize);
        },
      };
    };
  },
});

const MenuBar = ({ editor, onPreview, previewMode }: { 
  editor: any; 
  onPreview: () => void;
  previewMode: 'none' | 'side' | 'full';
}) => {
  if (!editor) return null;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const handleImageAdd = (url: string, width?: string, height?: string) => {
    const style = [
      width ? `width: ${width}` : '',
      height ? `height: ${height}` : ''
    ].filter(Boolean).join('; ');

    editor.chain().focus().setImage({ 
      src: url,
      HTMLAttributes: {
        style
      },
      float: 'none',
      alignment: 'center'
    }).run();
  };

  return (
    <>
      <div className="flex flex-wrap gap-0.5 sm:gap-1 p-1 sm:p-2 overflow-x-auto">
        <div className="flex gap-0.5 sm:gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-0.5 sm:mx-1" />

        <div className="flex gap-0.5 sm:gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Heading 1"
          >
            <Heading1 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-0.5 sm:mx-1" />

        <div className="flex gap-0.5 sm:gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-0.5 sm:mx-1" />

        <div className="flex gap-0.5 sm:gap-1">
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Code Block"
          >
            <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Quote"
          >
            <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-0.5 sm:mx-1" />

        <div className="flex gap-0.5 sm:gap-1">
          <button
            onClick={addLink}
            className={`p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Add Link"
          >
            <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => setIsImageModalOpen(true)}
            className="p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Add Image"
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-0.5 sm:mx-1" />

        <div className="flex gap-0.5 sm:gap-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-0.5 sm:mx-1" />

        <div className="flex gap-0.5 sm:gap-1">
          <button
            onClick={onPreview}
            className="p-1.5 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
            title="Toggle Preview Mode"
          >
            {previewMode === 'none' ? (
              <>
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm hidden sm:inline">Preview</span>
              </>
            ) : previewMode === 'side' ? (
              <>
                <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm hidden sm:inline">Split</span>
              </>
            ) : (
              <>
                <LayoutList className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm hidden sm:inline">Edit</span>
              </>
            )}
          </button>
        </div>
      </div>
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageAdd={handleImageAdd}
      />
    </>
  );
};

const BlogPreview = ({ data }: { data: any }) => {
  return (
    <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Hash className="w-4 h-4" />
            <span>{data.tags}</span>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {data.excerpt}
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </div>
    </article>
  );
};

export default function BlogEditor() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [previewMode, setPreviewMode] = useState<'none' | 'side' | 'full'>('none');
  const [isDraft, setIsDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('blog_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    // Load draft if exists
    const savedDraft = localStorage.getItem('blog_draft');
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      setFormData(parsedDraft);
      setIsDraft(true);
    }
  }, []);

  // Auto-save draft functionality
  useEffect(() => {
    let saveTimeout: NodeJS.Timeout;

    const saveDraft = () => {
      if (formData.title || formData.content) {
        localStorage.setItem('blog_draft', JSON.stringify({
          ...formData,
          lastSaved: new Date().toISOString()
        }));
        setIsDraft(true);
      }
    };

    // Debounce auto-save to prevent too frequent saves
    if (!isPublishing) {
      saveTimeout = setTimeout(saveDraft, 2000);
    }

    return () => {
      clearTimeout(saveTimeout);
    };
  }, [formData, isPublishing]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 dark:bg-gray-800 rounded-md p-4 font-mono text-sm',
        },
      }),
      ResizableImage.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your blog post content here...',
      }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none min-h-[300px] focus:outline-none',
      },
    },
  });

  const clearDraft = () => {
    if (window.confirm('Are you sure you want to clear the draft? This cannot be undone.')) {
      localStorage.removeItem('blog_draft');
      setFormData({ title: "", excerpt: "", content: "", tags: "" });
      editor?.commands.setContent("");
      setIsDraft(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Confirm before publishing
    if (!window.confirm('Are you sure you want to publish this blog post?')) {
      return;
    }

    setIsPublishing(true);
    setStatus("loading");

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(tag => tag.trim()),
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to create blog post");

      setStatus("success");
      localStorage.removeItem('blog_draft');
      setIsDraft(false);
      
      setTimeout(() => {
        router.push("/blog");
      }, 2000);
    } catch (error) {
      setStatus("error");
      setIsPublishing(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePreview = () => {
    setPreviewMode(current => {
      if (current === 'none') return 'side';
      if (current === 'side') return 'full';
      return 'none';
    });
  };

  if (!isAuthenticated) {
    return <Auth onAuth={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4 sm:mb-0">
              Write New Blog Post
            </h1>
            <div className="flex items-center gap-4">
              {isDraft && (
                <span className="text-sm text-gray-500">
                  Draft auto-saved
                </span>
              )}
              {isDraft && (
                <button
                  onClick={clearDraft}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-red-600 hover:text-red-700 transition-colors text-sm sm:text-base"
                  title="Clear draft"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear Draft</span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                      placeholder="Enter blog title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                      placeholder="React, Next.js, Web Development"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                    placeholder="Enter a brief excerpt"
                  />
                </div>

                <div className={`grid ${previewMode === 'side' ? 'grid-cols-1 lg:grid-cols-2 gap-6' : 'grid-cols-1'}`}>
                  {previewMode !== 'full' && (
                    <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                      <div className="border-b border-gray-200 dark:border-gray-700 p-2 mb-4 flex flex-wrap gap-1 bg-gray-50 dark:bg-gray-800 rounded-t-md sticky top-0 z-10 overflow-x-auto">
                        <MenuBar editor={editor} onPreview={togglePreview} previewMode={previewMode} />
                      </div>
                      <div className="p-3 sm:p-4 bg-white dark:bg-gray-700">
                        <EditorContent editor={editor} />
                      </div>
                    </div>
                  )}
                  
                  {previewMode !== 'none' && (
                    <div className="preview-container overflow-auto">
                      <BlogPreview data={formData} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={status === "loading" || !formData.title || !formData.content}
                    onClick={handleSubmit}
                    className={`flex-1 px-4 py-2 text-white rounded-md transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                      status === "loading" || !formData.title || !formData.content
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    }`}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Publish Post
                      </>
                    )}
                  </button>
                </div>

                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-green-600 dark:text-green-400 text-center font-medium"
                  >
                    Blog post published successfully! Redirecting...
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-600 dark:text-red-400 text-center font-medium"
                  >
                    Failed to publish blog post. Please try again.
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 