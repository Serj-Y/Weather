import {useEffect, useState} from 'react';
import {WeatherApi} from '../services/api/weatherApi';
import {WeatherType} from '../types/Types';
import {Toast} from 'toastify-react-native';
import {useTranslation} from 'react-i18next';

export const useWeather = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherType>();
  const [query, setQuery] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    if (query) {
      new WeatherApi()
        .setCity(query)
        .fetch()
        .then(res => {
          setWeather(res?.data);
        })
        .catch(error => {
          Toast.error(t(error.message), 'top');
          console.log(error);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, t]);

  return {
    isLoading,
    isError,
    weather,
    setIsLoading,
    setQuery,
    query,
  };
};
