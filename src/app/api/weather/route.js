import {  NextResponse } from "next/server";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
   const address = searchParams.get("address");
  const latitude = searchParams.get("lat");

  const longitude = searchParams.get("lon");
  let url = "";
  const API_KEY = "c98a2bead76804db575ecb472e56f1aa"; 

  if (address) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${API_KEY}&units=metric`;
  } else if (latitude !== null && longitude !== null) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  } else {
    return NextResponse.json({ error: "No location provided" }, { status: 400 });
  }
  
  
  
  console.log(url);
  const res = await fetch(url);

  const data = await res.json();
  return NextResponse.json({ data });
}
