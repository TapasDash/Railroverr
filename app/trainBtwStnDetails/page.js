"use client";
import { useDispatch, useSelector } from "react-redux";

// import "../styles/trainInfoCard.scss";
import "@/styles/trainBetweenStationsDetails.scss";

import { useRouter } from "next/navigation";
import TrainLoader from "@/utils/TrainLoader/TrainLoader";
import TrainInfoCard from "@/components/TrainInfoCard";
import { getTrainTimetableData } from "@/features/trainTimetable/trainTimetableSlice";
import { Suspense } from "react";

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
      _id,
      trainName,
      trainNo,
      fromStationCode,
      fromStationName,
      fromTime,
      toTime,
      toStationCode,
      toStationName,
    } = trainData || {};

    // const {
    //   stationName,
    //   stationCode,
    //   toStationName,
    //   destinationStation,
    //   trainNo,
    //   trainName,
    //   arrivalTime,
    //   departureTime,
    // } = trainData || {};

    const fromStation = {
      code: fromStationCode,
      name: fromStationName,
      time: fromTime,
    };

    const toStation = {
      code: toStationCode,
      name: toStationName,
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
    ({ fromStation, toStation, trainName, trainNo, _id }) => (
      <Suspense fallback={<TrainLoader />} key={_id}>
        <TrainInfoCard
          key={_id}
          fromStation={fromStation}
          toStation={toStation}
          trainName={trainName}
          trainNo={trainNo}
          onPress={() => onClickTrainInfoCard(trainNo)}
        />
      </Suspense>
    )
  );
};
export default TrainBetweenStationsDetails;
