import { useCallback, useEffect, useMemo } from 'react';

export function useWordMap() {
  const wordMap = useMemo(() => new Map<string, string>(), []);

  const processWordlist = useCallback(
    (text: string) => {
      text.split('\n').forEach((line) => {
        const numAndStringPart = line.split('\t');
        wordMap.set(numAndStringPart[0], numAndStringPart[1]);
      });
    },
    [wordMap]
  );

  useEffect(() => {
    fetch('/eff_large_wordlist.txt')
      .then((response) => response.text())
      .then((text) => processWordlist(text))
      .catch((error) => console.error('Failed to load words:', error));
  }, [processWordlist]);

  return wordMap;
}
