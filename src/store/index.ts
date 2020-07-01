import {createContext} from "react";
import makeInspectable from 'mobx-devtools-mst';
import {observable, action} from "mobx";
import {times} from '../helper';

interface IPlanet {
    name: string
}

interface IVehicle {
    name: string
}

class FalconeStore {
    @observable planets = times<IPlanet>(4, {name: ''});

    @observable vehicle = times<IVehicle>(4, {name: ''});

    @action updatePlanet = (idx: number, newName: string) => {
        this.planets[idx] = { name: newName};
    };

    @action updateVehicle = (idx: number, newName: string) => {
        this.planets[idx] = { name: newName};
    };
}

const store = new FalconeStore();

makeInspectable(store);

export default createContext(store)
