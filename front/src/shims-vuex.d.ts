import store from "@/store"; // path to store file
import { ComponentCustomProperties } from "vue";
import { IPopups } from "@/popups";
import Infrastructure from "@/infrastructure";
import { IToaster } from "@/toaster";
import leftPanel from "./left-panel";
import loader from "@/loader";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: typeof store;
    $popups: IPopups;
    $infra: typeof Infrastructure;
    $toaster: IToaster;
    $leftPanel: typeof leftPanel;
    $loader: typeof loader;
  }
}
