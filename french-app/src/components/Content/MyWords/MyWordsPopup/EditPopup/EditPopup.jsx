import editPopup from './EditPopup.module.css';
import close from './../../../../../images/close.png';

const EditPopup = ({ formData, handleInput, blurHandler, onClose, addField, removeField, handlePublish, index }) => {
    if (!formData || typeof formData.word === 'undefined' || !formData.sentences) {
        return null; // Или отобразите сообщение об ошибке
    }

    return (
        <div className={editPopup.editPopup}>
            <div className={editPopup.editPopup__wrapper}>
                <div className={editPopup.editPopup__content}>
                    <button className={editPopup.editPopup__content_close} onClick={onClose}><img src={close} alt='Close' /></button>
                    <div className={editPopup.editPopup__inputs}>
                        <input
                            onChange={(e) => handleInput(e, index, 'word')}
                            onBlur={(e) => blurHandler(e, index, 'word')}
                            type='text'
                            placeholder='word'
                            value={formData.word}
                        />
                        {formData.sentences.map((sentence, i) => (
                            <div key={i} style={{ display: 'flex' }}>
                                <div className={editPopup.editPopup__inputs_repeated}>
                                    <input
                                        onChange={(e) => handleInput(e, i, 'sentence')}
                                        onBlur={(e) => blurHandler(e, i, 'sentence')}
                                        name={`sentence-${i}`}
                                        type='text'
                                        placeholder='sentence with word'
                                        value={sentence.sentence}
                                        data-index={i}
                                    />
                                    <input
                                        onChange={(e) => handleInput(e, i, 'translation')}
                                        onBlur={(e) => blurHandler(e, i, 'translation')}
                                        name={`translation-${i}`}
                                        type='text'
                                        placeholder='sentence translation'
                                        value={sentence.translation}
                                        data-index={i}
                                    />
                                </div>
                                {formData.sentences.length > 1 && (
                                    <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => removeField(i)}>–</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={editPopup.editPopup__buttons}>
                        <button onClick={addField}>add one more sentence</button>
                        <button onClick={handlePublish}>done</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
