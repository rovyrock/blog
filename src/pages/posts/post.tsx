import React, { useEffect, useState } from "react";
// @ts-ignore
import { useParams } from 'umi';
import getMarkdown from '@/plugins/markdown';
import { parseTitle } from "@/utils/toc"
import Toc from './components/toc'
import '@/assets/styles/code.scss';

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<any>()
  const [html, setHtml] = useState<string>()
  const [toc, setToc] = useState<{ level: number, title: string }[]>()

  async function refresh() {
    try {
      const res = await fetch('/api/posts/' + params.postId)
      const post = await res.json()
      if (res.status === 200) {
        setPost(post)
        const md = getMarkdown({});
        setToc(parseTitle({ content: post.content }))
        // const html = md.render(post.content)
        setHtml(md.render(post.content))
        console.log('getMarkdown', html)
      } else {
        setPost(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    refresh();
  }, [])

  if (post === null) {
    return <div>Post with ID {params.postId} not found.</div>
  }

  return <div className="max-w-screen overflow-x-hidden">
    {post === undefined && <div
      className="w-screen h-screen flex justify-center items-center">
      <p className="animate-pulse">Loading...</p>
    </div>}
    {post && <>
      <div
        className="w-full lg:h-[46rem] h-[36rem] overflow-hidden relative flex justify-center">
        <img src={post.imageUrl}
          className="absolute top-0 w-full h-full object-cover" alt="" />
        <div
          className="w-full h-full absolute top-0 right-0 bg-black bg-opacity-60" />
        <div
          className="w-full absolute lg:bottom-24 bottom-12 container lg:px-64 px-8">
          <p className="text-white text-4xl font-extrabold">{post.title}</p>
          <div className="flex flex-row mt-8 align-bottom">
            <img src={post.author.avatarUrl}
              className="rounded-full h-8 w-8 mr-4"
              alt="" />
            <p
              className="text-white text-xl font-extrabold opacity-80">{post.author.name}</p>
            <p
              className="text-white text-xl ml-8 opacity-60">{post.createdAt.split('T')[0]}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-24">
        <div className="w-full container lg:px-64 px-8">
          {html && <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />}
        </div>

        {toc && <Toc toc={toc} />}

        {/* <div
          className="w-full lg:m-12 mb-12 border
      border-gray-200 dark:border-neutral-700 py-4 rounded-lg z-20"
        >

          <p className="text-lg font-extrabold text-gray-800 dark:text-neutral-50 pb-2 border-b border-gray-200 dark:border-neutral-700">
            <span className="px-4"></span>
          </p>
          <ul className="max-h-[calc(100vh-360px)] overflow-y-auto px-4">
            {toc?.map((item: any) => {
              return (
                <li
                  style={{ paddingLeft: `${item.level - 2}rem` }}
                  className="mt-3 text-gray-600 cursor-pointer dark:text-neutral-400
              hover:text-blue-500 transition duration-300 dark:hover:text-blue-500"
                >
                  <a
                    className={`${item.level > 2 ? 'text-sm' : 'text-base'
                      } break-all 2xl:break-words`}
                    href={'#' + item.title}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>*/}
      </div>
    </>}
  </div>
}