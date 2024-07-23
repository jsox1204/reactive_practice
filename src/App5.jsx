import {useState} from 'react';

export default function Counter() {
    const [number, setNumber]= useState(0);

    function handlePlusClick() {
        setNumber(n => n + 1); // setNumber(number + 1)으로 3번 실행 시 number는 이전 상태 값으로 고정되어 1번 실행한 결과와 같다.
        setNumber(n => n + 1);
        setNumber(n => n + 1);
    }

    function handlePlusClick2() {
        setNumber(number + 5); // number + 5의 값으로 대체
        setNumber(n => n + 1); // 위의 값에서 +1을 반환
    }

    return (
        <>
            <h1>{number}</h1>
            <button onClick={handlePlusClick}>
                +3
            </button>
            <button onClick={handlePlusClick2}>
                +6
            </button>
        </>
    );
}