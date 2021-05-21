import React from 'react'

import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ImageWithCover from '@/components/image-with-cover'

const MAX_DISPLAY = 5
const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

// build static data first
export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { 
    props: { 
      posts,
      imgPlaceHolderStr: global['heroImgPlaceholder'],
    } 
  }
}

// render view content
export default function Home({ posts, imgPlaceHolderStr }) {
  
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div>
        {/* banner */}
        <div className="space-y-2 md:space-y-5 relative hero">
          <div className="absolute z-10 h-full w-full flex top-0 left-0 items-center justify-center flex-col pt-10" style={{height: '70%'}}>
            <h1 className="pt-6 md:pb-6 text-2xl uppercase font-extrabold leading-9 tracking-tight text-blue-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 ">
            {siteMetadata.title}
            </h1>
            <p 
              className="text-center text-blue-200 text-xs md:text-xl font-extrabold leading-7 dark:text-gray-400 uppercase my-6 px-2" >
              {siteMetadata.description}
            </p>
          </div>
          {/* hero image */}
          <ImageWithCover
            coverImgStr={imgPlaceHolderStr}
            imgSrc="/static/images/pyramid_md.jpg"
            imgNight="/static/images/night-md.jpg"
            altName="letspy_hero"
          />
        </div>
        {/* end of banner */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
