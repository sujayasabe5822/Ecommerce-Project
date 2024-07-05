const imageToBase64=async(image)=>{
    const reader=new FileReader()
    reader.readAsDataURL(image)
    const data=await new Promise((resolve,reject)=>{
        reader.onload=()=>resolve(reader.result)
        reader.onerror=error=>reject(error)

    })
    return data

}


export default imageToBase64 
// imagetobase64.js
// const imagetobase64 = (image) => {
//     return new Promise((resolve, reject) => {
//         if (!(image instanceof Blob)) {
//             reject(new TypeError("The provided value is not a Blob or File."));
//             return;
//         }

//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(image);
//     });
// };

// export default imagetobase64;
