import Geolocation from 'react-native-geolocation-service';
import {Toast} from 'toastify-react-native';
import i18next from 'i18next';

type GetCordinatesProps = {
  hasLocationPermission: string;
  setCoordinates: (value: string) => void;
  setQuery: (value: string) => void;
};

export const GetCordinates = ({
  hasLocationPermission,
  setCoordinates,
  setQuery,
}: GetCordinatesProps) => {
  if (hasLocationPermission === 'granted') {
    Geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const coordinate = `${lat},${lon}`;
        setCoordinates(coordinate);
        setQuery(coordinate);
        Toast.success(i18next.t('ForecastForCurrentPosition'));
      },
      error => {
        console.log(error.code, error.message);
        Toast.error(i18next.t('GeolocationFailed'), 'top');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
};