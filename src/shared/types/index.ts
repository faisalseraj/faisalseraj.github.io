export * from './Upload';
export * from './User';

export type UnArray<T> = T extends Array<infer U> ? U : T;
