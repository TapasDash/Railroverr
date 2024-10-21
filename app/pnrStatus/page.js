"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "@/styles/pnrStatus.scss";
import { useRouter } from "next/navigation";
import { getPNRStatus } from "@/features/pnrStatus/pnrStatusSlice";

const PnrStatus = () => {
  const [pnrNumber, setPnrNumber] = useState("");
  // register authSlice
  const router = useRouter();
  const dispatch = useDispatch();

  const submitPnr = (e) => {
    e.preventDefault();
    console.log({ pnrNumber });
    dispatch(getPNRStatus(pnrNumber));
    router.push("/pnrDetails");
  };

  // useEffect(() => {
  //   if (isError) console.error(message);

  //   // if (isSuccess || pnrStatusData) {
  //   //   navigate("/pnr-details");
  //   // }
  //   // return () => {
  //   //   dispatch(reset());
  //   // };
  // }, [isError, message, dispatch, navigate]); //isError, message, dispatch, navigate

  return (
    <section className="pnrStatusContainer">
      <form>
        <h4>Enter Your PNR Number:</h4>
        <input
          type="number"
          placeholder="Enter Your PNR Number"
          name="pnr"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => setPnrNumber(e.target.value)}
        />
        <button type="submit" onClick={(e) => submitPnr(e)}>
          Get PNR Status
        </button>
      </form>
    </section>
  );
};

export default PnrStatus;
