import { useState, useEffect } from 'react';
import mywords from './MyWords.module.css';
import MyWordsPopup from './MyWordsPopup/MyWordsPopup';
import Search from './Search/Search';
import edit from './../../../images/edit.png';
import close from './../../../images/close.png';
import DeletePopup from './DeletePopup/DeletePopup';
import EditPopup from './MyWordsPopup/EditPopup/EditPopup';

const MyWords = ({ blurHandler }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [tempData, setTempData] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem('wordsData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setData(parsedData);
            setFilteredData(parsedData);
        }
    }, []);

    // const [formData, setFormData] = useState(() => {
    //     const savedData = localStorage.getItem('formData');
    //     return savedData ? JSON.parse(savedData) : initialData;
    // });

    const addWord = (wordData) => {
        const updatedData = [...data, wordData];
        setData(updatedData);
        setFilteredData(updatedData);
        localStorage.setItem('wordsData', JSON.stringify(updatedData));
        setShowPopup(false);
    };

    const handleSearch = (filteredWords) => {
        setFilteredData(filteredWords);
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        setFilteredData(updatedData);
        localStorage.setItem('wordsData', JSON.stringify(updatedData));
        setShowDeletePopup(false);
        setDeleteIndex(null);
    };

    const handleInput = (e, index, field) => {
        const { value } = e.target;
        setTempData((prevTempData) => {
            const updatedTempData = [...prevTempData];
            if (field === 'word') {
                updatedTempData[0].word = value; // используем [0], так как мы редактируем только один элемент
            } else {
                const [fieldType, idx] = field.split('-');
                updatedTempData[0].sentences[idx][fieldType] = value;
            }
            return updatedTempData;
        });
    };

    const addField = () => {
        setTempData(prevTempData => {
            const updatedTempData = [...prevTempData];
            updatedTempData[0].sentences.push({ sentence: '', translation: '' });
            return updatedTempData;
        });
    };

    const removeField = (sentenceIndex) => {
        setTempData(prevTempData => {
            const updatedTempData = [...prevTempData];
            if (updatedTempData[0]?.sentences) {
                updatedTempData[0].sentences = updatedTempData[0].sentences.filter((_, i) => i !== sentenceIndex);
            }
            return updatedTempData;
        });
    };

    const handlePublish = () => {
        if (editIndex === null || !tempData[0]) return; 
        const updatedData = [...data];
        updatedData[editIndex] = {...tempData[0]}; // Обновляем конкретный элемент
        setData(updatedData);
        setFilteredData(updatedData);
        localStorage.setItem('wordsData', JSON.stringify(updatedData));
        setShowEditPopup(false);
        setEditIndex(null);
        setTempData([]);
    };

    const handleCloseWithoutSaving = () => {
        setShowEditPopup(false);
        setTempData([]); 
    };

    return (
        <div className={mywords.mywords}>
            <div className={mywords.mywords__wrapper}>
                <div className={mywords.mywords__wrapper_header}>
                    <div className={mywords.mywords__header_words}>
                        <h1>My words</h1>
                        <p>(you have {data.length < 2 ? `${data.length} word` : `${data.length} words`})</p>
                    </div>
                    <div className={mywords.mywords__buttons_block}>
                        <Search formData={data} onSearch={handleSearch} />
                        <div className={mywords.mywords__button}>
                            <button className={mywords.mywords__button_button} onClick={() => setShowPopup(true)}>Add a word</button>
                            {showPopup && <MyWordsPopup onClose={() => setShowPopup(false)} addWord={addWord} filteredWords={data} />}
                        </div>
                    </div>
                </div>
                <div className={mywords.mywords__wrapper_body}>
                {filteredData.map((item, index) => (
                    <div key={index} className={mywords.mywords__container}>
                        <div className={mywords.mywords__wrapper_content}>
                            <div className={mywords.mywords__icons}>
                                <img
                                    className={mywords.mywords__icons_edit}
                                    onClick={() => {
                                        setShowEditPopup(true);
                                        setEditIndex(index);
                                        // setTempData([data[index]]); 
                                        setTempData([JSON.parse(JSON.stringify(data[index]))]);
                                    }}
                                    src={edit}
                                    alt='Edit'
                                />
                                {showEditPopup && editIndex === index && (
                                    <EditPopup
                                        onClose={handleCloseWithoutSaving}
                                        index={index}
                                        formData={tempData[0]} 
                                        handleInput={handleInput}
                                        blurHandler={blurHandler}
                                        addField={() => addField(editIndex)}
                                        removeField={(idx) => removeField(editIndex, idx)}
                                        handlePublish={handlePublish}
                                        setShowEditPopup={setShowEditPopup}
                                    />
                                )}
                                <img className={mywords.mywords__icons_close} onClick={() => { setShowDeletePopup(true); setDeleteIndex(index); }} src={close} alt='Close'></img>
                                {showDeletePopup && deleteIndex === index && (
                                    <DeletePopup onClose={() => setShowDeletePopup(false)} index={index} onDelete={() => handleDelete(index)} />
                                )}
                            </div>
                            <div className={mywords.mywords__word}>
                                <p>{item.word}</p>
                            </div>
                            <div className={mywords.mywords__list_sentence}>
                                <ul>
                                    {item.sentences.map((sentence, i) => (
                                        <>
                                        <li className={mywords.mywords_list__sentence} key={`sentence-${i}`}>{sentence.sentence} </li>
                                        <li className={mywords.mywords_list__translation} key={`translation-${i}`}>{sentence.translation}</li>
                                        </>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default MyWords;
