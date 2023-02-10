/** @jsx jsx */
import { Fragment } from "react"
import { jsx } from "theme-ui"
import { Themed } from "@theme-ui/mdx"
import useEmiliaConfig from "../hooks/use-emilia-config"

const SocialMediaList = () => {
  const { socialMedia } = useEmiliaConfig()

  return (
    <Fragment>
      {socialMedia.map((entry) => (
        <Themed.a key={entry.title} href={entry.href}>
          {entry.title}
        </Themed.a>
      ))}
    </Fragment>
  )
}

export default SocialMediaList
