import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
  }

  const { title, topic, session_id, streamer } = req.body;

  console.log(req.body);

  const { data, error } = await supabase
    .from("live")
    .upsert({ title, topic, session_id, streamer, viewers: 0 });

  console.log({ data, error });

  res.status(200).json(data);
}
