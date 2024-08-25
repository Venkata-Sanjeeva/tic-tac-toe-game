import React from 'react'

export default function ButtonsEvent() {
    const handleClick = (buttonNumber) => {
        alert(`Button ${buttonNumber} clicked`);
    };
    
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '300px' }}>
        {[...Array(9)].map((_, index) => (
            <button
            key={index}
            onClick={() => handleClick(index + 1)}
            style={{ padding: '10px', fontSize: '16px' }}
            >
            Button {index + 1}
            </button>
        ))}
        </div>
    );
      
}
