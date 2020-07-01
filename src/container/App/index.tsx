import React, {useContext} from "react";
import falconeStoreContext from '../../store/index'
import styles from './styles.module.scss';
import {observer} from 'mobx-react';

function App() {
    const {updatePlanet} = useContext(falconeStoreContext);
    return <div>
        <h1 className={styles.title}>Falcone App</h1>
        <button onClick={() => updatePlanet(1, 'new planet name')}>click me</button>
    </div>
}

export default observer(App);

