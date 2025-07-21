import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  accept: string;
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
  files: File[];
  type: 'images' | 'videos';
  required?: boolean;
  minFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  onFilesChange,
  files,
  type,
  required = false,
  minFiles = 0
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];

    for (const file of fileArray) {
      // Validate file type
      if (type === 'images' && !file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a valid image file`,
          variant: "destructive"
        });
        continue;
      }
      
      if (type === 'videos' && !file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type", 
          description: `${file.name} is not a valid video file`,
          variant: "destructive"
        });
        continue;
      }

      // Validate file size (10MB for images, 50MB for videos)
      const maxSize = type === 'images' ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is too large. Max size: ${type === 'images' ? '10MB' : '50MB'}`,
          variant: "destructive"
        });
        continue;
      }

      validFiles.push(file);
    }

    if (multiple) {
      onFilesChange([...files, ...validFiles]);
    } else {
      onFilesChange(validFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label>{type === 'images' ? 'Images' : 'Videos'} {required && '*'} {minFiles > 0 && `(minimum ${minFiles})`}</Label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileSelect}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-2">
          {type === 'images' ? (
            <Image className="h-8 w-8 text-muted-foreground" />
          ) : (
            <Video className="h-8 w-8 text-muted-foreground" />
          )}
          <p className="text-sm text-muted-foreground">
            Drag and drop {type} here, or click to select
          </p>
          <Button type="button" variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Select {type}
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                {type === 'images' ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    className="w-full h-full object-cover"
                    controls={false}
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground truncate">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;