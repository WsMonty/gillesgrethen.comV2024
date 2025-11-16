import dayjs from 'dayjs';
import './Music.scss';
import { useEffect, useState } from 'react';
import { IoTicketOutline, IoLocationOutline } from 'react-icons/io5';

interface GigProps {
  gig: GigInfo;
  index: number;
  gigsTotalLength: number;
}

const Gig = ({ gig, index, gigsTotalLength }: GigProps) => {
  const date = dayjs(gig.start.dateTime);

  const [gigImage, setGigImage] = useState<string | null>(null);

  useEffect(() => {
    if (!gig.location) return;

    searchPlaces(gig.location).then((data) => {
      if (data.places?.[0]?.id) {
        getPlacePhotos(data.places?.[0]?.id).then((photos) => {
          if (photos.photos?.[0]?.name) {
            getPlaceURL(photos.photos?.[0]?.name).then((url) => {
              if (!url.url) return;
              setGigImage(url.url);
            });
          } else {
            setGigImage(null);
          }
        });
      } else {
        setGigImage(null);
      }
    });
  }, [gig.location]);

  const { link, descriptionText } = getLinkAndDescriptionText(gig.description);

  const goToMaps = (location: string) => {
    window.open(`https://www.google.com/maps/search/${location}`, '_blank');
  };

  const openLink = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div key={gig.id}>
      <div className="gigInfo">
        <div
          className="gigDate"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderWidth: gigImage ? 0 : '0.25px',
            ...(gigImage
              ? {
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${gigImage})`,
                }
              : {}),
          }}
        >
          <p>{date.format('MMM D')}</p>
          <p>{date.format('HH:mm')}</p>
        </div>
        <div className="gigSummary">
          <h3 className="gigTitle">{gig.summary}</h3>
          {descriptionText && (
            <p className="gigDescription">
              {descriptionText.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < descriptionText.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          )}
          {link ? (
            <div className="gigLinkContainer" onClick={() => openLink(link)}>
              <IoTicketOutline />
              <p className="gigDescription gigLink">Tickets and more info</p>
            </div>
          ) : (
            <div>
              <p className="gigTBA">
                Ticket link not yet available. Will be added soon!
              </p>
            </div>
          )}

          {gig.location && (
            <div
              className="gigLinkContainer"
              onClick={() => goToMaps(gig.location)}
            >
              <IoLocationOutline />
              <p className="gigLocation gigLink">Show on Google Maps</p>
            </div>
          )}
        </div>
      </div>
      {index !== gigsTotalLength - 1 && <hr />}
    </div>
  );
};

export default Gig;

const getLinkAndDescriptionText = (description?: string) => {
  if (!description) return { link: '', descriptionText: '' };

  const descriptionCopy = description;
  const sanitizedDescription = descriptionCopy.replace(/<[^>]*>?/g, '');

  let link = '';

  if (
    sanitizedDescription.includes('https://') ||
    sanitizedDescription.includes('http://')
  ) {
    const linkStart = sanitizedDescription.indexOf(
      sanitizedDescription.includes('https://') ? 'https://' : 'http://'
    );
    const linkEnd = sanitizedDescription.indexOf(' ', linkStart);
    link = sanitizedDescription.substring(
      linkStart,
      linkEnd === -1 ? undefined : linkEnd
    );
  }

  const descriptionText = sanitizedDescription.replace(link, '').trim();

  return { link, descriptionText };
};

type Place = {
  id?: string;
};

type PlacesSearchResponse = {
  places?: Place[];
};

type PlacePhotosResponse = {
  photos?: { name?: string }[];
};

type PlaceURLResponse = {
  url?: string;
};

async function searchPlaces(textQuery: string): Promise<PlacesSearchResponse> {
  const url = 'https://places.googleapis.com/v1/places:searchText';
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    throw new Error('Google Places API key is not set');
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'places.id',
  };

  const body = JSON.stringify({ textQuery });

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body,
  });

  if (!res.ok) {
    throw new Error(`Places API request failed with ${res.status}`);
  }

  const data: PlacesSearchResponse = await res.json();
  return data;
}

async function getPlacePhotos(placeId: string): Promise<PlacePhotosResponse> {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    throw new Error('Google Places API key is not set');
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'photos',
  };

  const res = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    throw new Error(`Places API request failed with ${res.status}`);
  }

  const data: PlacePhotosResponse = await res.json();
  return data;
}

async function getPlaceURL(placeName?: string): Promise<PlaceURLResponse> {
  if (!placeName) return {};

  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error('Google Places API key is not set');
  }

  const url = `https://places.googleapis.com/v1/${placeName}/media?maxHeightPx=400&maxWidthPx=400&key=${apiKey}`;

  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error(`Places API request failed with ${res.status}`);
  }

  // The media endpoint returns binary image data, not JSON
  const blob = await res.blob();
  const imageUrl = URL.createObjectURL(blob);

  return { url: imageUrl };
}
