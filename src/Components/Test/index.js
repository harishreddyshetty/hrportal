
import {useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {HiOutlineClipboardCopy} from "react-icons/hi"

export default function Test() {

    const [password, setPassword] = useState([""]);

    const onChangeInput = (e) =>{
        setPassword(e.target.value)
    }

    return (
        <div className="App">
          <h1>Clipboard Copy</h1>

            <input onChange={onChangeInput} value={password} type="password"/>

          <CopyToClipboard
          text={password}
         >
            <span><HiOutlineClipboardCopy/></span>
          </CopyToClipboard>
        </div>
      );
}



