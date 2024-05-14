import { Entity } from 'dynamodb-toolbox';
import { DatabaseTable } from '../utilities/table';
import { v4 } from 'uuid';

export const Assessment = new Entity({
  name: 'Assessment',
  table: DatabaseTable,
  timestamps: true,
  attributes: {
    sk: { hidden: true, sortKey: true },
    questionnaire: { type: 'list' },
    score: { type: 'map' },
    companyId: { partitionKey: true, type: 'string' },
    departmentId: ['sk', 0, { type: 'string', required: 'always' }],
    employeeId: ['sk', 1, { type: 'string', required: 'always' }],
    id: ['sk', 2, { type: 'string', required: 'always', default: v4() }],
    gspk: {
      hidden: true,
      type: 'string',
      partitionKey: true,
      default: 'assessments',
    },
    gssk: {
      hidden: true,
      type: 'string',
      sortKey: true,
      default: ({ id, employeeId }: { id: string; employeeId: string }) =>
        `${employeeId}#${id}`,
    },
    deleted: { type: 'boolean', default: false },
  },
} as const);

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
