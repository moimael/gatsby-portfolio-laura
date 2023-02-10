import React from "react"
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
    <iframe
      src={url}
      title={title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        border: 0,
      }}
    />
  </div>
)
export default Video
