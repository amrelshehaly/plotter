export enum FunctionEnum {
    MEASURE = 'measure',
    DIMENSION = 'dimension'
}

export type ColumnsProps = {
    name: string
    function: FunctionEnum
}

export type ColumnResponse = {
    columns : ColumnsProps[]
} 
