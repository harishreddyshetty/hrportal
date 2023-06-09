import HrContext from "./HrContext";
import {useState} from "react"

const HrState = (props) => {
    // Define the state or data you want to provide
    const myData = {profileClicked:false}
    
    const [data,setData] = useState(myData);
  
    const updateMyData = () => {
        setData({profileClicked:true})
    }
  
  
    return (
      // Provide the value to the context
      <HrContext.Provider value={{data,updateMyData}}>
        {props.children}
      </HrContext.Provider>
    );
  }

  export default HrState