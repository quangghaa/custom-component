import { ReactNode } from "react"

type FilterType = {
    text: string
    value: string 
}
export type ColumnType<T> = {
    title: string
    dataIndex?: string
    key?: string
    width?: number | string
    filters?: FilterType[]
    onFilter?: (value: any, record: T) => boolean
    sorter?: (a: T, b: T) => boolean
    children?: ColumnType<T>
    render?: (value: any, record: T, index: number) => ReactNode
} 