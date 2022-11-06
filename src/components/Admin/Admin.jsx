import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import Input from './Input';

function Admin() {
    const user = useSelector((state) => state.user);
    const [finalMess, setFinalMess] = useState('');
    const [showFinal, setShowFinal] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [quesArr, setQuesArr] = useState([]);
    const [addDisabled, setAddDisabled] = useState(false);
    const [lastAdded, setLastAdded] = useState(false);
    const [link, setLink] = useState('')

    const startNewQuiz = () => {
        setAddDisabled(false);
        setQuesArr([])
        setShowFinal(false)
        setLastAdded(false);
    }

    const [questionData, setQuestionData] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: '',
        difficulty: quesArr.length
    })

    const AddNewQuestion = () => {
        if (quesArr.length === 10) {
            setAddDisabled(true)
        }
        else {
            if (questionData.question && questionData.option1 && questionData.option2 && questionData.option3 && questionData.option4 && questionData.correctAnswer) {
                setError(false)
                setQuesArr([...quesArr, questionData]);
                setQuestionData({
                    question: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                    correctAnswer: '',
                    difficulty: quesArr.length + 1,
                })
            }
            else {
                setError(true);
                setErrorMessage('Please fill all fields.')
            }
        }
    }

    const handleUpload = () => {
        if(link) {
            fetch('https://digi-assignment.herokuapp.com/add',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    link: link,
                    Question: quesArr
                })
            }
        )
            .then(res => res.json())
            .then((res) => {
                setShowFinal(true);
                setFinalMess(res.message);
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else {
            setShowFinal(true);
                setFinalMess('Please Add custom Id');
        }
            
    }

    useEffect(() => {
        console.log(quesArr)
    }, [quesArr])
    return (
        <div className='w-full grid grid-cols-1 py-4 px-4 md:px-16 gap-6 justify-center md:grid-cols-3'>
            <div className='md:col-span-2 h-fit flex flex-col p-2 justify-center shadow-lg'>
                <span className='font-medium text-center'>Quiz Questions</span>
                <Input name='question' questionData={questionData} setQuestionData={setQuestionData} type='text' placeholder='Enter Question Here' />
                <Input name='option1' questionData={questionData} setQuestionData={setQuestionData} type='text' placeholder='Enter Option 1' />
                <Input name='option2' questionData={questionData} setQuestionData={setQuestionData} type='text' placeholder='Enter Option 2' />
                <Input name='option3' questionData={questionData} setQuestionData={setQuestionData} type='text' placeholder='Enter Option 3' />
                <Input name='option4' questionData={questionData} setQuestionData={setQuestionData} type='text' placeholder='Enter Option 4' />
                <Input name='correctAnswer' questionData={questionData} setQuestionData={setQuestionData} type='text' placeholder='Enter Correct Answer' />
                <button disabled={addDisabled} onClick={AddNewQuestion} className='ml-auto p-2 hover:bg-blue-500 rounded text-white bg-blue-600'>Add Question</button>
                {error ? <span className='mt-2 text-sm text-red-600 text-right font-medium'>{errorMessage}</span> : ''}
            </div>

            <div className='order-first h-fit gap-4 flex flex-col p-2 justify-center md:order-last shadow-lg'>
                <span className='font-medium text-center '>Quiz Details</span>
                <span>Questions Added: {quesArr.length}</span>
                <span>Questions Left: {10 - quesArr.length}</span>
                <input name='link' onChange={(e) => setLink(e.target.value)} value={link} className='my-2 outline-none  p-2 border-2 w-full' type='text' placeholder='Enter Custom Quiz Id' />
                {quesArr.length === 10 ?
                    <button onClick={handleUpload} className='my-4 bg-blue-600 hover:bg-blue-500 rounded p-2 text-white'>
                        Upload Quiz
                    </button>
                    : null
                }
                {showFinal ? <span className='mt-2 text-sm text-green-700 font-medium text-center'>{finalMess}</span> : null}
                {lastAdded ?
                    <button onClick={startNewQuiz} className='my-4 bg-blue-600 hover:bg-blue-500 rounded p-2 text-white'>
                        Add New Quiz
                    </button>
                    : null
                }
            </div>
        </div>
    )
}


export default Admin;