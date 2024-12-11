import { useState, useEffect, useRef } from 'react';
import editPopup from './EditPopup.module.css';
import close from './../../../../../images/close.png';

const EditPopup = ({
    formData,
    onClose,
    addField,
    handleInput,
    removeField,
    handlePublish,
    setShowEditPopup,
}) => {
    const [localFormData, setLocalFormData] = useState({ ...formData });
    const [sentenceErrors, setSentenceErrors] = useState([]);
    const [translationErrors, setTranslationErrors] = useState([]);
    const [editFormValid, setEditFormValid] = useState(false);
    const [wordErrors, setWordErrors] = useState('');
    const popupRef = useRef(null);

    useEffect(() => {
        setLocalFormData({ ...formData });
    }, [formData]);

    useEffect(() => {
        validateForm();
    }, [localFormData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose(); // Закрываем попап, если клик снаружи
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const validateForm = () => {
        const newSentenceErrors = [];
        const newTranslationErrors = [];
        let newWordError = '';

        if (!localFormData.word.trim()) {
            newWordError = "Word field can't be empty";
        }

        localFormData.sentences.forEach((sentence, i) => {
            newSentenceErrors[i] = sentence.sentence.trim() ? '' : "Sentence field can't be empty";
            newTranslationErrors[i] = sentence.translation.trim() ? '' : "Translation field can't be empty";
        });

        setSentenceErrors(newSentenceErrors);
        setTranslationErrors(newTranslationErrors);
        setWordErrors(newWordError);

        const isFormValid =
            !newWordError &&
            newSentenceErrors.every((err) => !err) &&
            newTranslationErrors.every((err) => !err);

        setEditFormValid(isFormValid);
    };

    const handleLocalInput = (e, field) => {
        const { value } = e.target;
        setLocalFormData((prevData) => {
            const updatedData = { ...prevData };
            if (field === 'word') {
                updatedData.word = value;
            } else {
                const [type, idx] = field.split('-');
                updatedData.sentences[idx][type] = value;
            }
            return updatedData;
        });
    };

    const handleLocalRemoveField = (index) => {
        setLocalFormData((prevData) => {
            const updatedSentences = prevData.sentences.filter((_, i) => i !== index);
            return { ...prevData, sentences: updatedSentences };
        });
    };

    const handlePublishInEdit = () => {
        handleInput({ target: { value: localFormData.word } }, 0, 'word');
        localFormData.sentences.forEach((sentence, i) => {
            handleInput({ target: { value: sentence.sentence } }, 0, `sentence-${i}`);
            handleInput({ target: { value: sentence.translation } }, 0, `translation-${i}`);
        });

        handlePublish(localFormData);
        setShowEditPopup(false);
    };

    return (
        <div className={editPopup.editPopup}>
            <div className={editPopup.editPopup__overlay} onClick={onClose}>
                <div
                    ref={popupRef}
                    className={editPopup.editPopup__wrapper}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <div className={editPopup.editPopup__content}>
                        <button className={editPopup.editPopup__content_close} onClick={onClose}>
                            <img src={close} alt="Close" />
                        </button>
                        <div className={editPopup.editPopup__inputs}>
                            <input
                                onChange={(e) => handleLocalInput(e, 'word')}
                                type="text"
                                placeholder="word"
                                value={localFormData.word}
                                className={editPopup.editPopup__input}
                            />
                            {wordErrors && <div className={editPopup.editPopup__error}>{wordErrors}</div>}
                            {localFormData.sentences.map((sentence, i) => (
                                <div key={i} className={editPopup.editPopup__sentenceContainer}>
                                    <div className={editPopup.editPopup__inputs_repeated}>
                                        <input
                                            onChange={(e) => handleLocalInput(e, `sentence-${i}`)}
                                            type="text"
                                            placeholder="sentence with word"
                                            value={sentence.sentence}
                                            className={editPopup.editPopup__input}
                                        />
                                        {sentenceErrors[i] && (
                                            <div className={editPopup.editPopup__error}>{sentenceErrors[i]}</div>
                                        )}
                                        <input
                                            onChange={(e) => handleLocalInput(e, `translation-${i}`)}
                                            type="text"
                                            placeholder="sentence translation"
                                            value={sentence.translation}
                                            className={editPopup.editPopup__input}
                                        />
                                        {translationErrors[i] && (
                                            <div className={editPopup.editPopup__error}>{translationErrors[i]}</div>
                                        )}
                                    </div>
                                    {localFormData.sentences.length > 1 && (
                                        <span
                                            className={editPopup.editPopup__removeField}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleLocalRemoveField(i);
                                            }}
                                        >
                                            –
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className={editPopup.editPopup__buttons}>
                            <button onClick={addField} className={editPopup.editPopup__addButton}>
                                Add one more sentence
                            </button>
                            <button
                                onClick={handlePublishInEdit}
                                disabled={!editFormValid}
                                className={editPopup.editPopup__doneButton}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
