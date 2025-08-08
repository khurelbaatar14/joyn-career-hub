// src/hooks/useCompanyData.ts

import { useState, useEffect, useCallback } from 'react';
import { 
  Store, 
  CompanyConfig, 
  SelectedPosition,
  CareerPageAPI,
  getCompanyConfig,
  getStoresWithDistance,
  getCompanyFromSubdomain,
  transformCompanyData,
  transformStoreData
} from '@/data/companies';

interface UseCompanyDataReturn {
  // Data
  companyConfig: CompanyConfig;
  stores: Store[];
  apiStores: Store[];
  
  // Selection state
  selectedPositions: SelectedPosition[];
  selectedStores: string[];
  currentStep: 'browse' | 'selection' | 'summary';
  
  // UI state
  language: string;
  loading: boolean;
  dataLoading: boolean;
  error: string | null;
  dataError: string | null;
  
  // User location
  userLocation: { lat: number; lng: number } | null;
  
  // Actions
  setSelectedPositions: (positions: SelectedPosition[]) => void;
  setSelectedStores: (stores: string[]) => void;
  setCurrentStep: (step: 'browse' | 'selection' | 'summary') => void;
  setLanguage: (lang: string) => void;
  handlePositionSelect: (store: Store, position: any) => void;
  removeSelectedPosition: (storeId: string | number, positionId: string) => void;
  submitApplication: (formData?: any) => Promise<boolean>;
  reloadCompanyData: () => Promise<void>;
  requestLocation: () => void;
  
  // Computed
  filteredStores: (searchTerm: string) => Store[];
  getTranslation: (key: string) => string;
  
  // API
  api: CareerPageAPI;
}

export const useCompanyData = (): UseCompanyDataReturn => {
  // Core data state
  const [companyConfig, setCompanyConfig] = useState<CompanyConfig>(() => getCompanyConfig());
  const [stores, setStores] = useState<Store[]>(() => getStoresWithDistance());
  const [apiStores, setApiStores] = useState<Store[]>([]);
  
  // Selection state
  const [selectedPositions, setSelectedPositions] = useState<SelectedPosition[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'browse' | 'selection' | 'summary'>('browse');
  
  // UI state
  const [language, setLanguage] = useState<string>('mn');
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);
  
  // User location
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  // API instance
  const [api] = useState(() => new CareerPageAPI());

  // Get company from subdomain
  const getSubdomainFromUrl = useCallback(() => {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'gs25'; // Default for testing
    }
    const parts = hostname.split('.');
    if (parts.length >= 3) {
      return parts[0];
    }
    return 'gs25';
  }, []);

  // Load company data from API
  const loadCompanyData = useCallback(async () => {
    const suburl = getSubdomainFromUrl();
    setDataLoading(true);
    setDataError(null);
    
    try {
      // Get data from API
      const allData = await api.getCompanyBySuburl(suburl);
      console.log('✅ Raw API data received:', allData);
      
      // Transform company config
      const transformedCompany = transformCompanyData(allData);
      console.log('🏢 Transformed company:', transformedCompany);
      setCompanyConfig(transformedCompany);
      
      // Transform stores
      const transformedStores = transformStoreData(allData.branches || []);
      console.log('🏬 Transformed stores:', transformedStores);
      setApiStores(transformedStores);
      
      // Update local stores with API data if available
      if (transformedStores.length > 0) {
        setStores(transformedStores);
      }
      
      console.log('✅ API data transformation complete:', { 
        companyName: transformedCompany.brandName,
        storeCount: transformedStores.length,
        storeNames: transformedStores.map(s => s.name)
      });
      
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'Unknown error');
      console.log('❌ API failed, using fallback data:', error);
      // Keep using the mock data that was already loaded
    } finally {
      setDataLoading(false);
    }
  }, [api, getSubdomainFromUrl]);

  // Initialize data on mount
  useEffect(() => {
    loadCompanyData();
  }, [loadCompanyData]);

  // Request user location
  const requestLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          // Update stores with distance calculations
          const updatedStores = getStoresWithDistance(
            location.lat, 
            location.lng, 
            getCompanyFromSubdomain()
          );
          setStores(updatedStores);
        },
        (error) => {
          console.warn('Geolocation error:', error);
        }
      );
    }
  }, []);

  // Handle position selection
  const handlePositionSelect = useCallback((store: Store, position: any) => {
    const selection: SelectedPosition = {
      storeId: store.id,
      positionId: position.id,
      storeName: store.name,
      positionTitle: position.title,
      salaryRange: position.salaryRange
    };

    // For single selection (like in the original logic)
    setSelectedPositions([selection]);
    setSelectedStores([store.id.toString()]);
    setCurrentStep('summary');
  }, []);

  // Remove selected position
  const removeSelectedPosition = useCallback((storeId: string | number, positionId: string) => {
    setSelectedPositions([]);
    setSelectedStores([]);
    setCurrentStep('browse');
  }, []);

  // Submit application
  const submitApplication = useCallback(async (formData?: any): Promise<boolean> => {
    if (!selectedPositions.length) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      const applicationData = {
        company_id: companyConfig.companyId,
        store_id: selectedPositions[0]?.storeId,
        position_id: selectedPositions[0]?.positionId,
        applicant_data: formData || {},
        source: 'career_page',
        language: language,
        applied_at: new Date().toISOString()
      };
      
      const result = await api.submitApplication(applicationData);
      
      if (result.success) {
        console.log('✅ Application submitted via API:', result);
        return true;
      } else {
        setError(result.error || 'Application submission failed');
        return false;
      }
    } catch (error) {
      console.error('❌ API application submission failed:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedPositions, companyConfig.companyId, language, api]);

  // Get translation
  const getTranslation = useCallback((key: string): string => {
    return companyConfig.translations[language]?.[key] || key;
  }, [companyConfig.translations, language]);

  // Filter stores
  const filteredStores = useCallback((searchTerm: string): Store[] => {
    if (!searchTerm.trim()) return stores;
    
    const term = searchTerm.toLowerCase();
    return stores.filter(store =>
      store.name.toLowerCase().includes(term) ||
      store.address.toLowerCase().includes(term) ||
      store.positions.some(pos => pos.title.toLowerCase().includes(term))
    );
  }, [stores]);

  return {
    // Data
    companyConfig,
    stores,
    apiStores,
    
    // Selection state
    selectedPositions,
    selectedStores,
    currentStep,
    
    // UI state
    language,
    loading,
    dataLoading,
    error,
    dataError,
    
    // User location
    userLocation,
    
    // Actions
    setSelectedPositions,
    setSelectedStores,
    setCurrentStep,
    setLanguage,
    handlePositionSelect,
    removeSelectedPosition,
    submitApplication,
    reloadCompanyData: loadCompanyData,
    requestLocation,
    
    // Computed
    filteredStores,
    getTranslation,
    
    // API
    api
  };
};