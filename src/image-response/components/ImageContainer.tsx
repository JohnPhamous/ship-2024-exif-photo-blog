import { ReactNode } from "react";

export default function ImageContainer({
  width,
  height,
  background = "black",
  children,
}: {
  width: number;
  height: number;
  background?: "transparent" | "black";
  children: ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
        width,
        height,
      }}
    >
      {children}
    </div>
  );
}
