import { IRepository } from '..';

export interface IAccountRepository extends IRepository {
  get(): Promise<IAccountResponse | undefined>;
}

export interface IAccountResponse {
  id: string;
  type: string;
  attributes: {
    catalogsVisible: boolean;
    customDomain: string;
    dateCreated: string;
    elthorLocation: string;
    enableCardIcons: boolean;
    enableExternalSkills: boolean;
    enableOffline: boolean;
    enableSidebar: boolean;
    enableSocialAsHome: boolean;
    enableSocialLearning: boolean;
    exploreSkills: boolean;
    gamificationEnabled: boolean;
    hideRetiredTrainings: boolean;
    learnerLayout: string;
    locale: string;
    loginInBrowser: boolean;
    loginUrl: string;
    logoStyling: string;
    logoUrl: string;
    moduleResetEnabled: boolean;
    name: string;
    pageSetting: string;
    recommendationAccountType: string;
    showEffectiveness: boolean;
    subdomain: string;
    themeData: string;
    timeZoneCode: string;
    accountTerminologies: [
      {
        entityType: string;
        locale: string;
        name: string;
        pluralName: string;
      }
    ];
    contentLocales: [
      {
        description: string;
        locale: string;
        name: string;
        overview: string;
      }
    ];
    gamificationLevels: [
      {
        color: string;
        name: string;
        points: number;
      }
    ];
    learnerHelpLinks: [
      {
        isDefault: boolean;
      }
    ];
    timeZones: [
      {
        name: string;
        timeZoneCode: string;
        utcOffset: number;
      }
    ];
    uiLocales: [
      {
        description: string;
        locale: string;
        name: string;
        overview: string;
      }
    ];
  };
}
