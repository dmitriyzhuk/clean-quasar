import { AxiosInstance } from 'axios';
import { ILearningObjectsRepository } from '.';

export interface IPrimeRepository {
  readonly axios: AxiosInstance;
  init(callback: () => never): Promise<void>;

  // badge?: IPrimeBadgeEndpoint;
  // catalog?: IPrimeCatalogEndpoint;
  learningObjects?: ILearningObjectsRepository;
  // user?: IPrimeUserEndpoint;
  // account?: IPrimeAccountEndpoint;
}

export type Locale =
  | 'en-US'
  | 'fr-FR'
  | 'de-DE'
  | 'zh-CN'
  | 'es-ES'
  | 'it-IT'
  | 'ja-JP'
  | 'pt-BR'
  | 'da-DK'
  | 'hi-IN'
  | 'hu-HU'
  | 'nl-NL'
  | 'pl-PL'
  | 'fi-FI'
  | 'th-TH'
  | 'tr-TR'
  | 'ko-KR'
  | 'zh-TW'
  | 'no-NO'
  | 'sv-SE'
  | 'ro-RO'
  | 'ar-SA'
  | 'ru-RU'
  | 'am-ET'
  | 'cs-CZ';
