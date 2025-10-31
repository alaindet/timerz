import { useEffect, useState } from 'react';

export type LocalStorageHookConfig<T extends any> = {
  key: string;
  serialize?: (value: T) => string;
  deserialize?: (serialized: string) => T;
};

export const DefaultSerializer = {
  serialize: <T extends any>(value: T) => {
    return JSON.stringify(value);
  },
  deserialize: <T extends any>(serialized: string) => {
    return JSON.parse(serialized) as T;
  },
};

export function useLocalStorage<T extends any>({
  key,
  serialize,
  deserialize,
}: LocalStorageHookConfig<T>) {
  const [initialized, setInitialized] = useState(false);
  const [stored, setStored] = useState<T | null>(null);

  useEffect(function syncLocalStorage() {
    if (!window || !window.localStorage) {
      return;
    }

    const serialized = window.localStorage.getItem(key);
    if (!serialized) {
      return;
    }

    if (deserialize) {
      setStored(deserialize(serialized));
    } else {
      setStored(serialized as T);
    }

    setInitialized(true);
  }, []);

  function store(value: T): void {
    const serializedValue = serialize ? serialize(value) : (value as string);
    window.localStorage.setItem(key, serializedValue);
    setStored(value);
  }

  function clear(): void {
    window.localStorage.removeItem(key);
    setStored(null);
  }

  function exists(): boolean {
    return window.localStorage.getItem(key) !== null;
  }

  return {
    stored,
    initialized,

    store,
    clear,
    exists,
  };
}