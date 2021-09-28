import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Stuff = (props) => (
  <tr>
    <td>{props.stuff.username}</td>
    <td>{props.stuff.price}</td>
    <td>{props.stuff.duration.substring(0, 10)}</td>
    <td>{props.stuff.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.stuff._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteStuff(props.stuff._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default function ListStuff(props) {
  const [stuffs, setStuffs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/stuff/")
      .then((response) => {
        setStuffs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteStuff = (id) => {
    axios.delete("http://localhost:5000/stuff/" + id).then((response) => {
      console.log(response.data);
    });

    setStuffs(stuffs.filter((el) => el._id !== id));
  };

  const stuffList = () => {
    return stuffs.map((currentstuff) => {
      return (
        <Stuff
          stuff={currentstuff}
          deleteStuff={deleteStuff}
          key={currentstuff._id}
        />
      );
    });
  };

  return (
    <ListToko>
      <div className="list-content">
        <h3>Toko Sebelah</h3>
        <p>Daftar Barang di toko Kami</p>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nama Barang</th>
              <th>Harga</th>
              <th>Kadaluarsa</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{stuffList()}</tbody>
        </table>
      </div>

      <div className="add-stuf">
        <Link to="/create">
          <a className="button-add">+ Tambah Barang</a>
        </Link>
      </div>
    </ListToko>
  );
}

const ListToko = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  .list-content {
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10vh 0;
  }

  .list-content > h3 {
    font-size: 7vh;
    margin: 0;
  }

  .list-content > p {
    font-size: 3vh;
  }

  .list-content > table {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  table > thead {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  tbody {width:100%;}
  thead > tr {
    width: 100%;
    margin-top: 3vh;
    border: 1px solid #213936;
    padding: 2vh 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  th,td {width:10vw;
 text-align:center;}
  tr {
    width: 100%;
    margin-top: 3vh;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  .add-stuf {
    width: 80%;
    display: flex;
    justify-content: flex-end;
    margin-top: 5vh;
  }
a {   text-decoration:none;}

  .button-add{
    
   text-decoration:none;
   color: black;
   border: 1px solid black;
   padding: 2vh 1vh;

   &:hover {
      background-color: black;
      color:white;
    }
  }
`;
