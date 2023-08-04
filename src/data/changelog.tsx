import React from "react"

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

export interface ChangelogVersion {
  version: string
  description?: string
  changes?: (string | JSX.Element)[]
}

export const changelog: ChangelogVersion[] = [
  {
    version: "0.6.0",
    changes: [
      <>
        Added catppuccin theme. Thanks to <GithubUser user="AndyReckt" /> for
        contributing!
      </>,
    ],
  },
  {
    version: "0.5.0",
    changes: [
      "Added custom search engines",
      <>
        Added some new themes. Thanks to{" "}
        <RedditUser user="justanotherweirdteen" /> for contributing!
      </>,
    ],
  },
  {
    version: "0.4.4",
    changes: [
      <>
        Added new theme &quot;Tartarus&quot;. Thanks to{" "}
        <RedditUser user="AllJavi" /> for contributing! <br />(
        <Link href="https://github.com/AllJavi/dotfiles">
          fitting linux rice
        </Link>
        )
      </>,
    ],
  },
  {
    version: "0.4.3",
    changes: [
      "Added middle mouse click to Link Group to open all links in new tabs",
      "Added Dockerfile for easier local setup",
    ],
  },
  {
    version: "0.4.2",
    changes: ["Enhanced responsiveness for large screens", "Internal stuff"],
  },
  {
    version: "0.4.1",
    changes: [
      "Enhanced stability of the settings (I am pretty sure about it this time!!!)",
      "Fixed a bug with the link editor I introduced before",
    ],
  },
  {
    version: "0.4.0",
    changes: [
      "Added fast forward search",
      "Fixed a bug which prevented the link editor to load your data",
      "Enhanced responsiveness",
      "Added some more default data",
    ],
  },
  {
    version: "0.3.0",
    description:
      "This update was hell for me, fucking themes took me way too long and I needed to restructure all the internal design data.Also oof, had so many bugs caused by the not existing peresistence of my data. Hope you enjoy it!",
    changes: ["Added theme management"],
  },
  {
    version: "0.2.1",
    changes: ["Optimized keyboard control", "Restructured settings"],
  },
  {
    version: "0.2.0",
    changes: [
      "Added this changelog",
      "Added tabs in settings",
      "Added design preview",
      'Added "Discard Changes" button in settings',
      "Added project logo",
      "Changed structure of settings",
      "I think I enhanced stability overall a bit",
    ],
  },
  {
    version: "0.1.0",
    description: "The initial state of this project.",
  },
]
