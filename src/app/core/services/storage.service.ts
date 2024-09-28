import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Sets the specified value in the local storage with the given key.
   * @param key - The key to identify the value in the local storage.
   * @param value - The value to be stored in the local storage.
   */
  setLocalStorageData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Gets the value from the local storage.
   * @param key - The key to get the value from the local storage.
   * @returns The value from the local storage.
   */
  getLocalStorageData(key: string): any {
    return JSON.parse(localStorage.getItem(key)!) ?? '';
  }

  /**
   * Removes the specified item from the local storage.
   * @param key - The key of the item to be removed.
   */
  removeLocalStorageData(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears the local storage, except for the specified key.
   * @param keyToKeep - The key that should not be removed from the local storage.
   */
  clearLocalStorageExcept(keysToKeep: string[]): void {
    Object.keys(localStorage).forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
  * Clears the local storage.
  */
  clearLocalStorage(): void {
    localStorage.clear();
  }

  /**
   * Sets the specified value in the session storage with the given key.
   * @param key - The key to identify the value in the session storage.
   * @param value - The value to be stored in the session storage.
   */
  setSessionStorageData(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
  * Gets the value from the session storage.
  * @param key - The key to get the value from the session storage.
  * @returns The value from the session storage.
  */
  getSessionStorageData(key: string): any {
    return JSON.parse(sessionStorage.getItem(key)!) ?? '';
  }

  /**
   * Removes the specified item from the session storage.
   * 
   * @param key - The key of the item to be removed.
   */
  removeSessionStorageData(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * Clears the session storage, except for the specified key.
   * @param keyToKeep - The key that should not be removed from the session storage.
   */
  clearSessionStorageExcept(keysToKeep: string[]): void {
    Object.keys(sessionStorage).forEach(key => {
      if (!keysToKeep.includes(key)) {
        sessionStorage.removeItem(key);
      }
    });
  }

  /**
   * Clears the session storage.
   */
  clearSessionStorage(): void {
    sessionStorage.clear();
  }
}
