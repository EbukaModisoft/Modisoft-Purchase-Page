export type NoticeTone = "info" | "success" | "warning" | "danger";

export type Notice = {
  id: string;
  tone: NoticeTone;
  title: string;
  message?: string;
};
