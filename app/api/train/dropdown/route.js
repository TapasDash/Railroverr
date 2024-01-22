import { NextResponse } from "next/server";
import TrainDetails from "@/models/TrainDetails";
import connectDB from "@/libs/connectDB";

export async function GET(request) {
  await connectDB();
  const trainData = await TrainDetails.aggregate()
    .group({
      _id: "$trainNo",
      trainName: {
        $addToSet: "$trainName",
      },
    })
    .project({
      trainName: { $arrayElemAt: ["$trainName", 0] },
    });
  console.log("is");
  return NextResponse.json({
    success: true,
    data: trainData,
  });
}
