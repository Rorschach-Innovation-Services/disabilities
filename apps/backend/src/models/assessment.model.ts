import { Entity, MasterTable, EntityNames } from '@repo/db-wrapper';

export type AssessmentAttributes = {
  id: string;
  questionnaire: any[];
  companyId: string;
  questionnaireId: string;
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
