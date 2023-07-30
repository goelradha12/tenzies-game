import React from 'react'
import './App.css'

export default function Card({value, onCardClick, isHeld}) {

    const dotArray =[]
    buildDotsArray()
    function buildDotsArray() {
        for(var i =0;i<value;i++)
        {
            dotArray.push(<span key={i} className='dot'></span>)
        }
    }
    const styles = {
        backgroundColor: isHeld ? "#bbb" : "white"
    }

    return (
        <div 
        className='single--card' 
        style={styles}
        onClick={onCardClick}
        >
            <div className='dice'>

            {dotArray}
            </div>
        </div>
    )
}

// {value}