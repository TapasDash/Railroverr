import connectDB from "@/libs/connectDB";
import Scraper from "@/utils/Scraper";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectDB();
  console.log({ request });
  const { pnrNo } = params;
  console.log({ pnrNo });
  // const { trainNo } = req.query;
  let URL_Train = `https://www.confirmtkt.com/pnr-status/${pnrNo}`;

  try {
    const response = await fetch(URL_Train);
    const data = await response.text();
    console.log({ response });
    console.log({ data });
    let json = Scraper.getPnrStatus(data);
    console.log({ json });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message });
  }
}
