import { NextResponse } from "next/server";
import TrainDetails from "@/models/TrainDetails";

export async function GET(request) {
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
  return NextResponse.json({
    success: true,
    data: trainData,
  });
}
