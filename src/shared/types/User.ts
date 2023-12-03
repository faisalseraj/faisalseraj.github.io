export interface ObjectType {
  [key: string]: string;
}

export enum UserType {
  Admin = 'Admin',
  SuperAdmin = 'superadmin',
  PartnerAdmin = 'PartnerAdmin',
  PartnerStaff = 'PartnerStaff',
  Educator = 'Educator',
  Participant = 'Participant',
  Judge = 'Judge',
  Reviewer = 'Reviewer',
  AllianceAdmin = 'AllianceAdmin'
}

export type JudgePreference = {
  categoryCode: string;
  preferToJudge: boolean;
  preferToAvoid: boolean;
};

export enum JudgePreviousAdjudicated {
  LastYear = 'LY',
  PreviousYear = 'PY',
  No = 'NO'
}

export enum JudgeReadingSpeed {
  Fast = 'F',
  Medium = 'M',
  Slow = 'S'
}

export type UserSettings = {
  printSize: 'a4' | 'a5';
  labName: string;
  pageSize: number;
};

export type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  contact?: string;
  userImage?: string;
  email?: string;
  password?: string;
  role?: string;
  address?: string;
  country?: string;
  province?: string;
  city?: string;
  isVerified?: boolean;
  status?: string;
  settings: UserSettings;
};
