"use client";
import { useSelector } from "react-redux";
import "@/styles/trainTimetableDetails.scss";
import TrainLoader from "@/utils/TrainLoader/TrainLoader";

const TrainTimetableDetails = () => {
  const { trainTimetableData, isLoading, isError, message, isSuccess } =
    useSelector((state) => state.trainTimetable);
  console.log("--->", trainTimetableData.schedules);
  console.log({ trainTimetableData });
  if (isLoading) return <TrainLoader />;
  return (
    <section className="trainTimetableDetails">
      <table>
        <thead>
          <tr>
            <th>Station</th>
            <th>Platform</th>
            <th>Arrival</th>
            <th>Distance</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th>Departure</th>
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
                    <td>{platform}</td>
                    <td>
                      {dstArrive.substring(0, 5) === "null"
                        ? "Source"
                        : dstArrive.substring(0, 5)}
                    </td>
                    <td>{distance} km</td>
                  </tr>
                  <tr key={_id}>
                    <td>({dstCode})</td>
                    <td></td>
                    <td>
                      {orgDepart.substring(0, 5) === "null"
                        ? "Destination"
                        : orgDepart.substring(0, 5)}
                    </td>
                    <td></td>
                  </tr>
                </>
              )
            )}
        </tbody>
      </table>
    </section>
  );
};

export default TrainTimetableDetails;
