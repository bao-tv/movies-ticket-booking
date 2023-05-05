import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector } from "react-redux";

import style from './BookingTicket.module.scss';
// import Seat from './Seat/Seat';
// import SeatSelect from './SeatSelect/SeatSelect';
import {apiListTicket} from '../../apis/dsVeAPI';

function BookingTicket() {
  const maLichChieu =  useParams();
  console.log(maLichChieu);
  const {user} = useSelector((state) => state.user);


  if(user) {
      return (
        <div className={`container-fluid ${style.movie}`}>
            <div className="row">
                <div className="col-8">
                    <h1 className='text-center text-warning my-4'>ĐẶT VÉ XEM FILM</h1>
                    <div className='bg-bg-dark-color'>
                      <h4 className='text-center text-light'>Màn hình</h4>
                      <div className={style.screen}></div>
                    {/* <div>{maLichChieu}</div> */}
                    {/* <Seat /> */}
                      <div className={style.seatTypes}>
                        <div className={`${style.seatBooked} ${style.iconSeat}`}>Đã đặt</div>
                        <div className={`${style.seatVip} ${style.iconSeat} `}>VIP</div>
                        <div className={`${style.seatNormal} ${style.iconSeat} `}>thường</div>
                        <div className={`${style.seatYourChoice} ${style.iconSeat} `}>Đã chọn</div>
                      </div>
                    </div>
                </div>
                <div className="col-4">
                    {/* <SeatSelect /> */}
                </div>
            </div>
        </div>
      )
  } else return (
    <div className='text-center text-danger'>
        <h3>Vui lòng đăng nhập để đặt vé</h3>
    </div>
  )
}

export default BookingTicket