import { PrintNarrative } from '../components/molecules/CountryProfilePrint/graphql';

export const getNarrativeByKey = (narratives: PrintNarrative[], key: string): PrintNarrative | null => {
  if (narratives && narratives.length) {
      return narratives.find(item => item.key === key) || null;
  }

  return null;
};

export const getNarrativeValueByKey = (narratives: PrintNarrative[], key: string): string => {
  if (narratives && narratives.length) {
      const narrative = narratives.find(item => item.key === key);

      return narrative ? narrative.value : '';
  }

  return '';
};
