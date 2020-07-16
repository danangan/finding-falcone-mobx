import React, { useContext, useEffect } from 'react'
import { pipe, map, concat } from 'lodash/fp'
import falconeStoreContext from '../../store/index'
import styles from './styles.module.scss'
import { observer } from 'mobx-react'
import { Planet, Vehicle, VehicleOption } from '../../root-types'

function App() {
  const {
    updateSelectedPlanet,
    updateSelectedVehicle,
    fetchPlanetsAndVehicles,
    findFalcone,
    valueSelections,
  } = useContext(falconeStoreContext)

  useEffect(() => {
    fetchPlanetsAndVehicles()
  }, [])

  const buildPlanetsOptions = pipe(
    map((planet: Planet) => (
      <option value={planet.name} key={planet.name}>
        {planet.name}
      </option>
    )),
    concat(<option value=""></option>)
  )

  const buildVehiclesOptions = (vehicleOptions, index) =>
    map((vehicleOption: VehicleOption) => (
      <>
        <input
          type="radio"
          name={`vehicle-selection-${index}`}
          onChange={(event) => updateSelectedVehicle(index, event.target.value)}
          value={vehicleOption.name}
          disabled={vehicleOption.disabled}
          key={vehicleOption.name}
        />
        <label htmlFor={`vehicle-selection-${index}`}>
          {vehicleOption.label}
        </label>
      </>
    ))(vehicleOptions)

  return (
    <div>
      <h1 className={styles.title}>Falcone App</h1>
      {valueSelections.map((valueSelection, index) => (
        <div>
          <select
            value={valueSelection.planet}
            onChange={(event) =>
              updateSelectedPlanet(index, event.target.value)
            }
          >
            {buildPlanetsOptions(valueSelection.planetSelectionOptions)}
          </select>
          {valueSelection.shouldDisplayVehicleSelection &&
            buildVehiclesOptions(valueSelection.vehicleSelectionOptions, index)}
        </div>
      ))}
      <div></div>
      <button onClick={findFalcone}>Find Falcone!</button>
    </div>
  )
}

export default observer(App)
