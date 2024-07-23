import {useState} from 'react';
import {sculptureList} from './App4Data.jsx';

export default function Gallery() {
    const [index, setIndex] = useState(0); // 현재 페이지 저장용
    const [showMore, setShowMore] = useState(false); // 자세히 보기 버튼용

    /**
     * 이전 페이지 이동 버튼
     */
    function handlePreviousClick() {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    /**
     * 다음 페이지 이동 버튼
     */
    function handleNextClick() {
        if (index < sculptureList.length - 1) {
            setIndex(index + 1);
        }
    }

    /**
     * 자세히 보기 버튼
     */
    function handleMoreClick() {
        setShowMore(!showMore);
    }

    let sculpture = sculptureList[index];
    return (
        <>
            <button onClick={handlePreviousClick}>
                이전
            </button>
            <button onClick={handleNextClick}>
                다음
            </button>
            <h2>
                <i>{sculpture.name} </i>
                by {sculpture.artist}
            </h2>
            <h3>
                ({sculptureList.length}개 중의 {index + 1}번째)
            </h3>
            <img
                src={sculpture.url}
                alt={sculpture.alt}
            />
            <p></p>
            <button onClick={handleMoreClick}>
                {showMore ? '숨기기' : '자세히 보기'}
            </button>
            {showMore &&
                <p>
                    {sculpture.description}
                </p>
            }
        </>
    );
}