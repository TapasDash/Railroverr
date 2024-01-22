import redisClient from "@/libs/redisClient";
import { NextResponse } from "next/server";
import redisKeys from "@/libs/redisKeys";
import TrainDetails from "@/models/TrainDetails";

export async function GET(request) {
  const cachedTrainInfo = await redisClient.get(redisKeys.TRAIN_INFO);
  if (cachedTrainInfo) {
    console.log("using cached data");
    return NextResponse.json({
      cached: true,
      success: true,
      data: JSON.parse(cachedTrainInfo),
    });
  }

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

  await redisClient.set(redisKey.TRAIN_INFO, JSON.stringify(trainData));

  return NextResponse.json({
    success: true,
    data: trainData,
  });
}
