import axiosClient from "./axiosClient";

export const apiGetMovies = async () => {
    const {data} = await axiosClient.get('/QuanLyPhim/LayDanhSachPhim', {
        params: {
            maNhom: 'GP03',
        }
    });
    return data;
};

export const apiGetBanners = async () => {
    const {data} = await axiosClient.get('/QuanLyPhim/LayDanhSachBanner');
    return data;
};

// export const apiGetBanners = async () => {
//     const {data} = await axiosClient.get('/QuanLyPhim/LayDanhSachBanner');
//     return data;
// };

export const apiGetMovieDetails = async (movieID) => {
    const {data} = await axiosClient.get('/QuanLyPhim/LayThongTinPhim', {
        params: {
            MaPhim: movieID,
        },
    });
    return data;
};
