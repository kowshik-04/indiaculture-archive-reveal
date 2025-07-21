import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'ml';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.temples': 'Temples',
    'nav.festivals': 'Festivals',
    'nav.food': 'Food',
    'nav.clothes': 'Clothes',
    'nav.villages': 'Villages',
    
    'nav.add': 'Add Content',
    'hero.title': 'Discover India\'s Rich Cultural Heritage',
    'hero.subtitle': 'Explore temples, festivals, food, traditional clothes, and historic villages that showcase the incredible diversity of Indian culture',
    'hero.cta': 'Explore Heritage',
    'categories.temples': 'Sacred Temples',
    'categories.festivals': 'Vibrant Festivals',
    'categories.food': 'Traditional Cuisine',
    'categories.clothes': 'Cultural Attire',
    'categories.villages': 'Historic Villages',
    'form.name': 'Name',
    'form.place': 'Place/Location',
    'form.description': 'Description',
    'form.images': 'Images (minimum 3)',
    'form.videos': 'Videos (minimum 1)',
    'form.submit': 'Add to Archive',
    'form.cancel': 'Cancel',
    'temple.deity': 'Main Deity',
    'temple.age': 'Age/Period',
    'festival.date': 'Festival Date',
    'festival.history': 'Historical Significance',
    'food.taste': 'Taste Profile',
    'cloth.type': 'Clothing Type',
    'village.state': 'State',
    'village.specialty': 'Specialty/Famous For',
    'detail.share': 'Share',
    'detail.location': 'Location',
    'detail.gallery': 'Image Gallery',
    'detail.videos': 'Videos',
    'languages.en': 'English',
    'languages.hi': 'हिंदी',
    'languages.te': 'తెలుగు',
    'languages.ta': 'தமிழ்',
    'languages.kn': 'ಕನ್ನಡ',
    'languages.ml': 'മലയാളം'
  },
  hi: {
    'nav.home': 'मुख्य पृष्ठ',
    'nav.temples': 'मंदिर',
    'nav.festivals': 'त्योहार',
    'nav.food': 'भोजन',
    'nav.clothes': 'वस्त्र',
    'nav.villages': 'गांव',
    
    'nav.add': 'सामग्री जोड़ें',
    'hero.title': 'भारत की समृद्ध सांस्कृतिक विरासत की खोज करें',
    'hero.subtitle': 'मंदिरों, त्योहारों, भोजन, पारंपरिक वस्त्रों और ऐतिहासिक गांवों का अन्वेषण करें जो भारतीय संस्कृति की अविश्वसनीय विविधता को प्रदर्शित करते हैं',
    'hero.cta': 'विरासत का अन्वेषण करें',
    'categories.temples': 'पवित्र मंदिर',
    'categories.festivals': 'जीवंत त्योहार',
    'categories.food': 'पारंपरिक व्यंजन',
    'categories.clothes': 'सांस्कृतिक पोशाक',
    'categories.villages': 'ऐतिहासिक गांव',
    'form.name': 'नाम',
    'form.place': 'स्थान/लोकेशन',
    'form.description': 'विवरण',
    'form.images': 'चित्र (न्यूनतम 3)',
    'form.videos': 'वीडियो (न्यूनतम 1)',
    'form.submit': 'संग्रह में जोड़ें',
    'form.cancel': 'रद्द करें',
    'temple.deity': 'मुख्य देवता',
    'temple.age': 'आयु/काल',
    'festival.date': 'त्योहार की तारीख',
    'festival.history': 'ऐतिहासिक महत्व',
    'food.taste': 'स्वाद प्रोफ़ाइल',
    'cloth.type': 'वस्त्र प्रकार',
    'village.state': 'राज्य',
    'village.specialty': 'विशेषता/प्रसिद्ध',
    'detail.share': 'साझा करें',
    'detail.location': 'स्थान',
    'detail.gallery': 'चित्र गैलरी',
    'detail.videos': 'वीडियो',
    'languages.en': 'English',
    'languages.hi': 'हिंदी',
    'languages.te': 'తెలుగు',
    'languages.ta': 'தமிழ்',
    'languages.kn': 'ಕನ್ನಡ',
    'languages.ml': 'മലയാളം'
  },
  te: {
    'nav.home': 'హోమ్',
    'nav.temples': 'దేవాలయాలు',
    'nav.festivals': 'పండుగలు',
    'nav.food': 'ఆహారం',
    'nav.clothes': 'వస్త్రాలు',
    'nav.villages': 'గ్రామాలు',
    
    'nav.add': 'కంటెంట్ జోడించండి',
    'hero.title': 'భారతదేశ సమృద్ధ సాంస్కృతిక వారసత్వాన్ని కనుగొనండి',
    'hero.subtitle': 'భారతీయ సంస్కృతి యొక్క అద్భుతమైన వైవిధ్యాన్ని ప్రదర్శించే దేవాలయాలు, పండుగలు, ఆహారం, సాంప్రదాయ వస్త్రాలు మరియు చారిత్రక గ్రామాలను అన్వేషించండి',
    'hero.cta': 'వారసత్వాన్ని అన్వేషించండి',
    'categories.temples': 'పవిత్ర దేవాలయాలు',
    'categories.festivals': 'ఉత్సవంగా జరిగే పండుగలు',
    'categories.food': 'సాంప్రదాయ వంటకాలు',
    'categories.clothes': 'సాంస్కృతిక దుస్తులు',
    'categories.villages': 'చారిత్రక గ్రామాలు',
    'form.name': 'పేరు',
    'form.place': 'ప్రదేశం/లొకేషన్',
    'form.description': 'వివరణ',
    'form.images': 'చిత్రాలు (కనీసం 3)',
    'form.videos': 'వీడియోలు (కనీసం 1)',
    'form.submit': 'ఆర్కైవ్‌లో జోడించండి',
    'form.cancel': 'రద్దు చేయండి',
    'temple.deity': 'ముఖ్య దేవత',
    'temple.age': 'వయస్సు/కాలం',
    'festival.date': 'పండుగ తేదీ',
    'festival.history': 'చారిత్రక ప్రాముఖ్యత',
    'food.taste': 'రుచి ప్రొఫైల్',
    'cloth.type': 'దుస్తుల రకం',
    'village.state': 'రాష్ట్రం',
    'village.specialty': 'ప్రత్యేకత/ప్రసిద్ధి',
    'detail.share': 'షేర్ చేయండి',
    'detail.location': 'లొకేషన్',
    'detail.gallery': 'చిత్ర గ్యాలరీ',
    'detail.videos': 'వీడియోలు',
    'languages.en': 'English',
    'languages.hi': 'हिंदी',
    'languages.te': 'తెలుగు',
    'languages.ta': 'தமிழ்',
    'languages.kn': 'ಕನ್ನಡ',
    'languages.ml': 'മലയാളം'
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.temples': 'கோயில்கள்',
    'nav.festivals': 'திருவிழாக்கள்',
    'nav.food': 'உணவு',
    'nav.clothes': 'ஆடைகள்',
    'nav.villages': 'கிராமங்கள்',
    
    'nav.add': 'உள்ளடக்கம் சேர்க்க',
    'hero.title': 'இந்தியாவின் வளமான கலாச்சார பாரம்பரியத்தை கண்டறியுங்கள்',
    'hero.subtitle': 'இந்திய கலாச்சாரத்தின் அற்புதமான பன்முகத்தன்மையை வெளிப்படுத்தும் கோயில்கள், திருவிழாக்கள், உணவு, பாரம்பரிய ஆடைகள் மற்றும் வரலாற்று கிராமங்களை ஆராயுங்கள்',
    'hero.cta': 'பாரம்பரியத்தை ஆராயுங்கள்',
    'categories.temples': 'புனித கோயில்கள்',
    'categories.festivals': 'உற்சாகமான திருவிழாக்கள்',
    'categories.food': 'பாரம்பரிய உணவு',
    'categories.clothes': 'கலாச்சார உடை',
    'categories.villages': 'வரலாற்று கிராமங்கள்',
    'form.name': 'பெயர்',
    'form.place': 'இடம்/இருப்பிடம்',
    'form.description': 'விளக்கம்',
    'form.images': 'படங்கள் (குறைந்தது 3)',
    'form.videos': 'வீடியோக்கள் (குறைந்தது 1)',
    'form.submit': 'காப்பகத்தில் சேர்க்க',
    'form.cancel': 'ரத்து செய்',
    'temple.deity': 'முக்கிய தெய்வம்',
    'temple.age': 'வயது/காலம்',
    'festival.date': 'திருவிழா தேதி',
    'festival.history': 'வரலாற்று முக்கியத்துவம்',
    'food.taste': 'சுவை விவரம்',
    'cloth.type': 'ஆடை வகை',
    'village.state': 'மாநிலம்',
    'village.specialty': 'சிறப்பு/புகழ்',
    'detail.share': 'பகிர்',
    'detail.location': 'இருப்பிடம்',
    'detail.gallery': 'படக் காட்சியகம்',
    'detail.videos': 'வீடியோக்கள்',
    'languages.en': 'English',
    'languages.hi': 'हिंदी',
    'languages.te': 'తెలుగు',
    'languages.ta': 'தமிழ்',
    'languages.kn': 'ಕನ್ನಡ',
    'languages.ml': 'മലയാളം'
  },
  kn: {
    'nav.home': 'ಮುಖ್ಯ ಪುಟ',
    'nav.temples': 'ದೇವಾಲಯಗಳು',
    'nav.festivals': 'ಹಬ್ಬಗಳು',
    'nav.food': 'ಆಹಾರ',
    'nav.clothes': 'ಬಟ್ಟೆಗಳು',
    'nav.villages': 'ಹಳ್ಳಿಗಳು',
    
    'nav.add': 'ವಿಷಯ ಸೇರಿಸಿ',
    'hero.title': 'ಭಾರತದ ಶ್ರೀಮಂತ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    'hero.subtitle': 'ಭಾರತೀಯ ಸಂಸ್ಕೃತಿಯ ಅದ್ಭುತ ವೈವಿಧ್ಯತೆಯನ್ನು ಪ್ರದರ್ಶಿಸುವ ದೇವಾಲಯಗಳು, ಹಬ್ಬಗಳು, ಆಹಾರ, ಸಾಂಪ್ರದಾಯಿಕ ಬಟ್ಟೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಹಳ್ಳಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    'hero.cta': 'ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    'categories.temples': 'ಪವಿತ್ರ ದೇವಾಲಯಗಳು',
    'categories.festivals': 'ರೋಮಾಂಚಕ ಹಬ್ಬಗಳು',
    'categories.food': 'ಸಾಂಪ್ರದಾಯಿಕ ಪಾಕಪದ್ಧತಿ',
    'categories.clothes': 'ಸಾಂಸ್ಕೃತಿಕ ಉಡುಪುಗಳು',
    'categories.villages': 'ಐತಿಹಾಸಿಕ ಹಳ್ಳಿಗಳು',
    'form.name': 'ಹೆಸರು',
    'form.place': 'ಸ್ಥಳ/ಸ್ಥಾನ',
    'form.description': 'ವಿವರಣೆ',
    'form.images': 'ಚಿತ್ರಗಳು (ಕನಿಷ್ಠ 3)',
    'form.videos': 'ವೀಡಿಯೊಗಳು (ಕನಿಷ್ಠ 1)',
    'form.submit': 'ಆರ್ಕೈವ್‌ಗೆ ಸೇರಿಸಿ',
    'form.cancel': 'ರದ್ದುಗೊಳಿಸಿ',
    'temple.deity': 'ಮುಖ್ಯ ದೇವತೆ',
    'temple.age': 'ವಯಸ್ಸು/ಅವಧಿ',
    'festival.date': 'ಹಬ್ಬದ ದಿನಾಂಕ',
    'festival.history': 'ಐತಿಹಾಸಿಕ ಮಹತ್ವ',
    'food.taste': 'ರುಚಿ ವಿವರ',
    'cloth.type': 'ಬಟ್ಟೆಯ ಪ್ರಕಾರ',
    'village.state': 'ರಾಜ್ಯ',
    'village.specialty': 'ವಿಶೇಷತೆ/ಪ್ರಸಿದ್ಧಿ',
    'detail.share': 'ಹಂಚಿಕೊಳ್ಳಿ',
    'detail.location': 'ಸ್ಥಳ',
    'detail.gallery': 'ಚಿತ್ರ ಗ್ಯಾಲರಿ',
    'detail.videos': 'ವೀಡಿಯೊಗಳು',
    'languages.en': 'English',
    'languages.hi': 'हिंदी',
    'languages.te': 'తెలుగు',
    'languages.ta': 'தமிழ்',
    'languages.kn': 'ಕನ್ನಡ',
    'languages.ml': 'മലയാളം'
  },
  ml: {
    'nav.home': 'ഹോം',
    'nav.temples': 'ക്ഷേത്രങ്ങൾ',
    'nav.festivals': 'ഉത്സവങ്ങൾ',
    'nav.food': 'ഭക്ഷണം',
    'nav.clothes': 'വസ്ത്രങ്ങൾ',
    'nav.villages': 'ഗ്രാമങ്ങൾ',
    
    'nav.add': 'ഉള്ളടക്കം ചേർക്കുക',
    'hero.title': 'ഇന്ത്യയുടെ സമ്പന്നമായ സാംസ്കാരിക പൈതൃകം കണ്ടെത്തുക',
    'hero.subtitle': 'ഇന്ത്യൻ സംസ്കാരത്തിന്റെ അവിശ്വസനീയമായ വൈവിധ്യം പ്രദർശിപ്പിക്കുന്ന ക്ഷേത്രങ്ങൾ, ഉത്സവങ്ങൾ, ഭക്ഷണം, പരമ്പരാഗത വസ്ത്രങ്ങൾ, ചരിത്രപ്രസിദ്ധമായ ഗ്രാമങ്ങൾ എന്നിവ പര്യവേക്ഷണം ചെയ്യുക',
    'hero.cta': 'പൈതൃകം പര്യവേക്ഷണം ചെയ്യുക',
    'categories.temples': 'വിശുദ്ധ ക്ഷേത്രങ്ങൾ',
    'categories.festivals': 'ഊർജ്ജസ്വലമായ ഉത്സവങ്ങൾ',
    'categories.food': 'പരമ്പരാഗത പാചകരീതി',
    'categories.clothes': 'സാംസ്കാരിക വസ്ത്രധാരണം',
    'categories.villages': 'ചരിത്രപ്രസിദ്ധമായ ഗ്രാമങ്ങൾ',
    'form.name': 'പേര്',
    'form.place': 'സ്ഥലം/ലൊക്കേഷൻ',
    'form.description': 'വിവരണം',
    'form.images': 'ചിത്രങ്ങൾ (കുറഞ്ഞത് 3)',
    'form.videos': 'വീഡിയോകൾ (കുറഞ്ഞത് 1)',
    'form.submit': 'ആർക്കൈവിൽ ചേർക്കുക',
    'form.cancel': 'റദ്ദാക്കുക',
    'temple.deity': 'പ്രധാന ദേവത',
    'temple.age': 'വയസ്സ്/കാലഘട്ടം',
    'festival.date': 'ഉത്സവ തീയതി',
    'festival.history': 'ചരിത്രപരമായ പ്രാധാന്യം',
    'food.taste': 'രുചി വിവരണം',
    'cloth.type': 'വസ്ത്ര തരം',
    'village.state': 'സംസ്ഥാനം',
    'village.specialty': 'പ്രത്യേകത/പ്രസിദ്ധി',
    'detail.share': 'പങ്കിടുക',
    'detail.location': 'സ്ഥലം',
    'detail.gallery': 'ചിത്ര ഗാലറി',
    'detail.videos': 'വീഡിയോകൾ',
    'languages.en': 'English',
    'languages.hi': 'हिंदी',
    'languages.te': 'తెలుగు',
    'languages.ta': 'தமிழ்',
    'languages.kn': 'ಕನ್ನಡ',
    'languages.ml': 'മലയാളം'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && savedLanguage in translations) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};