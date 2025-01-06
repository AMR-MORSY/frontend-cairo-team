import allInstances from "./Api";

export default {
  register(form) {
    return allInstances.Api.post("/user/register", form);
  },
  logout()
  {
    return allInstances.Api.post("user/logout");

  },

  login(form) {
    return allInstances.Api.post("/user/login", form);
  },

  resetPassword(form) {
    return allInstances.Api.post("/user/resetPassword", form);
  },
  validateToken(form) {
    return allInstances.Api.post("/user/validateToken", form);
  },
  sendToken(form) {
    return allInstances.Api.post("/user/sendToken", form);
  },
  refreshTocken(data) {
    return allInstances.Api.post("/user/refreshtoken",data);
  },
  validateSignUpCode(code)
  {
    return allInstances.Api.get(`/user/signUp/${code}`);
  },
  activateUserAccount(data)
  {
    return allInstances.Api.post("/user/activateUserAccount",data);

  },
  userAbilities()
  {
      return allInstances.Api.get("admin/abilities");


  },

};
