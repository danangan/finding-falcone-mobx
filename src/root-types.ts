export interface Planet {
  name: string
  distance: number
}

export interface Vehicle {
  name: string
  total_no: number
  max_distance: number
  speed: number
}

export interface PlanetOption extends Planet {}

export interface VehicleOption extends Vehicle {
  disabled: boolean
  label: string
}

export interface SelectedValue {
  vehicle: string
  planet: string
}

export enum STATUS {
  SUCCESS = 'success',
  FAIL = 'false',
}

export interface ValueSelection extends SelectedValue {
  shouldDisplayVehicleSelection: boolean
  planetSelectionOptions: PlanetOption[]
  vehicleSelectionOptions: VehicleOption[]
}

export type ValueSelections = ValueSelection[]
