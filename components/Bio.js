import clsx from "clsx";

import Image from "./Image";
import { getSiteMetaData } from "utils/helpers";

export default function Bio({ className }) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <Image
        className="flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14"
        src={`https://twivatar.glitch.me/${social.twitter}`}
        webpSrc={`https://twivatar.glitch.me/${social.twitter}?webp`}
        previewSrc={`https://twivatar.glitch.me/${social.twitter}?lqip-colors`}
        alt="Profile"
      />
      <p className="text-base leading-7">
        Written by <b className="font-semibold">{author.name}</b>{" "}
        {author.summary}{" "}
        Follow him on <a href={`https://twitter.com/${social.twitter}`}>
          twitter
        </a>
      </p>
    </div>
  );
}
