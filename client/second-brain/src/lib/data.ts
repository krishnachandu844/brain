import FacebookIcon from "../icons/FacebookIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { LinkedInIcon } from "../icons/LinkedInIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Balloon } from "lucide-react";

export const PLATFOMS = [
  {
    id: "all",
    label: "All",
    icon: Balloon,
  },
  {
    id: "instagram",
    type: "INSTAGRAM",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    id: "youtube",
    type: "YOUTUBE",
    label: "Youtube",
    icon: YoutubeIcon,
  },
  {
    id: "twitter",
    type: "TWITTER",
    label: "X/Twitter",
    icon: TwitterIcon,
  },
  {
    id: "facebook",
    type: "FACEBOOK",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    id: "linkedin",
    type: "LINKEDIN",
    label: "Linkedin",
    icon: LinkedInIcon,
  },
];
