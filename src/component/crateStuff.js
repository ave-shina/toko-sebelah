import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

export default function Form() {
  const [username, setUsername] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/stuff/")
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const stuff = {
      username: username,
      price: price,
      duration: duration,
      date: date,
    };
    console.log(stuff);
    axios
      .post("http://localhost:5000/stuff/add", stuff)
      .then(setRedirect(true))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AddStuff>
      {redirect && <Redirect push to="/"></Redirect>}
      <div className="add-content">
        <h3>Tambah Barang</h3>
        <form>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="messafeSender_input"
            placeholder={`Nama Barang`}
          ></input>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="messafeSender_input"
            placeholder={`Harga`}
          ></input>
          <div className="date-section">
            <div className="date-container">
              <h6>Tanggal Kadaluarsa:</h6>
              <DatePicker
                selected={duration}
                onChange={(date) => setDuration(date)}
              />
            </div>
            <div className="date-container">
              <h6>Tanggal Masuk:</h6>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>
          </div>

          <button onClick={onSubmit} type="submit">
            submit
          </button>
        </form>
      </div>
    </AddStuff>
  );
}

const AddStuff = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .add-content {
    background-color: white;
    width: 40%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: black solid 1px;
    box-shadow: 3px 0px 25px 10px rgba(0, 0, 0, 0.025);
    overflow: hidden;
    padding: 2rem 2rem;

    form {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    form > input {
      width: 100%;
      margin-bottom: 1rem;
      padding: 1rem;
      border-bottom: solid var(--light-gray) 1px;
    }

    .date-section {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin: 1rem 0;
      padding: 0 1rem 1rem 1rem;
    }

    .date-container {
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        cursor: pointer;
      }
    }
    form > button {
      width: 95%;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
      border: black solid 1px;
      cursor: pointer;
      color: white;
      &:hover {
        color: white;
        background-color: var(--dark-green);
      }
    }
  }
`;
