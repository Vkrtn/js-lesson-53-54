let rawdata = localStorage.getItem("cart");
export let dataRTU = JSON.parse(rawdata);
const cart = localStorage.getItem("cart") ? dataRTU : [];

export default cart;
