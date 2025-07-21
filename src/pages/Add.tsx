import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import type { ItemType, FormData } from "@/types/CultureData";

const Add = () => {
  const { addItem } = useData();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [selectedType, setSelectedType] = useState<ItemType | ''>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    place: '',
    description: '',
    images: [],
    videos: []
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  const resetForm = () => {
    setFormData({
      name: '',
      place: '',
      description: '',
      images: [],
      videos: []
    });
    setSelectedType('');
    setImageFiles([]);
    setVideoFiles([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive"
      });
      return;
    }

    if (formData.description.length < 250) {
      toast({
        title: "Error", 
        description: "Description must be at least 250 words",
        variant: "destructive"
      });
      return;
    }

    if (imageFiles.length < 1) {
      toast({
        title: "Error",
        description: "Please upload at least 1 image",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create the form data with uploaded files
      const finalFormData = {
        ...formData,
        images: imageFiles,
        videos: videoFiles
      };
      
      addItem(selectedType, finalFormData);
      toast({
        title: "Success!",
        description: `${formData.name} has been added successfully`,
      });
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderTypeSpecificFields = () => {
    switch (selectedType) {
      case 'temple':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="deity">Deity</Label>
              <Input
                id="deity"
                value={formData.deity || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, deity: e.target.value }))}
                placeholder="Main deity of the temple"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age/Period</Label>
              <Input
                id="age"
                value={formData.age || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="e.g., 12th century, 500 years old"
              />
            </div>
          </>
        );
      case 'festival':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="date">Festival Date</Label>
              <Input
                id="date"
                value={formData.date || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                placeholder="e.g., October-November, Kartik month"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="history">History</Label>
              <Textarea
                id="history"
                value={formData.history || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, history: e.target.value }))}
                placeholder="Historical significance and origin"
                rows={3}
              />
            </div>
          </>
        );
      case 'food':
        return (
          <div className="space-y-2">
            <Label htmlFor="taste">Taste Profile</Label>
            <Input
              id="taste"
              value={formData.taste || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, taste: e.target.value }))}
              placeholder="e.g., Sweet, Spicy, Tangy, Savory"
            />
          </div>
        );
      case 'cloth':
        return (
          <div className="space-y-2">
            <Label htmlFor="clothType">Cloth Type</Label>
            <Input
              id="clothType"
              value={formData.clothType || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, clothType: e.target.value }))}
              placeholder="e.g., Saree, Dhoti, Lehenga, Kurta"
            />
          </div>
        );
      case 'village':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                placeholder="State where village is located"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                value={formData.specialty || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                placeholder="What the village is known for"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Add Cultural Item
          </h1>
          <p className="text-xl text-muted-foreground">
            Share India's rich cultural heritage with the world
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Cultural Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={selectedType} onValueChange={(value: ItemType) => setSelectedType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temple">Temple</SelectItem>
                    <SelectItem value="festival">Festival</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="cloth">Traditional Clothing</SelectItem>
                    <SelectItem value="village">Village</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="place">Place *</Label>
                  <Input
                    id="place"
                    value={formData.place}
                    onChange={(e) => setFormData(prev => ({ ...prev, place: e.target.value }))}
                    placeholder="Location/City/Region"
                    required
                  />
                </div>
              </div>

              {/* Type-specific fields */}
              {selectedType && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderTypeSpecificFields()}
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description * (minimum 250 words)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description with cultural significance, history, and importance (minimum 250 words)"
                  rows={6}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {formData.description.length}/250 words minimum
                </p>
              </div>

              {/* File Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload
                  accept="image/*"
                  multiple={true}
                  onFilesChange={setImageFiles}
                  files={imageFiles}
                  type="images"
                  required={true}
                  minFiles={1}
                />
                <FileUpload
                  accept="video/*"
                  multiple={true}
                  onFilesChange={setVideoFiles}
                  files={videoFiles}
                  type="videos"
                  required={false}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1" size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add {selectedType || 'Item'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} size="lg">
                  <X className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Add;