import '../styles/Switch.module.css';

export default function Home() {
  return (
    <>
      <style jsx>{/*css*/`
         .react-switch-checkbox {
            height: 0;
            width: 0;
            visibility: hidden;
          }
          
          .react-switch-label {
            // transform: scale(0.4);
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            width: 50px;
            height: 26px;
            background: grey;
            border-radius: 100px;
            position: relative;
            transition: background-color .2s;
          }
          
          .react-switch-label .react-switch-button {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 22px;
            height: 22px;
            border-radius: 45px;
            transition: 0.2s;
            background: #fff;
            box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
          }
          
          .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
            left: calc(100% - 2px);
            transform: translateX(-100%);
          }
          
          .react-switch-label:active .react-switch-button {
            width: 30px;
          }
          .switch{
            display: flex;
            align-items: center;
            column-gap: 10px;
            margin-bottom:10px;
            transform: scale(0.8);
          }
      `}</style>

      <div className='switch'>
        <input
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>

        <span style={{ marginRight: "0px" }}>URL corto</span>
      </div>
    </>
  )
}
