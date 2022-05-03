const { default: axios } = require("axios");
const vscode = require("vscode");
const vsls = require("vsls");

// const ENDPOINT = "http://localhost:3000/api/";
const ENDPOINT = "https://codetv.vercel.app/api/";

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("codetv.start", async function () {
      const liveshare = await vsls.getApi("pomber.codetv");

      if (!liveshare) {
        vscode.window.showWarningMessage(
          "CodeTV Error. Do you have the LiveShare extension installed?"
        );
        return;
      }

      const uriPromise = liveshare.share({
        access: 1, // read only
        suppressNotification: true,
        // isPresentation: true,
      });

      const title = await vscode.window.showInputBox({
        prompt: "Enter a title for the stream",
        value: "I'm streaming!",
      });
      const topic = await vscode.window.showInputBox({
        prompt: "Enter a topic for the stream",
        value: "Web Development",
      });

      const uri = await uriPromise;

      const sessionId = liveshare.session.id;

      const authSession = await vscode.authentication.getSession("github", [], {
        createIfNone: true,
      });

      const accessToken = authSession?.accessToken;
      const streamer = authSession?.account?.label;

      const stream = {
        title,
        topic,
        session_id: sessionId,
        streamer,
      };

      await axios.post(ENDPOINT + "start", JSON.stringify(stream), {
        headers: { "Content-Type": "application/json" },
      });

      // Display a message box to the user
      // vscode.window.showInformationMessage(
      //   "https://vscode.dev/liveshare/" + sessionId
      // );

      liveshare.onDidChangePeers(async () => {
        let viewers = liveshare.peers.length;
        await axios.post(
          ENDPOINT + "viewers",
          JSON.stringify({ streamer, viewers }),
          { headers: { "Content-Type": "application/json" } }
        );
      });

      liveshare.onDidChangeSession(async (sessionChange) => {
        if (!liveshare.session.id) {
          await axios.post(ENDPOINT + "end", JSON.stringify({ streamer }), {
            headers: { "Content-Type": "application/json" },
          });
        }
      });
    })
  );

  vscode.commands.registerCommand("codetv.stop", async function () {
    const liveshare = await vsls.getApi("pomber.codetv");
    if (!liveshare) {
      vscode.window.showWarningMessage(
        "CodeTV Error. Do you have the LiveShare extension installed?"
      );
      return;
    }
    await liveshare.end();
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
