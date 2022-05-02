import Head from "next/head";

export default function Home() {
  return (
    <div class="flex h-screen bg-green-300">
      <div class="flex-1 flex flex-col overflow-hidden">
        <Head>
          <title>CodeTV</title>
          <meta
            name="description"
            content="Something something streaming code"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header class="flex justify-between items-center bg-blue-300 p-4">
          <h1 class="flex">CodeTV</h1>
          <div class="flex">
            <a href="https://github.com/pomber/codetv">GitHub</a>
          </div>
        </header>

        <div class="flex h-full">
          <nav class="flex w-72 h-full bg-pink-500">
            <div class="w-full flex mx-auto px-6 py-8">
              <div class="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed">
                Sidebar
              </div>
            </div>
          </nav>
          <main class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto">
            <div class="flex w-full mx-auto ">
              <div
                class="flex flex-col w-full h-full text-gray-900 text-xl border-4 border-gray-900 border-dashed"
                style={{ minHeight: 400 }}
              >
                iframe
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
