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
    </div> : <span>Loading...</span>
}


export default Quiz;