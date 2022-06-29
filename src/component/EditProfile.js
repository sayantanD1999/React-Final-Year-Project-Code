import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import "../CSS/userinfo.css";
import { getData } from "./CheckAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();
function EditProfile() {

    let { email } = useParams();
    const [name, setName] = useState("");
    const [useremail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otpReceived, setOtpReceived] = useState(false);
    const [otp, setOTP] = useState('');
    useEffect(() => {
        setUserEmail(email);
        const username = localStorage.getItem("username");
        setName(username);
    }, []);


    const notify = () => {
        toast.success("Password Changed Successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const notify2 = (msg) => {
        toast.error(msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };


    const updateUser = () => {

        if (password.length == 0) {
            notify2("Password cannot be blank");
        }
        else {
            if (otp == '') {
                var obj = {
                    otp: otp,
                    email: useremail,
                    password: password,
                };

                axios.post(`/updateuserinfo/${email}`, { obj: obj }).then((response) => {
                    // console.log(res);
                    if (response.data.statusCode==200) {
                        console.log(response);
                        setOtpReceived(true);
                    }
                });
            }
            else {
                var obj = {
                    otp: otp,
                    email: useremail,
                    password: password,
                };

                axios.post(`/updateuserinfo/${email}`, { obj: obj }).then((response) => {
                    // console.log(res);
                    if (response && response.data.statusCode == 200) {
                        notify(response.data.msg)
                        
                    }
                    else
                    {
                        notify2(response.data.msg);
                    }
                });
            }
        }




    };
    return (
        <div className="container">

            {otpReceived == false ? (<>
                <div className="row g-3 needs-validation">
                    <h1 className="align-middle">Edit User</h1>
                    <div className="col-12">
                        <div className="form-floating mb-3">
                            <label htmlFor="floatingInput">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={name}
                                name="name"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating mb-3">
                            <label htmlFor="floatingInput">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                value={useremail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder={useremail}
                                name="email"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating mb-3">
                            <label htmlFor="floatingInput">Enter Your Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="New Password"
                                name="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 d-grid">
                        <button className="btn btn-primary" onClick={updateUser}>
                            Submit
                        </button>
                    </div>
                </div>

            </>) : (<>
                <h1 className="align-middle">Verify OTP</h1>
                <div className="col-12">
                    <div className="form-floating mb-3">
                        <label htmlFor="floatingInput">Enter the OTP sent to your registerd Email ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="OTP"
                            name="otp"
                            onChange={e => setOTP(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-12 d-grid">
                    <button className="btn btn-primary" onClick={updateUser}>
                        Submit
                    </button>
                </div>
            </>)}



        </div>
    )
}

export default EditProfile