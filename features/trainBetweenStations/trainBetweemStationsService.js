import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const getTrainBetweenStations = async (fromStation, toStation) => {
  console.log("getTrainBetweenStations", { fromStation, toStation });
  console.log("new env---<", process.env.NEXT_PUBLIC_TRAIN_TIMETABLE_URL);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_TRAIN_TIMETABLE_URL}/from/${fromStation}/to/${toStation}`
  ); // { stationCode: fromStation, destinationStation: toStation }
  console.log({ response });
  console.log("---->", response.data);
  return response?.data?.trains;
};

const trainBetweenStationsService = {
  getTrainBetweenStations,
};

export default trainBetweenStationsService;
