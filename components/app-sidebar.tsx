// components/app-sidebar.tsx
import * as React from "react"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

// import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SearchForm } from "@/components/search-form"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
          icon: Home,
        },
        {
          title: "Project Structure",
          url: "#",
          icon: Home,
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
          icon: Home,
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
          icon: Home,
        },
        {
          title: "Rendering",
          url: "#",
          icon: Home,
        },
        {
          title: "Caching",
          url: "#",
          icon: Home,
        },
        {
          title: "Styling",
          url: "#",
          icon: Home,
        },
        {
          title: "Optimizing",
          url: "#",
          icon: Home,
        },
        {
          title: "Configuring",
          url: "#",
          icon: Home,
        },
        {
          title: "Testing",
          url: "#",
          icon: Home,
        },
        {
          title: "Authentication",
          url: "#",
          icon: Home,
        },
        {
          title: "Deploying",
          url: "#",
          icon: Home,
        },
        {
          title: "Upgrading",
          url: "#",
          icon: Home,
        },
        {
          title: "Examples",
          url: "#",
          icon: Home,
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
          icon: Home,
        },
        {
          title: "File Conventions",
          url: "#",
          icon: Home,
        },
        {
          title: "Functions",
          url: "#",
          icon: Home,
        },
        {
          title: "next.config.js Options",
          url: "#",
          icon: Home,
        },
        {
          title: "CLI",
          url: "#",
          icon: Home,
        },
        {
          title: "Edge Runtime",
          url: "#",
          icon: Home,
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
          icon: Home,
        },
        {
          title: "Fast Refresh",
          url: "#",
          icon: Home,
        },
        {
          title: "Next.js Compiler",
          url: "#",
          icon: Home,
        },
        {
          title: "Supported Browsers",
          url: "#",
          icon: Home,
        },
        {
          title: "Turbopack",
          url: "#",
          icon: Home,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
