// src/data/companies.ts

export interface Position {
  id: string;
  title: string;
  urgent: boolean;
  salaryRange: string;
  type?: 'full-time' | 'part-time' | 'contract';
  description?: string;
  requirements?: string[];
}

export interface Store {
  id: string | number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  managerId: string;
  positions: Position[];
  distance?: number;
  phone?: string;
  hours?: string;
}

export interface CompanyConfig {
  companyId: string;
  brandName: string;
  brandColor: string;
  brandGradient: string;
  logoUrl?: string;
  translations: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export interface SelectedPosition {
  storeId: string | number;
  positionId: string;
  storeName: string;
  positionTitle: string;
  salaryRange: string;
}

// Company Configurations
export const COMPANY_CONFIGS: { [key: string]: CompanyConfig } = {
  'gs25': {
    companyId: 'gs25',
    brandName: 'Uniservice Solutions',
    brandColor: '#10b981',
    brandGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    translations: {
      mn: {
        selectBranch: 'Салбар сонгох',
        applyNow: 'Өргөдөл илгээх',
        urgentHiring: 'Яаралтай',
        positions: 'Ажлын байр',
        salary: 'Цалин',
        showMore: 'Дэлгэрэнгүй',
        showLess: 'Хураах',
        selectedPositions: 'Сонгосон ажлын байрууд',
        continue: 'Үргэлжлүүлэх',
        searchPlaceholder: 'Салбар эсвэл хаяг хайх...',
        noResults: 'Хайлт олдсонгүй',
        distance: 'Зай',
        phone: 'Утас',
        hours: 'Ажиллах цаг'
      },
      en: {
        selectBranch: 'Select Branch',
        applyNow: 'Apply Now',
        urgentHiring: 'Urgent',
        positions: 'Positions',
        salary: 'Salary',
        showMore: 'Show More',
        showLess: 'Show Less',
        selectedPositions: 'Selected Positions',
        continue: 'Continue',
        searchPlaceholder: 'Search branches or addresses...',
        noResults: 'No results found',
        distance: 'Distance',
        phone: 'Phone',
        hours: 'Hours'
      }
    }
  },
  'carrefour': {
    companyId: 'carrefour',
    brandName: 'Carrefour',
    brandColor: '#0066cc',
    brandGradient: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
    translations: {
      mn: {
        selectBranch: 'Салбар сонгох',
        applyNow: 'Өргөдөл илгээх',
        urgentHiring: 'Яаралтай',
        positions: 'Ажлын байр',
        salary: 'Цалин',
        showMore: 'Дэлгэрэнгүй',
        showLess: 'Хураах',
        selectedPositions: 'Сонгосон ажлын байрууд',
        continue: 'Үргэлжлүүлэх',
        searchPlaceholder: 'Салбар эсвэл хаяг хайх...',
        noResults: 'Хайлт олдсонгүй',
        distance: 'Зай',
        phone: 'Утас',
        hours: 'Ажиллах цаг'
      },
      en: {
        selectBranch: 'Select Branch',
        applyNow: 'Apply Now',
        urgentHiring: 'Urgent',
        positions: 'Positions',
        salary: 'Salary',
        showMore: 'Show More',
        showLess: 'Show Less',
        selectedPositions: 'Selected Positions',
        continue: 'Continue',
        searchPlaceholder: 'Search branches or addresses...',
        noResults: 'No results found',
        distance: 'Distance',
        phone: 'Phone',
        hours: 'Hours'
      }
    }
  }
};

// Mock Store Data
export const COMPANY_STORES: { [key: string]: { stores: Store[] } } = {
  'gs25': {
    stores: [
      {
        id: 1,
        name: 'Uniservice Solutions Төв',
        lat: 47.9184,
        lng: 106.9177,
        address: 'Сүхбаатар дүүрэг, Улаанбаатар',
        managerId: 'mgr_001',
        phone: '+976 1111-1111',
        hours: '24/7',
        positions: [
          { 
            id: 'pos1', 
            title: 'Кассчин', 
            urgent: true, 
            salaryRange: '₮1.8M-2.2M',
            type: 'full-time',
            description: 'Үйлчлүүлэгчдэд борлуулалтын үйлчилгээ үзүүлэх',
            requirements: ['Боловсролын шаардлага байхгүй', 'Найрсаг зан', 'Англи хэл сайн']
          },
          { 
            id: 'pos2', 
            title: 'Борлуулагч', 
            urgent: false, 
            salaryRange: '₮1.6M-2.0M',
            type: 'full-time',
            description: 'Бүтээгдэхүүн борлуулалт хариуцах'
          },
          { 
            id: 'pos3', 
            title: 'Шөнийн ээлж', 
            urgent: true, 
            salaryRange: '₮2.0M-2.5M',
            type: 'part-time',
            description: '22:00-08:00 цагийн хооронд ажиллах'
          }
        ]
      },
      {
        id: 2,
        name: 'Uniservice Solutions Багшийн дээд',
        lat: 47.914,
        lng: 106.905,
        address: 'Багшийн дээд, 1 давхар',
        managerId: 'mgr_002',
        phone: '+976 2222-2222',
        hours: '06:00-24:00',
        positions: [
          { 
            id: 'pos4', 
            title: 'Үйлчлэгч', 
            urgent: false, 
            salaryRange: '₮1.7M-2.1M',
            type: 'full-time'
          },
          { 
            id: 'pos5', 
            title: 'Агуулахын ажилчин', 
            urgent: true, 
            salaryRange: '₮1.7M-2.1M',
            type: 'full-time'
          }
        ]
      },
      {
        id: 3,
        name: 'Uniservice Solutions Зайсан',
        lat: 47.887,
        lng: 106.945,
        address: 'Зайсан дүүрэг',
        managerId: 'mgr_003',
        phone: '+976 3333-3333',
        hours: '07:00-23:00',
        positions: [
          { 
            id: 'pos6', 
            title: 'Борлуулагч', 
            urgent: false, 
            salaryRange: '₮1.6M-2.0M',
            type: 'full-time'
          },
          { 
            id: 'pos7', 
            title: 'Шөнийн ээлж', 
            urgent: true, 
            salaryRange: '₮2.0M-2.5M',
            type: 'part-time'
          }
        ]
      }
    ]
  },
  'carrefour': {
    stores: [
      {
        id: 101,
        name: 'Carrefour State Department Store',
        lat: 47.9172,
        lng: 106.9040,
        address: 'State Department Store',
        managerId: 'mgr_c001',
        phone: '+976 4444-4444',
        hours: '09:00-22:00',
        positions: [
          { 
            id: 'cpos1', 
            title: 'Кассчин', 
            urgent: true, 
            salaryRange: '₮2.0M-2.5M',
            type: 'full-time'
          },
          { 
            id: 'cpos2', 
            title: 'Хүнсний хэсгийн ажилчин', 
            urgent: false, 
            salaryRange: '₮1.8M-2.3M',
            type: 'full-time'
          },
          { 
            id: 'cpos3', 
            title: 'Үйлчлэгч', 
            urgent: true, 
            salaryRange: '₮1.7M-2.2M',
            type: 'full-time'
          }
        ]
      },
      {
        id: 102,
        name: 'Carrefour Mall',
        lat: 47.9250,
        lng: 106.9150,
        address: 'Central Mall',
        managerId: 'mgr_c002',
        phone: '+976 5555-5555',
        hours: '10:00-22:00',
        positions: [
          { 
            id: 'cpos4', 
            title: 'Борлуулагч', 
            urgent: false, 
            salaryRange: '₮1.9M-2.4M',
            type: 'full-time'
          },
          { 
            id: 'cpos5', 
            title: 'Бүтээгдэхүүний зохион байгуулагч', 
            urgent: true, 
            salaryRange: '₮2.1M-2.6M',
            type: 'full-time'
          }
        ]
      }
    ]
  }
};

// Language configuration
export const LANGUAGES = [
  { code: 'mn', name: 'Монгол', flag: '🇲🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

// Utility functions
export const getCompanyFromSubdomain = (): string => {
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  return Object.keys(COMPANY_CONFIGS).includes(subdomain) ? subdomain : 'gs25';
};

export const getCompanyConfig = (companyKey?: string): CompanyConfig => {
  const key = companyKey || getCompanyFromSubdomain();
  return COMPANY_CONFIGS[key] || COMPANY_CONFIGS['gs25'];
};

export const getCompanyStores = (companyKey?: string): Store[] => {
  const key = companyKey || getCompanyFromSubdomain();
  return COMPANY_STORES[key]?.stores || COMPANY_STORES['gs25'].stores;
};

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Add distances to stores based on user location
export const getStoresWithDistance = (userLat?: number, userLng?: number, companyKey?: string): Store[] => {
  const stores = getCompanyStores(companyKey);
  
  if (!userLat || !userLng) {
    return stores;
  }
  
  return stores.map(store => ({
    ...store,
    distance: calculateDistance(userLat, userLng, store.lat, store.lng)
  })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
};

// Mock API service for future integration
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class CareerPageAPI {
  private baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';
  
  async submitApplication(applicationData: {
    company_id: string;
    store_id: string | number;
    position_id: string;
    applicant_data: any;
    source: string;
    language: string;
    applied_at: string;
  }): Promise<APIResponse<any>> {
    try {
      // Mock API call - replace with actual implementation
      console.log('Submitting application:', applicationData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        data: {
          application_id: `app_${Date.now()}`,
          status: 'submitted',
          next_step: 'interview_scheduling'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  async getCompanyBySuburl(suburl: string): Promise<any> {
    try {
      // Mock API call - replace with actual implementation
      console.log('Fetching company data for:', suburl);
      
      const companyConfig = getCompanyConfig(suburl);
      const stores = getCompanyStores(suburl);
      
      return {
        company: companyConfig,
        branches: stores.map(store => ({
          id: store.id,
          name: store.name,
          address: store.address,
          latitude: store.lat,
          longitude: store.lng,
          manager_id: store.managerId,
          phone: store.phone,
          hours: store.hours,
          jobs: store.positions.map(pos => ({
            id: pos.id,
            title: pos.title,
            is_urgent: pos.urgent,
            salary_range: pos.salaryRange,
            employment_type: pos.type,
            description: pos.description,
            requirements: pos.requirements
          }))
        }))
      };
    } catch (error) {
      throw new Error(`Failed to fetch company data: ${error}`);
    }
  }
}

// Data transformers for API compatibility (from career-page project)
export const transformCompanyData = (apiData: any): CompanyConfig => {
  return {
    companyId: apiData.company?.id || 'unknown',
    brandName: apiData.company?.name || 'Unknown Company',
    brandColor: apiData.company?.brand_color || '#10b981',
    brandGradient: apiData.company?.brand_gradient || 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    logoUrl: apiData.company?.logo_url,
    translations: apiData.company?.translations || COMPANY_CONFIGS['gs25'].translations
  };
};

export const transformStoreData = (branches: any[]): Store[] => {
  return branches.map(branch => ({
    id: branch.id,
    name: branch.name,
    address: branch.address,
    lat: branch.latitude || branch.lat,
    lng: branch.longitude || branch.lng,
    managerId: branch.manager_id,
    phone: branch.phone,
    hours: branch.hours,
    positions: transformPositionData(branch.jobs || [])
  }));
};

export const transformPositionData = (jobs: any[]): Position[] => {
  return jobs.map(job => ({
    id: job.id,
    title: job.title,
    urgent: job.is_urgent || false,
    salaryRange: job.salary_range,
    type: job.employment_type,
    description: job.description,
    requirements: job.requirements
  }));
};