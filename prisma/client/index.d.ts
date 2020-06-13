import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.0.0
 * Query Engine version: de2bc1cbdb5561ad73d2f08463fa2eec48993f56
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Todos
 * const todos = await prisma.todo.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Todos
   * const todos = await prisma.todo.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.todo`: Exposes CRUD operations for the **todo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Todos
    * const todos = await prisma.todo.findMany()
    * ```
    */
  get todo(): todoDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model todo
 */

export type todo = {
  completed: boolean | null
  id: number
  todo: string
}

export type todoSelect = {
  completed?: boolean
  id?: boolean
  todo?: boolean
}

export type todoGetPayload<
  S extends boolean | null | undefined | todoArgs,
  U = keyof S
> = S extends true
  ? todo
  : S extends undefined
  ? never
  : S extends todoArgs | FindManytodoArgs
  ? 'include' extends U
    ? todo 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof todo ? todo[P]
: 
 never
    }
  : todo
: todo


export interface todoDelegate {
  /**
   * Find zero or one Todo.
   * @param {FindOnetodoArgs} args - Arguments to find a Todo
   * @example
   * // Get one Todo
   * const todo = await prisma.todo.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnetodoArgs>(
    args: Subset<T, FindOnetodoArgs>
  ): CheckSelect<T, todoClient<todo | null>, todoClient<todoGetPayload<T> | null>>
  /**
   * Find zero or more Todos.
   * @param {FindManytodoArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Todos
   * const todos = await prisma.todo.findMany()
   * 
   * // Get first 10 Todos
   * const todos = await prisma.todo.findMany({ take: 10 })
   * 
   * // Only select the `completed`
   * const todoWithCompletedOnly = await prisma.todo.findMany({ select: { completed: true } })
   * 
  **/
  findMany<T extends FindManytodoArgs>(
    args?: Subset<T, FindManytodoArgs>
  ): CheckSelect<T, Promise<Array<todo>>, Promise<Array<todoGetPayload<T>>>>
  /**
   * Create a Todo.
   * @param {todoCreateArgs} args - Arguments to create a Todo.
   * @example
   * // Create one Todo
   * const user = await prisma.todo.create({
   *   data: {
   *     // ... data to create a Todo
   *   }
   * })
   * 
  **/
  create<T extends todoCreateArgs>(
    args: Subset<T, todoCreateArgs>
  ): CheckSelect<T, todoClient<todo>, todoClient<todoGetPayload<T>>>
  /**
   * Delete a Todo.
   * @param {todoDeleteArgs} args - Arguments to delete one Todo.
   * @example
   * // Delete one Todo
   * const user = await prisma.todo.delete({
   *   where: {
   *     // ... filter to delete one Todo
   *   }
   * })
   * 
  **/
  delete<T extends todoDeleteArgs>(
    args: Subset<T, todoDeleteArgs>
  ): CheckSelect<T, todoClient<todo>, todoClient<todoGetPayload<T>>>
  /**
   * Update one Todo.
   * @param {todoUpdateArgs} args - Arguments to update one Todo.
   * @example
   * // Update one Todo
   * const todo = await prisma.todo.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends todoUpdateArgs>(
    args: Subset<T, todoUpdateArgs>
  ): CheckSelect<T, todoClient<todo>, todoClient<todoGetPayload<T>>>
  /**
   * Delete zero or more Todos.
   * @param {todoDeleteManyArgs} args - Arguments to filter Todos to delete.
   * @example
   * // Delete a few Todos
   * const { count } = await prisma.todo.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends todoDeleteManyArgs>(
    args: Subset<T, todoDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Todos.
   * @param {todoUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Todos
   * const todo = await prisma.todo.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends todoUpdateManyArgs>(
    args: Subset<T, todoUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Todo.
   * @param {todoUpsertArgs} args - Arguments to update or create a Todo.
   * @example
   * // Update or create a Todo
   * const todo = await prisma.todo.upsert({
   *   create: {
   *     // ... data to create a Todo
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Todo we want to update
   *   }
   * })
  **/
  upsert<T extends todoUpsertArgs>(
    args: Subset<T, todoUpsertArgs>
  ): CheckSelect<T, todoClient<todo>, todoClient<todoGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManytodoArgs, 'select' | 'include'>): Promise<number>
}

export declare class todoClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * todo findOne
 */
export type FindOnetodoArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Filter, which todo to fetch.
  **/
  where: todoWhereUniqueInput
}


/**
 * todo findMany
 */
export type FindManytodoArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Filter, which todos to fetch.
  **/
  where?: todoWhereInput
  /**
   * Determine the order of the todos to fetch.
  **/
  orderBy?: todoOrderByInput
  /**
   * Sets the position for listing todos.
  **/
  cursor?: todoWhereUniqueInput
  /**
   * The number of todos to fetch. If negative number, it will take todos before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` todos.
  **/
  skip?: number
}


/**
 * todo create
 */
export type todoCreateArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * The data needed to create a todo.
  **/
  data: todoCreateInput
}


/**
 * todo update
 */
export type todoUpdateArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * The data needed to update a todo.
  **/
  data: todoUpdateInput
  /**
   * Choose, which todo to update.
  **/
  where: todoWhereUniqueInput
}


/**
 * todo updateMany
 */
export type todoUpdateManyArgs = {
  data: todoUpdateManyMutationInput
  where?: todoWhereInput
}


/**
 * todo upsert
 */
export type todoUpsertArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * The filter to search for the todo to update in case it exists.
  **/
  where: todoWhereUniqueInput
  /**
   * In case the todo found by the `where` argument doesn't exist, create a new todo with this data.
  **/
  create: todoCreateInput
  /**
   * In case the todo was found with the provided `where` argument, update it with this data.
  **/
  update: todoUpdateInput
}


/**
 * todo delete
 */
export type todoDeleteArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Filter which todo to delete.
  **/
  where: todoWhereUniqueInput
}


/**
 * todo deleteMany
 */
export type todoDeleteManyArgs = {
  where?: todoWhereInput
}


/**
 * todo without action
 */
export type todoArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
}



/**
 * Deep Input Types
 */


export type todoWhereInput = {
  completed?: boolean | NullableBooleanFilter | null
  id?: number | IntFilter
  todo?: string | StringFilter
  AND?: Enumerable<todoWhereInput>
  OR?: Array<todoWhereInput>
  NOT?: Enumerable<todoWhereInput>
}

export type todoWhereUniqueInput = {
  id?: number
}

export type todoCreateInput = {
  completed?: boolean | null
  todo: string
}

export type todoUpdateInput = {
  completed?: boolean | null
  id?: number
  todo?: string
}

export type todoUpdateManyMutationInput = {
  completed?: boolean | null
  id?: number
  todo?: string
}

export type NullableBooleanFilter = {
  equals?: boolean | null
  not?: boolean | null | NullableBooleanFilter
}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type todoOrderByInput = {
  completed?: OrderByArg | null
  id?: OrderByArg | null
  todo?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
