import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { apiCapNhatPhimUpload } from "../../../apis/movieAPI";

// định nghĩa các xác thực input
const schema = yup.object({
  maPhim: yup.string().required("Mã phim không được để trống"),
  tenPhim: yup.string().required("Tên phim không được để trống"),
  trailer: yup.string().required("Trailer không được để trống"),
  hinhAnh: yup.string().required("Hình ảnh không được để trống"),
  moTa: yup.string(),
  ngayKhoiChieu: yup.string(),
  danhGia: yup.number(),
  hot: yup.string(),
  dangChieu: yup.string(),
  sapChieu: yup.string(),
});

function MovieForm({ onShow, handleShow, onDataMovieDetail }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  // submit form
  const [movieUpdate, setMovieUpdate] = useState(null);
//   console.log(movieUpdate);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let formData = new FormData();

  const onSubmit = async (value) => {
    setIsLoading(true);
    // console.log(value);
    formData.append('maPhim',value.maPhim);
    formData.append('tenPhim',value.tenPhim);
    formData.append('trailer',value.trailer);
    formData.append('hinhAnh',value.hinhAnh);
    formData.append('moTa',value.moTa);
    formData.append('ngayKhoiChieu',value.ngayKhoiChieu);
    formData.append('danhGia',value.danhGia);
    formData.append('hot',value.hot);
    formData.append('dangChieu',value.dangChieu);
    formData.append('sapChieu',value.sapChieu);
    formData.append('maNhom',value.maNhom);
    try {
      const data = await apiCapNhatPhimUpload(formData);
      setMovieUpdate(data);
      setIsLoading(false);

    } catch (error) {
        setErr(error);
        setIsLoading(false);
    }
  };
  // error form
  const onErrer = (err) => {
    console.log(err);
  };

//   const [startDate, setStartDate] = useState("");

  useEffect(() => {
    reset({
      maPhim: onDataMovieDetail.maPhim,
      tenPhim: onDataMovieDetail.tenPhim,
      trailer: onDataMovieDetail.trailer,
      hinhAnh: onDataMovieDetail.hinhAnh,
      moTa: onDataMovieDetail.moTa,
      ngayKhoiChieu: onDataMovieDetail.ngayKhoiChieu,
      danhGia: onDataMovieDetail.danhGia,
      hot: onDataMovieDetail.hot,
      dangChieu: onDataMovieDetail.dangChieu,
      sapChieu: onDataMovieDetail.sapChieu,
      maNhom: "GP03",
    });
    // setStartDate(onDataMovieDetail.ngayKhoiChieu);
  }, [onDataMovieDetail]);

  const onChangeDate = (date) => {
    // setStartDate(date.toLocaleDateString());
    console.log("date change: ", date);
    // setValue("ngayKhoiChieu", date.toLocaleDateString());
  };

  if(isLoading) return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <img src={'/img/loading.gif'} className="img-fluid" style={{height: '100px', width: '100px'}}/>
    </div>
  )

  return (
    <Modal
      show={onShow}
      onHide={() => handleShow(!onShow)}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header className="bg-pink-primary" closeButton>
        <Modal.Title className="text-header-border-color">
          Cập nhật thông tin phim
        </Modal.Title>
      </Modal.Header>
      {isLoading ? <div className="h-100 d-flex justify-content-center align-items-center">
            <img src={'/img/loading.gif'} className="img-fluid" style={{height: '100px', width: '100px'}}/>
        </div> 
       : <form onSubmit={handleSubmit(onSubmit, onErrer)}>
            <Modal.Body className="formBody">
            <div className="input-group input">
                <span className="input-group-text">Mã phim</span>
                <input
                type="text"
                className="form-control"
                disabled
                placeholder="Mã phim"
                {...register("maPhim")}
                />
            </div>
            {errors.maPhim && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.maPhim.message}
                </p>
            )}

            <div className="input-group input">
                <span className="input-group-text">Tên phim</span>
                <input
                type="text"
                className="form-control"
                placeholder="Tên phim"
                {...register("tenPhim")}
                />
            </div>
            {errors.tenPhim && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.tenPhim.message}
                </p>
            )}

            <div className="input-group input">
                <span className="input-group-text">Trailer</span>
                <input
                type="text"
                className="form-control"
                placeholder="Trailer"
                {...register("trailer")}
                />
            </div>
            {errors.trailer && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.trailer.message}
                </p>
            )}

            <div className="input-group input">
                <span className="input-group-text">Mô tả</span>
                <textarea className="form-control" rows="3" {...register("moTa")}>
                {getValues("moTa")}
                </textarea>
            </div>
            {errors.moTa && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.moTa.message}
                </p>
            )}

            <div className="input-group input">
                <span className="input-group-text">Ngày khởi chiếu</span>
                {/* <DatePicker
                    showIcon
                    selected={startDate? new Date(startDate):null}
                    onChange={onChangeDate}
                    dateFormat="dd/MM/yyyy"
                /> */}
                <input
                type="text"
                className="form-control"
                placeholder="Tên phim"
                {...register("ngayKhoiChieu")}
                />
            </div>
            {errors.ngayKhoiChieu && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.ngayKhoiChieu.message}
                </p>
            )}

            <div className="form-check">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                {...register("dangChieu")}
                />
                <label className="form-check-label">Đang chiếu</label>
            </div>
            {errors.dangChieu && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.dangChieu.message}
                </p>
            )}

            <div className="form-check">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                {...register("sapChieu")}
                />
                <label className="form-check-label">Sắp chiếu</label>
            </div>
            {errors.sapChieu && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.sapChieu.message}
                </p>
            )}

            <div className="form-check">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                {...register("hot")}
                />
                <label className="form-check-label">Hot</label>
            </div>
            {errors.hot && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.hot.message}
                </p>
            )}

            <div className="input-group input">
                <span className="input-group-text">Số sao</span>
                <input
                type="text"
                className="form-control"
                placeholder="Số sao"
                {...register("danhGia")}
                />
            </div>
            {errors.danhGia && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.danhGia.message}
                </p>
            )}

            <img
                src={getValues("hinhAnh")}
                className="text-center"
                srcset=""
                style={{ width: "100px" }}
            />
            <div className="input-group">
                <input
                className="form-control"
                type="file"
                {...register("hinhAnh")}
                />
                <label className="input-group-text">Hình ảnh</label>
            </div>
            {errors.hinhAnh && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.hinhAnh.message}
                </p>
            )}
            </Modal.Body>
            <Modal.Footer>
            <button type="submit" className="btn btnPrimary">
                Cập nhật
            </button>
            </Modal.Footer>
        </form>
        }
    </Modal>
  );
}

export default MovieForm;