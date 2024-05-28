"use client";

import { clsx } from "clsx/lite";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SiteGrid from "../components/SiteGrid";
import ViewSwitcher, { SwitcherSelection } from "@/site/ViewSwitcher";
import {
  PATH_ROOT,
  isPathAdmin,
  isPathGrid,
  isPathProtected,
  isPathSignIn,
} from "@/site/paths";
import AnimateItems from "../components/AnimateItems";
import { useAppState } from "@/state/AppState";

export default function Nav({
  siteDomainOrTitle,
}: {
  siteDomainOrTitle: string;
}) {
  const pathname = usePathname();

  const { isUserSignedIn } = useAppState();

  const showNav = !isPathSignIn(pathname);

  const renderLink = (text: string, linkOrAction: string | (() => void)) =>
    typeof linkOrAction === "string" ? (
      <Link href={linkOrAction}>{text}</Link>
    ) : (
      <button onClick={linkOrAction}>{text}</button>
    );

  const switcherSelectionForPath = (): SwitcherSelection | undefined => {
    if (pathname === PATH_ROOT) {
      return "full-frame";
    } else if (isPathGrid(pathname)) {
      return "grid";
    } else if (isPathProtected(pathname)) {
      return "admin";
    }
  };

  return (
    <>
      <SiteGrid
        contentMain={
          <AnimateItems
            animateOnFirstLoadOnly
            type={!isPathAdmin(pathname) ? "bottom" : "none"}
            distanceOffset={10}
            items={
              showNav
                ? [
                    <div
                      key="nav"
                      className={clsx(
                        "flex items-center",
                        "w-full min-h-[4rem]"
                      )}
                    >
                      <ViewSwitcher
                        currentSelection={switcherSelectionForPath()}
                        showAdmin={isUserSignedIn}
                      />
                      <div
                        className={clsx(
                          "flex-grow justify-end text-ellipsis overflow-hidden",
                          "flex"
                        )}
                      >
                        <svg
                          height="18.5px"
                          aria-label="Vercel Ship 2024"
                          fill="none"
                          viewBox="0 0 124 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.4555 1.09L7.65551 12.934L11.8135 1.09H14.6695L9.2935 16H5.9965L0.599505 1.09H3.4555ZM13.9803 10.435C13.9803 9.273 14.2113 8.251 14.6733 7.369C15.1353 6.487 15.7793 5.808 16.6053 5.332C17.4313 4.856 18.3973 4.618 19.5033 4.618C20.4833 4.618 21.3653 4.842 22.1493 5.29C22.9333 5.738 23.5563 6.403 24.0183 7.285C24.4803 8.167 24.7183 9.245 24.7323 10.519V11.17H16.8153C16.8713 12.094 17.1303 12.822 17.5923 13.354C18.0683 13.872 18.7053 14.131 19.5033 14.131C20.0073 14.131 20.4693 13.991 20.8893 13.711C21.3093 13.431 21.6243 13.053 21.8343 12.577L24.5853 12.766C24.2493 13.83 23.6193 14.677 22.6953 15.307C21.7853 15.937 20.7213 16.252 19.5033 16.252C18.3973 16.252 17.4313 16.014 16.6053 15.538C15.7793 15.062 15.1353 14.383 14.6733 13.501C14.2113 12.619 13.9803 11.597 13.9803 10.435ZM21.9603 9.385C21.8623 8.475 21.5893 7.81 21.1413 7.39C20.6933 6.956 20.1473 6.739 19.5033 6.739C18.7613 6.739 18.1593 6.97 17.6973 7.432C17.2353 7.894 16.9483 8.545 16.8363 9.385H21.9603ZM28.5945 4.87L28.6995 8.02L28.4895 7.915C28.6435 6.879 28.9445 6.116 29.3925 5.626C29.8545 5.122 30.5055 4.87 31.3455 4.87H32.3745V6.949H31.3245C30.7365 6.949 30.2535 7.054 29.8755 7.264C29.4975 7.46 29.2175 7.761 29.0355 8.167C28.8535 8.559 28.7625 9.056 28.7625 9.658V16H26.0745V4.87H28.5945ZM40.4585 8.965C40.3465 8.293 40.0665 7.768 39.6185 7.39C39.1845 6.998 38.6665 6.802 38.0645 6.802C37.1965 6.802 36.5245 7.117 36.0485 7.747C35.5725 8.377 35.3345 9.273 35.3345 10.435C35.3345 11.597 35.5725 12.493 36.0485 13.123C36.5245 13.753 37.1965 14.068 38.0645 14.068C38.6945 14.068 39.2335 13.872 39.6815 13.48C40.1295 13.074 40.4025 12.5 40.5005 11.758L43.2935 11.884C43.1955 12.766 42.9085 13.536 42.4325 14.194C41.9565 14.852 41.3405 15.363 40.5845 15.727C39.8285 16.077 38.9885 16.252 38.0645 16.252C36.9585 16.252 35.9925 16.014 35.1665 15.538C34.3405 15.062 33.6965 14.383 33.2345 13.501C32.7725 12.619 32.5415 11.597 32.5415 10.435C32.5415 9.273 32.7725 8.251 33.2345 7.369C33.6965 6.487 34.3405 5.808 35.1665 5.332C35.9925 4.856 36.9585 4.618 38.0645 4.618C38.9605 4.618 39.7795 4.793 40.5215 5.143C41.2775 5.479 41.8935 5.962 42.3695 6.592C42.8455 7.222 43.1325 7.964 43.2305 8.818L40.4585 8.965ZM43.9857 10.435C43.9857 9.273 44.2167 8.251 44.6787 7.369C45.1407 6.487 45.7847 5.808 46.6107 5.332C47.4367 4.856 48.4027 4.618 49.5087 4.618C50.4887 4.618 51.3707 4.842 52.1547 5.29C52.9387 5.738 53.5617 6.403 54.0237 7.285C54.4857 8.167 54.7237 9.245 54.7377 10.519V11.17H46.8207C46.8767 12.094 47.1357 12.822 47.5977 13.354C48.0737 13.872 48.7107 14.131 49.5087 14.131C50.0127 14.131 50.4747 13.991 50.8947 13.711C51.3147 13.431 51.6297 13.053 51.8397 12.577L54.5907 12.766C54.2547 13.83 53.6247 14.677 52.7007 15.307C51.7907 15.937 50.7267 16.252 49.5087 16.252C48.4027 16.252 47.4367 16.014 46.6107 15.538C45.7847 15.062 45.1407 14.383 44.6787 13.501C44.2167 12.619 43.9857 11.597 43.9857 10.435ZM51.9657 9.385C51.8677 8.475 51.5947 7.81 51.1467 7.39C50.6987 6.956 50.1527 6.739 49.5087 6.739C48.7667 6.739 48.1647 6.97 47.7027 7.432C47.2407 7.894 46.9537 8.545 46.8417 9.385H51.9657ZM58.8138 1.09V16H56.1258V1.09H58.8138ZM67.6635 10.981C67.7615 11.625 67.9645 12.164 68.2725 12.598C68.5805 13.018 68.9865 13.34 69.4905 13.564C69.9945 13.774 70.5825 13.879 71.2545 13.879C71.7865 13.879 72.2485 13.809 72.6405 13.669C73.0465 13.529 73.3545 13.326 73.5645 13.06C73.7885 12.78 73.9005 12.437 73.9005 12.031C73.8865 11.457 73.5855 10.96 72.9975 10.54C72.4235 10.12 71.5205 9.756 70.2885 9.448C68.5805 9.042 67.3065 8.482 66.4665 7.768C65.6265 7.04 65.2065 6.137 65.2065 5.059C65.2065 4.191 65.4305 3.435 65.8785 2.791C66.3265 2.133 66.9565 1.629 67.7685 1.279C68.5805 0.929 69.5185 0.754 70.5825 0.754C71.6605 0.754 72.6195 0.964 73.4595 1.384C74.3135 1.804 74.9925 2.385 75.4965 3.127C76.0005 3.869 76.3085 4.73 76.4205 5.71L73.6695 5.836C73.6135 5.29 73.4455 4.814 73.1655 4.408C72.8855 3.988 72.5215 3.666 72.0735 3.442C71.6255 3.218 71.1145 3.106 70.5405 3.106C69.7705 3.106 69.1475 3.288 68.6715 3.652C68.2095 4.016 67.9855 4.499 67.9995 5.101C68.0135 5.521 68.1605 5.878 68.4405 6.172C68.7345 6.452 69.0985 6.676 69.5325 6.844C69.9665 7.012 70.5195 7.18 71.1915 7.348C71.2475 7.362 71.3315 7.383 71.4435 7.411C73.1795 7.831 74.4885 8.412 75.3705 9.154C76.2525 9.896 76.6935 10.806 76.6935 11.884C76.6935 12.794 76.4415 13.578 75.9375 14.236C75.4475 14.894 74.7825 15.398 73.9425 15.748C73.1025 16.084 72.1645 16.252 71.1285 16.252C69.9665 16.252 68.9305 16.042 68.0205 15.622C67.1105 15.202 66.3825 14.607 65.8365 13.837C65.2905 13.067 64.9755 12.171 64.8915 11.149L67.6635 10.981ZM80.6727 1.09V7.411L80.2947 7.495C80.4767 6.501 80.8897 5.773 81.5337 5.311C82.1917 4.849 82.9827 4.618 83.9067 4.618C85.0547 4.618 85.9647 5.003 86.6367 5.773C87.3227 6.543 87.6657 7.565 87.6657 8.839V16H84.9777V9.805C84.9777 8.811 84.8237 8.076 84.5157 7.6C84.2077 7.124 83.7107 6.886 83.0247 6.886C82.2827 6.886 81.7017 7.138 81.2817 7.642C80.8757 8.146 80.6727 8.867 80.6727 9.805V16H77.9847V1.09H80.6727ZM92.445 4.87V16H89.757V4.87H92.445ZM92.508 1.111V3.4H89.715V1.111H92.508ZM94.2695 4.87H96.8315L96.9155 7.222L96.6845 6.991C96.9645 6.221 97.4055 5.633 98.0075 5.227C98.6235 4.821 99.3655 4.618 100.234 4.618C101.27 4.618 102.145 4.877 102.859 5.395C103.587 5.899 104.126 6.592 104.476 7.474C104.84 8.356 105.022 9.343 105.022 10.435C105.022 11.527 104.84 12.514 104.476 13.396C104.126 14.278 103.587 14.978 102.859 15.496C102.145 16 101.27 16.252 100.234 16.252C99.6735 16.252 99.1555 16.161 98.6795 15.979C98.2175 15.797 97.8185 15.524 97.4825 15.16C97.1465 14.796 96.8875 14.362 96.7055 13.858L96.9575 13.648V19.15H94.2695V4.87ZM96.7685 10.435C96.7685 11.093 96.8665 11.702 97.0625 12.262C97.2725 12.822 97.5805 13.27 97.9865 13.606C98.3925 13.928 98.8965 14.089 99.4985 14.089C100.395 14.089 101.067 13.746 101.515 13.06C101.977 12.36 102.208 11.485 102.208 10.435C102.208 9.399 101.977 8.531 101.515 7.831C101.053 7.131 100.381 6.781 99.4985 6.781C98.8965 6.781 98.3925 6.949 97.9865 7.285C97.5805 7.621 97.2725 8.069 97.0625 8.629C96.8665 9.175 96.7685 9.777 96.7685 10.435Z"
                            fill="currentColor"
                          ></path>
                          <rect
                            fill="currentColor"
                            fillOpacity="0.08"
                            height="14.25"
                            rx="2.4375"
                            width="14.25"
                            x="109.188"
                            y="1.375"
                          ></rect>
                          <rect
                            height="14.25"
                            rx="2.4375"
                            stroke="url(#paint0_linear_3358_1727)"
                            strokeWidth="0.75"
                            width="14.25"
                            x="109.188"
                            y="1.375"
                          ></rect>
                          <path
                            d="M111.849 7.51732C111.888 7.13398 112.005 6.79232 112.199 6.49232C112.394 6.19232 112.652 5.95898 112.974 5.79232C113.302 5.62009 113.674 5.53398 114.091 5.53398C114.48 5.53398 114.83 5.61176 115.141 5.76732C115.452 5.91732 115.694 6.12565 115.866 6.39232C116.044 6.65898 116.132 6.95898 116.132 7.29232C116.132 7.57565 116.066 7.83121 115.932 8.05898C115.799 8.28676 115.621 8.49232 115.399 8.67565C115.182 8.85343 114.913 9.03954 114.591 9.23398C114.407 9.33398 114.207 9.46176 113.991 9.61732C113.774 9.76732 113.574 9.93676 113.391 10.1257C113.213 10.309 113.119 10.4812 113.107 10.6423H116.166V11.584H111.791C111.791 11.034 111.888 10.5673 112.082 10.184C112.277 9.80065 112.513 9.49232 112.791 9.25898C113.069 9.0201 113.471 8.74232 113.999 8.42565C114.338 8.2201 114.591 8.02843 114.757 7.85065C114.93 7.66732 115.016 7.47843 115.016 7.28398C115.016 7.12843 114.977 6.98954 114.899 6.86732C114.821 6.74509 114.71 6.65065 114.566 6.58398C114.427 6.51176 114.269 6.47565 114.091 6.47565C113.791 6.47565 113.544 6.57287 113.349 6.76732C113.155 6.95621 113.027 7.22843 112.966 7.58398L111.849 7.51732ZM120.284 9.51732H120.934V10.4673H120.284V11.584H119.192V10.4673H116.175V9.52565L119.009 5.66732H120.284V9.51732ZM119.192 9.51732V7.10065L117.4 9.51732H119.192Z"
                            fill="url(#paint1_linear_3358_1727)"
                          ></path>
                          <defs>
                            <linearGradient
                              gradientUnits="userSpaceOnUse"
                              id="paint0_linear_3358_1727"
                              x1="116.312"
                              x2="116.312"
                              y1="1"
                              y2="16"
                            >
                              <stop
                                stopColor="currentColor"
                                stopOpacity="0.8"
                              ></stop>
                              <stop offset="1" stopColor="currentColor"></stop>
                            </linearGradient>
                            <linearGradient
                              gradientUnits="userSpaceOnUse"
                              id="paint1_linear_3358_1727"
                              x1="116.312"
                              x2="116.312"
                              y1="5.58398"
                              y2="11.4173"
                            >
                              <stop
                                stopColor="currentColor"
                                stopOpacity="0.8"
                              ></stop>
                              <stop offset="1" stopColor="currentColor"></stop>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>,
                  ]
                : []
            }
          />
        }
      />
    </>
  );
}
