import "@/styles/runningDays.scss";

const RunningDays = ({ runningDays }) => {
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div>
      <ul>
        {daysOfWeek.map((day, index) => (
          <li
            key={index}
            id={runningDays[index] === "1" ? "highlighted" : "blurred"}
          >
            {" "}
            {day}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RunningDays;
