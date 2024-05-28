import { getPhotosCached } from "@/photo/cache";
import {
  IMAGE_OG_DIMENSION_SMALL,
  MAX_PHOTOS_TO_SHOW_OG,
} from "@/image-response";
import HomeImageResponse from "@/image-response/HomeImageResponse";
import { getIBMPlexMonoMedium } from "@/site/font";
import { ImageResponse } from "next/og";
import { getImageResponseCacheControlHeaders } from "@/image-response/cache";
import { isNextImageReadyBasedOnPhotos, Photo } from "@/photo";

export const dynamic = "force-static";

export async function GET() {
  const [headers, { fontFamily, fonts }] = await Promise.all([
    getImageResponseCacheControlHeaders(),
    getIBMPlexMonoMedium(),
  ]);

  // 12 images for the grid
  const images = [
    "Cn7St5gMsf47hIRd",
    "wJ74tNzMTyfIfloI",
    "gM9ERTAPLqp6zV4H",
    "63SMJltT5z5BVDCA",
    "jpnv0salRyFJpm1p",
    "J3F5R7jngKHCYPVM",
    "5uZjytncjTY8L2DP",
    "blgsETPrlqmYyXTN",
    "msbtaUqHzFowsivg",
    "sFWodKwS6awGvVxj",
    "5NVfMUpJ9WKdTTAQ",
    "Lq6wH0O2YyTHCx8v",
  ];
  const photos: Photo[] = images.map(
    (image, i) =>
      ({
        id: "J5k4C3OS",
        url: `https://m7me9pcthwvevhis.public.blob.vercel-storage.com/photo-${image}.jpg`,
        extension: "jpg",
        aspectRatio: 1.499414,
        blurData: "",
        title: "toolbar-3648",
        caption: null,
        semanticDescription: null,
        tags: [],
        make: "Canon",
        model: "Canon EOS R5",
        focalLength: 35,
        focalLengthIn35MmFormat: null,
        fNumber: 2.8,
        iso: 3200,
        exposureTime: 0.001,
        exposureCompensation: 0,
        locationName: null,
        latitude: null,
        longitude: null,
        filmSimulation: null,
        priorityOrder: null,
        hidden: false,
        focalLengthFormatted: "35mm",
        focalLengthIn35MmFormatFormatted: undefined,
        fNumberFormatted: "ƒ/2.8",
        isoFormatted: "ISO 3,200",
        exposureTimeFormatted: "1/1000s",
        exposureCompensationFormatted: undefined,
        takenAtNaiveFormatted: "23 May 2024 11:58AM",
      } as unknown as Photo)
  );

  const { width, height } = IMAGE_OG_DIMENSION_SMALL;

  // Make sure next/image can be reached from absolute urls,
  // which may not exist on first pre-render
  const isNextImageReady = await isNextImageReadyBasedOnPhotos(photos);

  return new ImageResponse(
    (
      <HomeImageResponse
        {...{
          photos: isNextImageReady ? photos : [],
          width,
          height,
          fontFamily,
        }}
      />
    ),
    { width, height, headers, fonts }
  );
}
