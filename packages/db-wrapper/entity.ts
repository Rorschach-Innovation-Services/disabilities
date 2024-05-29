import {
  Delete,
  DynamoDBClient,
  Put,
  Update,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
  GetCommand,
  GetCommandInput,
  BatchGetCommand,
  BatchGetCommandInput,
  TransactGetCommandInput,
  TransactGetCommand,
  TransactWriteCommandInput,
  TransactWriteCommand,
  PutCommandInput,
  PutCommand,
  DeleteCommandInput,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue, marshallOptions } from "@aws-sdk/util-dynamodb";
import { v4 } from "uuid";
import { createTable } from "./table";

const marshallOptions: marshallOptions = {
  convertEmptyValues: false,
};

const translateConfig = { marshallOptions };

export const DocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.REGION }),
  translateConfig
);
// export const DocumentTestClient = DynamoDBDocumentClient.from(
//   new DynamoDBClient({
//     region: 'localhost',
//     endpoint: 'http://localhost:8000',
//   }),
//   translateConfig
// );

export class Table {
  /**
   * Represents a DynamoDB table and provides methods for performing operations on the table.
   */
  public name: string;
  public partitionKeyName: string;
  public sortKeyName: string;
  public globalSecondaryPartitionKeyName: string;
  public globalSecondarySortKeyName: string;
  public documentClient: DynamoDBDocumentClient;

  /**
   * Creates a new instance of the Table class.
   * @param name - The name of the DynamoDB table.
   * @param partitionKeyName - The name of the partition key attribute in the table. Default is "pk".
   * @param sortKeyName - The name of the sort key attribute in the table. Default is "sk".
   * @param gsPartitionKeyName - The name of the partition key attribute in the global secondary index. Default is "gsPk".
   * @param gsSortKeyName - The name of the sort key attribute in the global secondary index. Default is "gsSk".
   * @param documentClient - The DynamoDBDocumentClient instance used for interacting with the table.
   */
  constructor({
    name,
    partitionKeyName = "pk",
    sortKeyName = "sk",
    gsPartitionKeyName = "gspk",
    gsSortKeyName = "gssk",
    documentClient,
  }: TableConstructorParameters) {
    this.name = name;
    this.partitionKeyName = partitionKeyName;
    this.sortKeyName = sortKeyName;
    this.globalSecondaryPartitionKeyName = gsPartitionKeyName;
    this.globalSecondarySortKeyName = gsSortKeyName;
    this.documentClient = documentClient;
  }

  /**
   * Performs a transactGet operation on the table, retrieving multiple items in a transactional manner.
   * @param items - The items to retrieve.
   * @param options - The options for the operation.
   * @returns A promise that resolves to the result of the operation.
   */
  async transactGet(items, options) { }

  /**
   * Performs a transactWrite operation on the table, writing multiple items in a transactional manner.
   * @param items - The items to write.
   * @param options - The options for the operation.
   * @returns A promise that resolves to the result of the operation.
   */
  async transactWrite(items, options) { }

  /**
   * Performs a batchGet operation on the table, retrieving multiple items in parallel.
   * @param keys - The keys of the items to retrieve.
   * @param options - The options for the operation.
   * @returns A promise that resolves to the result of the operation.
   */
  async batchGet(keys, options) { }

  /**
   * Performs a batchWrite operation on the table, writing multiple items in parallel.
   * @param items - The items to write.
   * @param options - The options for the operation.
   * @returns A promise that resolves to the result of the operation.
   */
  async batchWrite(items, options) { }
}

// createTable(DocumentTestClient);
export const MasterTable = new Table({
  name: process.env.TABLE_NAME,
  documentClient: DocumentClient,
});

export type CustomEntityAttributes = Record<string, any> & {
  id: string;
  created: number;
  modified: number;
};
export type EntityWithoutMetadata<A extends CustomEntityAttributes> = Omit<
  A,
  "id" | "created" | "modified"
>;

export type EntityMetadataAttributes = {
  id: string;
  created: number;
  modified: number;
};

//TODO: Find more scalable solution allowing easier change of adding/removing entities
export type EntityNames =
  | "administrator"
  | "assessment"
  | "company"
  | "department"
  | "employee"
  | "question"
  | "questionnaire"
  | "task"

export type EntityConstructorParameters<
  PK extends object,
  SK extends object,
  GSPK extends object,
  GSSK extends object
> = {
  name: EntityNames;
  table: Table;
  partitionKey: KeyInformationWithoutData<PK>;
  sortKey: KeyInformationWithoutData<SK>;
  gsPartitionKey: KeyInformationWithoutData<GSPK>;
  gsSortKey: KeyInformationWithoutData<GSSK>;
  attributesToOmit?: string[] | undefined;
};

export type MainPrimaryKey = {
  pk: string;
  sk: string;
};

export type GlobalSecondaryIndexPrimaryKey = {
  gspk: string;
  gssk: string;
};

export type PrimaryKeyInfo<
  PK extends object,
  SK extends object
> = KeyInformation<PK>["data"] & KeyInformation<SK>["data"];
type AllPrimaryKeyInfo = MainPrimaryKey & GlobalSecondaryIndexPrimaryKey;

export type QueryCommandOptions = {
  startKey?: Record<string, NativeAttributeValue>;
  index?: "gsIndex";
  beginsWith?: string;
  between?: [string, string];
  limit?: number;
  select?: QueryCommandInput["Select"];
  fetchAll?: boolean;
};
export type TransactWriteParameterItemsUpdateOptions = {
  Update: Omit<Update, "Key" | "ExpressionAttributeValues"> & {
    Key: Record<string, NativeAttributeValue> | undefined;
    ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
  };
};

export type TransactWriteParameterItemsPutOptions = {
  Put: Omit<Put, "Item" | "ExpressionAttributeValues"> & {
    Item: Record<string, NativeAttributeValue> | undefined;
    ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
  };
};

export type HandleTransactWriteUpdateOptions = {
  keysToNotNest: string[];
};

export type UpdateOptions = {
  keysToNotNest: string[];
};

export type TransactWriteParameterItemsDeleteOptions = {
  Delete: Omit<Delete, "Key" | "ExpressionAttributeValues"> & {
    Key: Record<string, NativeAttributeValue> | undefined;
    ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
  };
};

export type SavedEntityData<A extends CustomEntityAttributes> =
  EntityWithoutMetadata<A> & { _en: string } & EntityMetadataAttributes;
export type SavedEntityDataWithPrimaryKeys<A extends CustomEntityAttributes> =
  SavedEntityData<A> &
  AllPrimaryKeyInfo;

export type TransactWriteParameterItemsUpdate<
  A extends CustomEntityAttributes,
  PK extends object,
  SK extends object
> = {
  type: "Update";
  primaryKey: KeyInformation<PK>["data"] & KeyInformation<SK>["data"];
  item: Partial<EntityWithoutMetadata<A>>;
};

export type TransactWriteParameterItemsPut<A extends CustomEntityAttributes> = {
  type: "Put";
  item: A & AllPrimaryKeyInfo;
};
export type TransactWriteParameterItemsDelete<
  PK extends object,
  SK extends object
> = {
  type: "Delete";
  primaryKey: KeyInformation<PK>["data"] & KeyInformation<SK>["data"];
};

export type TransactWriteParameterItems<
  A extends CustomEntityAttributes,
  PK extends object,
  SK extends object
> =
  | TransactWriteParameterItemsUpdate<A, PK, SK>
  | TransactWriteParameterItemsPut<A>
  | TransactWriteParameterItemsDelete<PK, SK>;

export type BatchGetCommandOptions = {
  fetchAll?: boolean;
};

export type QueryParseOptions = {
  partitionKey: string;
  partitionKeyAttrName: string;
  sortKeyAttrName: string;
};

export type KeyInformation<K extends object> = {
  order: (keyof K)[];
  data: K;
};

export type KeyInformationWithoutData<K extends object> = Omit<
  KeyInformation<K>,
  "data"
>;

export const removeKeysFromObject = <T extends object>(
  obj: T,
  keysToRemove: (keyof T)[]
) => {
  const result = Object.assign({}, obj);
  for (const key of keysToRemove) {
    delete result[key];
  }
  return result;
};

//TODO: Solve the issue of more than one entity being returned even though call was made on a singular entity
/**
 * Represents an entity in a DynamoDB table.
 * Provides methods for querying, getting, and batch getting items from the table,
 * as well as updating and deleting items.
 * Handles parsing and building expressions for DynamoDB commands.
 */
export class Entity<
  A extends CustomEntityAttributes,
  PK extends object,
  SK extends object,
  GSPK extends object,
  GSSK extends object
> {
  private _en: EntityNames; // entity name
  private table: Table;
  public partitionKey: KeyInformationWithoutData<PK>;
  public sortKey: KeyInformationWithoutData<SK>;
  public globalSecondaryPartitionKey: KeyInformationWithoutData<GSPK>;
  public globalSecondarySortKey: KeyInformationWithoutData<GSSK>;
  private client: DynamoDBDocumentClient;
  private entityAttributesToOmit: string[];

  /**
   * Initializes an instance of the Entity class.
   * @param name - The name of the entity.
   * @param table - The table object that the entity belongs to.
   * @param partitionKey - Information about the partition key.
   * @param sortKey - Information about the sort key.
   * @param gsPartitionKey - Information about the global secondary partition key.
   * @param gsSortKey - Information about the global secondary sort key.
   * @param attributesToOmit - An array of attribute names to omit when retrieving or updating the entity.
   */
  constructor({
    name,
    table,
    partitionKey,
    sortKey,
    gsPartitionKey,
    gsSortKey,
    attributesToOmit,
  }: EntityConstructorParameters<PK, SK, GSPK, GSSK>) {
    this._en = name;
    this.table = table;
    this.partitionKey = partitionKey;
    this.sortKey = sortKey;
    this.globalSecondarySortKey = gsSortKey;
    this.globalSecondaryPartitionKey = gsPartitionKey;
    this.client = this.table.documentClient;
    this.entityAttributesToOmit = [];
    this.setAttributesToOmit(attributesToOmit || []);
  }

  /**
   * Sets the attributes to omit for the entity.
   * @param list - The list of attributes to omit.
   */
  private setAttributesToOmit(list: string[]) {
    this.entityAttributesToOmit = ["sk", "pk", "gspk", "gssk"];
    for (const item of list) {
      if (!(item in this.entityAttributesToOmit))
        this.entityAttributesToOmit.push(item);
    }
  }

  /**
   * Executes a query operation on the database table.
   *
   * @param partitionKey - The partition key value or global secondary partition key value.
   * @param options - The query command options.
   * @returns An object containing the query results, including items, itemsCount, and lastEvaluatedKey.
   */
  //TODO: Add support for fetching all items
  async query(
    partitionKey: KeyInformation<PK>["data"] | KeyInformation<GSPK>["data"],
    options: QueryCommandOptions
  ) {
    const parseOptions: QueryParseOptions = {
      partitionKey: this.getPartitionKey(
        partitionKey,
        this.partitionKey.order as string[]
      ),
      partitionKeyAttrName: this.table.partitionKeyName,
      sortKeyAttrName: this.table.sortKeyName,
    };
    if (typeof options.index !== "undefined") {
      //TODO: Ensure this error is logged in a way that can be easily monitored
      if (options.index !== "gsIndex")
        throw new Error(
          `Index ${options.index} does not exist on table`
        );
      parseOptions.partitionKeyAttrName =
        this.table.globalSecondaryPartitionKeyName;
      parseOptions.sortKeyAttrName = this.table.globalSecondarySortKeyName;
      parseOptions.partitionKey = this.getPartitionKey(
        partitionKey,
        this.globalSecondaryPartitionKey.order as string[]
      );
    }

    const { expressionNames, expressionValues, keyCondition } =
      this.parseQueryCommandExpressionAttributes(options, parseOptions);
    const input: QueryCommandInput = {
      TableName: this.table.name,
      ExclusiveStartKey: options.startKey,
      ExpressionAttributeNames: expressionNames,
      ExpressionAttributeValues: expressionValues,
      KeyConditionExpression: keyCondition,
      Limit: options.limit,
      Select: options.select,
      IndexName: options.index,
    };

    const command = new QueryCommand(input);
    const { Items, Count, LastEvaluatedKey } = await this.client.send(command);

    // If fetchAll is true, keep querying until all items are collected
    let allItems: A[] = [];
    let startKey = LastEvaluatedKey;
    let totalCount = Count || 0;
    allItems.push(
      ...(Items as A[]).map((item) =>
        removeKeysFromObject(item, this.entityAttributesToOmit)
      )
    );
    if (options.fetchAll) {
      // Continue querying until there are no more items
      while (typeof LastEvaluatedKey !== "undefined") {
        input.ExclusiveStartKey = startKey;
        const result = await this.client.send(new QueryCommand(input));

        allItems.push(
          ...(result.Items as A[]).map((item) =>
            removeKeysFromObject(item, this.entityAttributesToOmit)
          )
        );
        totalCount += result.Count || 0;
        startKey = result.LastEvaluatedKey;
      }
    }

    return {
      items: allItems,
      itemsCount: totalCount,
      lastEvaluatedKey: startKey,
    };
  }

  /**
   * Parses the query command expression attributes.
   *
   * @param opts - The query command options.
   * @param parseOptions - The query parse options.
   * @returns An object containing the key condition, expression values, and expression names.
   */
  private parseQueryCommandExpressionAttributes(
    opts: QueryCommandOptions,
    parseOptions: QueryParseOptions
  ) {
    let keyCondition = `#pk = :pk`;
    let expressionNames = {
      "#pk": parseOptions.partitionKeyAttrName,
    };
    let expressionValues = {
      ":pk": parseOptions.partitionKey,
    };

    if (opts.beginsWith) {
      keyCondition += ` AND begins_with(#sk,:sk)`;
      expressionValues[":sk"] = opts.beginsWith;
      expressionNames["#sk"] = parseOptions.sortKeyAttrName;
    } else if (opts.between) {
      keyCondition += ` #sk BETWEEN :first AND :second`;
      expressionValues[":first"] = opts.between[0];
      expressionValues[":second"] = opts.between[1];
      expressionNames["#sk"] = parseOptions.sortKeyAttrName;
    }

    return { keyCondition, expressionValues, expressionNames };
  }

  /**
   * Retrieves an item from the database based on the provided primary key.
   * @param primaryKey The primary key of the item to retrieve.
   * @returns The retrieved item.
   */
  async get(primaryKey: PrimaryKeyInfo<PK, SK>) {
    const pk = this.getPartitionKey(
      primaryKey,
      this.partitionKey.order as string[]
    );
    const sk = this.getSortKey(primaryKey, this.sortKey.order as string[]);

    const input: GetCommandInput = {
      Key: { pk, sk },
      TableName: this.table.name,
    };

    const command = new GetCommand(input);
    const { Item } = await this.client.send(command);
    return removeKeysFromObject(Item as A, this.entityAttributesToOmit);
  }

  /**
   * Retrieves multiple items from the database using batch get operation.
   *
   * @param primaryKeys - An array of primary keys to retrieve the items.
   * @param options - Additional options for the batch get operation.
   * @returns An object containing the retrieved items and any unprocessed keys.
   */
  async batchGet(
    primaryKeys: PrimaryKeyInfo<PK, SK>[],
    { fetchAll = true }: BatchGetCommandOptions
  ) {
    if (primaryKeys.length === 0) return { items: [], unprocessedKeys: [] };
    const queryKeys = primaryKeys.map((item) => ({
      pk: this.getPartitionKey(item, this.partitionKey.order as string[]),
      sk: this.getSortKey(item, this.sortKey.order as string[]),
    }));
    const input: BatchGetCommandInput = {
      RequestItems: {
        [this.table.name]: {
          Keys: queryKeys,
        },
      },
    };
    const command = new BatchGetCommand(input);
    const { Responses, UnprocessedKeys } = await this.client.send(command);
    const items = (Responses?.[this.table.name] as A[]) || [];

    let keys: MainPrimaryKey[] = [];

    if (fetchAll && Object.keys(UnprocessedKeys || {}).length > 0) {
      keys = UnprocessedKeys?.[this.table.name].Keys as MainPrimaryKey[];
      let finished = false;

      while (!finished) {
        const input: BatchGetCommandInput = {
          RequestItems: {
            [this.table.name]: {
              Keys: keys,
            },
          },
        };
        const command = new BatchGetCommand(input);
        const response = await this.client.send(command);
        if (!response.UnprocessedKeys) finished = true;
        items.push(...(response.Responses?.[this.table.name] as A[]));
        keys =
          (response.UnprocessedKeys?.[this.table.name]
            .Keys as MainPrimaryKey[]) || [];
      }
    }

    return {
      items: items.map((it) =>
        removeKeysFromObject(it, this.entityAttributesToOmit)
      ),
      unprocessedKeys:
        Object.keys(UnprocessedKeys || {}).length > 0
          ? (UnprocessedKeys?.[this.table.name].Keys as MainPrimaryKey[])
          : [],
    };
  }
  private async batchWrite() {
    throw new Error("Method not implemented.");
  }

  /**
   * Retrieves multiple items from the database using a batch transaction.
   *
   * @param primaryKeys An array of primary key information for the items to retrieve.
   * @returns A promise that resolves to an array of retrieved items.
   */
  async transactGet(primaryKeys: PrimaryKeyInfo<PK, SK>[]) {
    // Split into groups of 100 constrain on the number of items that can be retrieved
    const batchSize = 100;
    const batches: PrimaryKeyInfo<PK, SK>[][] = [];

    for (let i = 0; i < primaryKeys.length; i += batchSize) {
      batches.push(primaryKeys.slice(i, i + batchSize));
    }

    // Fetch all lists of size 100 concurrently
    const resultItems: A[][] = await Promise.all(
      batches.map(async (batch) => {
        const items = batch.map((key) => ({
          Get: { Key: key, TableName: this.table.name },
        })) as TransactGetCommandInput["TransactItems"];

        const input: TransactGetCommandInput = {
          TransactItems: items,
        };

        const command = new TransactGetCommand(input);
        const { Responses } = await this.client.send(command);
        return Responses?.map((res) =>
          removeKeysFromObject(res.Item as A, this.entityAttributesToOmit)
        ) as A[];
      })
    );

    return resultItems.flat();
  }

  /**
   * Builds a nested update expression for updating attributes in a DynamoDB entity.
   *
   * @param obj - The object containing the attributes to update.
   * @param path - The current path of the nested attribute.
   * @param expressionNames - The expression names for attribute placeholders.
   * @param expressionValues - The expression values for attribute values.
   * @param updateExpression - The current update expression.
   * @param keysToNotNest - Keys that should not be nested if they are an object.
   * @returns An object containing the updated expression names, expression values, and update expression.
   */
  private buildNestedUpdateExpression(
    obj: Record<string, any>,
    path: string,
    expressionNames: Record<string, string>,
    expressionValues: Record<string, NativeAttributeValue>,
    updateExpression: string,
    keysToNotNest?: string[]
  ): {
    updatedExpressionNames: Record<string, string>;
    updatedExpressionValues: Record<string, NativeAttributeValue>;
    updatedUpdateExpression: string;
  } {
    // If obj is null, return the original values
    if (obj === null) {
      return {
        updatedExpressionNames: expressionNames,
        updatedExpressionValues: expressionValues,
        updatedUpdateExpression: updateExpression,
      };
    }
    for (const [key, value] of Object.entries(obj)) {
      //Replacing . with _ to avoid issues with DynamoDB not allowing dots in attribute names
      const nestedPath = path
        ? `${path}.#${key.replace(".", "_")}`
        : key.replace(".", "_");
      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        !keysToNotNest?.includes(key)
      ) {
        // If the value is an object (and not an array), recursively build nested update expressions
        expressionNames[`#${key}`] = key;
        if (value === null) {
          expressionValues[`:${key}`] = value as NativeAttributeValue;
          updateExpression += `#${nestedPath} = :${key}, `;
        }
        const result = this.buildNestedUpdateExpression(
          value,
          nestedPath,
          expressionNames,
          expressionValues,
          updateExpression,
          keysToNotNest
        );

        // Update values from the recursive call
        expressionNames = result.updatedExpressionNames;
        expressionValues = result.updatedExpressionValues;
        updateExpression = result.updatedUpdateExpression;
      } else {
        // Otherwise, add to the main update expression
        updateExpression += `#${nestedPath} = :${key}, `;
        expressionNames[`#${key}`] = key;
        expressionValues[`:${key}`] = value as NativeAttributeValue;
      }
    }

    return {
      updatedExpressionNames: expressionNames,
      updatedExpressionValues: expressionValues,
      updatedUpdateExpression: updateExpression,
    };
  }

  /**
   * Handles the TransactWrite update operation.
   *
   * @param item - The item to be updated.
   * @returns The options for the TransactWrite update operation.
   */
  private handleTransactWriteUpdate(
    item: TransactWriteParameterItemsUpdate<A, PK, SK>,
    keysToNotNest?: (keyof Partial<EntityWithoutMetadata<A>>)[]
  ): TransactWriteParameterItemsUpdateOptions {
    const pk = this.getPartitionKey(
      item.primaryKey,
      this.partitionKey.order as string[]
    );
    const sk = this.getSortKey(item.primaryKey, this.sortKey.order as string[]);
    const expressionNames: Record<string, string> = { "#modified": "modified" };
    const expressionValues: Record<string, string | number> = {
      ":modified": Date.now(),
    };
    let updateExpression = "SET #modified = :modified, ";

    // Use the returned values from buildNestedUpdateExpression
    const {
      updatedExpressionNames,
      updatedExpressionValues,
      updatedUpdateExpression,
    } = this.buildNestedUpdateExpression(
      item.item,
      "",
      expressionNames,
      expressionValues,
      updateExpression,
      (keysToNotNest as string[]) || []
    );

    // Remove trailing comma and space from the updateExpression
    const finalUpdateExpression = updatedUpdateExpression.slice(0, -2);
    return {
      Update: {
        Key: { pk, sk },
        TableName: this.table.name,
        UpdateExpression: finalUpdateExpression,
        ExpressionAttributeNames: updatedExpressionNames,
        ExpressionAttributeValues: updatedExpressionValues,
      },
    };
  }

  /**
   * Handles the TransactWritePut operation by converting the provided item into the appropriate options format.
   * @param item The item to be put.
   * @returns The options for the TransactWritePut operation.
   */
  private handleTransactWritePut(
    item: TransactWriteParameterItemsPut<A>
  ): TransactWriteParameterItemsPutOptions {
    return {
      Put: {
        Item: item.item,
        TableName: this.table.name,
      },
    };
  }

  /**
   * Handles the creation of a TransactWriteParameterItemsDeleteOptions object based on the provided item.
   *
   * @param item - The item to be deleted.
   * @returns The TransactWriteParameterItemsDeleteOptions object.
   */
  private handleTransactWriteDelete(
    item: TransactWriteParameterItemsDelete<PK, SK>
  ): TransactWriteParameterItemsDeleteOptions {
    const pk = this.getPartitionKey(
      item.primaryKey,
      this.partitionKey.order as string[]
    );
    const sk = this.getSortKey(item.primaryKey, this.sortKey.order as string[]);
    return {
      Delete: {
        Key: { pk, sk },
        TableName: this.table.name,
      },
    };
  }

  /**
   * Handles the transact write methods for the entity.
   * @param items The array of transact write parameter items.
   * @returns An array of results from handling each transact write method.
   */
  private handleTransactWriteMethods(
    items: TransactWriteParameterItems<A, PK, SK>[]
  ) {
    return items.map((item) => {
      if (item.type === "Update") return this.handleTransactWriteUpdate(item);
      else if (item.type === "Put") return this.handleTransactWritePut(item);
      return this.handleTransactWriteDelete(item);
    });
  }

  /**
   * Executes a transactional write operation on the database.
   * @param items An array of TransactWriteParameterItems representing the write operations to be performed.
   * @returns A Promise that resolves to a boolean indicating the success of the operation.
   */
  async transactWrite(items: TransactWriteParameterItems<A, PK, SK>[]) {
    const input: TransactWriteCommandInput = {
      TransactItems: this.handleTransactWriteMethods(items),
    };
    const command = new TransactWriteCommand(input);
    await this.client.send(command);
    return true;
  }

  /**
   * Creates a new entity.
   *
   * @param item - The item to be created.
   * @returns The created entity.
   */
  async create(item: EntityWithoutMetadata<A>) {
    const date = Date.now();
    const entity = {
      ...item,
      id: v4(),
      created:
        "conductedDate" in item && item.conductedDate !== 0
          ? item.conductedDate
          : date,
      modified: date,
      _en: this._en,
    } satisfies SavedEntityData<A>;

    const entityWithPrimaryKey = {
      ...entity,
      pk: this.getPartitionKey(
        this.getPartitionKeyAttributes(entity),
        this.partitionKey.order as string[]
      ),
      sk: this.getSortKey(
        this.getSortKeyAttributes(entity),
        this.sortKey.order as string[]
      ),
      gspk: this.getPartitionKey(
        this.getGlobalSecondaryPartitionKeyAttributes(entity),
        this.globalSecondaryPartitionKey.order as string[]
      ),
      gssk: this.getSortKey(
        this.getGlobalSecondarySortKeyAttributes(entity),
        this.globalSecondarySortKey.order as string[]
      ),
    } as SavedEntityDataWithPrimaryKeys<A>;

    if (
      entityWithPrimaryKey.pk === "undefined" ||
      typeof entityWithPrimaryKey.pk === "undefined"
    )
      return;

    const input: PutCommandInput = {
      Item: entityWithPrimaryKey,
      TableName: this.table.name,
    };
    console.log("Creation input", input);
    const command = new PutCommand(input);
    await this.client.send(command);
    return removeKeysFromObject(
      entityWithPrimaryKey,
      this.entityAttributesToOmit as any[]
    );
  }

  /**
   * Retrieves the partition key attributes from the given item.
   *
   * @param item The item from which to retrieve the partition key attributes.
   * @returns The partition key attributes of the item.
   */
  private getPartitionKeyAttributes(
    item: SavedEntityData<A>
  ): KeyInformation<PK>["data"] {
    const pk: KeyInformation<PK>["data"] = {} as KeyInformation<PK>["data"];
    const order = this.partitionKey.order as string[];
    order.forEach((attr) => {
      pk[attr] = item[attr];
    });
    return pk;
  }

  /**
   * Retrieves the sort key attributes from the given item.
   *
   * @param item The item from which to retrieve the sort key attributes.
   * @returns The sort key attributes of the item.
   */
  private getSortKeyAttributes(
    item: SavedEntityData<A>
  ): KeyInformation<SK>["data"] {
    const sk: KeyInformation<SK>["data"] = {} as KeyInformation<SK>["data"];
    const order = this.sortKey.order as string[];
    order.forEach((attr) => {
      sk[attr] = item[attr];
    });
    return sk;
  }

  /**
   * Retrieves the global secondary partition key attributes for the given item.
   * @param item The item for which to retrieve the partition key attributes.
   * @returns The global secondary partition key attributes.
   */
  private getGlobalSecondaryPartitionKeyAttributes(
    item: SavedEntityData<A>
  ): KeyInformation<GSPK>["data"] {
    const pk: KeyInformation<GSPK>["data"] = {} as KeyInformation<GSPK>["data"];
    const order = this.globalSecondaryPartitionKey.order as string[];
    order.forEach((attr) => {
      pk[attr] = item[attr];
    });
    return pk;
  }

  /**
   * Retrieves the global secondary sort key attributes for a given item.
   *
   * @param item The item for which to retrieve the global secondary sort key attributes.
   * @returns The global secondary sort key attributes of the item.
   */
  private getGlobalSecondarySortKeyAttributes(
    item: SavedEntityData<A>
  ): KeyInformation<GSSK>["data"] {
    const sk: KeyInformation<GSSK>["data"] = {} as KeyInformation<GSSK>["data"];
    const order = this.globalSecondarySortKey.order as string[];
    order.forEach((attr) => {
      sk[attr] = item[attr];
    });
    return sk;
  }

  /**
   * Updates an entity with the specified primary key and partial item data.
   * @param primaryKey The primary key of the entity to update.
   * @param item The partial item data to update the entity with.
   * @returns The updated entity without metadata.
   */
  async update(
    primaryKey: KeyInformation<PK>["data"] & KeyInformation<SK>["data"],
    item: Partial<EntityWithoutMetadata<A>>,
    keysToNotNest?: (keyof Partial<EntityWithoutMetadata<A>>)[]
  ) {
    const input: UpdateItemCommandInput = this.handleTransactWriteUpdate(
      {
        type: "Update",
        primaryKey,
        item,
      },
      keysToNotNest
    ).Update;
    console.log("Update function input", input);
    const command = new UpdateCommand(input);
    const { Attributes } = await this.client.send(command);
    return removeKeysFromObject(
      (Attributes || {}) as A,
      this.entityAttributesToOmit
    );
  }

  /**
   * Deletes an entity from the database.
   *
   * @param primaryKey - The primary key of the entity to delete.
   * @returns The deleted entity, with the specified attributes omitted.
   */
  async delete(
    primaryKey: KeyInformation<PK>["data"] & KeyInformation<SK>["data"]
  ) {
    const pk = this.getPartitionKey(
      primaryKey,
      this.partitionKey.order as string[]
    );
    const sk = this.getSortKey(primaryKey, this.sortKey.order as string[]);
    const input: DeleteCommandInput = {
      Key: { pk, sk },
      TableName: this.table.name,
    };
    const command = new DeleteCommand(input);
    const { Attributes } = await this.client.send(command);
    return removeKeysFromObject(
      (Attributes || {}) as A,
      this.entityAttributesToOmit
    );
  }

  /**
   * Returns the partition key based on the provided keys and composition.
   * @param keys The data object containing the keys.
   * @param composition An array of strings representing the composition.
   * @returns The partition key.
   */
  private getPartitionKey(
    keys: KeyInformation<PK>["data"] | KeyInformation<GSPK>["data"],
    composition: string[]
  ) {
    let pk = "";
    composition.forEach((attr) => {
      pk = `${pk}:${keys[attr]}`;
    });
    if (pk[0] === ":") pk = pk.slice(1);
    return pk;
  }

  /**
   * Returns the sort key based on the provided keys and composition.
   *
   * @param keys - The keys used to generate the sort key.
   * @param composition - The composition of attributes used to generate the sort key.
   * @returns The generated sort key.
   */
  private getSortKey(
    keys: KeyInformation<SK>["data"] | KeyInformation<GSSK>["data"],
    composition: string[]
  ) {
    let sk = "";
    composition.forEach((attr) => {
      sk = `${sk}:${keys[attr]}`;
    });
    if (sk[0] === ":") sk = sk.slice(1);
    return sk;
  }
}

type TableIndexProperties = {
  partitionKey: string;
  sortKey: string;
  pkComposition: string[];
  skComposition: string[];
};

export type TableIndexes = Record<string, TableIndexProperties>;

export type TableConstructorParameters = {
  name: string;
  partitionKeyName?: string;
  sortKeyName?: string;
  gsPartitionKeyName?: string;
  gsSortKeyName?: string;
  indexes?: TableIndexes;
  documentClient: DynamoDBDocumentClient;
};
