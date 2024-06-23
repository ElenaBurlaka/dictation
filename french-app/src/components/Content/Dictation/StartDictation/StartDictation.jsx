import { useEffect, useState, useCallback } from 'react'
import startDictation from './StartDictation.module.css'

const StartDictation = ({ formData }) => {

    const [randomTranslation, setRandomTranslation] = useState('')
    const [randomSentence, setRandomSentence] = useState('')
    const [showTranslation, setShowTranslation] = useState(false)
    // const [isTranslationShown, setIsTranslationShown] = useState(false)

    const getRandomSentence = useCallback(() => {
        if (formData && formData.length > 0) {
            const allSentences = formData.flatMap(word => word.sentences)
            const randomIndex = Math.floor(Math.random() * allSentences.length);
            const selectedSentence = allSentences[randomIndex]
            setRandomSentence(selectedSentence.translation)
            setRandomTranslation(selectedSentence.sentence)
            setShowTranslation(false)
        } else {
            console.error('formData is undefined or empty')
        }
    }, [formData])

    const handleShowTranslation = () => {
        setShowTranslation(true)
    }

    useEffect(() => {
        getRandomSentence()
    }, [formData, getRandomSentence])

    return(
        <div className={startDictation.startDictation}>
            {randomSentence && <p>{randomSentence}</p>}
            {showTranslation && <p>{randomTranslation}</p>}
            <button onClick={handleShowTranslation} className={startDictation.startDictation__showTranslation}>Show translation</button>
            <button onClick={getRandomSentence} className={startDictation.startDictation__nextSentence}>Next sentence</button>
        </div>
    )
}

export default StartDictation;