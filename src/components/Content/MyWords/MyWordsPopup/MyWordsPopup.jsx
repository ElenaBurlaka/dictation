import { useEffect, useState } from 'react';
import mywordspopup from './MyWordsPopup.module.css';
import close from './../../../../../src/images/close.png';

const MyWordsPopup = ({ onClose, addWord, filteredWords, blurHandler }) => {
    const [word, setWord] = useState('');
    const [sentences, setSentences] = useState([{ sentence: '', translation: '' }]);
    const [error, setError] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const formHasErrors = error !== '' || sentences.some(s => !s.sentence || !s.translation);
        setFormValid(!formHasErrors);
    }, [error, sentences]);

    const handleAddWord = () => {
        if (filteredWords.some(existingWord => existingWord.word.toLowerCase() === word.toLowerCase())) {
            setError('This word already exists');
        } else if (word.trim() === '') {
            setError("Field can't be empty");
        } else {
            addWord({ word, sentences });
            // onClose();
        }
    };

    const handleSentenceChange = (index, field, value) => {
        const newSentences = [...sentences];
        newSentences[index][field] = value;
        setSentences(newSentences);
    };

    const addSentenceField = () => {
        setSentences([...sentences, { sentence: '', translation: '' }]);
    };

    const removeSentenceField = (index) => {
        setSentences(sentences.filter((_, i) => i !== index));
    };

    return (
        <div className={mywordspopup.mywordspopup}>
            <div className={mywordspopup.mywordspopup__wrapper}>
                <div className={mywordspopup.mywordspopup__content}>
                    <button className={mywordspopup.mywordspopup__content_close} onClick={onClose}>
                        <img src={close} alt='Close' />
                    </button>
                    <div className={mywordspopup.mywordspopup__inputs}>
                        <input
                            onChange={(e) => setWord(e.target.value)}
                            // onBlur={handleAddWord}
                            name='word'
                            type='text'
                            placeholder='word'
                            value={word}
                        />
                        {error && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>
                        )}
                        {sentences.map((sentence, index) => (
                            <div key={index} style={{ display: 'flex' }}>
                                <div className={mywordspopup.mywordspopup__inputs_repeated}>
                                    <input
                                        onChange={(e) => handleSentenceChange(index, 'sentence', e.target.value)}
                                        onBlur={blurHandler}
                                        name={`sentence-${index}`}
                                        type='text'
                                        placeholder='sentence with word'
                                        value={sentence.sentence}
                                    />
                                    <input
                                        onChange={(e) => handleSentenceChange(index, 'translation', e.target.value)}
                                        // onBlur={handleBlur}
                                        name={`translation-${index}`}
                                        type='text'
                                        placeholder='sentence translation'
                                        value={sentence.translation}
                                    />
                                </div>
                                {sentences.length > 1 && (
                                    <span
                                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                                        onClick={() => removeSentenceField(index)}
                                    >
                                        –
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={mywordspopup.mywordspopup__buttons}>
                        <button onClick={addSentenceField}>add one more sentence</button>
                        <button onClick={handleAddWord} disabled={!formValid}>done</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyWordsPopup;

