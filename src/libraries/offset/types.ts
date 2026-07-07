export type QueryKey = string | number
export type OffsetUnit = {
  [K in QueryKey]?: QueryKey | OffsetUnit
}


export enum UpdateOffsetUnitProcess {
  UP = "UP",
  DOWN = "DOWN"
}
export type OffsetContextProps = {
  updateOffsetUnit: (keys: QueryKey[], process: UpdateOffsetUnitProcess) => void,
  getOffsetUnit: (keys: QueryKey[]) => number,
  resetOffsetUnit: (keys: QueryKey[]) => Promise<void>
}

export type OffsetProviderProps = {
  children: React.ReactNode
}