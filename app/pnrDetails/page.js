"use client";
import React from "react";
import { useSelector } from "react-redux";

import "@/styles/pnrDetails.scss";

import TrainLoader from "@/utils/TrainLoader/TrainLoader";
import TrainInfoCard from "@/components/TrainInfoCard";

const PnrDetails = () => {
  const { pnrStatusData, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.pnrStatus
  );
  console.log({ pnrStatusData });

  if (isLoading) return <TrainLoader />;

  const {
    Pnr: pnr,
    TrainNo: trainNo,
    TrainName: trainName,
    Doj: dateOfJourney,
    BookingDate: bookingDate,
    Quota: quota,
    DestinationDoj: destinationDateOfJourney,
    SourceDoj: sourceOfDateOfJourney,
    From: from,
    To: to,
    ReservationUpto: reservationUpto,
    ReservationUptoName: reservationUptoName,
    BoardingPoint: boardingPoint,
    BoardingStationName: boardingStationName,
    Class: classs,
    DepartureTime: departureTime,
    ArrivalTime: arrivalTime,
    ChartPrepared: chartPrepared,
    PassengerCount: noOfSeats,
    PassengerStatus: passengerStatus,
  } = pnrStatusData || {};

  const fromStation = {
    code: boardingPoint,
    name: boardingStationName,
    time: departureTime,
  };

  const toStation = {
    code: reservationUpto,
    name: reservationUptoName,
    time: arrivalTime,
  };

  // r
  // return (
  //   <section className="fromStation">
  //     <h2>{boardingInfo.stationCode}</h2>
  //     <p>{boardingInfo.stationName}</p>
  //     <h5>{boardingInfo.arrivalTime}</h5>
  //   </section>
  // );
  const coach = passengerStatus?.[0]?.BookingCoachId;
  const berth = passengerStatus?.[0]?.BookingBerthNo;

  return (
    <>
      <TrainInfoCard
        fromStation={fromStation}
        toStation={toStation}
        trainNo={trainNo}
        trainName={trainName}
        isPnr={true}
      />
      <div className="seatInfo">
        <div>
          <h3>Coach</h3>
          <p>{coach}</p>
        </div>
        <div>
          <h3>Berth</h3>
          <p>{berth}</p>
        </div>
        <div>
          <h3>No Of Seats</h3>
          <p>{noOfSeats}</p>
        </div>
      </div>
      {/* <section className="trainTimetableDetails">
        <table className="trainTable">
          <thead>
            <tr>
              <th>SNo</th>
              <th>Station</th>
              <th>Arrival</th>
              <th>Halt</th>
              <th>Platform</th>
              <th>Distance</th>
              <th>Travelling Day</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>Departure</th>
            </tr>
          </thead>
          <tbody>
            {trainRoutes.map(
              (
                {
                  stationCode,
                  stationName,
                  haltTime,
                  travellingDay,
                  platform,
                  arrivalTime,
                  departureTime,
                  distance,
                },
                index
              ) => (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{stationName}</td>
                    <td>{arrivalTime.substring(0, 5)}</td>
                    <td>{haltTime.substring(3, 5)} min</td>
                    <td>{platform}</td>
                    <td>{distance} km</td>
                    <td>{travellingDay}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>({stationCode})</td>
                    <td>{departureTime.substring(0, 5)}</td>
                  </tr>
                </>
              )
            )}
          </tbody>
        </table>
      </section> */}
    </>
  );
};
export default PnrDetails;
