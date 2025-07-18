import { IconCloud } from "@/components/ui/interactive-icon-cloud"

const slugs = [
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "drizzle",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "sonarqube",
    "figma",
    "tailwindcss",
    "jetbrains",
    "linux",
    "cloudflare",
    "redis",
]

export default function TechIcon() {
    return (
        <IconCloud iconSlugs={slugs} />
    )
}
