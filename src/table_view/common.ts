import { ColumnType } from "./types";

export function hasChildren<T>(col: ColumnType<T>): boolean {
    return !(col.children === undefined || (Array.isArray(col.children) && col.children.length === 0))
}