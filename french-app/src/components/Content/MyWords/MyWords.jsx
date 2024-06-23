import { useState, useEffect } from 'react';
import mywords from './MyWords.module.css';
import MyWordsPopup from './MyWordsPopup/MyWordsPopup';
import Search from './Search/Search';
import edit from './../../../images/edit.png';
import close from './../../../images/close.png';
import DeletePopup from './DeletePopup/DeletePopup';
import EditPopup from './MyWordsPopup/EditPopup/EditPopup';

const MyWords = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem('wordsData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setData(parsedData);
            setFilteredData(parsedData);
        }
    }, []);

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
    };

    const handleInput = (e, index, field) => {
        const { value } = e.target;
        setData(prevData => {
            const updatedData = [...prevData];
            if (field === 'word') {
                updatedData[index].word = value;
            } else {
                const [fieldType, idx] = field.split('-');
                updatedData[index].sentences[idx][fieldType] = value;
            }
            return updatedData;
        });
    };

    const updateWordData = (updatedWord, index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index] = updatedWord;
            localStorage.setItem('wordsData', JSON.stringify(newData));
            return newData;
        });
    };

    const blurHandler = (e, index, field) => {
        // Обработчик для события blur, если необходимо
    };

    const addField = () => {
        // Добавление нового поля в sentences
    };

    const removeField = (index) => {
        // Удаление поля из sentences
    };

    const handlePublish = () => {
        // Публикация изменений
    };

    return (
        <div className={mywords.mywords}>
            <div className={mywords.mywords__wrapper}>
                <div className={mywords.mywords__wrapper_header}>
                    <h1>My words</h1>
                    <p>(you have {data.length < 2 ? `${data.length} word` : `${data.length} words`})</p>
                    <Search formData={data} onSearch={handleSearch} />
                </div>
                <div className={mywords.mywords__wrapper_content}>
                    {filteredData.map((item, index) => (
                        <div key={index}>
                            <div className={mywords.mywords__word}>
                                <p>{item.word}</p>
                                <div className={mywords.mywords__icons}>
                                    <img className={mywords.mywords__icons_edit} onClick={() => { setShowEditPopup(true); setEditIndex(index); }} src={edit} alt='Edit'></img>
                                    {showEditPopup && editIndex === index && (
                                        <EditPopup
                                            onClose={() => setShowEditPopup(false)}
                                            index={index}
                                            formData={data[editIndex]} // Передаем правильные данные
                                            handleInput={handleInput}
                                            blurHandler={blurHandler}
                                            addField={addField}
                                            removeField={(idx) => {
                                                const updatedWord = {
                                                    ...data[editIndex],
                                                    sentences: data[editIndex].sentences.filter((_, i) => i !== idx)
                                                };
                                                updateWordData(updatedWord, editIndex);
                                            }}
                                            handlePublish={handlePublish}
                                        />
                                    )}
                                    <img className={mywords.mywords__icons_close} onClick={() => { setShowDeletePopup(true); setDeleteIndex(index); }} src={close} alt='Close'></img>
                                    {showDeletePopup && deleteIndex === index && (
                                        <DeletePopup onClose={() => setShowDeletePopup(false)} index={index} onDelete={handleDelete} />
                                    )}
                                </div>
                            </div>
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
                {showPopup && <MyWordsPopup onClose={() => setShowPopup(false)} addWord={addWord} filteredWords={data} />}
            </div>
        </div>
    );
};

export default MyWords;
