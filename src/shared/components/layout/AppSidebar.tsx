"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

const allNavItems = [
    {
        icon:
            (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
            ),
        name: "Agente IA",
        path: "/data-domain",
        section: "MENU"
    },
    {
        icon:
            (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M21 7.5l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313M21 3v6m0 0l-2.25-1.313M21 16.5v-6m0 0l-2.25 1.313M3 16.5v-6m0 0l2.25 1.313M3 3v6m0 0l2.25-1.313M12 12.75L9.75 11.437M12 12.75l2.25-1.313M12 12.75v2.25m0 0l2.25 1.313M12 18.75l-2.25-1.313M12 18.75v-2.25m0 0l-2.25 1.313M12 12.75L9.75 14.063M12 12.75l2.25 1.313M12 12.75v-2.25m0 0l-2.25-1.313M12 5.25l2.25 1.313M12 5.25v2.25m0 0l2.25-1.313M12 5.25L9.75 6.563M12 5.25l-2.25-1.313M12 5.25V3m0 0l-2.25 1.313M12 3v2.25m0 0l2.25-1.313M12 5.25L9.75 4.5" />
                </svg>
            ),
        name: "Catálogo de Servicios",
        path: "/services-catalog",
        section: "MENU"
    }
];

const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered, openSubmenu, toggleSubmenu } = useSidebar();
    const pathname = usePathname();

    // Check if the current path is active
    const isActive = useCallback((path) => path === pathname, [pathname]);

    // Filter items by section
    const menuItems = allNavItems.filter(item => item.section === "MENU");

    // Determine if the sidebar should show text labels
    const shouldShowText = isExpanded || isHovered || isMobileOpen;

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 left-0 bg-gray-900 text-white h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-800
        ${isExpanded || isMobileOpen
                    ? "w-[290px]"
                    : isHovered
                        ? "w-[290px]"
                        : "w-[90px]"
                }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo section */}
            <div
                className={`py-8 px-5 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                    }`}
            >
                <Link href="/">
                    {shouldShowText ? (
                        <>
                            <Image
                                className="dark:hidden"
                                src="/images/logo/br-logo.jpg"
                                alt="Logo"
                                width={200}
                                height={50}
                            />
                            <Image
                                className="hidden dark:block"
                                src="/images/logo/br-logo.jpg"
                                alt="Logo"
                                width={200}
                                height={50}
                            />
                        </>
                    ) : (
                        <Image
                            src="/images/icons/ripley-icon.png"
                            alt="Logo"
                            width={32}
                            height={32}
                        />
                    )}
                </Link>
            </div>

            {/* Navigation content */}
            <div className="flex-1 flex flex-col">
                <nav className="mb-6 px-4">
                    <div className="flex flex-col gap-6">
                        {/* MENU Section */}
                        <div>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-500 font-semibold ${!isExpanded && !isHovered
                                    ? "lg:justify-center"
                                    : "justify-start"
                                    }`}
                            >
                                {shouldShowText ? (
                                    "MENU"
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                )}
                            </h2>
                            <ul className="flex flex-col gap-1">
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.path}
                                            className={`relative flex items-center px-4 py-3 rounded-md transition-colors ${isActive(item.path)
                                                ? "bg-gray-800 text-white border-r-4 border-[#8C4799]"
                                                : "text-gray-300 hover:bg-gray-800"
                                                } ${!shouldShowText ? "justify-center" : ""}`}
                                        >
                                            <span className={`${isActive(item.path) ? "text-white" : "text-gray-400"}`}>
                                                {item.icon}
                                            </span>
                                            {shouldShowText && (
                                                <span className="ml-3 text-sm">{item.name}</span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;