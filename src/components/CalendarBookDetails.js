import { useState } from "react";
import {useEffect} from 'react'
import Calendar from "./Calendar.js";
import moment from "moment";

import PaypalPop from "./paypalPop"
import ProductDetailsPage from "../pages/ProductDetailsPage.js";
//Test para pruebas

/*  const dataArray = [
  "10/04/2021",
  "10/05/2021",
  "10/06/2021",
  "10/07/2021",
  "10/20/2021",
  "10/21/2021",
  "10/24/2021",
  "10/25/2021",
]; */

function BookForm(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(false);
  const [finalDateArray, setFinalDateArray] = useState([])

  const {product} = props

  console.log('fechas reservaddas',product.bookDates)

  const bookings = {}
  const[showPay, setShowPay] = useState(false) // <--- STORES SHOWING/HIDING PAYING INFO STATE ----> 
 
  const payInfoHandler= ()=>{   // <--- SWITCHES SHOWING/HIDING PAYING INFO----> 
    setShowPay(!showPay)
    console.log(showPay)
    console.log(bookings)

  }

  const dateArrayToPrint = (arr) =>{
    let newArr = []
    for(let elem of arr){
        newArr.push(new Date(elem))
    }
    return newArr
  }

  //let dataPrint = new Date(moment(startDate).format("MM/DD/YYYY"));

  //console.log("startDate:", dataPrint);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const totalDays = (startDate, endDate) => {
    let actualDay = startDate;
    let totalDateArray = [];
    while (actualDay.isSameOrBefore(endDate)) {
      totalDateArray.push(moment(actualDay).format("MM/DD/YYYY"));
      actualDay.add(1, "days");
    }
    return totalDateArray;
  };

  useEffect(()=>{
      let firstDay = moment.utc(startDate);
      let lastDay = moment.utc(endDate);
      let daysToCalc = totalDays(firstDay,lastDay)
      let priceXDay = product.amount
      setPrice(Math.round((priceXDay*daysToCalc.length)*100)/100)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[endDate])

  const handleSubmit = (e) => {
    e.preventDefault();

    let firstDay = moment.utc(startDate);
    let lastDay = moment.utc(endDate);

    const finalDateArray2 = totalDays(firstDay, lastDay);
    
   
    
    let newFinalArr = finalDateArray2.filter ((element) => product.bookDates.includes ( element ))
    
    
    console.log("array ue buscamos ", newFinalArr)
    /*     
    co
    finalDateArray.map((result) => {
      if (dataArray.includes(result)) {
        newFinalArr.push(result)
      } return ("ok")
    }) */
    
    if (newFinalArr.length > 0) {
      setError(!error);
    } else {
      
      setFinalDateArray(finalDateArray2)
      };
      
    }
    /* axios
        .post(`${API_URL}/new-product`, objectToSubmit)
        .then((result)=>{
           console.log(result)
        }) */
  let printArr = []

  printArr = product.bookDates.map((date)=>{ return new Date(date)})

  return (
    <div>

    <form onSubmit={handleSubmit}>
      <Calendar
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDays={printArr}
      />
      <button className="book-button" type="submit" onClick={payInfoHandler}><h1>Book for {price}€</h1></button>
      {error && <div className="err-dates"><h3>Please select available dates</h3></div>}
      
    </form>
    {showPay && !error &&
        <PaypalPop price ={price}  product={product} startDate={startDate} endDate={endDate} excludedDays={finalDateArray}/>
   
    }
    
    </div>
  );
}

export default BookForm;
