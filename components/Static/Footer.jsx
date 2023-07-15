import Link from "next/link";
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export default function Footer() {

    return (
        <>
            <footer className="py-10">
                <div className="pt-10 mx-auto">
                    <div className="lg:grid lg:grid-cols-6 gap-20">
                        <div className="col-span-3">
                            <div className="flex items-center space-x-5">
                                <img src="/img/logo.jpg" className="rounded-full w-12" />
                                <p className="font-semibold text-xl text-white">Server Inspector</p>
                            </div>
                            <Menu as="div" className="relative mt-3 inline-block text-left">
                                <div>
                                    <Menu.Button className="flex z-1 items-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        <img
                                            src={`https://flagcdn.com/w80/us.png`}
                                            width="24"
                                            height="18"
                                            className="mr-2 h-4 rounded-sm"
                                        />
                                        English
                                        <ChevronDownIcon
                                            className="w-5 h-5 ml-2 -mr-1 transform rotate-180 text-violet-200 hover:text-violet-100"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>
                            </Menu>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white font-medium mt-3 sm:mt-0 sm:mb-3">Links</p>
                            <div>
                                <a href="https://discord.com/invite/gN6zG964bj" target="_blank" className="text-white/50 hover:text-white hover:underline transform duration-200">
                                    Support Server
                                </a>
                            </div>
                            <div>
                                <a href="https://discord.com/api/oauth2/authorize?client_id=977774758647189506&permissions=8&scope=applications.commands%20bot" target="_blank" className="text-white/50 hover:text-white hover:underline transform duration-200">
                                    Invite Bot
                                </a>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white font-medium mt-3 sm:mt-0 sm:mb-3">Social</p>
                            <div>
                                <Link href="https://discord.com/invite/gN6zG964bj">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                    <i className={`fa-brands fa-discord`} /> Discord
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href="https://twitter.com/bankkroll_eth">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                    <i className={`fa-brands fa-github`} /> Twitter
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white font-medium mt-3 sm:mt-0 sm:mb-3">Important</p>
                            <div>
                                <Link href="/tos">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                        Terms Of Service
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/privacy">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                        Privacy Policy
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 grid content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <p className="text-white text-center sm:text-left text-opacity-50">
                            {new Date().getFullYear()} &copy; Server Inspector
                        </p>
                        <div className="hidden md:flex items-center justify-center">
                                <p className={"text-xs text-green-400"}>
                                    Bot Online
                                </p>
                        </div>
                        <p className="text-white text-center sm:text-right text-opacity-50">
                            {"Made with ❤️ by Bankkroll"}
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};
