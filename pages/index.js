import Head from 'next/head'
import Image from 'next/image'
import '../styles/Home.module.css' 
import FileUpload from '../components/FileUpload'
import Dropzone from '../components/Dropzone'
import Switch from '../components/Switch'
import FilesList from '../components/FilesList'
import { useEffect, useState } from 'react'

export default function Home() {
  const [files, setFiles] = useState([{
    name:"dd",code:"dd"
  }])
  const addFileToList = (newFile) => {
    setFiles(files => [...files, newFile]);
  };
  return (
    <div className={"container"}>
      <style jsx>{/*css*/`
       .container {
        padding: 0 2rem;
        color: white
      }
      
      .title {
        font-size: 54px;
        margin: 10px;
      }
      .subtitle {
        color: #00C667;
      }
      
      .main {
        min-height: 100vh;
        padding: 4rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      
      `}</style>
      < Head >
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head >
      < div className="main" >

        <p className="title">TempStorj</p>
        <p className="subtitle">Intercambio de archivos anónimo y seguro</p>

        {/* <Switch /> */}
        <br />
        <Dropzone addFileToList={addFileToList} />
        <br />
        <FilesList files={files} />
      </div >


    </div >
  )
}
