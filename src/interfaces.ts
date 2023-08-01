export interface IBaseQueryParams {
  threshold?: string;
}

export interface IBodySimulatorParams extends IBaseQueryParams {}
export interface IStatusSimulatorParams extends IBaseQueryParams {}
export interface IChainSimulatorParams extends IBaseQueryParams {}
export interface IDelaySimulatorParams extends IBaseQueryParams {
  delay?: string;
}
