import React, { useState } from 'react';
import './css/DoorPage.css';
const DoorList = ({ zone }) => {
    const doorData = {
        all: {
            "Porte A": 20,
            "Porte B": 50,
            "Porte C": 80
        },
        zone1: {
            "Porte A": 10,
            "Porte B": 40,
            "Porte C": 70
        },
        zone2: {
            "Porte A": 30,
            "Porte B": 60,
            "Porte C": 90
        },
        zone3: {
            "Porte A": 25,
            "Porte B": 55,
            "Porte C": 85
        }
    };

    const filteredDoors = Object.entries(doorData[zone]).sort((a, b) => a[1] - b[1]);

    return (
        <ul>
            {filteredDoors.map(([door, frequency]) => (
                <li key={door}>
                    <span>{door}</span>
                    <span>{frequency}% de fréquentation</span>
                </li>
            ))}
        </ul>
    );
};

const DoorsPage = () => {
    const [zone, setZone] = useState('all');

    return (
        <div>
            <h1>Portes moins fréquentées</h1>
            <p>Consultez les portes d'accès les moins fréquentées pour un accès rapide et fluide au stade.</p>
            <div>
                <span>Filtrer par zone :</span>
                <select value={zone} onChange={(e) => setZone(e.target.value)}>
                    <option value="all">Toutes les zones</option>
                    <option value="zone1">Zone 1</option>
                    <option value="zone2">Zone 2</option>
                    <option value="zone3">Zone 3</option>
                </select>
            </div>
            <DoorList zone={zone} />
        </div>
    );
};



export default DoorsPage;
