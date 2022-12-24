import Link from "next/link";

import Layout from "components/Layout";
import Bio from "components/Bio";
import SEO from "components/Seo";
import { getProjects } from "utils/oss";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Oss({ projects }) {

    const [repos, setRepos] = useState(projects.repos);
    const [owner] = useState(projects.owner);

    useEffect(async () => {
        const reposPromises = projects.repos.map(r => axios.get(`https://api.github.com/repos/${owner}/${r}`))
        const gitRepos = await Promise.all(reposPromises);
        setRepos(gitRepos.map(r => r.data))

    }, [])

    var badgeClasses = [
        'btn-inline-block'
        , 'bg-gray-200'
        , 'rounded-full'
        , 'px-3'
        , 'py-1'
        , 'text-sm'
        , 'font-semibold'
        , 'text-gray-700'
        , 'mr-2'
        , 'mb-2'
    ];

    return (
        <Layout>
            <SEO title="OSS" />
            <Bio className="my-14" />
            { repos.map(({ id, description, name, stargazers_count, html_url, archived }) =>

                <div key={name} className=" rounded overflow-hidden shadow-lg my-8 w-full">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{name}</div>
                        <p className="text-gray-700 text-base">
                            {description}
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className={[...badgeClasses, 'bg-gray-200'].join(' ')}>⭐ {stargazers_count}</span>
                        <span className={[...badgeClasses, !archived ? ' bg-green-500' : ' bg-red-500'].join(' ')}>{!archived ? 'Maintained' : 'Not Maintained'}</span>
                        <span className={[...badgeClasses, 'bg-gray-200', 'float-right'].join(' ')}>
                            <a className={'text-gray-700 '} target="_blank" href={html_url}>
                                Github
                            </a>
                        </span>
                    </div>
                </div>

            )}

        </Layout>
    );
}

export async function getStaticProps() {
    const projects = getProjects();


    return {
        props: {
            projects,
        },
    };
}
