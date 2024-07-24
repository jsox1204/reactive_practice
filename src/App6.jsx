import {useState} from 'react';

// 마우스 포인터에 따라 점 움직이기
export default function MoveDot() {
    const [position, setPosition] = useState({x: 0, y: 0});

    return (
        <div
            className="board"
            onPointerMove={e => {
                setPosition({
                    x: e.clientX,
                    y: e.clientY
                });
            }}>
            <div style={{
                position: 'absolute',
                backgroundColor: 'blue',
                borderRadius: '50%',
                transform: `translate(${position.x}px, ${position.y}px)`,
                left: -10,
                top: -10,
                width: 20,
                height: 20,
            }}/>
        </div>

    );
}