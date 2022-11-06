import React from 'react'


function Quiz() {
   
    return (
        <div className='w-full grid grid-cols-1 py-4 px-4 md:px-16 gap-6 justify-center md:grid-cols-3'>
            <div className='md:col-span-2 h-fit flex flex-col p-2 justify-center shadow-lg'>
                <span className='font-medium text-center'>Quiz Questions</span>
                
            </div>

            <div className='order-first h-fit gap-4 flex flex-col p-2 justify-center md:order-last shadow-lg'>
                <span className='font-medium text-center '>Quiz Details</span>
                <span>Question </span>
            </div>
        </div>
    )
}


export default Quiz;