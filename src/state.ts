import {writable} from "svelte/store";

export type Background = "default" | "red" | "blue";

export const background = writable<Background>("default");

export const toggleBg = (bg: Background): Background => {
  switch (bg) {
    case "default":
      return "red";
    case "red":
      return "blue";
    case "blue":
      return "red";
  }
};

export const bgVar = (bg: Background): string => {
  switch (bg) {
    case "default":
      return "--bg-default";
    case "red":
      return "--bg-red";
    case "blue":
      return "--bg-blue";
  }
};
