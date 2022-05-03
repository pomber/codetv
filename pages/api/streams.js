import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { data, error } = await fetchStreams();
  res.status(200).json({ data, error });
}

export async function fetchStreams() {
  const { data, error } = await supabase.from("live").select();
  return { data, error };
}
