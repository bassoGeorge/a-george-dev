import type { SheetUserPreferences } from '@ageorgedev/dnd-character-sheet';
import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'game-tools:userPrefs';

type UserPrefs = SheetUserPreferences;

const DEFAULT_USER_PREFS: Required<UserPrefs> = {
  showActionsInCombat: false,
  showWeaponMasteries: false,
  showNotes: true,
};

function readFromStorage(): UserPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USER_PREFS;
    return { ...DEFAULT_USER_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_USER_PREFS;
  }
}

type UserPrefsContextValue = {
  prefs: Required<UserPrefs>;
  setPrefs: (update: Partial<UserPrefs>) => void;
};

const UserPrefsContext = createContext<UserPrefsContextValue>({
  prefs: DEFAULT_USER_PREFS,
  setPrefs: () => {},
});

export function UserPrefsProvider({ children }: React.PropsWithChildren) {
  const [prefs, setPrefsState] = useState<Required<UserPrefs>>(readFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
  }, [prefs]);

  function setPrefs(update: Partial<UserPrefs>) {
    setPrefsState((prev) => ({ ...prev, ...update }));
  }

  return (
    <UserPrefsContext.Provider value={{ prefs, setPrefs }}>
      {children}
    </UserPrefsContext.Provider>
  );
}

export function useUserPrefs(): UserPrefsContextValue {
  return useContext(UserPrefsContext);
}
