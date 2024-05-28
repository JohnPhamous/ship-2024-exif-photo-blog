"use client";

import { clsx } from "clsx/lite";
import SiteGrid from "../components/SiteGrid";
import ThemeSwitcher from "@/site/ThemeSwitcher";
import Link from "next/link";
import { SHOW_REPO_LINK } from "@/site/config";
import RepoLink from "../components/RepoLink";
import { usePathname } from "next/navigation";
import { PATH_ADMIN_PHOTOS, isPathAdmin, isPathSignIn } from "./paths";
import SubmitButtonWithStatus from "@/components/SubmitButtonWithStatus";
import { signOutAndRedirectAction } from "@/auth/actions";
import Spinner from "@/components/Spinner";
import AnimateItems from "@/components/AnimateItems";
import { useAppState } from "@/state/AppState";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const pathname = usePathname();

  const { userEmail, setUserEmail } = useAppState();

  const showFooter = !isPathSignIn(pathname);

  const shouldAnimate = !isPathAdmin(pathname);

  const isBottom = useScrollToBottom();

  return (
    <div className="fixed bottom-0 left-0 right-0 grid items-end">
      <motion.div
        className="absolute w-full bg-white pointer-events-none dark:bg-black h-[600px]"
        style={{
          maskImage: `linear-gradient(to
				bottom, transparent 0%,
				rgba(0, 0, 0, 0.4) 50%,
				rgba(0, 0, 0, 0.8) 80%,
				rgba(0, 0, 0, 0.9) 90%)`,
          maskRepeat: "no-repeat",
        }}
        animate={{
          maskPosition: `center ${isBottom ? "300px" : "0px"}`,
        }}
      ></motion.div>
      <div className="px-6 pb-2">
        <SiteGrid
          contentMain={
            <AnimateItems
              animateOnFirstLoadOnly
              type={!shouldAnimate ? "none" : "bottom"}
              distanceOffset={10}
              items={
                showFooter
                  ? [
                      <div
                        key="footer"
                        className={clsx(
                          "flex items-center gap-1",
                          "text-dim min-h-10"
                        )}
                      >
                        <div className="flex flex-wrap flex-grow gap-x-3 xs:gap-x-4">
                          {isPathAdmin(pathname) ? (
                            <>
                              {userEmail === undefined && (
                                <Spinner
                                  size={14}
                                  className="translate-y-[2px]"
                                />
                              )}
                              {userEmail && (
                                <>
                                  <div className={clsx("truncate max-w-full")}>
                                    {userEmail}
                                  </div>
                                  <form
                                    action={() =>
                                      signOutAndRedirectAction().then(() =>
                                        setUserEmail?.(undefined)
                                      )
                                    }
                                  >
                                    <SubmitButtonWithStatus styleAsLink>
                                      Sign out
                                    </SubmitButtonWithStatus>
                                  </form>
                                </>
                              )}
                            </>
                          ) : (
                            <>{SHOW_REPO_LINK && <RepoLink />}</>
                          )}
                        </div>
                        <div className="flex items-center h-10">
                          <a
                            href="https://vercel.com/templates/next.js/photo-blog?utm_source=vercel_site&utm_medium=web&utm_campaign=vercel_ship&utm_content=photo_blog_example"
                            aria-label="Deploy Template"
                            className="flex items-center px-3 text-white bg-[#171717] rounded dark:bg-[#EDEDED] dark:text-black hover:bg-[#383838] hover:text-white dark:hover:text-black dark:hover:bg-[#CCC] transition-colors h-[30px] my-[-5px] ml-2"
                            target="_blank"
                          >
                            Deploy
                          </a>
                        </div>
                      </div>,
                    ]
                  : []
              }
            />
          }
        />
      </div>
    </div>
  );
}

const useScrollToBottom = () => {
  const [isBottom, setIsBottom] = useState(true);
  const pathname = usePathname();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.offsetHeight;
    const buffer = -40;

    if (windowHeight + scrollTop + buffer >= docHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleScroll();
  }, [pathname]);

  useEffect(() => {
    const observer = new MutationObserver(handleScroll);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return isBottom;
};
