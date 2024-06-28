import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Main from "./Main";
import "./allstudent.css";
import studentsData from "./data.js";
import DataTable from "react-data-table-component";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
export default function Allstud() {
  const [studentList, setStudentsList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [deleteData, setDeleteData] = useState(null); 
  const [search, setSearch] = useState("");
  const navigate =  useNavigate();
  const getData = async () => {
    try {
        const res = await axios.get("/getallstud");
        setStudentsList(res.data);
        setFilterData(false);
    } catch (err) {
        console.error("Error fetching the data:", err);
    }
};
  useEffect(() => {
    getData(); 
  }, []);
  useEffect(() => {
    if(refresh) {
    getData(); 
    setRefresh(false)
    }
  }, [refresh]);
  const handleDelete = (data) => {
    setDeleteData(data)
    setShowDeleteModal(true)
    console.log("Delete",data);
  };
  const handleEdit = (data) => {
    console.log("Edit",data);
    navigate(`/editstud/${data.Enroll_No}`,{state: {data}})
  };
  const customStyles = {
    headRow: {
      style: {
        border: 'solid 1px #dee2e6',
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px"
      }
    },
    rows: {
      style: {
        border: 'solid 1px #dee2e6',
        textAlign: 'center',
        fontSize: '13px',
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        fontWeight: 'bold',
        fontSize: '15px',
        textAlign: 'center',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
    },
    {
      name: "Phone",
      selector: (row) => row.Phone,
    },
    {
      name: "Enrollment Number",
      selector: (row) => row.Enroll_No,
    },
    {
      name: "Date of Amission ",
      selector: (row) => row.Date_Of_Admission,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ cursor: "pointer" }} onClick={()=> handleEdit(row)}>
            {" "}
            <img src={editIcon} alt="edit" className="edit-image" />
          </div>
          <div style={{ cursor: "pointer" }} onClick={ ()=> handleDelete(row)}>
            <img src={deleteIcon} alt="delete" className="delete-image" />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log(studentsData);
    if (search !== "") {
      const filteredData = studentList.filter((student) => {
        return (
          student.Name.toLowerCase().includes(search.toLowerCase()) ||
          student.Email.toLowerCase().includes(search.toLowerCase()) ||
          student.Phone.toLowerCase().includes(search.toLowerCase()) ||
          student.Enroll_No.toLowerCase().includes(search.toLowerCase()) ||
          student.Date_Of_Admission.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilterData(filteredData);
    } else {
      setFilterData(studentList);
    }
  }, [search, studentList]);

  const handleFilterData = (e) => {
    setSearch(e.target.value);
  };
  const handleConfirmDelete = async (data) => {
      try {
          await axios.delete(`/deletestud/${deleteData._id}`);
      } catch (err) {
          console.error("Error deleting the student:", err);
      }
    setShowDeleteModal(false); // Hide the modal after deletion
    setRefresh(true)
  };
  return (
    <div className="container mt-5">
      <div className="serach">
        <div className="students">Students</div>
        <div className="buttonField">
          <input type="text" onChange={handleFilterData}></input>
          <Link className="btn btn-success" to="/addstud">
            ADD New Student
          </Link>
        </div>
      </div>
      <div className="detailTable">
        <DataTable 
        columns={columns} 
        data={filterData} 
        striped 
        customStyles={customStyles}
        />
      </div>
      <Modal show={showDeleteModal} centered onHide={() => setShowDeleteModal(false)}>
        <Modal.Body>
          Are you sure you want to delete this record?
        </Modal.Body>
        <Modal.Footer style={{display:"flex",justifyContent:"space-around"}}>
          <Button style={{ backgroundColor: '#22C53C', borderColor: '#22C53C', width:"10rem" }} onClick={ handleConfirmDelete}>
            Yes
          </Button>
          <Button style={{ backgroundColor: '#C55D22', borderColor: '#C55D22',width:"10rem" }}  onClick={() =>setShowDeleteModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
