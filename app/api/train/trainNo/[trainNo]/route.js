import connectDB from "@/libs/connectDB";
import UserAgent from "user-agents";
import TrainTimetable from "@/models/TrainTimetable";
import Scraper from "@/utils/Scraper";
import { saveTrainData, saveTrainInfo } from "@/utils/saveTrain";
import { NextResponse } from "next/server";
import TrainInfo from "@/models/TrainInfo";

export async function GET(request, { params }) {
  await connectDB();
  const { trainNo } = params;
  const trainData = await TrainInfo.findOne({ trainNo });
  if (trainData) return NextResponse.json(trainData);

  try {
    let response;
    const userAgent = new UserAgent();

    let URL_Train_1 = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
    response = await fetch(URL_Train_1, {
      method: "GET",
      headers: { "User-Agent": userAgent.toString() },
    });
    let data = await response.text();
    let json = Scraper.getTrainInfo(data);

    await saveTrainInfo(json, schedules);

    // await saveTrainInfo(json);
    if (!json["success"]) return NextResponse.json({ ...json, schedules });
    URL_Train = `https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1=${json["data"]["trainId"]}&Data2=0&Cache=true`;
    response = await fetch(URL_Train);
    data = await response.text();

    json = Scraper.getTrainRoute(data);
    console.log("json text", json);

    // response = await fetch(URL_Train, {
    //   method: "GET",
    //   headers: { "User-Agent": userAgent.toString() },
    // });

    // console.log({ response });
    // const { schedules } = await response.json();
    // console.log({ schedules });
    await saveTrainInfo(json, schedules);

    // console.log({ json });
    // await saveTrainInfo(json);
    return NextResponse.json({ ...json, schedules });
  } catch (err) {
    console.log(err.message);
  }
}
