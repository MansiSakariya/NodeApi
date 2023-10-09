import axios from "axios";
import React, { useState, useEffect } from "react";
export const Form = () => {

    const [obj, setObj] = useState({ fname: "", date: "", email: "", phone: "", school: "", grade: "" });
    const [form, setForm] = useState([]);
    const [isEdit, setIsEdit] = useState(-1);

    const [errors, setErrors] = useState({});

    function getdata() {
        axios.get('http://localhost:7045/get-all')
            .then(res => {
                console.log(res.data)
                setForm(res.data)
            })
        console.log(form);
    }
    useEffect(() => {
        getdata()
    }, [])

    function Handlesubmit(e) {

        e.preventDefault();
        
        const validationErrors = validateForm(obj);
        if (Object.keys(validationErrors).length === 0) {
           
            console.log('Form submitted successfully');
        } else {
            
            setErrors(validationErrors);
        }

        if (isEdit === -1) {
            console.log(e.target);
            setForm([...form, obj])
            localStorage.setItem("create", JSON.stringify([...form, obj]));
        }
        else {
            axios.put(`http://localhost:7045/user/${isEdit}`, obj)
                .then(res => {
                    console.log(res.data);
                    getdata();
                })
        }
        axios.post(`http://localhost:7045/data`, obj)
            .then(res => {
                console.log(res.data);
            })
    }

    const validateForm = (data) => {
       
        const errors = {};

        if (!data.name) {
            errors.name = 'Name is required';
        }
        if (!data.date) {
            errors.date = 'Date is required';
        }
        if (!data.email) {
            errors.email = 'Email is required';
        }
        if (!data.phone) {
            errors.phone = 'PhoneNo. is required';
        }
        if (!data.school) {
            errors.school = 'School is required';
        }
        if (!data.grade) {
            errors.grade = 'Grade is required';
        }


        return errors;
    };

    function Handlechange(e) {
        console.log(e.target);
        let { name, value } = e.target;
        console.log(`Updating ${name} with value: ${value}`);
        setObj({ ...obj, [name]: value });
    }

    const Handledelete = (inx) => {
        axios.delete(`http://localhost:7045/user/${inx}`)
            .then(res => {
                console.log(res.data);
                getdata();
            })
    }

    const HandleEdit = (idx) => {
        setIsEdit(idx);
        const editrecord = form.find((item, index) => item._id === idx);
        setObj(editrecord);

    }


    return (
        <>
            <div className="container" style={{ border: "1px solid gray", padding: "10px", backgroundColor: "#c5cae9" }}>
                <h1 style={{ textAlign: "center" }}>Youth Leadership Summit Registration Form</h1>
                <div style={{ textAlign: "center" }}>
                    <div>
                        <label htmlFor="fname">Full Name</label><br />
                        <input style={{ width: "30%" }} type="text" id="fname" name="fname" value={obj.fname} onChange={Handlechange} />
                        {errors.fname && <span className="error">{errors.fname}</span>}
                    </div><br /><br />
                    <div>
                        <label htmlFor="date">Date of birth</label><br />
                        <input style={{ width: "30%" }} type="date" id="date" name="date" value={obj.date} onChange={Handlechange} />
                        {errors.date && <span className="error">{errors.date}</span>}
                    </div><br /><br />
                    <div>
                        <label label="email">Email Address</label><br />
                        <input style={{ width: "30%" }} type="email" id="email" name="email" value={obj.email} onChange={Handlechange} />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div><br /><br />
                    <div>
                        <label htmlFor="phone">Phone number</label><br />
                        <input style={{ width: "30%" }} type="tel" id="phone" name="phone" value={obj.phone} placeholder="### ### ####" onChange={Handlechange} />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div><br /><br />
                    <div>
                        <label htmlFor="school">School/College/Institution</label><br />
                        <input style={{ width: "30%" }} type="text" id="school" name="school" value={obj.school} onChange={Handlechange} />
                        {errors.school && <span className="error">{errors.school}</span>}
                    </div><br /><br />
                    <div>
                        <label htmlFor="grade">Grade/Year</label><br />
                        <input style={{ width: "30%" }} type="text" id="grade" name="grade" value={obj.grade} onChange={Handlechange} />
                        {errors.grade && <span className="error">{errors.grade}</span>}
                    </div><br /><br />
                    <button style={{ padding: "8px", width: "8%", marginLeft: "1%" }} type="butoon" onClick={Handlesubmit}>Submit</button>

                </div>
                <table className="table">
                    <thead>
                        <th>Full Name</th>
                        <th>Date of birth</th>
                        <th>Email Address</th>
                        <th>Phone number</th>
                        <th>School/College/Institution</th>
                        <th>Grade/Year</th>
                    </thead>
                    <tbody>
                        {form.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.fname}</td>
                                    <td>{item.date}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.school}</td>
                                    <td>{item.grade}</td>
                                    <td><button type="button" onClick={() => Handledelete(item._id)}>Delete</button></td>
                                    <td><button type="button" onClick={() => HandleEdit(item._id)}>Edit</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}