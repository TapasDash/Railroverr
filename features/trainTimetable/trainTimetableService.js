import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const getTrainTimetableData = async (trainNo) => {
  console.log({ trainNo });
  const response = await axios.get(
    `${process.env.TRAIN_TIMETABLE_URL}/trainNo/${trainNo}`
  );
  console.log(response?.data);
  return response?.data;
};

const trainTimetableService = {
  getTrainTimetableData,
};

export default trainTimetableService;
