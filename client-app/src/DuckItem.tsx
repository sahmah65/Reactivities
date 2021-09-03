import React from 'react'
import { Duck } from './demo'

interface Props {
    duck: Duck;
}

export default function DuckItem({ duck }: Props) {
    return (
        <div  >
            <span style={{ color: "red" }}> {duck.name} </span>
            <button onClick={() => duck.makeSound(duck.name + ' quack')}>click to sound</button>
        </div> 
        )
}