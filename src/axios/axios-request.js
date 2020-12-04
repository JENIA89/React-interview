import Axios from "axios";

export default Axios.create({
  baseURL: "https://react-interview-ddd91-default-rtdb.firebaseio.com/",
});
