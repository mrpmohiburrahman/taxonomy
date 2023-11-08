import Link from "next/link"
import { UserButton, auth, currentUser } from "@clerk/nextjs"
import { dark, shadesOfPurple } from "@clerk/themes"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const _currentUser = await currentUser()
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container z-40 bg-background">
        <div className="flex items-center justify-between h-20 py-6">
          <MainNav items={marketingConfig.mainNav} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderColor: "black",
              alignItems: "center", // Ensures vertical alignment
            }}
          >
            <ModeToggle />
            <nav
              style={{
                borderColor: "red",
                display: "flex",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              {_currentUser ? (
                <UserButton
                  appearance={{ baseTheme: shadesOfPurple }}
                  userProfileProps={{
                    appearance: { baseTheme: shadesOfPurple },
                  }}
                  afterSignOutUrl="/"
                />
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
