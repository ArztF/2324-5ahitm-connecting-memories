import { toastController } from "@ionic/vue";

export async function presentToast(text) {
    const toast = await toastController.create({
      message: text,
      duration: 3000,
      cssClass: "custom-toast",
    });

    await toast.present();
}