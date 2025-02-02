import React, { useEffect, useState } from "react";

export const ExampleFetchComplex = () => {
    const host = 'https://playground.4geeks.com/todo';
    const user = 'mauro'

    const [character, setCharacter] = useState(["",""]);

    const getUser = async () => {
        const uri = `${host}/users/${user}`;
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

        setCharacter(data.todos)
    };



    useEffect(() => {
        getUser('mauro')
    }, [])

    return (

        <div className="container">
            <h1 className="text-center text-success">Example Fetch()</h1>
            
            
            <ul className="list-group">
                {character.map((item) => <li  className="list-group-item">{item.label}</li>)}
            </ul>
        </div>

    );

};