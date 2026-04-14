'use client';

import { useState, useEffect } from 'react';
import { fetchAndActivate, getString, isSupported } from 'firebase/remote-config';
import { useRemoteConfig } from '../provider';

/**
 * Hook to get a string value from Firebase Remote Config for A/B testing.
 * @param key The Remote Config key to fetch.
 * @param defaultValue The value to return if Remote Config is not supported or not yet fetched.
 * @returns The Remote Config value.
 */
export function useVariant(key: string, defaultValue: string): string {
  const remoteConfig = useRemoteConfig();
  const [variant, setVariant] = useState(defaultValue);

  useEffect(() => {
    async function init() {
      if (!remoteConfig) return;
      
      const supported = await isSupported();
      if (!supported) return;

      try {
        // Set configuration settings for Remote Config
        remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
        
        await fetchAndActivate(remoteConfig);
        const value = getString(remoteConfig, key);
        if (value) {
          setVariant(value);
        }
      } catch (error) {
        console.error('Remote Config fetch failed:', error);
      }
    }

    init();
  }, [remoteConfig, key]);

  return variant;
}
