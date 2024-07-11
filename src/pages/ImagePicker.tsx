import axios from "axios";
import { ChangeEvent, useState } from "react"
import baseUrl from "../service/service";


const ImagePicker: React.FC = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [loading,setLoading] =useState(false)
    const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(null);


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file)
    };

    

    const handleUpload=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)

        if(!selectedFile) return;

        const formData = new FormData()
        formData.append('file',selectedFile as Blob);

        const source = axios.CancelToken.source()
        setCancelToken(source)


        const config = {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials:true,
            onUploadProgress:(progressEvent:ProgressEvent)=>{
                const {loaded,total} = progressEvent;
                if (total) {
                    const percentCompleted = Math.round((loaded * 100) / total);
                    setUploadProgress(percentCompleted);
                  }
            },
            cancelToken:source.token
          }


        await axios.post(`${baseUrl}/uploadFile`,formData,config).then((res)=>{
            console.log('File uploaded successfully:', res.data);
            setLoading(false)
            setUploadProgress(0)
            setCancelToken(null)
          
        }) .catch(error => {
            if(axios.isCancel(error)){
                console.log('Upload Canceled')
            }
            console.error('Error uploading file:', error);
          });
    }

    const handleCancel =()=>{
        if(cancelToken){
            cancelToken.cancel('Upload canceled by the user.')
            setUploadProgress(0)
            setCancelToken(null)
            setLoading(false)
        }
    }


    return (
        <div className='flex justify-center items-center h-[80vh]'>
            {/* click image from web cam */}
            <div className="mr-4">
                {/* choosing image from file */}
                {selectedFile && (
                    <div className="mt-4 ml-10">
                        {/* <p>Selected Image: {selectedFile.name}</p> */}
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected"
                            className="mt-2 max-w-full h-[200px] rounded-lg shadow-lg"
                        />
                    </div>
                )}
                <div>
                   <form action="" onSubmit={handleUpload}>
                   <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-input"
                    />
                    <label htmlFor="file-input" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Choose File
                    </label>
                    {
                        selectedFile &&
                    <button disabled={loading} className={`cursor-pointer ml-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${loading && "bg-blue-300 hover:bg-blue-300"}`}>Upload</button>
                    }
                   </form>

                   {
                    uploadProgress >0 && (
                        <div>
                            <progress value={uploadProgress} max="100">{uploadProgress}%</progress>
                            <span>{uploadProgress}%</span>
                            <button onClick={handleCancel} className="cursor-pointer ml-5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
                        </div>
                    )
                   }
                </div>

            </div>
            {/* click photo */}
            {/* <div>
                <div>
                   <Webcam
                   audio={false}
                   />
                    <label htmlFor="file-input" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Click Photo
                    </label>
                </div>
            </div> */}
        </div>
    )
}

export default ImagePicker