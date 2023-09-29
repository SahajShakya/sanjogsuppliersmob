interface paramInterface {
  id?: number | string | string[] | undefined;
  pageNum?: number;
  searchTerm?: string;
  RecordPerPage?: number;

  token?: string;
}


export const HOST_URL = "http://192.168.254.159:8000";

const ROOT_ROUTE = "/api";

export const BASE_API_ROUTE = HOST_URL + ROOT_ROUTE;

export const routesName = {

  TestRoute() {
    return {
      test: `${HOST_URL + ROOT_ROUTE}`,
    };
  },

  AuthRoute({ token }: paramInterface) {
    return {
      login: `${HOST_URL + ROOT_ROUTE}/auth/login`,
      register: `${HOST_URL + ROOT_ROUTE}/auth/create`,
      refreshToken: `${HOST_URL + ROOT_ROUTE}/auth/refresh/token`,
      forgotPassword: `${HOST_URL + ROOT_ROUTE}/auth/forgotpassword`,
      changePassword: `${HOST_URL + ROOT_ROUTE}/auth/changepassword`,
      resetPassword: `${HOST_URL + ROOT_ROUTE}/auth/resetpassword/${token}`,
    };
  },
  UserRoute({ id, pageNum, searchTerm, RecordPerPage }: paramInterface) {
    return {
      get_users:
        pageNum || RecordPerPage
          ? `${HOST_URL + ROOT_ROUTE}/users/?page=${pageNum ?? 0}&limit=${
              RecordPerPage ?? 10
            }`
          : `${HOST_URL + ROOT_ROUTE}/users`,
      add_user: `${HOST_URL + ROOT_ROUTE}/user`,
      update_user: `${HOST_URL + ROOT_ROUTE}/user/${id}`,
      delete_user: `${HOST_URL + ROOT_ROUTE}/user/${id}`,
      get_single_user: `${HOST_URL + ROOT_ROUTE}/user/${id}`,
      search_user: `${
        HOST_URL + ROOT_ROUTE
      }/users/search?searchTerm=${encodeURI(searchTerm!)}&page=${
        pageNum ?? 0
      }&limit=${RecordPerPage ?? 10}`,
    };
  },



};
