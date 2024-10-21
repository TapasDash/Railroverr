import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const getPNRStatus = async (pnrNumber) => {
  console.log("getPnrStatus", { pnrNumber });
  console.log("new env--->", process.env.NEXT_PUBLIC_TRAIN_TIMETABLE_URL);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_TRAIN_TIMETABLE_URL}/pnr/${pnrNumber}`
  ); // { stationCode: fromStation, destinationStation: toStation }
  console.log("---->", response?.data);
  return response?.data?.data;
};

const pnrService = {
  getPNRStatus,
};

export default pnrService;
