import React, { useState } from "react";
import MainPage from './Mainpage.js'
import Modal from './Modal.js'


export default function HomePage() {
  
  const [data,setdata] = useState({})
  const [alldata,setalldata] = useState({})
  const [submit, setSubmit] = useState(true);

    return (
      <div>

        {submit ? (<Modal type="checklist" setSubmit={setSubmit} data={data} setdata={setdata} setalldata={setalldata}></Modal>)  : null}
         { <MainPage data={data} alldata={alldata}/>}
        </div>
      );

}
