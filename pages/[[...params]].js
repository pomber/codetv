import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetchStreams } from "./api/streams";

export async function getServerSideProps() {
  const streams = await fetchStreams();
  return {
    props: {
      initialStreams: streams,
    },
  };
}
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page({ initialStreams }) {
  const router = useRouter();

  const { data: streams } = useSWR("/api/streams", fetcher, {
    fallbackData: initialStreams,
    refreshInterval: 2000,
  });

  const { params = [] } = router.query;

  const stream = streams.find((c) => c.streamer === params[0]) || streams[0];
  const { streamer } = stream;
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Head>
          <title>{streamer ? `${streamer} - CodeTV` : "CodeTV"}</title>
          <meta
            name="description"
            content="Something something streaming code"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="flex justify-between items-center px-4 py-2 shadow-lg">
          <h1 className="flex text-lg">CodeTV</h1>
          <div className="flex">
            <a href="https://github.com/pomber/codetv">GitHub</a>
          </div>
        </header>

        <div className="flex h-full">
          <Sidebar streams={streams} current={streamer} />
          <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto">
            <iframe
              src={`https://vscode.dev/liveshare/${stream.session_id}`}
              className="w-full flex-1"
            />
            <div className="p-4 flex gap-4 items-center">
              <img
                className="rounded-full bg-gray-400 w-16 h-16"
                src={`https://github.com/${streamer}.png`}
              />
              <div>
                <h2 className="font-semibold text-lg">{streamer}</h2>
                <p className="font-semibold">{stream.title}</p>
                <p className="text-sm">{stream.topic}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ streams, current }) {
  return (
    <nav className="w-72 h-full bg-gray-100 hidden md:flex">
      <div className="pt-1 w-full h-full mx-auto flex flex-col text-gray-900 text-xl">
        <div className="text-base uppercase font-semibold py-1 px-2">
          Streams
        </div>
        {streams.map((stream) => (
          <SidebarItem
            key={stream.streamer}
            stream={stream}
            isCurrent={current === stream.streamer}
          />
        ))}
      </div>
    </nav>
  );
}

function SidebarItem({ stream, isCurrent }) {
  return (
    <div
      className={`text-gray-900 hover:bg-gray-200 text-xl w-full pr-2 ${
        isCurrent
          ? "border-l-[0.25rem] bg-gray-200 pl-1 border-gray-800"
          : "pl-2"
      }`}
      key={stream.streamer}
      title={stream.title}
    >
      <Link href={`/${stream.streamer}`}>
        <a className="py-1  flex gap-2 items-center">
          <img
            className="rounded-full w-8 h-8"
            src={`https://github.com/${stream.streamer}.png`}
          />
          <div className="flex flex-col mr-auto">
            <p className="font-semibold text-base">{stream.streamer}</p>
            <p className={`text-sm text-gray-500`}>{stream.topic}</p>
          </div>
          <div className="flex items-center self-start pt-1">
            <div className="rounded-full bg-red-600 w-2 h-2" />
            <div className={`w-8 text-xs pl-1 text-gray-600 tabular-nums`}>
              {stream.viewers}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
