import { Entity, MasterTable, EntityNames } from '../utilities/entity';

export type ActionPlanAttributes = {
  id: string;
  name: string;
  companyName:string;
  companyId:string;
departmentName:string;
departmentId:string;
adminName:string;
adminId:string;
dataPoints: string[];
year: number;
matrixType:string;
tableData: Record<string, Record<string,string>>;
  deleted: boolean;
  created: number;
  modified: number;
  _en?: EntityNames;
};

export const ActionPlan = new Entity<
  ActionPlanAttributes,
  {departmentId:string,companyId:string},
  { id: string },
  { _en?: EntityNames },
  { id: string }
>({
  name: 'action-plan',
  partitionKey: { order: ['companyId','departmentId'] },
  sortKey: { order: ['id'] },
  gsPartitionKey: { order: ['_en'] },
  gsSortKey: { order: ['id'] },
  table: MasterTable,
});
