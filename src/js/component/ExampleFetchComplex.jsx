import React, { useEffect, useState } from "react";

export const ExampleFetchComplex = () => {
    const [character, setCharacter] = useState([])
    const base_url = 'https://swapi.tech/api';

    const getCharacter = async () => {
        const uri = `${base_url}/people`;
        const options = {
            method: 'GET'
        };

        const response = await fetch(uri, options)

        if (!response.ok) {
            console.log('Error:', response.status, response.statusText)
            return;
        }

        const data = await response.json();
        console.log(data);

        setCharacter(data.results)
    };



    useEffect(() => {
        getCharacter()
    }, [])

    return (

        <div className="container">
            <h1 className="text-center text-success">Example Fetch()</h1>
            
            
            <ul className="list-group">
                {character.map((iterator) => <li key={iterator.uid} className="list-group-item">{iterator.name}</li>)}
            </ul>
        </div>

    );

};