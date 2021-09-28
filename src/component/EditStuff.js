import React , {useState,useEffect}from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export default function EdistStuff(props) {
  const [username, setUsername] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(new Date());
  const [date, setDate] = useState(new Date());

 
  useEffect(() => {
    axios.get('http://localhost:5000/stuff/'+props.match.params.id)
    .then(response => {

        setUsername(response.data.username)
        setPrice(response.data.price)
        setDuration (new Date(response.data.duration))
        setDate(new Date(response.data.date))
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  const onSubmit=(e)=>{
    e.preventDefault();
    const stuff = {
      username: username,
      price: price,
      duration: duration,
      date: date
    }
    console.log(stuff);
    axios.post('http://localhost:5000/stuff/update/' + props.match.params.id, stuff)
    .then(res => console.log(res.data));


  }

    return (
        <EditStuff>
          <div className="add-content">
          <h3>Toko Sebelah</h3>
        <p>Edit Barang</p>
              <form>
              <h6>Nama Barang:</h6>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="messafeSender_input"
            placeholder={`Nama Barang`}
          ></input>
                 <h6>Harga:</h6>
          <input
           type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="messafeSender_input"
            placeholder={`Harga`}
          ></input>
            <h6>Tanggal Kadaluarsa:</h6>
                <DatePicker
            selected={duration}
              onChange={(e) => setDuration(duration)}    />
                <h6>Tanggal Masuk:</h6>
           <DatePicker
              selected={date}
              onChange={(e) => setDate(date)}
            />
          <button onClick={onSubmit} type="submit">
           submit
          </button>
        </form>
        </div>
        </EditStuff>
    )
}


const EditStuff = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  

  .add-content {
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10vh 0;
  }

  .add-content > h3 {
    font-size: 7vh;
    margin: 0;
  }

  .add-content > p {
    font-size: 3vh;
  }

  form { width: 70%;
    display:flex;
  flex-direction:column;}


  form > h6{ 
  font-size:2vh;}

  form >button {margin-top:5vh;
  padding:2vh;}
  `