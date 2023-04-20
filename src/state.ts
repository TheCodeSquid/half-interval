import {writable} from "svelte/store";

export type Background = "default" | "red" | "blue";

export const background = writable<Background>("default");

const random = (): Background =>
  Math.random() >= 0.5 ? "red" : "blue"

export const toggleBg = (bg: Background): Background => {
  switch (bg) {
    case "default":
      return random();
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
