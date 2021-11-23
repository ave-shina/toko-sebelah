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
      <Link className="edit" to={"/edit/" + props.stuff._id}>
        edit
      </Link>{" "}
      |{" "}
      <a
        href="#"
        className="delete"
        onClick={() => {
          const result = window.confirm("Hapus barang dari daftar?");
          if (result) {
            props.deleteStuff(props.stuff._id);
          }
        }}
      >
        hapus
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
  });

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
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nama Barang</th>
              <th>Harga</th>
              <th>Kadaluarsa</th>
              <th>Tanggal Masuk</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>{stuffList()}</tbody>
        </table>
      </div>
    </ListToko>
  );
}

const ListToko = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 8rem 0 3rem 0;
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
  }

  .list-content > h3 {
    font-size: 2rem;
    margin: 0;
  }

  .list-content > p {
    font-size: 1rem;
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

  tbody {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  thead > tr {
    width: 100%;

    border: 1px solid #213936;
    padding: 1.5rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  th,
  td {
    width: 15%;
    text-align: center;

    .edit {
      &:hover {
        color: green;
      }
    }

    .delete {
      &:hover {
        color: red;
      }
    }
  }
  tbody > tr {
    width: 100%;
    height: 5rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px solid var(--black);
  }

  .add-stuf {
    width: 80%;
    display: flex;
    justify-content: flex-end;
    margin-top: 5vh;
  }
  a {
    text-decoration: none;
  }

  .button-add {
    text-decoration: none;
    color: black;
    border: 1px solid black;
    padding: 2vh 1vh;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;
