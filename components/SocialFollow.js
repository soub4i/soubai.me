import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedinIn,
    faGithub
} from "@fortawesome/free-brands-svg-icons";


export default function SocialFollow({ links }) {

    const { twitter, youtube, facebook, instagram, linkedin, github } = links
    return (<div className="my-8">

        <a target="_blank" href={`https://github.com/${github}`}
            className="github social">
            <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a target="_blank" href={`https://youtube.com/${youtube}`}
            className="youtube social">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a target="_blank" href={`https://linkedin.com/in/${linkedin}`}
            className="linkedin social">
            <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
        </a>
        <a target="_blank" href={`https://twitter.com/${twitter}`}
            className="twitter social">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a target="_blank" href={`https://instagram.com/${instagram}`}
            className="instagram social">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
    </div >)

}