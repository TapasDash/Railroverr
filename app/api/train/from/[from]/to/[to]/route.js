import connectDB from "@/libs/connectDB";
import UserAgent from "user-agents";
import Scraper from "@/utils/Scraper";
import { saveTrainData, saveTrainSearchData } from "@/utils/saveTrain";
import { NextResponse } from "next/server";
import TrainSearch from "@/models/TrainSearch";

export async function GET(request, { params }) {
  const { from, to } = params;
  console.log({ from, to });
  await connectDB();
  const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}
      &Station_To=${to}
      &DataSource=0&Language=0&Cache=true`;
  try {
    const userAgent = new UserAgent();
    const response = await fetch(URL_Trains, {
      method: "GET",
      headers: { "User-Agent": userAgent.toString() },
    });
    const data = await response.text();
    let json = Scraper.getTrainsBetweenStations(data);
    console.log({ json });
    //this will be removed after I have enough data in the database
    if (json.success) {
      await Promise.all(
        json.trains.map(async (trainObj) => await saveTrainData(trainObj))
      );

      const trainSearchData = await TrainSearch.findOne({ from, to }).lean();
      console.log({ trainSearchData });
      if (!trainSearchData)
        await saveTrainSearchData({ from, to, data: json.trains });
      else json = { success: true, ...trainSearchData };

      return NextResponse.json(json);
    }
    return NextResponse.json(json);
  } catch (error) {
    console.log(error);
  }
}
