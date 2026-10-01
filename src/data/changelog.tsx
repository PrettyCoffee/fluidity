import { ReactNode } from "react"

import styled from "@emotion/styled"

const Link = styled.a`
  &,
  :visited {
    color: var(--accent-color);
  }
  :hover {
    text-decoration: underline;
  }
`

const RedditUser = ({ user }: { user: string }) => (
  <Link href={`https://www.reddit.com/user/${user}`}>u/{user}</Link>
)
const GithubUser = ({ user }: { user: string }) => (
  <Link href={`https://github.com/${user}`}>{user}</Link>
)
const Contributor = ({
  type,
  user,
}: {
  type: "reddit" | "github"
  user: string
}) => {
  const User = type === "reddit" ? RedditUser : GithubUser
  return (
    <>
      {" (Thanks to "}
      <User user={user} />
      !)
    </>
  )
}

export interface ChangelogVersion {
  version: string
  description?: string
  changes?: (string | ReactNode)[]
}

export const changelog: ChangelogVersion[] = [
  {
    version: "0.8.0",
    changes: [
      <>
        Add clock / date / greeting widget.
        <Contributor type="github" user="mj0x0" />
      </>,
      <>
        Add ability to cycle search engines by clicking the search icon.{" "}
        <Contributor type="github" user="mj0x0" />
      </>,
      <>
        Fix Chrome search icon. <Contributor type="github" user="mj0x0" />
      </>,
    ],
  },
  {
    version: "0.7.0",
    changes: [
      "Improve accordion item width to correctly fill screen",
      "Clip links with ellipsis when overflowing accordion content",
      "Migrate setup to modern tooling with automated GitHub Actions releases",
    ],
  },
  {
    version: "0.6.0",
    changes: [
      <>
        Add Catppuccin theme. <Contributor type="github" user="AndyReckt" />
      </>,
    ],
  },
  {
    version: "0.5.0",
    changes: [
      "Add custom search engines",
      <>
        Add some new themes.
        <Contributor type="reddit" user="justanotherweirdteen" />
      </>,
    ],
  },
  {
    version: "0.4.4",
    changes: [
      <>
        Add new theme &quot;Tartarus&quot;.
        <Contributor type="github" user="AllJavi" />
        <br />(
        <Link href="https://github.com/AllJavi/dotfiles">
          fitting Linux rice
        </Link>
        )
      </>,
    ],
  },
  {
    version: "0.4.3",
    changes: [
      "Add middle mouse click to Link Group to open all links in new tabs",
      "Add Dockerfile for easier local setup",
    ],
  },
  {
    version: "0.4.2",
    changes: ["Enhance responsiveness for large screens", "Internal stuff"],
  },
  {
    version: "0.4.1",
    changes: [
      "Enhance stability of the settings (I am pretty sure about it this time!!!)",
      "Fix a bug with the link editor I introduced before",
    ],
  },
  {
    version: "0.4.0",
    changes: [
      "Add fast forward search",
      "Fix a bug which prevented the link editor to load your data",
      "Enhance responsiveness",
      "Add some more default data",
    ],
  },
  {
    version: "0.3.0",
    description:
      "This update was hell for me, fucking themes took me way too long and I needed to restructure all the internal design data. Also oof, had so many bugs caused by the not existing persistence of my data. Hope you enjoy it!",
    changes: ["Add theme management"],
  },
  {
    version: "0.2.1",
    changes: ["Optimize keyboard control", "Restructure settings"],
  },
  {
    version: "0.2.0",
    changes: [
      "Add this changelog",
      "Add tabs in settings",
      "Add design preview",
      'Add "Discard Changes" button in settings',
      "Add project logo",
      "Change structure of settings",
      "I think I enhanced stability overall a bit",
    ],
  },
  {
    version: "0.1.0",
    description: "The initial state of this project.",
  },
]
