import ResponsiveDate from "@/components/ResponsiveDate";
import { Photo } from ".";
import { useMemo } from "react";
import { add } from "date-fns";

export default function PhotoDate({
  photo: { takenAtNaive, takenAt, make },
  className,
}: {
  photo: Photo;
  className?: string;
}) {
  const date = useMemo(() => {
    if (make === "FUJIFILM") {
      const date = new Date(takenAt);
      return isNaN(date.getTime()) ? new Date() : date;
    }

    const date = new Date(takenAt);
    return isNaN(date.getTime()) ? new Date() : add(date, { hours: 18 });
  }, [make, takenAt]);
  return <ResponsiveDate {...{ date, className }} />;
}
