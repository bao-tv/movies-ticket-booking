import React, { useEffect } from "react";
import {Modal,Form,InputGroup,Button} from 'react-bootstrap';
import {useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import {signup} from "../../../slices/regisUserSlice";
import {signin} from "../../../slices/userSlice"
import {useForm} from 'react-hook-form';
// my style
import style from "./SignUp.module.scss"

function SignUp() {
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
      hoTen: '',
      email: '',
      phone: '',
    },
    mode : "onTouched",
  });

  const {user, isLoading, error} = useSelector((state) => state.regisUser);
  if(user) {
    const userSignin = {
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
    }
    dispatch(signin(userSignin));
  }

  const onSubmit = (data) => {
    dispatch(signup(data));
    
  };

  const onErrer = (err) => {
      console.log(err);
  }
  const navigate = useNavigate();


  if(user) navigate(`/`);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onErrer)}>
            <Modal.Body>
              <InputGroup className="mb-2">
                <InputGroup.Text className="row col-4 mx-1">Tài khoản</InputGroup.Text>
                <Form.Control 
                  {...register('taiKhoan', {
                  required: {
                    value: true,
                    message: 'Tài khoản không được để trống',
                  },
                })}/>
              </InputGroup>
              {errors.taiKhoan && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.taiKhoan.message}</p>}
              <InputGroup className="mb-2">
                <InputGroup.Text className="row col-4 mx-1" >Mật khẩu</InputGroup.Text>
                <Form.Control type="password"
                  {...register('matKhau', {
                  required: {
                    value: true,
                    message: 'Mật khẩu không được để trống',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/,
                    message: 'Mật khẩu có ít nhất 8 ký tự bao gồm 1 ký tự hoa, thường và đặc biệt',
                  },
                })}/>
              </InputGroup>
              {errors.matKhau && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.matKhau.message}</p>}
             
              <InputGroup className="mb-2">
                <InputGroup.Text className="row col-4 mx-1">Nhập lại mật khẩu</InputGroup.Text>
                <Form.Control  type="password" 
                  {...register ('reMatKhau', {
                    required: {
                      value: true,
                      message: 'Mật khẩu không được để trống',
                    },
                    
                  })} />
              </InputGroup>
              {errors.rePass && <p>{errors.rePass.message}</p>}
              <InputGroup className="mb-2">
                <InputGroup.Text className="row col-4 mx-1">Họ và tên</InputGroup.Text>
                <Form.Control {...register('hoTen', {
                required: {
                  value: true,
                  message: 'Họ và Tên không được để trống'
                },
              })}/>
              </InputGroup>
              {errors.hoTen && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.hoTen.message}</p>}
              <InputGroup className="mb-2">
                <InputGroup.Text className="row col-4 mx-1">Email</InputGroup.Text>
                <Form.Control type="email"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email không được để trống'
                    },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Email không đúng định dạng',
                    },
                  })}/>
              </InputGroup>
              {errors.email && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.email.message}</p>}
              <InputGroup>
                <InputGroup.Text className="row col-4 mx-1">Số điện thoại</InputGroup.Text>
                <Form.Control {...register('soDt', {
                required: {
                  value: true,
                  message: 'Số điện thoại không được để trống',
                },
                valueAsNumber: true,
              })}/> 
              </InputGroup>
              {errors.soDt && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.soDt.message}</p>}
            </Modal.Body>
            
            <Modal.Footer className="w-100 justify-content-center">
              
              <div className="w-100">
                <button type="submit" className={`${style.btnPrimary} w-100`} disabled={isLoading ?  true : false}>Đăng ký</button>
              </div>

            </Modal.Footer>
            {error && <p className="text-center">{error}</p>}
            {user && <p className="text-center">Chúc mừng bạn đã đăng ký thành công</p>}
          </form>
    </div>
  )
}

export default SignUp