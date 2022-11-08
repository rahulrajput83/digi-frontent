import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Chart from './Chart';
import Option from './Option'

/* Quiz Function Component */
function Quiz() {
    /* useStates */
    const user = useSelector(state => state.user);
    const [fetching, setFetching] = useState(true);
    const { id } = useParams();
    const [showResult, setShowResult] = useState(false);
    const [questionArr, setQuestionArr] = useState([]);
    const [difficulty, setDifficulty] = useState(5);
    const [quizData, setQuizData] = useState({});
    const [choosen, setChoosen] = useState('');
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalWrong, setTotalWrong] = useState(0);
    const [attempt, setAttempt] = useState([]);
    const [uniqueQuestions, setUniquesQuestions] = useState([]);
    const [chartArr, setChartArr] = useState([]);
    const [sum, setSum] = useState(0);

    /* useEffect on states updates */
    useEffect(() => {
        if (questionArr.length > 0) {
            if (difficulty === 0 || questionArr[questionArr.length - 1].difficulty + 2 === difficulty) {
                setShowResult(true);
                console.log(attempt)
                setQuizData({});
            }
            else {
                const data = questionArr.find(item => item.difficulty + 1 === difficulty);
                setQuizData(data);
                setChoosen('')
            }
        }
    }, [difficulty, questionArr, attempt])

    useEffect(() => {
        if (sum !== 0) {
            setChartArr(chartArr => [...chartArr, { count: sum }]);
        }
    }, [sum])

    useEffect(() => {
        setSum(0)
        attempt.forEach(item => {
            if (item === 'Correct') {
                setSum(sum => sum += 5)
            }
            else {
                setSum(sum => sum -= 2);
            }
        })
    }, [attempt])

    /* Function triggers when form submitted. */
    const submit = (e) => {
        e.preventDefault();
        console.log(choosen);
        setUniquesQuestions([...uniqueQuestions, quizData.question])
        if (quizData.correctAnswer === choosen) {
            setTotalCorrect(totalCorrect + 1);
            setDifficulty(difficulty + 1);
            console.log('Correct');
            setAttempt([...attempt, 'Correct']);
        }
        else {
            setTotalWrong(totalWrong + 1);
            setDifficulty(difficulty - 1)
            console.log('Wrong');
            setAttempt([...attempt, 'Wrong'])
        }
    }

    /* useEffect when state updates. */
    useEffect(() => {
        if (user) {
            setFetching(true);
            fetch('https://digi-assignment.herokuapp.com/getQuestions',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ link: id })
                }
            )
                .then(res => res.json())
                .then((res) => {
                    if (res.message === 'Success') {
                        setFetching(false);
                        setQuestionArr(res.data.Question);
                    }
                    console.log(res)
                })
                .catch((err) => {
                    console.log('err')
                })
        }
    }, [id, user])

    /* useEffect */
    useEffect(() => {
        const unique = [...new Set(uniqueQuestions)]
        if (unique.length === 10) {
            setShowResult(true);
            console.log('uniq', unique)
            console.log(attempt)
            setQuizData({});
        }
    }, [uniqueQuestions, attempt])

    return !fetching ? <div className='w-full grid grid-cols-1 py-4 px-4 md:px-16 gap-6 justify-center md:grid-cols-3'>
        <div className='md:col-span-2 h-fit flex flex-col p-2 justify-center shadow-lg'>

            {quizData && !showResult ?
                <form onSubmit={submit} className='w-full accent-blue-600 flex flex-col'>
                    <span className='w-full my-6 font-medium'>Q. {quizData.question}</span>
                    <Option choosen={choosen} setChoosen={setChoosen} title={quizData.option1} />
                    <Option choosen={choosen} setChoosen={setChoosen} title={quizData.option2} />
                    <Option choosen={choosen} setChoosen={setChoosen} title={quizData.option3} />
                    <Option choosen={choosen} setChoosen={setChoosen} title={quizData.option4} />
                    <button type='submit' className='ml-auto mr-4 bg-blue-600 py-2 px-6 text-white rounded hover:bg-blue-500 enabled:scale-95'>Submit</button>
                </form>
                : null}

            {showResult ? <div className='w-full  flex flex-col justify-center items-center'>
                <span className='font-medium'>Result</span>
                <span>Correct Answer: {totalCorrect}</span>
                <span>Wrong: {totalWrong}</span>
                <span className='my-4 w-16 h-16 flex justify-center font-medium text-3xl items-center border-2 border-blue-600 rounded-full '>{(totalCorrect * 5) - (totalWrong * 2)}</span>
                <Chart chartArr={chartArr} />
            </div> : null}
        </div>

        <div className='order-first h-fit gap-4 flex flex-col p-2 justify-center md:order-last shadow-lg'>
            <span className='font-medium text-center '>Quiz Details</span>
            {showResult && !fetching ? null : <span>Difficulty: {difficulty} </span>}
        </div>
    </div> : <svg aria-hidden="true" className="w-8 flex m-auto justify-center my-4 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
}


export default Quiz;