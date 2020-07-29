import makeInspectable from 'mobx-devtools-mst'
import { observable, action, computed } from 'mobx'
import {
  Planet,
  Vehicle,
  SelectedValue,
  ValueSelections,
  ValueSelection,
} from '../root-types'
import { fetchPlanetsAndVehicles, findFalcone } from './api'
import { pipe, filter, first } from 'lodash/fp'

export class FalconeStore {
  constructor(option?: {
    planets?: Planet[]
    vehicles?: Vehicle[]
    selectedValues?: SelectedValue[]
  }) {
    this.planets = option && option.planets ? option.planets : []
    this.vehicles = option && option.vehicles ? option.vehicles : []
    this.selectedValues =
      option && option.selectedValues
        ? option.selectedValues
        : [
            {
              vehicle: '',
              planet: '',
            },
            {
              vehicle: '',
              planet: '',
            },
            {
              vehicle: '',
              planet: '',
            },
            {
              vehicle: '',
              planet: '',
            },
          ]
  }

  @observable planets: Planet[]

  @observable vehicles: Vehicle[]

  @observable selectedValues: SelectedValue[]

  @computed get selectedVehicles(): string[] {
    return this.selectedValues.map((item) => item.vehicle)
  }

  @computed get valueSelections(): ValueSelections {
    return this.selectedValues.map<ValueSelection>((selectedValue) => {
      return {
        ...selectedValue,
        shouldDisplayVehicleSelection: selectedValue.planet !== '',
        planetSelectionOptions: this.planets,
        vehicleSelectionOptions: this.vehicles.map((vehicle) => {
          console.log(
            this.selectedVehicles.reduce(
              (acc, selectedVehicle) =>
                acc + (selectedVehicle === vehicle.name ? 1 : 0),
              0
            )
          )
          return {
            ...vehicle,
            label: `${vehicle.name} (${vehicle.total_no})`,
            disabled:
              vehicle.total_no -
                this.selectedVehicles.reduce(
                  (acc, selectedVehicle) =>
                    acc + (selectedVehicle === vehicle.name ? 1 : 0),
                  0
                ) ===
                0 ||
              pipe(
                filter(
                  (planet: Planet) => planet.name === selectedValue.planet
                ),
                first,
                (planet?: Planet) =>
                  (planet ? planet.distance : 0) > vehicle.max_distance
              )(this.planets),
          }
        }),
      }
    })
  }

  @action updateSelectedPlanet = (idx: number, newPlanet: string) => {
    this.selectedValues[idx] = {
      ...this.selectedValues[idx],
      planet: newPlanet,
    }
  }

  @action updateSelectedVehicle = (idx: number, newVehicle: string) => {
    this.selectedValues[idx] = {
      ...this.selectedValues[idx],
      vehicle: newVehicle,
    }
  }

  @action updatePlanets(planets: Planet[]) {
    this.planets = planets
  }

  @action updateVehicles(planets: Planet[]) {
    this.planets = planets
  }

  @action.bound async fetchPlanetsAndVehicles() {
    const { planets, vehicles } = await fetchPlanetsAndVehicles()
    this.planets = planets
    this.vehicles = vehicles
  }

  @action.bound async findFalcone() {
    const result = await findFalcone(this.selectedValues)
    console.log(result)
  }
}

const store = new FalconeStore()

makeInspectable(store)

export default store
