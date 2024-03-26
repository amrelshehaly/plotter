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


export type DataPlotTypes = {
    name: string,
    values: string[]
}

export type DataResponse = {
    data: DataPlotTypes[]
}

export type GetDataParams = {
    measures: string[]
    dimension: string
}