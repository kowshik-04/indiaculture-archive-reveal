import React, { createContext, useContext, useState, useEffect } from 'react';
import { CultureDatabase, CultureItem, ItemType, FormData, MediaFile } from '../types/CultureData';
import { generateId } from '../utils/helpers';

interface DataContextType {
  database: CultureDatabase;
  addItem: (type: ItemType, formData: FormData) => Promise<void>;
  getItemsByType: (type: ItemType) => CultureItem[];
  getItemById: (id: string) => CultureItem | undefined;
  getAllItems: () => CultureItem[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Rich sample data with 250+ word descriptions and multiple images per category
const sampleData: CultureDatabase = {
  temples: [
    {
      id: 'temple-1',
      type: 'temple',
      name: 'Meenakshi Amman Temple',
      place: 'Madurai, Tamil Nadu',
      description: 'The Meenakshi Amman Temple is a historic Hindu temple complex located in the south side of the Vaigai River in the temple city of Madurai, Tamil Nadu, India. It is dedicated to Parvati, known as Meenakshi, and her consort, Shiva, here named Sundareswarar. The temple forms the heart and lifeline of the 2500-year-old city of Madurai. The complex houses 14 magnificent gopurams or towers, including two golden ones, and spreads over 14 acres. The temple was originally built in the 6th century BCE but the present structure was erected during the 1623-1655 CE reign of Tirumala Nayaka. The temple is a significant symbol of ancient Tamil culture and architecture. The gopurams are covered with stucco figures of animals, gods and demons painted in vivid colors. The temple attracts over a million visitors annually during the Meenakshi Tirukalyanam festival. The architectural marvel showcases intricate sculptures, magnificent pillared halls, and sacred tanks that reflect the pinnacle of Dravidian temple architecture.',
      deity: 'Goddess Meenakshi and Lord Sundareswarar',
      age: '2500 years old',
      images: [
        { id: '1', name: 'temple1.jpg', url: 'https://images.unsplash.com/photo-1582553007851-cc1aa3c555be?w=800', type: 'image', size: 1024 },
        { id: '2', name: 'temple2.jpg', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', type: 'image', size: 1024 },
        { id: '3', name: 'temple3.jpg', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '1', name: 'temple-tour.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', type: 'video', size: 2048 }
      ],
      coordinates: { lat: 9.9195, lng: 78.1194 },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'temple-2',
      type: 'temple',
      name: 'Brihadeeswara Temple',
      place: 'Thanjavur, Tamil Nadu',
      description: 'The Brihadeeswara Temple, also called Rajarajeswaram or Peruvudaiyar Kovil, is a Hindu temple dedicated to Shiva located in Thanjavur, Tamil Nadu. Built between 1003 and 1010 AD by the Chola emperor Rajaraja I, this temple is one of the largest South Indian temples and an exemplary example of a fully realized Dravidian architecture. It is part of the UNESCO World Heritage Site known as the "Great Living Chola Temples". The temple is renowned for its massive size and architectural grandeur. The main temple tower (vimana) is 216 feet tall and was the tallest structure in the world at the time of its construction. The temple complex houses many halls, shrines and other structures built over various periods. The temple has a massive courtyard and is surrounded by a fortified wall. The temple represents the pinnacle of Chola architecture and engineering, featuring intricate stone carvings, massive bronze sculptures, and innovative architectural elements that have inspired temple builders for over a millennium.',
      deity: 'Lord Shiva (Brihadeeswara)',
      age: '1010 AD (Over 1000 years old)',
      images: [
        { id: '4', name: 'brihadeeswara1.jpg', url: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800', type: 'image', size: 1024 },
        { id: '5', name: 'brihadeeswara2.jpg', url: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800', type: 'image', size: 1024 },
        { id: '6', name: 'brihadeeswara3.jpg', url: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '2', name: 'brihadeeswara-tour.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', type: 'video', size: 3072 }
      ],
      coordinates: { lat: 10.7828, lng: 79.1317 },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  festivals: [
    {
      id: 'festival-1',
      type: 'festival',
      name: 'Diwali - Festival of Lights',
      place: 'Pan-India',
      description: 'Diwali, also known as Deepavali, is one of the most significant festivals in Hindu culture, celebrated across India and by Hindu communities worldwide. The festival spans five days and symbolizes the victory of light over darkness, good over evil, and knowledge over ignorance. The celebration involves lighting oil lamps, candles, and fireworks, decorating homes with rangoli patterns, exchanging gifts, and sharing sweets with family and friends. Each region of India has its unique way of celebrating Diwali. In North India, it marks the return of Lord Rama to Ayodhya after defeating Ravana. In West India, it celebrates Lord Krishna defeating the demon Narakasura. In East India, it honors Goddess Kali. The festival also holds significance for Jains, Sikhs, and Buddhists. Traditional preparations include cleaning and decorating homes, preparing special sweets like laddu and barfi, and wearing new clothes. The economic impact is substantial as it is considered an auspicious time for new purchases. Modern celebrations blend traditional rituals with contemporary practices, making it a truly inclusive festival.',
      date: 'October-November (Kartik Amavasya)',
      history: 'The festival has ancient origins dating back over 2500 years, with references found in early Sanskrit texts.',
      images: [
        { id: '7', name: 'diwali1.jpg', url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800', type: 'image', size: 1024 },
        { id: '8', name: 'diwali2.jpg', url: 'https://images.unsplash.com/photo-1636373750860-3a76f6e0dbb6?w=800', type: 'image', size: 1024 },
        { id: '9', name: 'diwali3.jpg', url: 'https://images.unsplash.com/photo-1639235310919-8b0e0e4d6e14?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '3', name: 'diwali-celebration.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', type: 'video', size: 3072 }
      ],
      coordinates: { lat: 20.5937, lng: 78.9629 },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'festival-2',
      type: 'festival',
      name: 'Kumbh Mela',
      place: 'Allahabad, Haridwar, Ujjain, Nashik',
      description: 'The Kumbh Mela is the largest peaceful gathering in the world, a mass Hindu pilgrimage of faith where devotees gather to bathe in a sacred river. Held four times every twelve years at Allahabad, Haridwar, Ujjain, and Nashik, the festival is rooted in Hindu mythology and is considered the most significant event in Hindu calendar. According to legend, drops of nectar fell from a pitcher (kumbh) carried by celestial beings during a cosmic battle, and bathing at these locations during auspicious times cleanses devotees of their sins. The festival attracts millions of pilgrims, including sadhus (holy men) from various sects who participate in elaborate processions. The Mela is not just a religious event but a cultural phenomenon that showcases the diversity of Indian spirituality, philosophy, and traditions. The gathering includes religious discourses, cultural programs, and the opportunity to witness ancient spiritual practices. The organization of such a massive event demonstrates remarkable logistics and community cooperation, making it a testament to India\'s organizational capabilities and spiritual heritage.',
      date: 'Every 12 years (rotating between four cities)',
      history: 'Dating back thousands of years, mentioned in ancient texts and Puranas.',
      images: [
        { id: '10', name: 'kumbh1.jpg', url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800', type: 'image', size: 1024 },
        { id: '11', name: 'kumbh2.jpg', url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800', type: 'image', size: 1024 },
        { id: '12', name: 'kumbh3.jpg', url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '4', name: 'kumbh-gathering.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', type: 'video', size: 2048 }
      ],
      coordinates: { lat: 25.4358, lng: 81.8463 },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  food: [
    {
      id: 'food-1',
      type: 'food',
      name: 'Hyderabadi Biryani',
      place: 'Hyderabad, Telangana',
      description: 'Hyderabadi Biryani is a world-renowned aromatic rice dish that originated in the kitchens of the Nizams of Hyderabad. This exquisite culinary masterpiece represents the perfect fusion of Mughlai and Telugu cuisines, creating a unique flavor profile that has captivated food lovers globally. The dish is prepared using the traditional dum cooking method, where marinated meat (usually mutton or chicken) and partially cooked basmati rice are layered together and slow-cooked in a heavy-bottomed pot sealed with dough. The magic lies in the careful selection of spices including saffron, bay leaves, cardamom, cinnamon, and star anise, which infuse the rice with incredible fragrance and taste. What sets Hyderabadi Biryani apart is its subtle flavors, the use of kewra water, rose water, and fried onions. The meat is tender and succulent, having absorbed all the aromatic spices during the long cooking process. Traditionally served with raita, shorba, and pickle, this dish is not just food but a celebration of Hyderabadi culture and hospitality. The preparation is an art form passed down through generations.',
      taste: 'Aromatic, mildly spiced, savory with hints of saffron and rose',
      images: [
        { id: '13', name: 'biryani1.jpg', url: 'https://images.unsplash.com/photo-1563379091339-03246963d7d9?w=800', type: 'image', size: 1024 },
        { id: '14', name: 'biryani2.jpg', url: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=800', type: 'image', size: 1024 },
        { id: '15', name: 'biryani3.jpg', url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '5', name: 'biryani-making.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', type: 'video', size: 2048 }
      ],
      coordinates: { lat: 17.3850, lng: 78.4867 },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'food-2',
      type: 'food',
      name: 'Masala Dosa',
      place: 'Karnataka',
      description: 'Masala Dosa is an iconic South Indian dish that has become synonymous with the culinary identity of Karnataka and South India as a whole. This crispy, golden crepe is made from a fermented batter of rice and black gram dal, creating a perfect balance of texture and taste. The art of making dosa requires skill and patience, as the batter must be fermented overnight to achieve the characteristic tangy flavor and light texture. The dosa is spread thin on a hot griddle and filled with a spiced potato mixture called aloo masala, which typically includes boiled potatoes, onions, green chilies, curry leaves, and turmeric. Served with coconut chutney and sambar (a lentil-based vegetable stew), masala dosa provides a complete, nutritious meal that is both satisfying and flavorful. The dish represents the essence of South Indian vegetarian cuisine and has gained international recognition for its unique preparation method and delicious taste. Street vendors and restaurants across India serve countless variations of this beloved dish, each adding their own regional touch to the classic recipe.',
      taste: 'Crispy, tangy, mildly spiced with earthy undertones',
      images: [
        { id: '16', name: 'dosa1.jpg', url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800', type: 'image', size: 1024 },
        { id: '17', name: 'dosa2.jpg', url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800', type: 'image', size: 1024 },
        { id: '18', name: 'dosa3.jpg', url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '6', name: 'dosa-preparation.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', type: 'video', size: 3072 }
      ],
      coordinates: { lat: 12.9716, lng: 77.5946 },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  clothes: [
    {
      id: 'cloth-1',
      type: 'cloth',
      name: 'Kanjeevaram Silk Saree',
      place: 'Kanchipuram, Tamil Nadu',
      description: 'The Kanjeevaram silk saree, also known as Kanchipuram saree, is one of India\'s most treasured and luxurious traditional garments. Originating from the temple town of Kanchipuram in Tamil Nadu, these sarees are woven with pure mulberry silk threads and real gold or silver zari, making them incredibly valuable and durable. The craft of weaving these sarees dates back over 400 years and has been passed down through generations of skilled artisans. What makes Kanjeevaram sarees unique is their distinctive weaving technique where the body and border are woven separately and then interlocked together, creating a strong and durable garment that can last for generations. The designs are inspired by temple architecture, featuring motifs like peacocks, parrots, elephants, temple borders, and floral patterns. Each saree takes anywhere from 10 days to 6 months to complete, depending on the complexity of the design. These sarees are considered auspicious for weddings and special occasions in South Indian culture. The rich colors, intricate designs, and lustrous finish make Kanjeevaram sarees a symbol of South Indian heritage and craftsmanship.',
      clothType: 'Silk Saree',
      images: [
        { id: '19', name: 'kanjeevaram1.jpg', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800', type: 'image', size: 1024 },
        { id: '20', name: 'kanjeevaram2.jpg', url: 'https://images.unsplash.com/photo-1583391733956-a3f6b136b1b5?w=800', type: 'image', size: 1024 },
        { id: '21', name: 'kanjeevaram3.jpg', url: 'https://images.unsplash.com/photo-1594736797933-d0b22fdca2c6?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '7', name: 'saree-weaving.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', type: 'video', size: 2048 }
      ],
      coordinates: { lat: 12.8185, lng: 79.7005 },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'cloth-2',
      type: 'cloth',
      name: 'Banarasi Silk Saree',
      place: 'Varanasi, Uttar Pradesh',
      description: 'Banarasi silk sarees are among the finest sarees in India, known for their opulent gold and silver brocade work, silk fabric, and intricate designs. Originating from Varanasi (Banaras), these sarees have been a symbol of Indian cultural heritage for over 3000 years. The tradition was believed to be started during the Mughal period when Persian motifs and patterns were introduced to Indian silk weaving. Banarasi sarees are characterized by their heavy, lustrous silk and elaborate designs featuring Mughal-inspired floral and foliate motifs, kalga and bel patterns, and intricate borders. The weaving process is entirely done by hand and can take anywhere from 15 days to 6 months depending on the complexity of the design and fineness of the brocade work. These sarees are traditionally worn by Indian brides and are considered an essential part of a Indian woman\'s wardrobe for special occasions. The motifs are often woven with gold and silver threads, making them expensive but durable heirloom pieces. The craftsmanship represents centuries of artistic tradition and cultural continuity.',
      clothType: 'Silk Saree with Brocade Work',
      images: [
        { id: '22', name: 'banarasi1.jpg', url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800', type: 'image', size: 1024 },
        { id: '23', name: 'banarasi2.jpg', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', type: 'image', size: 1024 },
        { id: '24', name: 'banarasi3.jpg', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '8', name: 'banarasi-weaving.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', type: 'video', size: 3072 }
      ],
      coordinates: { lat: 25.3176, lng: 82.9739 },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  villages: [
    {
      id: 'village-1',
      type: 'village',
      name: 'Hampi',
      place: 'Karnataka',
      description: 'Hampi, located in the Bellary district of Karnataka, is a UNESCO World Heritage Site that serves as a magnificent testament to the grandeur of the Vijayanagara Empire. This ancient village, spread across 4,100 hectares, was once the capital of one of the largest Hindu empires in Indian history, flourishing from the 14th to 16th centuries. The village is renowned for its stunning ruins, magnificent temples, and unique boulder landscape that creates an otherworldly atmosphere. The Virupaksha Temple, dedicated to Lord Shiva, is the main center of pilgrimage and has been continuously active for over 700 years. The village showcases remarkable Indo-Islamic architecture, with structures like the Lotus Mahal, Elephant Stables, and the iconic Stone Chariot at Vittala Temple. The local community continues to preserve ancient traditions, with many residents being descendants of the original inhabitants. Hampi\'s economy today relies heavily on tourism and agriculture, with locals growing sugarcane, rice, and cotton. The village represents a perfect blend of historical significance and rural Indian lifestyle, where ancient temples coexist with traditional village life.',
      state: 'Karnataka',
      specialty: 'Ancient ruins and temple architecture',
      images: [
        { id: '25', name: 'hampi1.jpg', url: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800', type: 'image', size: 1024 },
        { id: '26', name: 'hampi2.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', type: 'image', size: 1024 },
        { id: '27', name: 'hampi3.jpg', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '9', name: 'hampi-heritage.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', type: 'video', size: 3072 }
      ],
      coordinates: { lat: 15.3350, lng: 76.4600 },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'village-2',
      type: 'village',
      name: 'Khimsar Village',
      place: 'Rajasthan',
      description: 'Khimsar is a historic village in the Nagaur district of Rajasthan, renowned for its magnificent 16th-century fort and traditional Rajasthani architecture. This picturesque village offers a glimpse into the royal heritage of Rajasthan, with its imposing fort palace that has been converted into a heritage hotel while maintaining its authentic character. The village is surrounded by the golden sand dunes of the Thar Desert, creating a mesmerizing landscape that changes colors throughout the day. Khimsar Fort, built in 1523 AD, stands as a testament to Rajput architecture and engineering prowess. The village is also famous for its traditional crafts, including pottery, textile weaving, and camel leather products. The local community has preserved age-old traditions of folk music, dance, and storytelling that date back centuries. Visitors can experience authentic Rajasthani culture through village walks, camel safaris, and traditional performances. The village economy is based on agriculture, animal husbandry, and increasingly, heritage tourism. The residents maintain traditional lifestyles while adapting to modern needs, creating a unique blend of old and new.',
      state: 'Rajasthan',
      specialty: 'Historic fort, desert tourism, traditional crafts, and royal heritage',
      images: [
        { id: '28', name: 'khimsar1.jpg', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800', type: 'image', size: 1024 },
        { id: '29', name: 'khimsar2.jpg', url: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800', type: 'image', size: 1024 },
        { id: '30', name: 'khimsar3.jpg', url: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800', type: 'image', size: 1024 }
      ],
      videos: [
        { id: '10', name: 'khimsar-tour.mp4', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', type: 'video', size: 2048 }
      ],
      coordinates: { lat: 27.0333, lng: 72.4167 },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [database, setDatabase] = useState<CultureDatabase>(sampleData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedData = localStorage.getItem('culture-database');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setDatabase(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever database changes
    localStorage.setItem('culture-database', JSON.stringify(database));
  }, [database]);

  const addItem = async (type: ItemType, formData: FormData): Promise<void> => {
    setIsLoading(true);
    try {
      // Process uploaded files
      const processedImages: MediaFile[] = await Promise.all(
        formData.images.map(async (file) => ({
          id: generateId(),
          name: file.name,
          url: URL.createObjectURL(file),
          type: 'image' as const,
          size: file.size
        }))
      );

      const processedVideos: MediaFile[] = await Promise.all(
        formData.videos.map(async (file) => ({
          id: generateId(),
          name: file.name,
          url: URL.createObjectURL(file),
          type: 'video' as const,
          size: file.size
        }))
      );

      const baseItem = {
        id: generateId(),
        name: formData.name,
        place: formData.place,
        description: formData.description,
        images: processedImages,
        videos: processedVideos,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      let newItem: CultureItem;

      switch (type) {
        case 'temple':
          newItem = {
            ...baseItem,
            type: 'temple',
            deity: formData.deity || '',
            age: formData.age || ''
          };
          break;
        case 'festival':
          newItem = {
            ...baseItem,
            type: 'festival',
            date: formData.date || '',
            history: formData.history || ''
          };
          break;
        case 'food':
          newItem = {
            ...baseItem,
            type: 'food',
            taste: formData.taste || ''
          };
          break;
        case 'cloth':
          newItem = {
            ...baseItem,
            type: 'cloth',
            clothType: formData.clothType || ''
          };
          break;
        case 'village':
          newItem = {
            ...baseItem,
            type: 'village',
            state: formData.state || '',
            specialty: formData.specialty || ''
          };
          break;
        default:
          throw new Error(`Unknown item type: ${type}`);
      }

      let key: keyof CultureDatabase;
      switch (type) {
        case 'cloth':
          key = 'clothes';
          break;
        case 'food':
          key = 'food';
          break;
        default:
          key = `${type}s` as keyof CultureDatabase;
      }

      setDatabase(prev => ({
        ...prev,
        [key]: [
          ...prev[key],
          newItem
        ]
      }));
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getItemsByType = (type: ItemType): CultureItem[] => {
    let key: keyof CultureDatabase;
    switch (type) {
      case 'cloth':
        key = 'clothes';
        break;
      case 'food':
        key = 'food';
        break;
      default:
        key = `${type}s` as keyof CultureDatabase;
    }
    return database[key] || [];
  };

  const getItemById = (id: string): CultureItem | undefined => {
    const allItems = getAllItems();
    return allItems.find(item => item.id === id);
  };

  const getAllItems = (): CultureItem[] => {
    return [
      ...database.temples,
      ...database.festivals,
      ...database.food,
      ...database.clothes,
      ...database.villages
    ];
  };

  return (
    <DataContext.Provider value={{
      database,
      addItem,
      getItemsByType,
      getItemById,
      getAllItems,
      isLoading
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};