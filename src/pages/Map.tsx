import { MapPin, ZoomIn, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import campusMap from "@/assets/campus-map.png";
import { useState } from "react";

const Map = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = campusMap;
    link.download = 'MSU-IIT-Campus-Map.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-foreground/20">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Campus Map</h1>
                <p className="text-primary-foreground/80 text-sm">MSU-IIT Interactive Map</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Map Controls */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsZoomed(!isZoomed)}
            className="flex-1"
          >
            <ZoomIn className="h-4 w-4 mr-2" />
            {isZoomed ? "Zoom Out" : "Zoom In"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Map Display */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <div className={`overflow-auto ${isZoomed ? 'max-h-[70vh]' : ''}`}>
            <img
              src={campusMap}
              alt="MSU-IIT Campus Map"
              className={`w-full h-auto transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-move' : 'cursor-pointer'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </div>
        </div>

        {/* Map Info */}
        <div className="mt-4 bg-secondary/10 border border-secondary/20 rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">How to use this map</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Tap the map to zoom in/out</li>
            <li>• Use the zoom button for quick toggle</li>
            <li>• Download for offline access</li>
            <li>• Numbers correspond to building locations</li>
          </ul>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Map;
