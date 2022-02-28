export default function FilesList({ files }) {
    return (

        <>
            <style jsx>{/*css*/`

        .container{
            
        }
       
        
         .row{
            display: flex;
            align-items: center;
            justify-content: space-between;
            column-gap: 46px;
            padding: 6px;
            border-radius: 9px;
            background-color: #77FF85;
            color: black;
            margin-bottom:10px;
         }
         .fileLink{
            display: flex;
            align-items: center;  
            cursor: pointer;
        } 
        // .fileLink:hover{
        //     filter: drop-shadow(2px 4px 6px black);
        // } 
        .fileLink:active{
            filter: drop-shadow(2px 4px 6px black);
        } 
        .logo{
            height:3ex;
            width: auto;
            margin-left:4px;
        }
         
        `}</style>
            <div className="container"  >
                {
                    files.map((f) =>
                        <div key={f.name} className="row">
                            <span>{f.name}</span>
                            {/* <span onClick={() => copyToClipboard(f.code)} className="fileLink">tmp.xyz/<b>{f.code}</b> <img className="logo" src="clipboard.svg"></img></span> */}
                            <span onClick={() => { navigator.clipboard.writeText(window.location.host + "/" + f.code) }} className="fileLink">{window.location.host}/<b>{f.code}</b> <img className="logo" src="/static/clipboard.svg"></img></span>
                        </div>
                    )
                }
            </div>
        </>
    )
}