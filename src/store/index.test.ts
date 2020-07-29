import { FalconeStore } from '.'

jest.mock('./api', () => {
  return {
    __esModule: true,
    fetchPlanetsAndVehicles: jest.fn().mockResolvedValue({
      planets: [
        {
          name: 'some planet',
          distance: 1,
        },
      ],
      vehicles: [
        {
          name: 'some vehicle',
          total_no: 1,
          max_distance: 1,
          speed: 1,
        },
      ],
    }),
  }
})

describe('store', () => {
  afterEach(() => {
    jest.clearAllMocks
  })

  test('updateSelectedPlanet should update selected planet based on given index', () => {
    const store = new FalconeStore()

    store.updateSelectedPlanet(0, 'some new planet')

    expect(store.selectedValues[0].planet).toBe('some new planet')
  })

  test('updateSelectedVehicle update selected planet based on given index', () => {
    const store = new FalconeStore()

    store.updateSelectedVehicle(0, 'some new vehicle')

    expect(store.selectedValues[0].vehicle).toBe('some new vehicle')
  })

  test('selectedVehicles should derive the data from selectedValues', () => {
    const store = new FalconeStore({
      selectedValues: [
        {
          vehicle: 'some vehicle 1',
          planet: 'some planet',
        },
        {
          vehicle: 'some vehicle 2',
          planet: 'some planet',
        },
        {
          vehicle: 'some vehicle 3',
          planet: 'some planet',
        },
        {
          vehicle: 'some vehicle 4',
          planet: 'some planet',
        },
      ],
    })

    expect(store.selectedVehicles).toStrictEqual([
      'some vehicle 1',
      'some vehicle 2',
      'some vehicle 3',
      'some vehicle 4',
    ])
  })

  test('fetchPlanetsAndVehicles should fetch planets and vehicles and assign them to store', async () => {
    const store = new FalconeStore()

    await store.fetchPlanetsAndVehicles()

    expect(store.planets).toStrictEqual([
      {
        name: 'some planet',
        distance: 1,
      },
    ])

    expect(store.vehicles).toStrictEqual([
      {
        name: 'some vehicle',
        total_no: 1,
        max_distance: 1,
        speed: 1,
      },
    ])
  })
})
