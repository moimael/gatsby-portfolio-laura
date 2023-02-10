/** @jsx jsx */
import * as React from "react"
import { jsx } from "theme-ui"
import ReactPlayer from "react-player/lazy"

interface Props {
  url: string
  title: string
}

const Video = ({ url, title, ...props }: Props) => (
  <div
    style={{
      position: "relative",
      padding: "56.25% 0 0 0",
    }}
  >
    <ReactPlayer
      url={url}
      controls
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        border: 0,
      }}
      width="100%"
      height="100%"
    />
  </div>
)
export default Video
