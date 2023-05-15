const apiList = {
    userLogin: "/user/login",
    userRegister: "/user/add",
    serviceAdd: "/services/add",
    serviceAllByType: "/services/allByType",
    serviceUpdate: "/services/update",
    serviceDelete: "/services/delete",
    reservationAdd: "/record/add",
    reservationAll: '/record/all',
    reservationByService: '/record/allByIdAndTime',
    reservationByType: '/record/allByType',
    summaryByMonth:'/report/monthSummary'
}
export default apiList;