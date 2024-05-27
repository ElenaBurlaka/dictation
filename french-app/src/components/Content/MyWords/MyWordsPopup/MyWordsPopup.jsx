import { useEffect, useRef, useState } from 'react';
import mywordspopup from './MyWordsPopup.module.css';
import close from './../../../../../src/images/close.png';

const MyWordsPopup = ({ onClose, addWord }) => {

    const [formData, setFormData] = useState({
        word: '',
        sentences: [{ sentence: '', translation: '' }]
    });

    const [publishedText, setPublishedText] = useState('')

    useEffect(() => {
        const savedText = localStorage.getItem('publishedText');
        if (savedText) {
            setPublishedText(JSON.parse(savedText))
        }
    }, [])

    const [errors, setErrors] = useState({
        word: "Field can't be empty",
        sentences: [{ sentence: "Field can't be empty", translation: "Field can't be empty" }]
    });

    const [dirtyFields, setDirtyFields] = useState({
        word: false,
        sentences: [{ sentence: false, translation: false }]
    });

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const formHasErrors = errors.word || errors.sentences.some(e => e.sentence || e.translation);
        setFormValid(!formHasErrors);
    }, [errors]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'word') {
            setFormData(prevFormData => ({
                ...prevFormData,
                word: value
            }));
            setErrors(prevErrors => ({
                ...prevErrors,
                word: value ? '' : "Field can't be empty"
            }));
        } else {
            const [fieldType, index] = name.split('-');
            const idx = parseInt(index, 10);
            setFormData(prevFormData => {
                const updatedSentences = prevFormData.sentences.map((sentence, i) => {
                    if (i === idx) {
                        return { ...sentence, [fieldType]: value };
                    }
                    return sentence;
                });
                return { ...prevFormData, sentences: updatedSentences };
            });
            setErrors(prevErrors => {
                const updatedErrors = prevErrors.sentences.map((error, i) => {
                    if (i === idx) {
                        return { ...error, [fieldType]: value ? '' : "Field can't be empty" };
                    }
                    return error;
                });
                return { ...prevErrors, sentences: updatedErrors };
            });
        }
    };

    const handlePublish = () => {
        setPublishedText(formData);
        localStorage.setItem('publishedText', JSON.stringify(formData))
        setFormData({
            word: '',
            sentences: [{ sentence: '', translation: ''}]
        })
        addWord(formData);
    }

    const blurHandler = (e) => {
        const { name } = e.target;
        if (name === 'word') {
            setDirtyFields(prevDirtyFields => ({
                ...prevDirtyFields,
                word: true
            }));
        } else {
            const [fieldType, index] = name.split('-');
            const idx = parseInt(index, 10);
            setDirtyFields(prevDirtyFields => {
                const updatedDirtyFields = prevDirtyFields.sentences.map((dirty, i) => {
                    if (i === idx) {
                        return { ...dirty, [fieldType]: true };
                    }
                    return dirty;
                });
                return { ...prevDirtyFields, sentences: updatedDirtyFields };
            });
        }
    };

    const addField = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            sentences: [...prevFormData.sentences, { sentence: '', translation: '' }]
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            sentences: [...prevErrors.sentences, { sentence: "Field can't be empty", translation: "Field can't be empty" }]
        }));
        setDirtyFields(prevDirtyFields => ({
            ...prevDirtyFields,
            sentences: [...prevDirtyFields.sentences, { sentence: false, translation: false }]
        }));
    };

    const removeField = (index) => {
        if (formData.sentences.length > 1) {
            setFormData(prevFormData => ({
                ...prevFormData,
                sentences: prevFormData.sentences.filter((_, i) => i !== index)
            }));
            setErrors(prevErrors => ({
                ...prevErrors,
                sentences: prevErrors.sentences.filter((_, i) => i !== index)
            }));
            setDirtyFields(prevDirtyFields => ({
                ...prevDirtyFields,
                sentences: prevDirtyFields.sentences.filter((_, i) => i !== index)
            }));
        }
    };

    return (
        <div className={mywordspopup.mywordspopup}>
            <div className={mywordspopup.mywordspopup__wrapper}>
                <div className={mywordspopup.mywordspopup__content}>
                    <button className={mywordspopup.mywordspopup__content_close} onClick={onClose}><img src={close} alt='Close' /></button>
                    <div className={mywordspopup.mywordspopup__inputs}>
                        <input
                            onChange={handleInput}
                            onBlur={blurHandler}
                            name='word'
                            type='text'
                            placeholder='word'
                            value={formData.word}
                        />
                        {dirtyFields.word && errors.word && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{errors.word}</div>
                        )}
                        {formData.sentences.map((sentence, index) => (
                            <div key={index} style={{ display: 'flex' }}>
                                <div className={mywordspopup.mywordspopup__inputs_repeated}>
                                    <input
                                        onChange={handleInput}
                                        onBlur={blurHandler}
                                        name={`sentence-${index}`}
                                        type='text'
                                        placeholder='sentence with word'
                                        value={sentence.sentence}
                                        data-index={index}
                                    />
                                    {dirtyFields.sentences[index]?.sentence && errors.sentences[index]?.sentence && (
                                        <div style={{ color: 'red', fontSize: '12px' }}>{errors.sentences[index].sentence}</div>
                                    )}
                                    <input
                                        onChange={handleInput}
                                        onBlur={blurHandler}
                                        name={`translation-${index}`}
                                        type='text'
                                        placeholder='sentence translation'
                                        value={sentence.translation}
                                        data-index={index}
                                    />
                                    {dirtyFields.sentences[index]?.translation && errors.sentences[index]?.translation && (
                                        <div style={{ color: 'red', fontSize: '12px' }}>{errors.sentences[index].translation}</div>
                                    )}
                                </div>
                                {formData.sentences.length > 1 && (
                                    <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => removeField(index)}>–</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={mywordspopup.mywordspopup__buttons}>
                        <button onClick={addField}>add one more sentence</button>
                        <button onClick={handlePublish} disabled={!formValid}>done</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyWordsPopup;
