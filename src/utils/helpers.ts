export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFormData = (formData: any): string[] => {
  const errors: string[] = [];
  
  if (!formData.name?.trim()) {
    errors.push('Name is required');
  }
  
  if (!formData.place?.trim()) {
    errors.push('Place/Location is required');
  }
  
  if (!formData.description?.trim() || formData.description.length < 250) {
    errors.push('Description must be at least 250 characters');
  }
  
  if (!formData.images || formData.images.length < 3) {
    errors.push('At least 3 images are required');
  }
  
  if (!formData.videos || formData.videos.length < 1) {
    errors.push('At least 1 video is required');
  }
  
  return errors;
};