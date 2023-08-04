/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Input, Spin, Form, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getData } from "../helper/FirebaseHelper";

export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  // useEffect(() => {
  //   if (user){
  //     getData('users', user.uid).then(res => {
  //       window.localStorage.setItem('users', JSON.stringify(res))
  //       window.localStorage.setItem('isLogin', true)
  //       navigate('/create-bill');
  //     })
  //   } 
  // }, [user, loading]);

  const handleLogin = () => {
    setLoader(true)
    signInWithEmailAndPassword(auth, name, password).then((user)=> {
      console.log("🚀 ~ file: Login.js:36 ~ signInWithEmailAndPassword ~ user:", user)
      getData('users', user?.user?.uid).then(res => {
        notification.success({ message: 'Login successful' });
        window.localStorage.setItem('users', JSON.stringify(res))
        window.localStorage.setItem('isLogin', true)
        navigate('/create-bill');
        setLoader(false);
      })
      // window.localStorage.setItem('users', JSON.stringify({role: 'admin'}))
      // window.localStorage.setItem('isLogin', true)
      // navigate('/create-bill');
    }).catch((error) => {
      const errorMessage = error.message;
      notification.error({ message: errorMessage });
      setLoader(false)
    });
  }

  return (
    <div>
      <h4 style={{ margin: "10px", color: "white" }}>Vision</h4>
      <div className="d-flex justify-content-center align-items-center">
        <Form className="container py-5 h-100" onFinish={handleLogin}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-light text-black"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-red-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <Input
                        type="text"
                        placeholder="Enter the Name"
                        className="form-control form-control-lg login-input"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <Input
                        type="password"
                        placeholder="Enter the Password"
                        className="form-control form-control-lg login-input"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button className="btn btn-lg bg-light text-dark border-secondary cursor-pointer" disabled={name === "" || password=== ""} type="submit">
                      Login
                      {loader ? (
                        <>
                          &nbsp;<Spin size="small" />{" "}
                        </>
                      ) : (
                        ""
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
