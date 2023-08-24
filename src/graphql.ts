
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    getUsers(): User[] | Promise<User[]>;
}

export interface IMutation {
    createUser(name: string): User | Promise<User>;
}

export interface User {
    id: string;
    name: string;
}

type Nullable<T> = T | null;
