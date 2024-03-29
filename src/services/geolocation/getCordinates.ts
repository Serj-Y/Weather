import Geolocation from 'react-native-geolocation-service';
import {Toast} from 'toastify-react-native';
import i18next from 'i18next';
import {HAPTIC_FEEDBACK, HapticFeedback} from '../../utils/hapticFeedback.ts';

type GetCordinatesProps = {
  hasLocationPermission: string;
  setQuery: (value: string) => void;
  setIsLoading: (value: boolean) => void;
};

export const GetCordinates = ({
  hasLocationPermission,
  setQuery,
  setIsLoading,
}: GetCordinatesProps) => {
  setIsLoading(true);
  if (hasLocationPermission === 'granted') {
    Geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const coordinate = `${lat},${lon}`;
        setQuery(coordinate);
        Toast.success(i18next.t('ForecastForCurrentPosition'));
        setIsLoading(false);
      },
      error => {
        HapticFeedback({feedbackType: HAPTIC_FEEDBACK.ERROR});
        console.log(error.code, error.message);
        Toast.error(i18next.t('GeolocationFailed'), 'top');
        setIsLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
};
