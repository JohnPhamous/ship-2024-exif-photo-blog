import { clsx } from "clsx/lite";
import Link from "next/link";
import { BiLogoGithub } from "react-icons/bi";

export default function RepoLink() {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="hidden sm:inline-block">Made with</span>
      <Link
        href="http://github.com/sambecker/exif-photo-blog"
        target="_blank"
        className={clsx(
          "flex items-center gap-0.5",
          "text-main hover:text-main",
          "hover:underline"
        )}
      >
        <BiLogoGithub
          size={16}
          className="translate-y-[0.5px] hidden xs:inline-block"
        />
        exif-photo-blog
      </Link>

      <a
        href="https://vercel.com/templates/next.js/photo-blog?utm_source=vercel_site&utm_medium=web&utm_campaign=vercel_ship&utm_content=photo_blog_example"
        aria-label="Deploy Template"
        className="flex items-center px-3 text-white bg-[#171717] rounded dark:bg-[#EDEDED] dark:text-black hover:bg-[#383838] hover:text-white dark:hover:text-black dark:hover:bg-[#CCC] transition-colors h-[30px] my-[-5px] ml-2"
      >
        Deploy
      </a>
    </span>
  );
}
