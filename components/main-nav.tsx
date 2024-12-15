// components/main-nav.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

import type { MainNavItem, NavItem } from "types"
import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevents mismatch between server and client
  }

  // Choose the logo based on the current theme
  const logoSrc =
    resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"

  return (
    <div className="flex flex-1">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image
          src={logoSrc} // Dynamic logo based on theme
          alt="Site Logo"
          width={60} // Adjust the width to suit your needs
          height={60} // Adjust the height to suit your needs
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <div className="ml-auto">
        <NavigationMenu>
          <NavigationMenuList>
            {marketingConfig.mainNav.map((item: NavItem) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
