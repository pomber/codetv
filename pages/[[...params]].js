import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const channels = [
  {
    streamer: "pomber",
    url: "https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173",
    title: "Building CodeTV",
  },
  {
    streamer: "lorem",
    url: "https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173",
    title: "Lorem ipsum",
  },
  {
    streamer: "ipsum",
    url: "https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173",
    title: "Lorem ipsum",
  },
  {
    streamer: "dolor",
    url: "https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173",
    title: "Lorem ipsum",
  },
];

export default function Home() {
  const router = useRouter();
  const { params = ["pomber"] } = router.query;
  const streamer = params[0];
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
          <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto">
            <div className="flex w-full mx-auto ">
              <div
                className="flex flex-col w-full h-full text-gray-900 text-xl border-gray-900 "
                style={{ minHeight: "70vh" }}
              >
                <iframe
                  src="https://vscode.dev/liveshare/AF5DF568C175EB8573211A329A9C343B5173"
                  className="h-full w-full"
                />
                <h2>{streamer}</h2>
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
    <nav className="flex w-72 h-full bg-gray-100">
      <div className="pt-1 w-full h-full mx-auto flex flex-col text-gray-900 text-xl">
        {channels.map((channel) => (
          <div className="text-gray-900 text-xl w-full" key={channel.streamer}>
            <Link href={`/${channel.streamer}`}>
              <a className="py-1 px-2 hover:bg-gray-200 flex gap-2">
                <div className="rounded-full bg-gray-400 w-8 h-8"></div>
                <div>{channel.streamer}</div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
