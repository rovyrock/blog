import React from 'react';
export default function Toc({
    toc,
}: {
    toc: { level: number; title: string }[];
}) {
    return (
        <div
            className="fixed right-0 top-0 w-1/4 hidden lg:block flex-row
        justify-center h-screen z-10 pt-20"
        >
            <div className="container flex flex-row justify-start">
                <div className="w-2/3 top-32">
                    <div className="w-full lg:m-12 mb-12 border border-gray-200 dark:border-neutral-700 py-4 rounded-lg z-20">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
