// import swal from 'sweetalert'

const popup = (title, text, icon) => {
  // swal({
  //     title,
  //     text,
  //     icon,
  //     button: "OK!",
  // })
};

export const errorPopup = (type, title, text) => {
  title = title ? title : "Opps";
  type = type ? type : "error";
  text = text ? text : "Something went wrong, please try again!";
  popup(title, text, type);
};

export const successPopup = (type, title, text) => {
  title = title ? title : "Success!";
  type = type ? type : "success";
  text = text ? text : "Success!";
  popup(title, text, type);
};

export default popup;
