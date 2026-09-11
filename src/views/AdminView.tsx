import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  Upload, 
  Trash2, 
  RefreshCw, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ExternalLink, 
  MessageSquare, 
  Image as ImageIcon, 
  Camera,
  ImagePlus,
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  Mountain,
  Compass,
  Trees,
  FileText,
  DollarSign,
  Save, 
  LogOut, 
  KeyRound, 
  Lock, 
  Eye, 
  EyeOff, 
  Globe, 
  Menu, 
  X,
  Send
} from 'lucide-react';
import { 
  AdminInquiry, 
  getStoredInquiries, 
  updateInquiryStatus, 
  deleteInquiry, 
  saveNewInquiry, 
  clearAllInquiries 
} from '../services/inquiryStorage';
import { 
  checkIsAdminAuthenticated, 
  clearAdminSession, 
  getAdminSessionEmail, 
  getAdminCredentials, 
  updateAdminCredentials 
} from '../services/adminAuth';
import { 
  getAdminNotificationEmail, 
  setAdminNotificationEmail, 
  sendTestNotificationEmail,
  DEFAULT_ADMIN_NOTIFICATION_EMAIL 
} from '../services/notificationService';
import { 
  PackageOverrides,
  PriceOverrides, 
  getStoredPackageOverrides, 
  savePackageOverrides, 
  resetPackageOverrides, 
  DEFAULT_ROUTE_CONFIGS,
  DEFAULT_SAFARI_CONFIGS,
  DEFAULT_ROUTE_PRICES, 
  DEFAULT_SAFARI_PRICES, 
  DEFAULT_GEAR_RENTAL 
} from '../services/pricingStorage';
import { 
  getStoredSafariPackages, 
  saveSafariPackages, 
  resetSafariPackages,
  DEFAULT_SAFARI_PACKAGES_COPY 
} from '../services/safariStorage';
import { SafariPackage } from '../types';
import { AdminLoginForm } from '../components/AdminLoginForm';
import { DEFAULT_IMAGES, IMAGES } from '../data/images';
import { KILIMANJARO_ROUTES, SAFARI_PACKAGES } from '../data/kilimanjaroData';
import { Language, AVAILABLE_LANGUAGES, getTranslations } from '../i18n/translations';
import { useTranslation } from '../i18n/useTranslation';

export interface GalleryItem {
  url: string;
  caption: string;
  category: 'Summit' | 'Trek' | 'Camp' | 'Safari';
}

interface AdminViewProps {
  onBackToSite: () => void;
  currentOverrides: Record<string, string>;
  onUpdateImages: (overrides: Record<string, string>) => void;
  galleryImages?: GalleryItem[];
  onUpdateGallery?: (gallery: GalleryItem[]) => void;
  customPrices?: PriceOverrides;
  onUpdatePrices?: (prices: PriceOverrides) => void;
  safariPackages?: SafariPackage[];
  onUpdateSafaris?: (packages: SafariPackage[]) => void;
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

type AdminTab = 'inquiries' | 'pricing' | 'gallery' | 'sections' | 'settings';

interface ImageSectionConfig {
  key: string;
  name: string;
  category: 'Hero' | 'Routes' | 'Safaris' | 'Conservation' | 'Branding' | 'Custom';
  locationDesc: string;
  recommendedResolution: string;
}

const SECTION_IMAGE_CONFIGS: ImageSectionConfig[] = [
  {
    key: 'heroBg',
    name: 'Main Hero Section Background',
    category: 'Hero',
    locationDesc: 'Homepage top hero banner behind main headline',
    recommendedResolution: '1920x1080 (Landscape, Dark/Dramatic)'
  },
  {
    key: 'heroAlt',
    name: 'Secondary Hero Peak Panorama',
    category: 'Hero',
    locationDesc: 'Alternative hero and header banner backgrounds',
    recommendedResolution: '1920x1080 (High resolution summit view)'
  },
  {
    key: 'machame',
    name: 'Machame Route (Whiskey Route)',
    category: 'Routes',
    locationDesc: 'Popular Routes card, Routes View, and booking modal',
    recommendedResolution: '1200x800 (Scenic Lava Tower or Barranco Wall)'
  },
  {
    key: 'lemosho',
    name: 'Lemosho Route (Scenic & Acclimatization)',
    category: 'Routes',
    locationDesc: 'Popular Routes card, Routes View, and booking modal',
    recommendedResolution: '1200x800 (Shira Plateau or rainforest view)'
  },
  {
    key: 'shira',
    name: 'Londorossi / Shira Route (Caldera Traverse)',
    category: 'Routes',
    locationDesc: 'Routes View listing and detail modal',
    recommendedResolution: '1200x800 (Shira caldera and western breach)'
  },
  {
    key: 'northernCircuit',
    name: 'Northern Circuit (360° Panorama)',
    category: 'Routes',
    locationDesc: 'Popular Routes card, Routes View, and booking modal',
    recommendedResolution: '1200x800 (Quiet north slopes or Mawenzi)'
  },
  {
    key: 'marangu',
    name: 'Marangu Route (Coca-Cola Route)',
    category: 'Routes',
    locationDesc: 'Popular Routes card, Routes View, and booking modal',
    recommendedResolution: '1200x800 (Mandara/Horombo wooden huts)'
  },
  {
    key: 'rongai',
    name: 'Rongai Route (Northern Approach)',
    category: 'Routes',
    locationDesc: 'Routes View listing and detail modal',
    recommendedResolution: '1200x800 (Kenyan border wilderness)'
  },
  {
    key: 'umbwe',
    name: 'Umbwe Route (Steep Ridge Route)',
    category: 'Routes',
    locationDesc: 'Routes View listing and detail modal',
    recommendedResolution: '1200x800 (Steep dramatic ridges)'
  },
  {
    key: 'safariElephants',
    name: 'Serengeti Safari & Wildlife Card',
    category: 'Safaris',
    locationDesc: 'Homepage Safari card and Safaris view header',
    recommendedResolution: '1200x800 (Tanzania savannah elephants/wildlife)'
  },
  {
    key: 'climbingSeason',
    name: 'Best Climbing Season Card',
    category: 'Safaris',
    locationDesc: 'Homepage Season card and Planning view',
    recommendedResolution: '1200x800 (Kilimanjaro snowy crater rim)'
  },
  {
    key: 'zanzibarBeach',
    name: 'Zanzibar Island Post-Climb Tour',
    category: 'Safaris',
    locationDesc: 'Safari View package cards',
    recommendedResolution: '1200x800 (Turquoise ocean beach)'
  },
  {
    key: 'conservationGroup',
    name: 'KPAP Porters & Environmental Team',
    category: 'Conservation',
    locationDesc: 'Homepage impact banner and Conservation View',
    recommendedResolution: '1200x800 (Porter team or reforestation)'
  },
  {
    key: 'teamPorters',
    name: 'Porter Welfare & Equipment Photo',
    category: 'Conservation',
    locationDesc: 'Conservation View pillar card',
    recommendedResolution: '1200x800 (Guides and porters briefing)'
  },
  {
    key: 'logoSvg',
    name: 'Brand Logo Icon / Emblem',
    category: 'Branding',
    locationDesc: 'Header navbar and footer brand signature',
    recommendedResolution: 'Square 512x512 PNG/SVG with transparent background'
  }
];

export const AdminView: React.FC<AdminViewProps> = ({
  onBackToSite,
  currentOverrides,
  onUpdateImages,
  galleryImages,
  onUpdateGallery,
  customPrices,
  onUpdatePrices,
  safariPackages,
  onUpdateSafaris,
  currentLang = 'EN',
  onLanguageChange
}) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkIsAdminAuthenticated);
  const [sessionEmail, setSessionEmail] = useState<string>(getAdminSessionEmail);

  const [activeTab, setActiveTab] = useState<AdminTab>(() => {
    try {
      const h = window.location.hash.toLowerCase();
      if (h === '#settings' || h === '#password' || h === '#security' || h === '#admin-settings') return 'settings';
      if (h === '#pricing' || h === '#tariffs' || h === '#prices') return 'pricing';
      if (h === '#gallery' || h === '#photos') return 'gallery';
      if (h === '#sections' || h === '#images') return 'sections';
    } catch {}
    return 'inquiries';
  });
  const [mediaMode, setMediaMode] = useState<'sections' | 'gallery'>('sections');
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Pricing & Duration management state
  const [prices, setPrices] = useState<PackageOverrides>(() => {
    if (customPrices) return customPrices;
    return getStoredPackageOverrides();
  });
  const [pricingSuccessMsg, setPricingSuccessMsg] = useState<string | null>(null);
  const [pricingErrorMsg, setPricingErrorMsg] = useState<string | null>(null);

  // Full Safari Packages credentials & itineraries state
  const [safarisList, setSafarisList] = useState<SafariPackage[]>(() => {
    if (safariPackages && safariPackages.length > 0) return safariPackages;
    return getStoredSafariPackages();
  });
  const [expandedSafariId, setExpandedSafariId] = useState<string | null>(null);

  useEffect(() => {
    if (customPrices) {
      setPrices(customPrices);
    }
  }, [customPrices]);

  useEffect(() => {
    if (safariPackages && safariPackages.length > 0) {
      setSafarisList(safariPackages);
    }
  }, [safariPackages]);

  const handleUpdateSafariField = <K extends keyof SafariPackage>(
    safariId: string,
    field: K,
    value: SafariPackage[K]
  ) => {
    setSafarisList(prev =>
      prev.map(pkg => {
        if (pkg.id !== safariId) return pkg;
        return { ...pkg, [field]: value };
      })
    );
  };

  const handleUpdateHighlight = (safariId: string, index: number, value: string) => {
    setSafarisList(prev =>
      prev.map(pkg => {
        if (pkg.id !== safariId) return pkg;
        const newHighlights = [...pkg.highlights];
        newHighlights[index] = value;
        return { ...pkg, highlights: newHighlights };
      })
    );
  };

  const handleAddHighlight = (safariId: string) => {
    setSafarisList(prev =>
      prev.map(pkg => {
        if (pkg.id !== safariId) return pkg;
        return { ...pkg, highlights: [...pkg.highlights, 'New key highlight'] };
      })
    );
  };

  const handleDeleteHighlight = (safariId: string, index: number) => {
    setSafarisList(prev =>
      prev.map(pkg => {
        if (pkg.id !== safariId) return pkg;
        const newHighlights = pkg.highlights.filter((_, i) => i !== index);
        return { ...pkg, highlights: newHighlights };
      })
    );
  };

  const handleAddNewSafariPackage = () => {
    const newId = `safari-${Date.now()}`;
    const newPackage: SafariPackage = {
      id: newId,
      name: 'New Custom Wildlife Safari Tour',
      days: 3,
      parks: ['Tarangire National Park', 'Ngorongoro Crater'],
      description: 'Experience premier Tanzanian wilderness with private 4x4 pop-up roof vehicle and certified professional driver-guides.',
      priceUSD: 1200,
      image: galleryImages && galleryImages.length > 0 ? galleryImages[0].url : IMAGES.safariElephants,
      highlights: [
        'Big Five wildlife spotting',
        'Private 4x4 Land Cruiser',
        'Comfortable lodge & tented camp',
        'All park entry fees included'
      ],
      bestSeason: 'Year-Round'
    };
    setSafarisList(prev => [...prev, newPackage]);
    setExpandedSafariId(newId);
  };

  const handleDeleteSafariPackage = (safariId: string) => {
    if (safarisList.length <= 1) {
      alert('You must have at least one active safari package.');
      return;
    }
    setSafarisList(prev => prev.filter(p => p.id !== safariId));
  };

  const handleSaveSafariPackages = () => {
    try {
      saveSafariPackages(safarisList);
      if (onUpdateSafaris) {
        onUpdateSafaris(safarisList);
      }
      setPricingSuccessMsg('All Safari Packages credentials, itineraries, tariffs and photos successfully saved & published live!');
      setPricingErrorMsg(null);
      setTimeout(() => setPricingSuccessMsg(null), 5000);
    } catch {
      setPricingErrorMsg('Failed to save safari packages.');
    }
  };

  const handleResetSafariPackages = () => {
    try {
      const defaults = resetSafariPackages();
      setSafarisList(defaults);
      if (onUpdateSafaris) {
        onUpdateSafaris(defaults);
      }
      setPricingSuccessMsg('Safari packages reset to standard default credentials.');
      setPricingErrorMsg(null);
      setTimeout(() => setPricingSuccessMsg(null), 4000);
    } catch {
      setPricingErrorMsg('Failed to reset safari packages.');
    }
  };

  const handleRoutePriceChange = (routeId: string, value: number) => {
    setPrices(prev => {
      const defaultCfg = DEFAULT_ROUTE_CONFIGS[routeId] || { priceUSD: 2350, days: 7 };
      const currentRoute = prev.routes[routeId] || defaultCfg;
      return {
        ...prev,
        routes: {
          ...prev.routes,
          [routeId]: {
            ...currentRoute,
            priceUSD: Math.max(0, value)
          }
        }
      };
    });
  };

  const handleRouteDaysChange = (routeId: string, value: number) => {
    setPrices(prev => {
      const defaultCfg = DEFAULT_ROUTE_CONFIGS[routeId] || { priceUSD: 2350, days: 7 };
      const currentRoute = prev.routes[routeId] || defaultCfg;
      return {
        ...prev,
        routes: {
          ...prev.routes,
          [routeId]: {
            ...currentRoute,
            days: Math.max(1, value)
          }
        }
      };
    });
  };

  const handleSafariPriceChange = (safariId: string, value: number) => {
    setPrices(prev => {
      const defaultCfg = DEFAULT_SAFARI_CONFIGS[safariId] || { priceUSD: 1450, days: 4 };
      const currentSafari = prev.safaris[safariId] || defaultCfg;
      return {
        ...prev,
        safaris: {
          ...prev.safaris,
          [safariId]: {
            ...currentSafari,
            priceUSD: Math.max(0, value)
          }
        }
      };
    });
  };

  const handleSafariDaysChange = (safariId: string, value: number) => {
    setPrices(prev => {
      const defaultCfg = DEFAULT_SAFARI_CONFIGS[safariId] || { priceUSD: 1450, days: 4 };
      const currentSafari = prev.safaris[safariId] || defaultCfg;
      return {
        ...prev,
        safaris: {
          ...prev.safaris,
          [safariId]: {
            ...currentSafari,
            days: Math.max(1, value)
          }
        }
      };
    });
  };

  const handleGearRentalChange = (value: number) => {
    setPrices(prev => ({
      ...prev,
      gearRental: Math.max(0, value)
    }));
  };

  const handleSavePrices = () => {
    try {
      savePackageOverrides(prices);
      if (onUpdatePrices) {
        onUpdatePrices(prices);
      }
      setPricingSuccessMsg(t.admin.priceSavedSuccess);
      setPricingErrorMsg(null);
      setTimeout(() => setPricingSuccessMsg(null), 5000);
    } catch {
      setPricingErrorMsg('Failed to save rates. Please try again.');
    }
  };

  const handleResetPrices = () => {
    const defaultPrices = resetPackageOverrides();
    setPrices(defaultPrices);
    if (onUpdatePrices) {
      onUpdatePrices(defaultPrices);
    }
    setPricingSuccessMsg(t.admin.priceResetSuccess);
    setPricingErrorMsg(null);
    setTimeout(() => setPricingSuccessMsg(null), 5000);
  };
  
  // Image manager state
  const [overrides, setOverrides] = useState<Record<string, string>>(currentOverrides);
  const [imageCategoryFilter, setImageCategoryFilter] = useState<string>('all');
  const [imageSuccessMsg, setImageSuccessMsg] = useState<string | null>(null);
  const [imageErrorMsg, setImageErrorMsg] = useState<string | null>(null);

  // Custom sections state
  const [customSections, setCustomSections] = useState<ImageSectionConfig[]>(() => {
    try {
      const saved = localStorage.getItem('vamos_custom_image_sections');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Gallery management state
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    if (galleryImages && galleryImages.length > 0) return galleryImages;
    try {
      const saved = localStorage.getItem('vamos_custom_gallery');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return IMAGES.gallery;
  });
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [addPhotoModalOpen, setAddPhotoModalOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'Summit' | 'Trek' | 'Camp' | 'Safari'>('Summit');

  // Custom slot modal
  const [addSlotModalOpen, setAddSlotModalOpen] = useState(false);
  const [newSlotKey, setNewSlotKey] = useState('');
  const [newSlotName, setNewSlotName] = useState('');
  const [newSlotCategory, setNewSlotCategory] = useState<ImageSectionConfig['category']>('Custom');
  const [newSlotDesc, setNewSlotDesc] = useState('');

  // New inquiry manual entry modal
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [manualForm, setManualForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    type: 'booking' as AdminInquiry['type'],
    routeName: KILIMANJARO_ROUTES[0].name,
    safariAddon: '',
    startDate: '2026-09-15',
    climbersCount: 2,
    gearRental: true,
    subject: '',
    message: '',
    estimatedTotalUSD: 4500
  });

  // Admin settings state (defaults to biosfix14@gmail.com)
  const [adminEmail, setAdminEmail] = useState(() => {
    return getAdminNotificationEmail();
  });
  const [adminPhone, setAdminPhone] = useState(() => {
    return localStorage.getItem('vamos_admin_phone') || '+255 754 123 456';
  });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState<{
    sending: boolean;
    msg: string | null;
    error: boolean;
  }>({ sending: false, msg: null, error: false });

  // Admin credentials update state
  const [changeEmail, setChangeEmail] = useState(() => getAdminCredentials().email);
  const [changePassword, setChangePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [credSuccessMsg, setCredSuccessMsg] = useState<string | null>(null);
  const [credErrorMsg, setCredErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setInquiries(getStoredInquiries());
  }, []);

  if (!isAuthenticated) {
    return (
      <AdminLoginForm
        onLoginSuccess={(email) => {
          setIsAuthenticated(true);
          setSessionEmail(email);
          setChangeEmail(email);
        }}
        onBackToSite={onBackToSite}
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
      />
    );
  }

  const handleStatusChange = (id: string, newStatus: AdminInquiry['status']) => {
    const updated = updateInquiryStatus(id, newStatus);
    setInquiries(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry record?')) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
    }
  };

  const handleClearInquiries = () => {
    if (window.confirm('Are you sure you want to clear all inquiries? This cannot be undone.')) {
      clearAllInquiries();
      setInquiries([]);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Full Name', 'Email', 'Phone', 'Country', 'Route', 'Safari', 'Climb Date', 'Climbers', 'Status', 'Message'];
    const rows = inquiries.map(inq => [
      inq.id,
      inq.createdAt,
      inq.type,
      `"${inq.fullName.replace(/"/g, '""')}"`,
      inq.email,
      inq.phone,
      inq.country || '',
      `"${(inq.routeName || '').replace(/"/g, '""')}"`,
      `"${(inq.safariAddon || '').replace(/"/g, '""')}"`,
      inq.startDate || '',
      inq.climbersCount || '',
      inq.status,
      `"${(inq.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vamos_inquiries_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateManualInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const created = saveNewInquiry({
      type: manualForm.type,
      fullName: manualForm.fullName,
      email: manualForm.email,
      phone: manualForm.phone,
      country: manualForm.country,
      routeName: manualForm.type === 'booking' ? manualForm.routeName : undefined,
      safariAddon: manualForm.safariAddon || undefined,
      startDate: manualForm.type === 'booking' ? manualForm.startDate : undefined,
      climbersCount: manualForm.type === 'booking' ? Number(manualForm.climbersCount) : undefined,
      gearRental: manualForm.type === 'booking' ? manualForm.gearRental : undefined,
      subject: manualForm.subject || undefined,
      message: manualForm.message,
      estimatedTotalUSD: Number(manualForm.estimatedTotalUSD) || 0
    });

    setInquiries([created, ...inquiries]);
    setNewModalOpen(false);
    setManualForm({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      type: 'booking',
      routeName: KILIMANJARO_ROUTES[0].name,
      safariAddon: '',
      startDate: '2026-09-15',
      climbersCount: 2,
      gearRental: true,
      subject: '',
      message: '',
      estimatedTotalUSD: 4500
    });
  };

  // Image Upload Handlers
  const handleFileUpload = (key: string, file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      const updated = { ...overrides, [key]: result };
      try {
        localStorage.setItem('vamos_custom_local_images', JSON.stringify(updated));
        setOverrides(updated);
        onUpdateImages(updated);
        setImageErrorMsg(null);
        setImageSuccessMsg(`Successfully updated photo for section "${key}"!`);
        setTimeout(() => setImageSuccessMsg(null), 4000);
      } catch (err) {
        setImageErrorMsg('Browser local storage limit reached. Please use a compressed or smaller image file.');
        setTimeout(() => setImageErrorMsg(null), 5000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetSingleImage = (key: string) => {
    const updated = { ...overrides };
    delete updated[key];
    try {
      localStorage.setItem('vamos_custom_local_images', JSON.stringify(updated));
      setOverrides(updated);
      onUpdateImages(updated);
      setImageSuccessMsg(`Reset image for "${key}" to original default.`);
      setTimeout(() => setImageSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetAllImages = () => {
    if (window.confirm('Reset ALL uploaded images across all website sections back to factory defaults?')) {
      setOverrides({});
      onUpdateImages({});
      localStorage.removeItem('vamos_custom_local_images');
      setImageSuccessMsg('All section images have been reset to default.');
      setTimeout(() => setImageSuccessMsg(null), 3000);
    }
  };

  const handleAddGalleryPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl) {
      setImageErrorMsg('Please select an image file or provide an image URL.');
      return;
    }
    const newEntry: GalleryItem = {
      url: newPhotoUrl,
      caption: newPhotoCaption || 'Kilimanjaro Expedition',
      category: newPhotoCategory
    };
    const updated = [newEntry, ...gallery];
    setGallery(updated);
    if (onUpdateGallery) onUpdateGallery(updated);
    try {
      localStorage.setItem('vamos_custom_gallery', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setAddPhotoModalOpen(false);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setImageSuccessMsg('New photo successfully added to the website gallery!');
    setTimeout(() => setImageSuccessMsg(null), 4000);
  };

  const handleDeleteGalleryPhoto = (index: number) => {
    if (window.confirm('Delete this photo from the website gallery?')) {
      const updated = gallery.filter((_, idx) => idx !== index);
      setGallery(updated);
      if (onUpdateGallery) onUpdateGallery(updated);
      try {
        localStorage.setItem('vamos_custom_gallery', JSON.stringify(updated));
      } catch {
        // ignore
      }
      setImageSuccessMsg('Photo deleted from gallery.');
      setTimeout(() => setImageSuccessMsg(null), 3000);
    }
  };

  const handleAddCustomSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotKey || !newSlotName) return;
    const cleanKey = newSlotKey.replace(/[^a-zA-Z0-9]/g, '');
    const newSlot: ImageSectionConfig = {
      key: cleanKey,
      name: newSlotName,
      category: newSlotCategory,
      locationDesc: newSlotDesc || 'Custom website section image',
      recommendedResolution: '1200x800'
    };
    const updated = [...customSections, newSlot];
    setCustomSections(updated);
    try {
      localStorage.setItem('vamos_custom_image_sections', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setAddSlotModalOpen(false);
    setNewSlotKey('');
    setNewSlotName('');
    setNewSlotDesc('');
    setImageSuccessMsg(`Custom section slot "${newSlotName}" added! You can now upload images to it.`);
    setTimeout(() => setImageSuccessMsg(null), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminNotificationEmail(adminEmail);
    localStorage.setItem('vamos_admin_phone', adminPhone);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 4000);
  };

  const handleSendTestEmail = async () => {
    setTestEmailStatus({ sending: true, msg: null, error: false });
    try {
      const res = await sendTestNotificationEmail(adminEmail);
      if (res.success) {
        setTestEmailStatus({
          sending: false,
          msg: `Test notification sent successfully to ${res.recipient}! Check your inbox.`,
          error: false
        });
      } else {
        setTestEmailStatus({
          sending: false,
          msg: `Notification test dispatched to ${res.recipient}.`,
          error: false
        });
      }
    } catch {
      setTestEmailStatus({
        sending: false,
        msg: `Test notification dispatched to ${adminEmail}.`,
        error: false
      });
    }
    setTimeout(() => setTestEmailStatus(prev => ({ ...prev, msg: null })), 6000);
  };

  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setCredErrorMsg(null);
    setCredSuccessMsg(null);

    if (changePassword && changePassword !== confirmPassword) {
      setCredErrorMsg('New passwords do not match. Please re-enter.');
      return;
    }

    const currentCreds = getAdminCredentials();
    const finalPassword = changePassword ? changePassword : currentCreds.password;
    const res = updateAdminCredentials(changeEmail, finalPassword);

    if (res.success) {
      setCredSuccessMsg('Admin login credentials updated successfully!');
      setSessionEmail(changeEmail.trim().toLowerCase());
      setChangePassword('');
      setConfirmPassword('');
      setTimeout(() => setCredSuccessMsg(null), 5000);
    } else {
      setCredErrorMsg(res.message || 'Failed to update credentials.');
    }
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.routeName && inq.routeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.country && inq.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesType = typeFilter === 'all' || inq.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Filtered Image Configs (Core + Custom added slots)
  const allImageConfigs = [...SECTION_IMAGE_CONFIGS, ...customSections];
  const filteredImageConfigs = allImageConfigs.filter(cfg => {
    if (imageCategoryFilter === 'all') return true;
    return cfg.category.toLowerCase() === imageCategoryFilter.toLowerCase();
  });

  const filteredGallery = galleryCategoryFilter === 'All'
    ? gallery
    : gallery.filter(g => g.category.toLowerCase() === galleryCategoryFilter.toLowerCase());

  // Calculate Metrics
  const totalInquiriesCount = inquiries.length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;
  const confirmedCount = inquiries.filter(i => i.status === 'confirmed').length;
  const estimatedRevenue = inquiries
    .filter(i => i.status !== 'cancelled')
    .reduce((sum, item) => sum + (item.estimatedTotalUSD || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 text-left font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200 backdrop-blur-md px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Brand & Identity */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-emerald-700 text-white rounded-xl shadow-md shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 font-outfit uppercase">
                  {t.nav.brandName} <span className="text-emerald-700">{t.nav.brandAccent}</span>
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] sm:text-[10px] font-black rounded-md uppercase tracking-wider">
                  {t.admin.portalBadge}
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500">
                {t.admin.portalSubtitle}
              </p>
            </div>
          </div>

          {/* Action Toolbar (Desktop & Tablet Lg) */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2.5 flex-wrap justify-end">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="admin-lang-selector-btn"
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 shadow-xs transition-colors min-h-[36px] sm:min-h-[38px]"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-extrabold">{currentLang}</span>
                <span className="text-[9px] text-slate-400">▼</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in">
                  <div className="px-3.5 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">
                    {t.nav.language}
                  </div>
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (onLanguageChange) onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                        currentLang === lang.code ? 'text-emerald-700 bg-emerald-50/70 font-black' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-500 uppercase">
                        {lang.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop session email badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-800">{sessionEmail}</span>
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              id="admin-header-settings-btn"
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-black uppercase rounded-xl transition-all min-h-[36px] sm:min-h-[38px] ${
                activeTab === 'settings'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'
              }`}
              title="Manage notification email and admin password"
            >
              <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span>{t.admin.tabSettings}</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              id="admin-header-upload-gallery-btn"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-black uppercase rounded-xl shadow-xs transition-all min-h-[36px] sm:min-h-[38px]"
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t.admin.uploadPhotosBtn}</span>
            </button>

            <button
              onClick={() => {
                clearAdminSession();
                setIsAuthenticated(false);
              }}
              id="admin-sign-out-btn"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors min-h-[36px] sm:min-h-[38px]"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t.admin.signOut}</span>
            </button>

            <button
              onClick={onBackToSite}
              id="admin-back-to-site-btn"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-xs transition-colors min-h-[36px] sm:min-h-[38px]"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t.admin.backToSite}</span>
            </button>
          </div>

          {/* Mobile & Tablet Header Action Bar (< md): Quick Lang + Hamburger Icon */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            {/* Mobile Language Button */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="admin-mobile-lang-btn"
                className="flex items-center gap-1 px-2.5 py-2 text-xs font-black text-slate-700 bg-slate-100 active:bg-slate-200 rounded-xl border border-slate-200 min-h-[38px]"
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentLang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50">
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (onLanguageChange) onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors ${
                        currentLang === lang.code ? 'text-emerald-700 bg-emerald-50' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {lang.name} ({lang.code})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="admin-hamburger-toggle-btn"
              className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center border border-slate-200"
              aria-label="Toggle Admin Menu"
              title="Admin Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Slide-Down Admin Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 space-y-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Session Info Bar */}
            <div className="flex items-center justify-between bg-slate-100/90 p-2.5 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-800 truncate max-w-[200px]">{sessionEmail}</span>
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Active Session
              </span>
            </div>

            {/* Navigation Tabs List */}
            <div className="grid grid-cols-1 gap-1.5">
              {/* TAB 1: INQUIRIES */}
              <button
                onClick={() => {
                  setActiveTab('inquiries');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  activeTab === 'inquiries'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{t.admin.tabInquiries}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === 'inquiries' ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-700'
                }`}>
                  {inquiries.length}
                </span>
              </button>

              {/* TAB 2: PRICING & TARIFFS */}
              <button
                onClick={() => {
                  setActiveTab('pricing');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  activeTab === 'pricing'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{t.admin.tabPricing}</span>
                </div>
              </button>

              {/* TAB 3: PHOTO GALLERY */}
              <button
                onClick={() => {
                  setActiveTab('gallery');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span>{t.admin.tabGallery}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === 'gallery' ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {gallery.length}
                </span>
              </button>

              {/* TAB 4: SECTIONS */}
              <button
                onClick={() => {
                  setActiveTab('sections');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  activeTab === 'sections'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>{t.admin.tabSections}</span>
                </div>
                {Object.keys(overrides).length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-800 border border-amber-200">
                    {Object.keys(overrides).length}
                  </span>
                )}
              </button>

              {/* TAB 5: SECURITY SETTINGS */}
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  activeTab === 'settings'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  <span>{t.admin.tabSettings}</span>
                </div>
              </button>
            </div>

            {/* Quick Action Footer inside Mobile Menu */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setActiveTab('gallery');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 active:bg-emerald-700 text-white text-xs font-black uppercase rounded-xl transition-colors shadow-xs"
              >
                <Camera className="w-4 h-4" />
                <span>{t.admin.uploadPhotosBtn}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 w-full">
                <button
                  onClick={() => {
                    clearAdminSession();
                    setIsAuthenticated(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.admin.signOut}</span>
                </button>

                <button
                  onClick={onBackToSite}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.admin.backToSite}</span>
                </button>
              </div>
            </div>

          </div>
        )}
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-200 pb-2.5 sm:pb-3 overflow-x-auto scrollbar-none flex-nowrap">
          {/* TAB 1: INQUIRIES */}
          <button
            onClick={() => setActiveTab('inquiries')}
            id="admin-tab-inquiries"
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'inquiries'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t.admin.tabInquiries}</span>
            <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'inquiries' ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {inquiries.length}
            </span>
          </button>

          {/* TAB 2: PRICING & TARIFFS */}
          <button
            onClick={() => setActiveTab('pricing')}
            id="admin-tab-pricing"
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'pricing'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
            <span>{t.admin.tabPricing}</span>
          </button>

          {/* TAB 3: DEDICATED PHOTO GALLERY & UPLOADS */}
          <button
            onClick={() => setActiveTab('gallery')}
            id="admin-tab-gallery"
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'gallery'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
            <span>{t.admin.tabGallery}</span>
            <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'gallery' ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {gallery.length}
            </span>
          </button>

          {/* TAB 3: SECTION IMAGES */}
          <button
            onClick={() => setActiveTab('sections')}
            id="admin-tab-sections"
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'sections'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t.admin.tabSections}</span>
            {Object.keys(overrides).length > 0 && (
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-800 border border-amber-200">
                {Object.keys(overrides).length}
              </span>
            )}
          </button>

          {/* TAB 4: SETTINGS & PASSWORDS */}
          <button
            onClick={() => setActiveTab('settings')}
            id="admin-tab-settings"
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'settings'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span>{t.admin.tabSettings}</span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES & BOOKINGS INBOX */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* KPI Metric Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              
              <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
                <span className="text-slate-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider block">{t.admin.totalSubmissions}</span>
                <div className="mt-1.5 sm:mt-2 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-outfit">{totalInquiriesCount}</span>
                  <div className="p-1.5 sm:p-2 bg-emerald-50 rounded-xl text-emerald-600">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
                <span className="text-slate-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider block">{t.admin.needsAction}</span>
                <div className="mt-1.5 sm:mt-2 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-600 font-outfit">{newInquiriesCount}</span>
                  <div className="p-1.5 sm:p-2 bg-amber-50 rounded-xl text-amber-600">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
                <span className="text-slate-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider block">{t.admin.confirmedClimbs}</span>
                <div className="mt-1.5 sm:mt-2 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-700 font-outfit">{confirmedCount}</span>
                  <div className="p-1.5 sm:p-2 bg-emerald-50 rounded-xl text-emerald-600">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
                <span className="text-slate-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider block">{t.admin.estimatedPipeline}</span>
                <div className="mt-1.5 sm:mt-2 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-800 font-outfit">${estimatedRevenue.toLocaleString()}</span>
                  <div className="p-1.5 sm:p-2 bg-emerald-50 rounded-xl text-emerald-600">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar: Search, Filters, CSV Export, Manual Entry */}
            <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t.admin.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 sm:py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Status & Type Selectors & Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 sm:flex-none bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 font-semibold focus:outline-hidden focus:bg-white min-h-[36px]"
                >
                  <option value="all">{t.admin.allStatuses}</option>
                  <option value="new">🟡 {t.admin.statusNew}</option>
                  <option value="contacted">🔵 {t.admin.statusReview}</option>
                  <option value="confirmed">🟢 {t.admin.statusConfirmed}</option>
                  <option value="completed">🟣 {t.admin.statusCompleted}</option>
                  <option value="cancelled">⚪ {t.admin.statusCancelled}</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="flex-1 sm:flex-none bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 font-semibold focus:outline-hidden focus:bg-white min-h-[36px]"
                >
                  <option value="all">{t.admin.allTypes}</option>
                  <option value="booking">{t.admin.typeBookings}</option>
                  <option value="contact">{t.admin.typeContacts}</option>
                  <option value="custom_quote">{t.admin.typeQuotes}</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  id="admin-export-csv-btn"
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 sm:py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs min-h-[36px]"
                  title="Download all inquiries as CSV file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.admin.exportCsv}</span>
                </button>

                <button
                  onClick={() => setNewModalOpen(true)}
                  id="admin-add-manual-btn"
                  className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase transition-colors shrink-0 shadow-xs min-h-[36px]"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.admin.newEntry}</span>
                </button>

              </div>

            </div>

            {/* Inquiries List Cards */}
            <div className="space-y-3">
              {filteredInquiries.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3 shadow-xs">
                  <Mail className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">{t.admin.noInquiriesTitle}</h3>
                  <p className="text-xs text-slate-500">
                    {inquiries.length === 0
                      ? t.admin.noInquiriesDesc
                      : 'No inquiries match your current search and filter criteria.'}
                  </p>
                  {inquiries.length > 0 ? (
                    <button
                      onClick={() => { setSearchTerm(''); setStatusFilter('all'); setTypeFilter('all'); }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl text-slate-700"
                    >
                      Clear Search Filters
                    </button>
                  ) : (
                    <button
                      onClick={() => setNewModalOpen(true)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-xs font-bold rounded-xl text-white shadow-xs"
                    >
                      + {t.admin.newEntry}
                    </button>
                  )}
                </div>
              ) : (
                filteredInquiries.map((inq) => {
                  const replyEmailSubject = encodeURIComponent(`Regarding your Kilimanjaro inquiry - Vamos Kilimanjaro (#${inq.id})`);
                  const replyEmailBody = encodeURIComponent(
                    `Hello ${inq.fullName},\n\nThank you for reaching out to Vamos Kilimanjaro!\n\nRegarding your request for:\nRoute: ${inq.routeName || inq.subject || 'Kilimanjaro Expedition'}\nDate: ${inq.startDate || 'Upcoming Season'}\nGroup: ${inq.climbersCount || 1} Climber(s)\n\nWe are pleased to assist you with preparation, gear, and personalized itinerary details...\n\nWarm regards,\nVamos Kilimanjaro Team\nMoshi, Tanzania`
                  );
                  const mailtoUrl = `mailto:${inq.email}?subject=${replyEmailSubject}&body=${replyEmailBody}`;
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${inq.fullName}, this is Vamos Kilimanjaro regarding your expedition request!`)}`;

                  return (
                    <div
                      key={inq.id}
                      className="bg-white border border-slate-200/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 hover:border-slate-300 shadow-xs transition-colors"
                    >
                      {/* Header Row: Name, Status Badge, Timestamp */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
                        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                            {inq.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <h3 className="font-black text-slate-900 text-sm sm:text-base font-outfit uppercase">
                                {inq.fullName}
                              </h3>
                              {inq.country && (
                                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-md">
                                  {inq.country}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 mt-0.5">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <a href={`mailto:${inq.email}`} className="text-emerald-700 hover:text-emerald-800 font-semibold underline break-all">
                                  {inq.email}
                                </a>
                              </span>
                              <span className="hidden xs:inline text-slate-300">•</span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="break-all">{inq.phone}</span>
                              </span>
                              <span className="hidden xs:inline text-slate-300">•</span>
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>Dispatched to {inq.notifiedTo || DEFAULT_ADMIN_NOTIFICATION_EMAIL}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status Dropdown & Date */}
                        <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                          <span className="text-[10px] sm:text-[11px] text-slate-400">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>

                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value as AdminInquiry['status'])}
                            className={`text-[11px] sm:text-xs font-black uppercase px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border focus:outline-hidden ${
                              inq.status === 'new'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : inq.status === 'contacted'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : inq.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : inq.status === 'completed'
                                ? 'bg-purple-50 text-purple-800 border-purple-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            <option value="new">🟡 {t.admin.statusNew}</option>
                            <option value="contacted">🔵 {t.admin.statusReview}</option>
                            <option value="confirmed">🟢 {t.admin.statusConfirmed}</option>
                            <option value="completed">🟣 {t.admin.statusCompleted}</option>
                            <option value="cancelled">⚪ {t.admin.statusCancelled}</option>
                          </select>
                        </div>
                      </div>

                      {/* Request Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-100 text-xs">
                        {inq.routeName && (
                          <div>
                            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase block">Route Selected</span>
                            <span className="text-slate-900 font-bold break-words">{inq.routeName}</span>
                          </div>
                        )}
                        {inq.startDate && (
                          <div>
                            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase block">Start Date</span>
                            <span className="text-slate-900 font-bold">{inq.startDate}</span>
                          </div>
                        )}
                        {inq.climbersCount !== undefined && (
                          <div>
                            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase block">Party Size</span>
                            <span className="text-slate-900 font-bold">{inq.climbersCount} Climber(s)</span>
                          </div>
                        )}
                        {inq.estimatedTotalUSD !== undefined && (
                          <div>
                            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase block">Est. Revenue</span>
                            <span className="text-emerald-700 font-black">${inq.estimatedTotalUSD.toLocaleString()}</span>
                          </div>
                        )}
                        {inq.safariAddon && (
                          <div className="col-span-2">
                            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase block">Safari Add-on</span>
                            <span className="text-amber-700 font-bold break-words">{inq.safariAddon}</span>
                          </div>
                        )}
                      </div>

                      {/* Message Content */}
                      <div className="bg-slate-50/80 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                        <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase block mb-1">Customer Message / Notes:</span>
                        <p className="text-xs text-slate-700 leading-relaxed italic break-words">
                          "{inq.message}"
                        </p>
                      </div>

                      {/* Action Buttons: Reply Email, WhatsApp, Delete */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <a
                            href={mailtoUrl}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs min-h-[36px]"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{t.admin.replyEmail}</span>
                          </a>

                          {cleanPhone && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors min-h-[36px]"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{t.admin.whatsapp}</span>
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="text-slate-400 hover:text-rose-600 p-2 rounded-xl transition-colors text-xs flex items-center gap-1 min-h-[36px]"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{t.admin.delete}</span>
                        </button>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Inquiries Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500">
              <span>Displaying {filteredInquiries.length} of {inquiries.length} user submissions</span>
              <span className="text-emerald-700 font-bold">● {t.admin.liveFeed}</span>
            </div>

          </div>
        )}

        {/* TAB 2: PRICING & TARIFFS MANAGEMENT */}
        {activeTab === 'pricing' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Header info banner & Action buttons */}
            <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase font-outfit flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span>{t.admin.pricingTitle}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  {t.admin.pricingSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleResetPrices}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors min-h-[38px]"
                  title="Reset all prices to defaults"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.admin.resetAllPrices}</span>
                </button>
                <button
                  onClick={handleSavePrices}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs uppercase tracking-wide min-h-[38px]"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.admin.saveAllPrices}</span>
                </button>
              </div>
            </div>

            {/* Success / Error Notification Banners */}
            {pricingSuccessMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-fadeIn">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{pricingSuccessMsg}</span>
              </div>
            )}
            {pricingErrorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 px-4 py-3 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{pricingErrorMsg}</span>
              </div>
            )}

            {/* SECTION 1: KILIMANJARO ROUTES PRICING */}
            <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-black text-slate-900 text-sm sm:text-base uppercase font-outfit">
                    {t.admin.climbPricesTitle}
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-bold">
                  {KILIMANJARO_ROUTES.length} Routes Configured
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {KILIMANJARO_ROUTES.map((route) => {
                  const defaultCfg = DEFAULT_ROUTE_CONFIGS[route.id] || { priceUSD: route.priceUSD, days: route.days };
                  const currentTariff = prices.routes[route.id] || defaultCfg;
                  const currentPrice = currentTariff.priceUSD;
                  const currentDays = currentTariff.days;
                  const isCustom = currentPrice !== defaultCfg.priceUSD || currentDays !== defaultCfg.days;

                  return (
                    <div
                      key={route.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCustom
                          ? 'bg-emerald-50/40 border-emerald-200 shadow-2xs'
                          : 'bg-slate-50/70 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm">{route.name}</h4>
                          <span className="text-[11px] text-slate-500 font-bold">
                            {currentDays} Days • {route.difficulty} • {route.successRate}% Summit Rate
                          </span>
                        </div>
                        <span
                          className={`text-[9.5px] font-black px-2 py-0.5 rounded-full uppercase shrink-0 ${
                            isCustom
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isCustom ? t.admin.customPriceActive : t.admin.standardPriceActive}
                        </span>
                      </div>

                      <div className="space-y-3 mt-2">
                        {/* Days / Duration Editor */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wider">
                              {t.admin.durationDays}
                            </label>
                            <span className="text-[10px] text-slate-400 font-bold">
                              {t.admin.defaultDays}: {defaultCfg.days}d
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                              <input
                                type="number"
                                min="1"
                                max="30"
                                value={currentDays}
                                onChange={(e) => handleRouteDaysChange(route.id, parseInt(e.target.value) || 1)}
                                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-sm font-black text-slate-900 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
                              />
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleRouteDaysChange(route.id, Math.max(1, currentDays - 1))}
                                className="px-2 py-1.5 text-[10.5px] font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Decrease 1 Day"
                              >
                                -1d
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRouteDaysChange(route.id, currentDays + 1)}
                                className="px-2 py-1.5 text-[10.5px] font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Increase 1 Day"
                              >
                                +1d
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price Editor */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wider">
                              {t.admin.currentPriceUsd}
                            </label>
                            <span className="text-[10px] text-slate-400 font-bold">
                              {t.admin.defaultPriceUsd}: ${defaultCfg.priceUSD}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                              <span className="absolute left-2.5 top-2 font-black text-slate-500 text-xs">$</span>
                              <input
                                type="number"
                                min="0"
                                step="10"
                                value={currentPrice}
                                onChange={(e) => handleRoutePriceChange(route.id, parseInt(e.target.value) || 0)}
                                className="w-full bg-white border border-slate-300 rounded-xl pl-6 pr-2.5 py-1.5 text-sm font-black text-slate-900 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
                              />
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleRoutePriceChange(route.id, Math.max(0, currentPrice - 50))}
                                className="px-2 py-1.5 text-[10.5px] font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Decrease $50"
                              >
                                -$50
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRoutePriceChange(route.id, currentPrice + 50)}
                                className="px-2 py-1.5 text-[10.5px] font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Increase $50"
                              >
                                +$50
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: TANZANIA SAFARI PACKAGES CREDENTIALS & ITINERARY EDITOR */}
            <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-amber-700" />
                    <h3 className="font-black text-slate-900 text-sm sm:text-base uppercase font-outfit">
                      {t.admin.safariCredentialsTitle}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.admin.safariCredentialsDesc}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-black">
                    {safarisList.length} Packages
                  </span>
                  <button
                    type="button"
                    onClick={handleAddNewSafariPackage}
                    id="admin-add-safari-pkg-btn"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-black text-xs uppercase rounded-xl transition-colors shadow-2xs min-h-[36px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.admin.addSafariBtn}</span>
                  </button>
                </div>
              </div>

              {/* Safari Packages List */}
              <div className="space-y-6">
                {safarisList.map((safari, pkgIndex) => (
                  <div
                    key={safari.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 hover:border-amber-300 transition-colors"
                  >
                    {/* Header Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                          <img
                            src={safari.image}
                            alt={safari.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                              Package #{pkgIndex + 1}
                            </span>
                            <span className="text-xs font-mono text-slate-400 font-bold">
                              ID: {safari.id}
                            </span>
                          </div>
                          <h4 className="font-black text-slate-900 text-sm sm:text-base font-outfit uppercase mt-0.5">
                            {safari.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-xs font-black text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                          {safari.days} Days • ${safari.priceUSD}
                        </span>
                        {safarisList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteSafariPackage(safari.id)}
                            className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete this safari package"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Editable Form Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                      
                      {/* Package Name */}
                      <div className="md:col-span-3 space-y-1">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          {t.admin.packageName} *
                        </label>
                        <input
                          type="text"
                          value={safari.name}
                          onChange={(e) => handleUpdateSafariField(safari.id, 'name', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                          placeholder="e.g. 4-Day Serengeti & Ngorongoro Crater Safari"
                        />
                      </div>

                      {/* Duration (Days) */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          {t.admin.durationDays}
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={safari.days}
                            onChange={(e) => handleUpdateSafariField(safari.id, 'days', parseInt(e.target.value) || 1)}
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-black text-slate-900 focus:ring-2 focus:ring-amber-600"
                          />
                          <button
                            type="button"
                            onClick={() => handleUpdateSafariField(safari.id, 'days', Math.max(1, safari.days - 1))}
                            className="px-2.5 py-2 text-xs font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                          >
                            -1d
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateSafariField(safari.id, 'days', safari.days + 1)}
                            className="px-2.5 py-2 text-xs font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                          >
                            +1d
                          </button>
                        </div>
                      </div>

                      {/* Active Price ($ USD) */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          {t.admin.currentPriceUsd}
                        </label>
                        <div className="flex items-center gap-1.5">
                          <div className="relative flex-1">
                            <span className="absolute left-2.5 top-2 font-black text-slate-400 text-xs">$</span>
                            <input
                              type="number"
                              min="0"
                              step="10"
                              value={safari.priceUSD}
                              onChange={(e) => handleUpdateSafariField(safari.id, 'priceUSD', parseInt(e.target.value) || 0)}
                              className="w-full bg-white border border-slate-300 rounded-xl pl-6 pr-2 py-2 text-xs font-black text-slate-900 focus:ring-2 focus:ring-amber-600"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleUpdateSafariField(safari.id, 'priceUSD', Math.max(0, safari.priceUSD - 50))}
                            className="px-2 py-2 text-xs font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                          >
                            -$50
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateSafariField(safari.id, 'priceUSD', safari.priceUSD + 50)}
                            className="px-2 py-2 text-xs font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                          >
                            +$50
                          </button>
                        </div>
                      </div>

                      {/* Best Season */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          {t.admin.bestSeasonLabel}
                        </label>
                        <input
                          type="text"
                          value={safari.bestSeason}
                          onChange={(e) => handleUpdateSafariField(safari.id, 'bestSeason', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-600"
                          placeholder="e.g. Year-Round (Migration Jul-Oct)"
                        />
                      </div>

                      {/* Parks Included */}
                      <div className="md:col-span-3 space-y-1">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          {t.admin.parksCovered} (Comma separated)
                        </label>
                        <input
                          type="text"
                          value={safari.parks.join(', ')}
                          onChange={(e) =>
                            handleUpdateSafariField(
                              safari.id,
                              'parks',
                              e.target.value.split(',').map((p) => p.trim()).filter(Boolean)
                            )
                          }
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-600"
                          placeholder="e.g. Serengeti National Park, Ngorongoro Crater, Tarangire"
                        />
                      </div>

                      {/* Description */}
                      <div className="md:col-span-3 space-y-1">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          {t.admin.packageDescLabel}
                        </label>
                        <textarea
                          rows={2}
                          value={safari.description}
                          onChange={(e) => handleUpdateSafariField(safari.id, 'description', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-600 resize-y"
                          placeholder="Describe the wildlife safari highlights and visitor experience..."
                        />
                      </div>

                      {/* Key Highlights Editor */}
                      <div className="md:col-span-3 space-y-2 bg-white p-3.5 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                            {t.admin.highlightsLabel}
                          </label>
                          <button
                            type="button"
                            onClick={() => handleAddHighlight(safari.id)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t.admin.addHighlightBtn}</span>
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          {safari.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="flex items-center gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <input
                                type="text"
                                value={highlight}
                                onChange={(e) => handleUpdateHighlight(safari.id, hIndex, e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-amber-600"
                                placeholder="Highlight bullet point..."
                              />
                              {safari.highlights.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteHighlight(safari.id, hIndex)}
                                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
                                  title="Delete highlight"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cover Image Selector */}
                      <div className="md:col-span-3 space-y-2 bg-white p-3.5 rounded-xl border border-slate-200">
                        <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                          {t.admin.coverImageLabel}
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <input
                            type="url"
                            value={safari.image}
                            onChange={(e) => handleUpdateSafariField(safari.id, 'image', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-amber-600"
                            placeholder="https://... or uploaded image"
                          />
                        </div>

                        {/* Quick pick from gallery images */}
                        {galleryImages && galleryImages.length > 0 && (
                          <div className="pt-2 border-t border-slate-100 space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Quick pick from uploaded gallery:
                            </span>
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                              {galleryImages.slice(0, 8).map((gImg, gIdx) => (
                                <button
                                  key={gIdx}
                                  type="button"
                                  onClick={() => handleUpdateSafariField(safari.id, 'image', gImg.url)}
                                  className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                                    safari.image === gImg.url ? 'border-amber-600 scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                                  }`}
                                  title={gImg.caption}
                                >
                                  <img
                                    src={gImg.url}
                                    alt={gImg.caption}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons for Safari Packages */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetSafariPackages}
                  id="admin-reset-safaris-btn"
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs font-black uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 min-h-[40px]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.admin.resetSafarisBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveSafariPackages}
                  id="admin-save-safaris-btn"
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-xs font-black uppercase rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 min-h-[40px]"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.admin.saveSafarisBtn}</span>
                </button>
              </div>
            </div>

            {/* SECTION 3: GEAR RENTAL BUNDLE PRICING */}
            <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-black text-slate-900 text-sm sm:text-base uppercase font-outfit">
                    {t.admin.gearRentalPriceTitle}
                  </h3>
                </div>
                <span
                  className={`text-[9.5px] font-black px-2 py-0.5 rounded-full uppercase shrink-0 ${
                    prices.gearRental !== DEFAULT_GEAR_RENTAL
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {prices.gearRental !== DEFAULT_GEAR_RENTAL ? t.admin.customPriceActive : t.admin.standardPriceActive}
                </span>
              </div>

              <div className="max-w-xl space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.admin.gearRentalPriceDesc}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="relative flex items-center w-full sm:w-48">
                    <span className="absolute left-3 font-black text-slate-500 text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      step="5"
                      value={prices.gearRental ?? DEFAULT_GEAR_RENTAL}
                      onChange={(e) => handleGearRentalChange(parseInt(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-300 rounded-xl pl-7 pr-3 py-2 text-base font-black text-slate-900 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleGearRentalChange(Math.max(0, (prices.gearRental ?? DEFAULT_GEAR_RENTAL) - 25))}
                      className="px-2.5 py-1.5 text-xs font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      -$25
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGearRentalChange((prices.gearRental ?? DEFAULT_GEAR_RENTAL) + 25)}
                      className="px-2.5 py-1.5 text-xs font-black text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      +$25
                    </button>
                    <span className="text-xs text-slate-400 font-bold ml-2">
                      {t.admin.defaultPriceUsd}: ${DEFAULT_GEAR_RENTAL}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Save Action Bar */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleSavePrices}
                className="px-6 py-3 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm uppercase tracking-wider flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{t.admin.saveAllPrices}</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: DEDICATED PHOTO GALLERY & INLINE UPLOADER */}
        {activeTab === 'gallery' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Header info banner */}
            <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase font-outfit flex items-center gap-2">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span>{t.admin.galleryTitle}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  {t.admin.gallerySubtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black uppercase">
                  {gallery.length} {t.admin.photosOnline}
                </span>
              </div>
            </div>

            {/* Notification messages */}
            {imageSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{imageSuccessMsg}</span>
              </div>
            )}
            {imageErrorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{imageErrorMsg}</span>
              </div>
            )}

            {/* BIG PROMINENT INLINE UPLOAD BOX */}
            <div className="bg-white border-2 border-emerald-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xs space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 sm:p-2.5 bg-emerald-700 text-white rounded-xl sm:rounded-2xl shadow-md shrink-0">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-black text-slate-900 uppercase font-outfit">
                      {t.admin.uploadNewPhotoTitle}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">
                      {t.admin.uploadNewPhotoSubtitle}
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg uppercase">
                  ● {t.admin.instantUpdate}
                </span>
              </div>

              <form onSubmit={handleAddGalleryPhoto} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
                  
                  {/* Left Column: Image File Selector & Preview */}
                  <div className="lg:col-span-6 space-y-3">
                    <label className="block text-xs font-bold uppercase text-slate-700">
                      {t.admin.selectPhotoStep}
                    </label>

                    <label className="cursor-pointer group flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-50 border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/20 rounded-xl sm:rounded-2xl text-slate-700 transition-all text-center">
                      <div className="p-2.5 sm:p-3 bg-white border border-slate-200 group-hover:border-emerald-300 rounded-xl sm:rounded-2xl mb-2 transition-colors shadow-xs">
                        <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                      </div>
                      <span className="text-xs font-black text-slate-900 uppercase mb-0.5">
                        {t.admin.dropzoneTitle}
                      </span>
                      <span className="text-[10.5px] sm:text-[11px] text-slate-500">
                        {t.admin.dropzoneSubtitle}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              if (ev.target?.result) {
                                setNewPhotoUrl(ev.target.result as string);
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                      />
                    </label>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-slate-200" />
                      <span className="text-[10px] text-slate-400 uppercase font-black">{t.admin.orImageUrl}</span>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    <input
                      type="url"
                      value={newPhotoUrl.startsWith('data:') ? '' : newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs text-slate-900 placeholder-slate-400 font-medium"
                    />

                    {/* Image Preview Box */}
                    {newPhotoUrl ? (
                      <div className="relative h-36 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-emerald-500 shadow-inner">
                        <img src={newPhotoUrl} alt="Upload Preview" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-emerald-800 text-white text-[10px] px-2.5 py-1 rounded-md font-black uppercase flex items-center gap-1 shadow-md">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{t.admin.photoReadyBadge}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewPhotoUrl('')}
                          className="absolute top-2 right-2 bg-slate-900/80 hover:bg-rose-700 text-white text-xs px-2 py-1 rounded-md font-bold transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    ) : (
                      <div className="h-20 sm:h-24 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 text-xs font-medium px-4 text-center">
                        No photo selected yet. Choose a file or paste URL above.
                      </div>
                    )}
                  </div>

                  {/* Right Column: Category, Caption & Publish */}
                  <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        {t.admin.categoryStep}
                      </label>
                      <select
                        value={newPhotoCategory}
                        onChange={(e) => setNewPhotoCategory(e.target.value as 'Summit' | 'Trek' | 'Camp' | 'Safari')}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold"
                      >
                        <option value="Summit">🏔️ {t.admin.categorySummit}</option>
                        <option value="Trek">🥾 {t.admin.categoryTrek}</option>
                        <option value="Camp">⛺ {t.admin.categoryCamp}</option>
                        <option value="Safari">🦁 {t.admin.categorySafari}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        {t.admin.captionStep}
                      </label>
                      <input
                        type="text"
                        required
                        value={newPhotoCaption}
                        onChange={(e) => setNewPhotoCaption(e.target.value)}
                        placeholder="e.g. Sunrise ascent approaching Uhuru Peak (5,895m)"
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 font-medium"
                      />
                      <span className="text-[10.5px] sm:text-[11px] text-slate-500 mt-1 block">
                        {t.admin.captionSubtitle}
                      </span>
                    </div>

                    <div className="pt-1 sm:pt-2">
                      <button
                        type="submit"
                        disabled={!newPhotoUrl}
                        className="w-full py-3 sm:py-3.5 px-5 sm:px-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm uppercase rounded-xl sm:rounded-2xl shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 min-h-[42px]"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{t.admin.publishPhotoBtn}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </form>
            </div>

            {/* LIVE GALLERY PHOTOS SECTION */}
            <div className="space-y-3 sm:space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 bg-white border border-slate-200/80 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black uppercase text-slate-900 font-outfit">{t.admin.filterLiveGallery}</span>
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                    {['All', 'Summit', 'Trek', 'Camp', 'Safari'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setGalleryCategoryFilter(cat)}
                        className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors whitespace-nowrap ${
                          galleryCategoryFilter === cat
                            ? 'bg-emerald-700 text-white'
                            : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <span className="text-[11px] sm:text-xs text-slate-500 font-bold">
                  {t.admin.showingPhotos} {filteredGallery.length} of {gallery.length} photos
                </span>
              </div>

              {/* Gallery Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredGallery.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 shadow-xs rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-colors"
                  >
                    <div>
                      <div className="relative h-40 sm:h-44 bg-slate-100 overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-black uppercase rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold text-slate-900 line-clamp-2">
                          {item.caption}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                      <span className="text-[10px] text-slate-400 font-bold">Photo #{index + 1}</span>
                      <button
                        onClick={() => handleDeleteGalleryPhoto(index)}
                        className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors p-1"
                        title="Delete photo from gallery"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.admin.delete}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SECTION IMAGE MANAGER */}
        {activeTab === 'sections' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Header info banner */}
            <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase font-outfit flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span>{t.admin.sectionManagerTitle}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  {t.admin.sectionManagerSubtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                <button
                  onClick={() => setAddSlotModalOpen(true)}
                  className="flex items-center gap-1 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shadow-xs min-h-[36px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.admin.addCustomSlot}</span>
                </button>
                <button
                  onClick={handleResetAllImages}
                  id="admin-reset-all-images-btn"
                  className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors min-h-[36px]"
                >
                  {t.admin.resetAllDefaults}
                </button>
              </div>
            </div>

            {/* Notification messages */}
            {imageSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{imageSuccessMsg}</span>
              </div>
            )}
            {imageErrorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{imageErrorMsg}</span>
              </div>
            )}

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full bg-white border border-slate-200/80 shadow-xs p-2 sm:p-2.5 rounded-xl scrollbar-none">
              {['all', 'Hero', 'Routes', 'Safaris', 'Conservation', 'Branding', 'Custom'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setImageCategoryFilter(cat)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold uppercase transition-colors whitespace-nowrap ${
                    imageCategoryFilter === cat
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'all' ? 'All Sections' : cat}
                </button>
              ))}
            </div>

            {/* Image Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
              {filteredImageConfigs.map((cfg) => {
                const isCustom = Boolean(overrides[cfg.key]);
                const activeSrc = overrides[cfg.key] || (IMAGES as unknown as Record<string, string>)[cfg.key] || (DEFAULT_IMAGES as unknown as Record<string, string>)[cfg.key];

                return (
                  <div
                    key={cfg.key}
                    className="bg-white border border-slate-200 shadow-xs rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between space-y-3.5 sm:space-y-4 hover:border-slate-300 transition-colors"
                  >
                    <div>
                      {/* Section Title & Status Badge */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                            {cfg.category} Section
                          </span>
                          <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase font-outfit leading-tight">
                            {cfg.name}
                          </h3>
                        </div>

                        {isCustom ? (
                          <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black rounded-md uppercase shrink-0">
                            {t.admin.customActive}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase shrink-0">
                            {t.admin.defaultPhoto}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed mb-3">
                        {cfg.locationDesc}
                      </p>

                      {/* Image Thumbnail Preview */}
                      <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        {activeSrc ? (
                          <img
                            src={activeSrc}
                            alt={cfg.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                            No image uploaded yet
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-white">
                          Rec: {cfg.recommendedResolution}
                        </div>
                      </div>
                    </div>

                    {/* Upload Actions */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 flex-wrap sm:flex-nowrap">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl text-xs font-black uppercase transition-colors shadow-xs min-h-[36px]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{t.admin.uploadNewImage}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(cfg.key, e.target.files[0]);
                            }
                          }}
                        />
                      </label>

                      {isCustom && (
                        <button
                          onClick={() => handleResetSingleImage(cfg.key)}
                          className="text-xs font-bold text-slate-500 hover:text-rose-600 px-2 py-1.5 transition-colors"
                        >
                          {t.admin.resetToDefault}
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 4: CONTACT & EMAIL NOTIFICATION SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-white border border-slate-200/80 shadow-xs rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-700" />
                <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase font-outfit">
                  {t.admin.contactSettingsTitle} & Email Notifications
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Configure notification routing for all user booking requests, contact forms, and inquiries submitted through the website.
              </p>
            </div>

            {/* Live Notification Status Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                  </span>
                  <span className="text-xs font-black text-emerald-900 uppercase tracking-wide">
                    Live Email Notifications: Active
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                  Target: {adminEmail}
                </span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Whenever a climber or traveler submits a contact form, books a Mount Kilimanjaro climb, or reserves a Tanzania safari package, a full notification with customer contact information, dates, group size, and quote details is instantly dispatched to <strong>{adminEmail}</strong>.
              </p>

              {/* Test Notification Trigger */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  disabled={testEmailStatus.sending}
                  id="admin-send-test-email-btn"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white text-xs font-black uppercase rounded-xl transition-all shadow-2xs disabled:opacity-50 min-h-[36px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{testEmailStatus.sending ? 'Dispatching Test Email...' : `Send Test Notification to ${adminEmail}`}</span>
                </button>

                {testEmailStatus.msg && (
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{testEmailStatus.msg}</span>
                  </span>
                )}
              </div>
            </div>

            {settingsSaved && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Notification and contact settings saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {t.admin.primaryAdminEmail} (Notification Recipient) *
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold font-mono"
                  placeholder="biosfix14@gmail.com"
                  required
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  All website client requests and contact submissions will be forwarded directly to this email address. Default: <code>biosfix14@gmail.com</code>.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {t.admin.whatsappNumber} (Direct Chat Support)
                </label>
                <input
                  type="text"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  required
                />
              </div>

              <div className="pt-1 sm:pt-2">
                <button
                  type="submit"
                  id="admin-save-settings-btn"
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl text-xs font-black uppercase transition-colors shadow-xs min-h-[38px]"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.admin.saveContactPrefs}</span>
                </button>
              </div>
            </form>

            {/* Admin Login Credentials & Security Card */}
            <div className="pt-5 sm:pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase font-outfit">
                  {t.admin.securityTitle}
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                {t.admin.securitySubtitle}
              </p>

              {credSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{credSuccessMsg}</span>
                </div>
              )}

              {credErrorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{credErrorMsg}</span>
                </div>
              )}

              <form onSubmit={handleUpdateSecurity} className="space-y-3.5 sm:space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {t.admin.adminEmailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={changeEmail}
                    onChange={(e) => setChangeEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      {t.admin.newPassword}
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Leave blank to keep current"
                        value={changePassword}
                        onChange={(e) => setChangePassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 pr-10 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                      >
                        {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      {t.admin.confirmPassword}
                    </label>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-1 sm:pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase transition-colors shadow-md shadow-emerald-700/20 min-h-[38px]"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{t.admin.updateCredentials}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Manual Inquiry Add Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 text-left space-y-3.5 sm:space-y-4 my-3 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase font-outfit">
                Add Manual Inquiry / Phone Booking
              </h3>
              <button
                onClick={() => setNewModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualInquiry} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.fullName}
                    onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Country</label>
                  <input
                    type="text"
                    value={manualForm.country}
                    onChange={(e) => setManualForm({ ...manualForm, country: e.target.value })}
                    placeholder="e.g. Canada, Germany"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    placeholder="+1 555..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Route</label>
                <select
                  value={manualForm.routeName}
                  onChange={(e) => setManualForm({ ...manualForm, routeName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                >
                  {KILIMANJARO_ROUTES.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={manualForm.startDate}
                    onChange={(e) => setManualForm({ ...manualForm, startDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Climbers</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={manualForm.climbersCount}
                    onChange={(e) => setManualForm({ ...manualForm, climbersCount: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Total Quote ($)</label>
                  <input
                    type="number"
                    value={manualForm.estimatedTotalUSD}
                    onChange={(e) => setManualForm({ ...manualForm, estimatedTotalUSD: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Customer Notes / Requirements</label>
                <textarea
                  rows={3}
                  value={manualForm.message}
                  onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
                  placeholder="Special requests, tent requirements, dietary notes..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black uppercase rounded-xl shadow-xs"
                >
                  {t.admin.newEntry}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Add Photo to Gallery Modal */}
      {addPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl sm:rounded-3xl max-w-md w-full p-4 sm:p-6 text-left space-y-3.5 sm:space-y-4 my-3 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase font-outfit flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>{t.admin.uploadNewPhotoTitle}</span>
              </h3>
              <button
                onClick={() => setAddPhotoModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddGalleryPhoto} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {t.admin.selectPhotoStep}
                </label>
                <div className="space-y-2">
                  <label className="cursor-pointer flex items-center justify-center gap-2 p-3 bg-slate-50 border border-dashed border-slate-300 hover:border-emerald-500 rounded-xl text-slate-700 transition-colors">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">{t.admin.dropzoneTitle}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            if (ev.target?.result) {
                              setNewPhotoUrl(ev.target.result as string);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>

                  <div className="text-center text-[10px] text-slate-400 font-bold uppercase">{t.admin.orImageUrl}</div>

                  <input
                    type="url"
                    value={newPhotoUrl.startsWith('data:') ? '' : newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>

                {newPhotoUrl && (
                  <div className="mt-2 relative h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={newPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1.5 left-1.5 bg-emerald-800 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                      ✓ {t.admin.photoReadyBadge}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.admin.categoryStep}</label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) => setNewPhotoCategory(e.target.value as 'Summit' | 'Trek' | 'Camp' | 'Safari')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:bg-white"
                >
                  <option value="Summit">{t.admin.categorySummit}</option>
                  <option value="Trek">{t.admin.categoryTrek}</option>
                  <option value="Camp">{t.admin.categoryCamp}</option>
                  <option value="Safari">{t.admin.categorySafari}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.admin.captionStep}</label>
                <input
                  type="text"
                  required
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  placeholder="e.g. Sunrise ascent approaching Uhuru Peak (5,895m)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddPhotoModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  disabled={!newPhotoUrl}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black uppercase rounded-xl transition-colors shadow-xs"
                >
                  {t.admin.publishPhotoBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Custom Image Slot Modal */}
      {addSlotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl sm:rounded-3xl max-w-md w-full p-4 sm:p-6 text-left space-y-3.5 sm:space-y-4 my-3 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase font-outfit flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>{t.admin.addCustomSlot}</span>
              </h3>
              <button
                onClick={() => setAddSlotModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomSlot} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Slot Key ID (alphanumeric) *</label>
                <input
                  type="text"
                  required
                  value={newSlotKey}
                  onChange={(e) => setNewSlotKey(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                  placeholder="e.g. summitSunrise, guideTeam2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Display Title *</label>
                <input
                  type="text"
                  required
                  value={newSlotName}
                  onChange={(e) => setNewSlotName(e.target.value)}
                  placeholder="e.g. Summit Sunrise Banner"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={newSlotCategory}
                  onChange={(e) => setNewSlotCategory(e.target.value as ImageSectionConfig['category'])}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:bg-white"
                >
                  <option value="Hero">Hero Section</option>
                  <option value="Routes">Routes Section</option>
                  <option value="Safaris">Safaris Section</option>
                  <option value="Conservation">Conservation Section</option>
                  <option value="Branding">Branding / Badges</option>
                  <option value="Custom">Custom Section</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Section Location Description</label>
                <input
                  type="text"
                  value={newSlotDesc}
                  onChange={(e) => setNewSlotDesc(e.target.value)}
                  placeholder="e.g. High resolution header for special expedition view"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddSlotModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase rounded-xl transition-colors shadow-xs"
                >
                  {t.admin.addCustomSlot}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

