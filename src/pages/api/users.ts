const bcrypt = require("bcryptjs");
import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.send("api is running...");
  }
  // login auth
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const user = await db
        .collection("users")
        .find({ username: req.body.username })
        .toArray();

      if (user) {
        const passw = await bcrypt.compare(req.body.password, user[0].password);
        if (passw) {
          console.log(user[0].username);
          res.status(200).json({ login: "Ok", user: user[0].username });
        } else {
          res.status(400).json({ login: "Fail" });
        }
      }
    } catch (error) {
      res.status(400).json({ error: "User not found" });
    }
  }
};
