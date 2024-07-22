import {useState} from 'react';
import PropTypes from 'prop-types';

// propType 확인
Square.propTypes = {
    value: PropTypes.string,
    onSquareClick: PropTypes.func
}

function Square({value, onSquareClick}) {
    return <button className={"square"} onClick={onSquareClick}>{value}</button>
}

// 게임 기록을 표시하기 위한 최상위 컴포넌트
export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]); // 동작 기록 저장
    const [currentMove, setCurrentMove] = useState(0); // 현재 보드에 표시 중인 단계
    const currentSquares = history[currentMove]; // 가장 최근의 보드 배열


    /**
     * 보드를 기록하고 다음 턴으로 넘기기, 특정 단계로 이동하여 기록 시 이전 기록만 유지
     * @param nextSquares 기록할 보드 배열
     */
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setXIsNext(!xIsNext);
        setCurrentMove(nextHistory.length - 1);
    }

    /**
     * 특정 단계로 이동하여 표시
     * @param nextMove 이동할 단계
     */
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = '이동 #' + move + '로 가기';
        } else {
            description = '게임 시작으로 가기';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

//Board Prop 확인
Board.propTypes = {
    xIsNext: PropTypes.bool,
    squares: PropTypes.array,
    onPlay: PropTypes.func
}

function Board({xIsNext, squares, onPlay}) {

    // 이긴 플레이어가 있다면 표시, 아니라면 다음 플레이어의 차례 보여주기

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "이긴 플레이어: " + winner;
    } else {
        status = (xIsNext ? "X" : "O") + " 플레이어의 차례";
    }

    /**
     * 몇번째의 버튼을 누르면 해당 버튼의 값을 업데이트하고 턴 넘기기
     * @param i 몇번째를 눌렀는지에 대한 변수
     */
    function handleClick(i) {
        // 이전 단계로 되돌리는 기능 구현과 값이 바뀌었는지 확인하기 위해 squares 배열을 복사한 배열
        const nextSquares = squares.slice();

        if (squares[i] || calculateWinner(squares)) {
            return;
        } // 이미 값이 채워져 있거나 이긴 플레이어가 있다면 종료

        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

function calculateWinner(square) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (square[a] && square[a] === square[b] && square[a] === square[c]) {
            return square[a];
        }
    }

    return null;
}
