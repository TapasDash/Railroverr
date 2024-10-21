import React from "react";
import { MdDirectionsRailway } from "react-icons/md";

import "../styles/trainInfoCard.scss";
import RunningDays from "./RunningDays";

const TrainInfoCard = ({
  fromStation,
  toStation,
  trainNo,
  runningDays,
  trainName,
  isPnr,
  onPress,
}) => {
  console.log("In info card", {
    fromStation,
    toStation,
    trainNo,
    trainName,
    runningDays,
    isPnr,
    onPress,
  });
  return (
    <main className="trainInfoCard" onClick={onPress}>
      <section className="stationSection">
        <h2>{fromStation.code}</h2>
        <p>{fromStation.name}</p>
        <p>{fromStation.time.substring(0, 5)}</p>
      </section>
      <section className="trainInfoSection">
        <MdDirectionsRailway />
        <h3>{trainNo}</h3>
        <h4>{trainName}</h4>
        {!isPnr && <RunningDays runningDays={runningDays} />}
      </section>
      <section className="stationSection">
        <h2>{toStation.code}</h2>
        <p>{toStation.name}</p>
        <p>{toStation.time.substring(0, 5)}</p>
      </section>
    </main>
  );
};

export default TrainInfoCard;
