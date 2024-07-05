import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 z-10 left-0 flex justify-center  items-center'>

        <div style={{    height: "500px"}} className='bg-white shadow-lg  rounded max-w-3xl max-h-3xl mx-auto p-4'>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose/>
                </div>


                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img style={{    height: "400px"}} height={250} width={250}  src={imgUrl}  className='w-full h-fit'/>
                </div>
        </div>
  


    </div>
  )
}

export default DisplayImage