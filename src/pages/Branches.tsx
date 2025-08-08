import React, { useState, useEffect } from 'react';
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useCompanyData } from "@/hooks/useCompanyData";
import { LANGUAGES } from "@/data/companies";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Search, 
  Building2, 
  Briefcase,
  ChevronRight,
  Globe,
  TrendingUp,
  X,
  Navigation,
  Phone,
  Map,
  List
} from "lucide-react";

// Fix Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Branches() {
  const navigate = useNavigate();
  
  // Use the company data hook
  const {
    companyConfig,
    stores,
    selectedPositions,
    selectedStores,
    currentStep,
    language,
    loading,
    dataLoading,
    error,
    userLocation,
    setCurrentStep,
    setLanguage,
    handlePositionSelect,
    removeSelectedPosition,
    submitApplication,
    requestLocation,
    filteredStores,
    getTranslation
  } = useCompanyData();

  // Local UI state
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStores, setExpandedStores] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title = "Jobz – Салбарууд";
  }, []);

  // Get filtered stores based on search term
  const searchFilteredStores = filteredStores(searchTerm);

  const toggleStoreExpansion = (storeId: string) => {
    const newExpanded = new Set(expandedStores);
    if (newExpanded.has(storeId)) {
      newExpanded.delete(storeId);
    } else {
      newExpanded.add(storeId);
    }
    setExpandedStores(newExpanded);
  };

  const handleContinue = async () => {
    if (!selectedPositions.length) return;
    
    const success = await submitApplication();
    if (success) {
      navigate(`/interview?branch=${selectedPositions[0].storeId}&position=${selectedPositions[0].positionId}`);
    }
  };

  const renderMainView = () => (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={getTranslation('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Controls row */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={requestLocation}
            className="flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" />
            {userLocation ? 'Байршил идэвхтэй' : 'Байршил авах'}
          </Button>
          
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {LANGUAGES.find(l => l.code === language)?.flag} {LANGUAGES.find(l => l.code === language)?.name}
            </Button>
            
            {showLanguageMenu && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-md border bg-background shadow-lg z-10">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {dataLoading && (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-sm text-muted-foreground">Өгөгдөл ачааллаж байна...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-destructive">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* No results */}
      {!dataLoading && searchFilteredStores.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">{getTranslation('noResults')}</p>
        </div>
      )}

      {/* Map View */}
      {renderMapView()}

      {/* List View Below Map */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <List className="h-5 w-5" />
          Ойролцоох ажлын байрууд
        </h2>
        {renderListView()}
      </div>
    </div>
  );

  // Create custom icon for urgent positions
  const createCustomIcon = (isUrgent: boolean, positionCount: number) => {
    const color = isUrgent ? '#ef4444' : '#10b981';
    const html = `
      <div style="
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        ${positionCount}
      </div>
    `;
    
    return L.divIcon({
      html,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
    });
  };

  const renderMapView = () => (
    <div className="space-y-4">
      {/* Leaflet Map Container */}
      <div className="h-[400px] w-full rounded-xl border overflow-hidden">
        <MapContainer
          center={userLocation ? [userLocation.lat, userLocation.lng] : [47.9184, 106.9177]}
          zoom={userLocation ? 13 : 11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User location marker */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>
                <div className="text-center">
                  <strong>Таны байршил</strong>
                </div>
              </Popup>
            </Marker>
          )}
          
          {/* Store markers */}
          {searchFilteredStores.map((store) => {
            const hasUrgentPosition = store.positions.some(p => p.urgent);
            return (
              <Marker
                key={store.id}
                position={[store.lat, store.lng]}
                icon={createCustomIcon(hasUrgentPosition, store.positions.length)}
              >
                <Popup maxWidth={300}>
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg">{store.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {store.address}
                      </p>
                      {store.distance && (
                        <p className="text-xs text-gray-500">
                          Зай: {store.distance.toFixed(1)}км
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Ажлын байрууд:</p>
                      {store.positions.slice(0, 3).map((position) => (
                        <button
                          key={position.id}
                          className="w-full text-left p-2 rounded border hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            handlePositionSelect(store, position);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{position.title}</span>
                            {position.urgent && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                Яаралтай
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{position.salaryRange}</p>
                        </button>
                      ))}
                      {store.positions.length > 3 && (
                        <p className="text-xs text-gray-500 text-center">
                          +{store.positions.length - 3} өөр ажлын байр
                        </p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      
      {/* Map Legend */}
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          <span>Энгийн ажлын байр</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
          <span>Яаралтай ажлын байр</span>
        </div>
      </div>
    </div>
  );

  const renderBrowseView = () => (
    <div className="space-y-4">
      {renderMainView()}
    </div>
  );

  const renderListView = () => (
    <div className="grid gap-3">
      {searchFilteredStores.map((store) => (
        <Card key={store.id} id={`store-${store.id}`} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                  {store.name}
                  {store.distance && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {store.distance.toFixed(1)}км
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="space-y-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {store.address}
                  </div>
                  {store.phone && (
                    <div className="flex items-center gap-1 text-xs">
                      <Phone className="h-3 w-3" />
                      {store.phone}
                    </div>
                  )}
                  {store.hours && (
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {store.hours}
                    </div>
                  )}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="ml-2">
                {store.positions.length} {getTranslation('positions')}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {/* Positions Preview */}
            <div className="space-y-2 mb-3">
              {store.positions.slice(0, expandedStores.has(store.id.toString()) ? undefined : 2).map((position) => (
                <div
                  key={position.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors group"
                  onClick={() => handlePositionSelect(store, position)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{position.title}</span>
                      {position.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {getTranslation('urgentHiring')}
                        </Badge>
                      )}
                      {position.type && (
                        <Badge variant="outline" className="text-xs">
                          {position.type === 'full-time' ? 'Бүтэн цаг' : 
                           position.type === 'part-time' ? 'Хагас цаг' : 'Гэрээт'}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      {position.salaryRange}
                    </div>
                    {position.description && expandedStores.has(store.id.toString()) && (
                      <p className="text-xs text-muted-foreground mt-1">{position.description}</p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>

            {/* Show More/Less */}
            {store.positions.length > 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleStoreExpansion(store.id.toString())}
                className="w-full"
              >
                {expandedStores.has(store.id.toString()) 
                  ? getTranslation('showLess') 
                  : `${getTranslation('showMore')} (${store.positions.length - 2})`
                }
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSummaryView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{getTranslation('selectedPositions')}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentStep('browse')}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {selectedPositions.map((selection) => (
        <Card key={`${selection.storeId}-${selection.positionId}`} className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {selection.positionTitle}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Building2 className="h-3 w-3" />
                  {selection.storeName}
                </p>
                <p className="text-sm text-green-600 font-medium flex items-center gap-1 mt-1">
                  <DollarSign className="h-3 w-3" />
                  {selection.salaryRange}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSelectedPosition(selection.storeId, selection.positionId)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-destructive">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={handleContinue}
        disabled={loading || !selectedPositions.length}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            Илгээж байна...
          </div>
        ) : (
          getTranslation('continue')
        )}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">
          {currentStep === 'summary' ? getTranslation('selectedPositions') : 'Таны ойролцоох дэлгүүрүүд'}
        </h1>
        <p className="mb-4 text-muted-foreground">
          {currentStep === 'summary' 
            ? 'Сонгосон ажлын байрандаа өргөдөл илгээхэд бэлэн үү?'
            : 'Салбараа сонгоод ярилцлагад орно уу.'
          }
        </p>

        {currentStep === 'browse' && renderBrowseView()}
        {currentStep === 'summary' && renderSummaryView()}
      </main>
      <BottomNav />
    </div>
  );
}