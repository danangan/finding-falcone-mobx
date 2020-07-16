import { SelectedValue } from '../root-types'

function fetchToken() {
  return fetch('https://findfalcone.herokuapp.com/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  }).then((res) => res.json())
}

export function fetchPlanetsAndVehicles() {
  return Promise.all([fetchPlanets(), fetchVehicles()]).then((res) => {
    return {
      planets: res[0],
      vehicles: res[1],
    }
  })
}

function fetchPlanets() {
  return fetch('https://findfalcone.herokuapp.com/planets').then((res) =>
    res.json()
  )
}

function fetchVehicles() {
  return fetch('https://findfalcone.herokuapp.com/vehicles').then((res) =>
    res.json()
  )
}

export function findFalcone(selectedValues: SelectedValue[]) {
  console.log(selectedValues)
  return fetchToken()
    .then((res) => {
      return fetch('https://findfalcone.herokuapp.com/find', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: res.token,
          planet_names: selectedValues.map((item) => item.planet),
          vehicle_names: selectedValues.map((item) => item.vehicle),
        }),
      })
    })
    .then((res) => res.json())
}
