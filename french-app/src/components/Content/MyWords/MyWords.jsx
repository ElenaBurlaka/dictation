import { useState, useEffect } from 'react';
import mywords from './MyWords.module.css';
import MyWordsPopup from './MyWordsPopup/MyWordsPopup';

const MyWords = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem('wordsData');
        if (savedData) {
            setData(JSON.parse(savedData))
        }
    }, [])

    const addWord = (wordData) => {
        const updatedData = [...data, wordData]
        setData(updatedData);
        localStorage.setItem('wordsData', JSON.stringify(updatedData))

        setShowPopup(false); // Закрыть попап после добавления слова
    };

    return (
        <div className={mywords.mywords}>
            <div className={mywords.mywords__wrapper}>
                <div className={mywords.mywords__wrapper_header}>
                    <h1>My words</h1>
                    <p>(you have {data.length} words)</p>
                </div>
                <div className={mywords.mywords__wrapper_content}>
                    {data.map((item, index) => (
                        <div key={index}>
                            <p>{item.word}</p>
                            <ul>
                                {item.sentences.map((sentence, i) => (
                                    <li key={i}>{sentence.sentence} - {sentence.translation}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className={mywords.mywords__button}>
                <button className={mywords.mywords__button_button} onClick={() => setShowPopup(true)}>Add a word</button>
                {showPopup && <MyWordsPopup onClose={() => setShowPopup(false)} addWord={addWord} />}
            </div>
        </div>
    );
};

export default MyWords;