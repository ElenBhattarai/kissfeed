import React, { useState } from "react";
import MainPage from './Mainpage.js'
import Modal from './Modal.js'


export default function HomePage() {
  
  const [data,setdata] = useState({})
  const [alldata,setalldata] = useState({})
  const [submit, setSubmit] = useState(true);

  // Add/Remove checked item from list
  
  const printSomething = () => {console.log("DSHJALDJSAKLDJKASLDA")}



  // Generate string of checked items
  
  // const checkedItems = checked.length
  //   ? checked.reduce((total, item) => {
  //       return total + ", " + item;
  //     })
  //   : "";


    




    //   const print = () => {
    //     console.log(data.articles[0].url)
    //     // for (let da of data.articles) {
    //     //     console.log(da.title)
    //     //     console.log(da.content)
    //     // }
    //   }


//     useEffect = () => {
      
//     }
//     const fetchapi = async () => {
//     const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c8503c90442c4249860c2ead0a8ce1f8")
//     const data = await res.json();
//     setdata(data)
//     console.log(data)

//     // console.log(data.articles)
//     // apiwork()
//   }

//   fetchapi()
  
//   const apiwork = () => {
//     for (let da of data.articles) {
//       // console.log(da.title)
//       console.log(da.content)
//     }

//     console.log(data.articles[0].content)
//   }

    return (
      <div>

        {submit ? (<Modal type="checklist" setSubmit={setSubmit} data={data} setdata={setdata} setalldata={setalldata}></Modal>)  : null}
         { <MainPage data={data} alldata={alldata}/>}
        </div>
      );

}
