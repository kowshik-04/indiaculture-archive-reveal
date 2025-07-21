import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Star, Shirt, Home, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CultureItem } from '@/types/CultureData';

interface ItemDetailModalProps {
  item: CultureItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  if (!item) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % item.videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + item.videos.length) % item.videos.length);
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case 'temple':
        return <Calendar className="w-4 h-4" />;
      case 'festival':
        return <Calendar className="w-4 h-4" />;
      case 'food':
        return <Star className="w-4 h-4" />;
      case 'cloth':
        return <Shirt className="w-4 h-4" />;
      case 'village':
        return <Home className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeSpecificInfo = () => {
    switch (item.type) {
      case 'temple':
        return (
          <>
            {'deity' in item && item.deity && (
              <Badge variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                Deity: {item.deity}
              </Badge>
            )}
            {'age' in item && item.age && (
              <Badge variant="outline">Age: {item.age}</Badge>
            )}
          </>
        );
      case 'festival':
        return (
          <>
            {'date' in item && item.date && (
              <Badge variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                {item.date}
              </Badge>
            )}
          </>
        );
      case 'food':
        return (
          <>
            {'taste' in item && item.taste && (
              <Badge variant="secondary">
                <Star className="w-3 h-3 mr-1" />
                {item.taste}
              </Badge>
            )}
          </>
        );
      case 'cloth':
        return (
          <>
            {'clothType' in item && item.clothType && (
              <Badge variant="secondary">
                <Shirt className="w-3 h-3 mr-1" />
                {item.clothType}
              </Badge>
            )}
          </>
        );
      case 'village':
        return (
          <>
            {'state' in item && item.state && (
              <Badge variant="secondary">
                <MapPin className="w-3 h-3 mr-1" />
                {item.state}
              </Badge>
            )}
            {'specialty' in item && item.specialty && (
              <Badge variant="outline">
                <Home className="w-3 h-3 mr-1" />
                {item.specialty}
              </Badge>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {getTypeIcon()}
            {item.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Location and Type Info */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">
              <MapPin className="w-3 h-3 mr-1" />
              {item.place}
            </Badge>
            {getTypeSpecificInfo()}
          </div>

          {/* Image Gallery */}
          {item.images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Images</h3>
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={item.images[currentImageIndex].url}
                    alt={`${item.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {item.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm">
                        {currentImageIndex + 1} / {item.images.length}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Image Thumbnails */}
              {item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Video Gallery */}
          {item.videos.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Videos</h3>
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <video
                    src={item.videos[currentVideoIndex].url}
                    controls
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {item.videos.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-2 bg-background/80 backdrop-blur-sm"
                      onClick={prevVideo}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
                      onClick={nextVideo}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm">
                        Video {currentVideoIndex + 1} / {item.videos.length}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Video Thumbnails */}
              {item.videos.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {item.videos.map((video, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 bg-muted flex items-center justify-center ${
                        index === currentVideoIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <span className="text-xs">Video {index + 1}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          </div>

          {/* History for festivals */}
          {'history' in item && item.history && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">History</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {item.history}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;