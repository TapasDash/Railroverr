"use client";
import { useSelector } from "react-redux";
import "@/styles/trainTimetableDetails.scss";
import TrainLoader from "@/utils/TrainLoader/TrainLoader";
import { Suspense } from "react";

const TrainTimetableDetails = () => {
  const { trainTimetableData, isLoading, isError, message, isSuccess } =
    useSelector((state) => state.trainTimetable);
  console.log("--->", trainTimetableData.schedules);
  console.log({ trainTimetableData });
  if (isLoading) return <TrainLoader />;
  return (
    <Suspense fallback={<TrainLoader />}>
      <section className="trainTimetableDetails">
        <table>
          <thead>
            <tr>
              <th>Station</th>
              <th>Arrival</th>
              <th>Platform</th>
              <th>Distance</th>
            </tr>
            <tr>
              <th></th>
              <th>Departure</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trainTimetableData &&
              trainTimetableData.schedules.map(
                ({
                  _id,
                  dstName,
                  platform,
                  dstCode,
                  dstArrive,
                  orgDepart,
                  distance,
                }) => (
                  <>
                    <tr key={_id}>
                      <td>{dstName}</td>
                      <td>
                        {dstArrive.substring(0, 5) === "null"
                          ? "Source"
                          : dstArrive.substring(0, 5)}
                      </td>
                      <td>{platform}</td>
                      <td>{distance} km</td>
                    </tr>
                    <tr key={_id}>
                      <td>({dstCode})</td>
                      <td>
                        {orgDepart.substring(0, 5) === "null"
                          ? "Destination"
                          : orgDepart.substring(0, 5)}
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </>
                )
              )}
          </tbody>
        </table>
      </section>
    </Suspense>
  );
};

export default TrainTimetableDetails;
