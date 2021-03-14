import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";
const bcrypt = require("bcryptjs");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const { db } = await connectToDatabase();

      const existUser = await db
        .collection("users")
        .findOne({ username: req.body.username });

      if (existUser) {
        res.json({ error: "user alredy exists" });
      } else {
        const data = await db.collection("users").insertOne({
          username: req.body.username,
          password: hashedPassword,
        });

        res.json({ success: "user created", user: req.body.username });
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  }
};
