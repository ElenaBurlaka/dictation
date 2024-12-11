import { useEffect, useState } from 'react';
import startDictation from './StartDictation.module.css';

const StartDictation = ({ formData }) => {
    const [randomTranslation, setRandomTranslation] = useState('');
    const [randomSentence, setRandomSentence] = useState('');
    const [showTranslation, setShowTranslation] = useState(false);
    const [availableSentences, setAvailableSentences] = useState(formData.flatMap(word => word.sentences));
    // const [currentIndex, setCurrentIndex] = useState(0);
    const [usedIndices, setUsedIndices] = useState([]);
    const [message, setMessage] = useState('');

    const getRandomSentence = () => {
        if (usedIndices.length >= availableSentences.length) {
            setMessage('You checked all the sentences');
            setRandomSentence('');
            setRandomTranslation('');
            return;
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * availableSentences.length);
        } while (usedIndices.includes(randomIndex));

        setUsedIndices(prev => [...prev, randomIndex]);

        const selectedSentence = availableSentences[randomIndex];
        setRandomSentence(selectedSentence.sentence);
        setRandomTranslation(selectedSentence.translation);
        setShowTranslation(false);
        setMessage('');
    };

    useEffect(() => {
        getRandomSentence();
    }, []); 

    const handleShowTranslation = () => {
        setShowTranslation(true);
    };

    const startOver = () => {
        setUsedIndices([]); 
        setMessage(''); 
        setRandomSentence(''); 
        setRandomTranslation(''); 
        setShowTranslation(false); 

        const randomIndex = Math.floor(Math.random() * availableSentences.length);
        setUsedIndices([randomIndex]); 
        const selectedSentence = availableSentences[randomIndex];
        setRandomSentence(selectedSentence.sentence);
        setRandomTranslation(selectedSentence.translation);
    };

    const handleNextSentence = () => {
        getRandomSentence();
    };

    return (
        <div className={startDictation.startDictation}>
            {message ? (
                <>
                    <p>{message}</p>
                    <button
                        onClick={startOver}
                        className={startDictation.startDictation__startOver}
                    >
                        Start over
                    </button>
                </>
            ) : (
                <>
                    {randomSentence && <p>{randomSentence}</p>}
                    {showTranslation && (
                        <p className={startDictation.startDictation__translation}>
                            {randomTranslation}
                        </p>
                    )}
                    <div className={startDictation.startDictation__buttons}>
                        <button
                            onClick={handleShowTranslation}
                            className={startDictation.startDictation__showTranslation}
                        >
                            Show translation
                        </button>
                        <button
                            onClick={handleNextSentence}
                            className={startDictation.startDictation__nextSentence}
                        >
                            Next sentence
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StartDictation;
