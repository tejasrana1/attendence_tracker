export const phoneReGex = new RegExp(
    "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
);
export const emailReGex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
);
export const nameReGex = new RegExp(
    "^(([A-Za-z]+[-']?)*([A-Za-z]+)?s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$"
);
// export const passwordReGex =new RegExp("/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/")
export const passwordReGex = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
export const usernameReGex = new RegExp("^([0-9]{4})$");
