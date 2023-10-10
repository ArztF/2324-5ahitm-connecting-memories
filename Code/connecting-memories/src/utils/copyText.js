import Clipboard from "clipboard";

export function copyTextToClipboard(text) {
    const clipboard = new Clipboard(".copy-button", {
      text: () => text,
    });

    clipboard.on("success", () => {
      console.log("Text erfolgreich kopiert: " + text);
      clipboard.destroy();
      this.presentToast("Text erfolgreich kopiert");
    });

    clipboard.on("error", (e) => {
      console.error("Fehler beim Kopieren des Textes: " + e);
      clipboard.destroy();
    });

    clipboard.onClick({
      currentTarget: document.querySelector(".copy-button"),
    });
  }