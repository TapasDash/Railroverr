"use client";
import { useDispatch, useSelector } from "react-redux";

// import "../styles/trainInfoCard.scss";
import "@/styles/trainBetweenStationsDetails.scss";

import { useRouter } from "next/navigation";
import TrainLoader from "@/utils/TrainLoader/TrainLoader";
import TrainInfoCard from "@/components/TrainInfoCard";
import { getTrainTimetableData } from "@/features/trainTimetable/trainTimetableSlice";

const TrainBetweenStationsDetails = () => {
  // const {
  //   boardingInfo,
  //   destinationInfo,
  //   trainInfo: { dt, name, trainNo },
  //   seatInfo: { coach, berth, noOfSeats },
  // } = pnrData;
  // const {
  //   trainBetweenStationsData: {
  //     boardingInfo,
  //     destinationInfo,
  //     trainInfo: { dt, name, trainNo },
  //   },
  // } = useSelector((state) => state.pnrStatus);
  const dispatch = useDispatch();
  const router = useRouter();

  const { trainBetweenStationsData, isLoading, isError, message } = useSelector(
    (state) => state.trainBetweenStations
  );
  console.log({ trainBetweenStationsData });
  if (isLoading) return <TrainLoader />;

  const onClickTrainInfoCard = (trainNo) => {
    // let [trainNo] = trainInfo.split("-");
    // console.log(import.meta.env.REACT_APP_TRAIN_TIMETABLE_URL);
    dispatch(getTrainTimetableData(trainNo));
    router.push("/trainTimetableDetails");
  };

  let cleanedUpTrainStationsData = [];
  trainBetweenStationsData.map((trainData) => {
    console.log({ trainData });
    const {
      trainName,
      trainNo,
      sourceStationCode,
      sourceStationName,
      fromTime,
      toTime,
      destinationStationCode,
      destinationStationName,
    } = trainData || {};

    // const {
    //   stationName,
    //   stationCode,
    //   destinationStationName,
    //   destinationStation,
    //   trainNo,
    //   trainName,
    //   arrivalTime,
    //   departureTime,
    // } = trainData || {};

    const fromStation = {
      code: sourceStationCode,
      name: sourceStationName,
      time: fromTime,
    };

    const toStation = {
      code: destinationStationCode,
      name: destinationStationName,
      time: toTime,
    };
    cleanedUpTrainStationsData.push({
      fromStation,
      toStation,
      trainName,
      trainNo,
    });
  });

  return cleanedUpTrainStationsData.map(
    ({ fromStation, toStation, trainName, trainNo }) => (
      <TrainInfoCard
        fromStation={fromStation}
        toStation={toStation}
        trainName={trainName}
        trainNo={trainNo}
        onPress={() => onClickTrainInfoCard(trainNo)}
      />
    )
  );
};
export default TrainBetweenStationsDetails;
