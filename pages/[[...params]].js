import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const channels = [
  {
    streamer: "pomber",
    url: "https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173",
    title: "Building CodeTV",
    topic: "Web Development",
  },
  {
    streamer: "lorem",
    url: "https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173",
    title: "Lorem ipsum",
    topic: "Game Development",
  },
  {
    streamer: "ipsum",
    url: "https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173",
    title: "Lorem ipsum",
    topic: "Rust",
  },
  {
    streamer: "dolor",
    url: "https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173",
    title: "Lorem ipsum",
    topic: "Web Development",
  },
];

export default function Home() {
  const router = useRouter();
  const { params = ["pomber"] } = router.query;
  const streamer = params[0];
  const channel = channels.find((c) => c.streamer === streamer);
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Head>
          <title>CodeTV</title>
          <meta
            name="description"
            content="Something something streaming code"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="flex justify-between items-center p-4 shadow-lg">
          <h1 className="flex">CodeTV</h1>
          <div className="flex">
            <a href="https://github.com/pomber/codetv">GitHub</a>
          </div>
        </header>

        <div className="flex h-full">
          <Sidebar />
          <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto">
            <iframe
              src="https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173"
              className="w-full flex-1"
            />
            <div className="p-4 flex gap-4 items-center">
              <img
                className="rounded-full bg-gray-400 w-16 h-16"
                src={`https://github.com/${streamer}.png`}
              />
              <div>
                <h2 className="font-semibold text-lg">{streamer}</h2>
                <p className="font-semibold">{channel.title}</p>
                <p className="text-sm">{channel.topic}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <nav className="w-72 h-full bg-gray-100 hidden md:flex">
      <div className="pt-1 w-full h-full mx-auto flex flex-col text-gray-900 text-xl">
        {channels.map((channel) => (
          <div className="text-gray-900 text-xl w-full" key={channel.streamer}>
            <Link href={`/${channel.streamer}`}>
              <a className="py-1 px-2 hover:bg-gray-200 flex gap-2 items-center">
                <img
                  className="rounded-full bg-gray-400 w-8 h-8"
                  src={`https://github.com/${channel.streamer}.png`}
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-base">{channel.streamer}</p>
                  <p className="text-sm text-gray-500">{channel.topic}</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
