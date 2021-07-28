//import api_url
import { API_URL } from "@/config/index";
import cookie from "cookie";
//export async function that passes in req and res
//check if req.method === post
export default async function (req, res) {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "not authorized" });
    }
    console.log(req.headers.cookie);
    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    console.log(user);
    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "user forbidden" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method}not allowed` });
  }
}
