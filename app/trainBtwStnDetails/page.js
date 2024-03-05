"use client";
import { useDispatch, useSelector } from "react-redux";

// import "../styles/trainInfoCard.scss";
import "@/styles/trainBetweenStationsDetails.scss";

import { useRouter } from "next/navigation";
import TrainLoader from "@/utils/TrainLoader/TrainLoader";
import TrainInfoCard from "@/components/TrainInfoCard";
import { getTrainTimetableData } from "@/features/trainTimetable/trainTimetableSlice";
import { Suspense } from "react";
import Loading from "../loading";
import NotFoundLoader from "@/utils/NotFound/NotFoundLoader";

const TrainBetweenStationsDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { trainBetweenStationsData, isLoading, isError, message } = useSelector(
    (state) => state.trainBetweenStations
  );
  console.log({ trainBetweenStationsData });
  if (isLoading) return <TrainLoader />;
  console.log({ isError });
  if (trainBetweenStationsData === "No direct trains found")
    return <NotFoundLoader />;

  const onClickTrainInfoCard = (trainNo) => {
    // let [trainNo] = trainInfo.split("-");
    // console.log(import.meta.env.REACT_APP_NEXT_PUBLIC_TRAIN_TIMETABLE_URL);
    dispatch(getTrainTimetableData(trainNo));
    router.push("/trainTimetableDetails");
  };

  let cleanedUpTrainStationsData = [];
  trainBetweenStationsData.length &&
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
        runningDays,
      } = trainData || {};

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
        _id,
        fromStation,
        toStation,
        trainName,
        trainNo,
        runningDays,
      });
    });

  return cleanedUpTrainStationsData.map(
    ({ fromStation, toStation, trainName, trainNo, runningDays, _id }) => (
      <Suspense fallback={<Loading />} key={_id}>
        <TrainInfoCard
          key={_id}
          fromStation={fromStation}
          toStation={toStation}
          trainName={trainName}
          trainNo={trainNo}
          runningDays={runningDays}
          onPress={() => onClickTrainInfoCard(trainNo)}
        />
      </Suspense>
    )
  );
};
export default TrainBetweenStationsDetails;
