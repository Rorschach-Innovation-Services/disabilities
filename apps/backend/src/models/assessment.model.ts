import { Entity, MasterTable, EntityNames } from '@repo/db-wrapper';

export type AssessmentAttributes = {
  id: string;
  questionnaire: any[];
  score: Record<string, any>;
  companyId: string;
  departmentId: string;
  employeeId: string;
  created: number;
  modified: number;
  deleted: boolean;
  _en?: EntityNames;
};

export const Assessment = new Entity<
  AssessmentAttributes,
  { companyId: string },
  { id: string; departmentId: string; employeeId: string },
  { _en?: EntityNames },
  { employeeId: string; id: string }
>({
  name: 'assessment',
  partitionKey: { order: ['companyId'] },
  sortKey: { order: ['departmentId', 'employeeId', 'id'] },
  gsPartitionKey: { order: ['_en'] },
  gsSortKey: { order: ['employeeId', 'id'] },
  table: MasterTable,
});

export interface Score {
  TIB: number;
  TIBValue: number;
  TST: number;
  TSTValue: number;
  SE: number;
  SEValue: number;
  Quality: number;
  DayTimeFunction: number;
  DayTimeFunctionValue: number;
  Disorder: string;
  DisorderValue: number;
  DisorderManagement: string;
  DisorderManagementValue: number;
  DisorderModifiedValue: number;
  MedToSleep: string;
  MedToSleepValue: number;
  TotalValue: number;
  MedModifiedTotalValue: number;
  SleepHealthScore: number;
  SleepHealthScorePercentage: number;
}
