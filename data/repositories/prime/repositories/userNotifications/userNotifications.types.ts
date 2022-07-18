import { IRepository, IResponse, PageLimitRange } from '..';
// import { Locale } from '../..';
export interface IUserNotificationsRepository extends IRepository {
  get(
    userId: string,
    options?: IUserNotificationOptions | string
  ): Promise<IResponse<IUserNotificationResponse[]> | undefined>;
}

export interface IUserNotificationResponse {
  id: string;
  type: 'userNotification';
  attributes: {
    /** Whether the user has taken action or not. Value will be true if user has taken action , */
    actionTaken: boolean;
    channel: string;
    /**  Date on which the notification was created. Date is in ISO 8601 format yyyy-MM-ddTHH:mm:ss.fffZ */
    dateCreated: string;
    message: string;
    modelIds: [string];
    modelNames: [string];
    modelTypes: [string];
    read: boolean;
    role: string;
    announcement: {
      contentId: string;
      contentType: 'AUDIO' | 'VIDEO' | 'IMAGE';
      contentUrl: string;
      /** Description of the announcement. Description will be 'DELETED_ANNOUNCEMENT' in case Announcement is deleted */
      description: string | 'DELETED_ANNOUNCEMENT';
      duration: number;
      expiryDate: string;
      isDeleted: boolean;
      loId: string;
      loName: string;
      sentDate: string;
      sticky: boolean;
      thumbnailUrl: string;
    };
  };
}

export interface IUserNotificationOptions {
  /** Mention the last cursor till the records are fetched */
  pageCursor?: string;
  /** Mention the maximum number of records to be displayed per page. Max allowed is 10 */
  pageLimit?: PageLimitRange;
  /** Mention the maximum number of records to be displayed when fetching all items. Default is 100  */
  maxLimit?: number;
  /** Choose true for all read notifications and false for all unread notifications. */
  read?: boolean;
  /** Choose true to get announcements only. */
  announcementsOnly?: boolean;
  /** Get Notifications in the specified language. Abbreviations en_US, de_DE, fr_FR, es_ES, zh_CN, it_IT, pt_BR, ja_JP represent US-English, Deutsch, French, Spanish, Chinese Simplified, Italian, Portugese and Japanese respectively. */
  language?: string[];
  /** Choose one or more notification channels from the list. */
  userSelectedChannels?: UserSelectedChannelsType[];
}

export type UserSelectedChannelsType =
  | 'jobAid::adminEnrollment'
  | 'certification::adminEnrollment'
  | 'certification::autoEnrollment'
  | 'certification::completed'
  | 'certification::badgeIssued'
  | 'certification::completionReminder'
  | 'certification::expired'
  | 'certification::recurrenceEnrollment'
  | 'certification::republished'
  | 'certification::learnerCertificationApprovalRequestApproved'
  | 'certification::learnerCertificationApprovalRequestDenied'
  | 'certification::deadlineMissed'
  | 'course::adminEnrollment'
  | 'course::autoEnrollment'
  | 'course::badgeIssued'
  | 'course::l1FeedbackPrompt'
  | 'course::deadlineMissed'
  | 'course::completed'
  | 'course::completionReminder'
  | 'course::sessionReminder'
  | 'course::republished'
  | 'course::courseOpenForEnrollment'
  | 'course::learnerEnrollmentRequestApproved'
  | 'course::learnerEnrollmentRequestDenied'
  | 'course::waitListCleared'
  | 'course::learnerNominationRequest'
  | 'learningProgram::adminEnrollment'
  | 'learningProgram::autoEnrollment'
  | 'learningProgram::badgeIssued'
  | 'learningProgram::republished'
  | 'learningProgram::deadlineMissed'
  | 'learningProgram::completionReminder'
  | 'learningProgram::completed'
  | 'learningProgram::l1Feedback'
  | 'competency::assigned'
  | 'competency::badgeIssued'
  | 'competency::achieved'
  | 'manager::added'
  | 'admin::added'
  | 'author::added'
  | 'integrationAdmin::added'
  | 'social::commentedOnPost'
  | 'social::curationRequest'
  | 'social::commentedOnComment'
  | 'social::postLive'
  | 'social::postRejected'
  | 'social::reportAbuse'
  | 'social::addedAsModerator'
  | 'social::postUploadFailed'
  | 'announcement::received';
