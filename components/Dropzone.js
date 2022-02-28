import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

export default function Dropzone({ addFileToList }) {

    const uploadToClient = (selectorFile) => {
        const formData = new FormData();
        formData.append('file', selectorFile);
        fetch(
            window.location.origin + '/api/upload-file',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                addFileToList({
                    name: result.data.name,
                    code: result.data.id
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);

        uploadToClient(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <>
            <style jsx>{/*css*/`

            .dropzoned{
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 1px solid white;
                border-style: dashed;
                font-family: monospace;
                padding: 10px;
            }
             
            `}</style>
            <div {...getRootProps()}>

                <input {...getInputProps()} onChange={uploadToClient} />
                {
                    isDragActive ?
                        <div className='dropzoned' style={{ padding: "30px 50px" }}>
                            <p  >Suelta los archivos aquí...</p>
                        </div>
                        :
                        <div className='dropzoned'>
                            <img style={{ height: "40px", width: "auto", filter: "invert(1)" }} src='static/file-upload.svg'></img>
                            <p>Arrastra los archivos aquí o haz clic aquí</p>
                        </div>
                }
            </div>
        </>
    )
}