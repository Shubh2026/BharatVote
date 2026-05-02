import React from 'react';

interface StateMapProps {
  stateName: string;
}

/**
 * StateMap Component
 * Embeds a Google Map showing the Chief Electoral Officer office for a specific Indian state.
 */
export const StateMap: React.FC<StateMapProps> = ({ stateName }) => {
  // Replace with your actual Google Maps API Key
  const API_KEY = "AIzaSyCz_4stcrNaIQAAZcpMiWjQ9eGSENFhETU";

  // Constructing the search query for the CEO office
  const query = encodeURIComponent(`Chief Electoral Officer office, ${stateName}, India`);
  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${API_KEY}&q=${query}`;

  return (
    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white/10 bg-muted/20 relative group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
      <iframe
        title={`Map of CEO office in ${stateName}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
      />
    </div>
  );
};

export default StateMap;
