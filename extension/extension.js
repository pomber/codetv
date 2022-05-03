const vscode = require("vscode");
const vsls = require("vsls");

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

      liveshare.onDidChangePeers(async () => {
        let viewers = liveshare.peers.length;

        vscode.window.showInformationMessage(
          `${viewers} viewer${viewers === 1 ? "" : "s"} watching`
        );
      });

      liveshare.onDidChangeSession(async (sessionChange) => {
        if (!liveshare.session.id) {
          vscode.window.showInformationMessage(
            `stream ends ${JSON.stringify(liveshare.session)}`
          );
        }
      });

      const authSession = await vscode.authentication.getSession("github", [], {
        createIfNone: true,
      });

      const accessToken = authSession?.accessToken;
      const streamer = authSession?.account?.label;

      const stream = {
        title,
        topic,
        sessionId,
        streamer,
      };

      // Display a message box to the user
      vscode.window.showInformationMessage(
        "https://vscode.dev/liveshare/" + sessionId
      );
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
