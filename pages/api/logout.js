//import api_url
import { API_URL } from "@/config/index";
import cookie from "cookie";
//export async function that passes in req and res
//check if req.method === post
export default async function (req, res) {
  if (req.method === "POST") {
    //Destroy cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0), // 1 week
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "Logged out" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method}not allowed` });
  }
}
