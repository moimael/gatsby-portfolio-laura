/** @jsx jsx */
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import { jsx, Container } from "theme-ui"
import { animated, useSpring, config } from "react-spring"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import Layout from "../components/layout"
import HeaderProject from "../components/header-project"
import Seo from "../components/seo"
import Video from "../components/video"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { useState } from "react"

export const query = graphql`
  query ($id: String) {
    contentfulProject(id: { eq: $id }) {
      id
      title
      description {
        id
        description
      }
      slug
      media {
        gatsbyImageData
      }
      video
    }
  }
`

export type EmiliaProjectProps = {
  contentfulProject: {
    // excerpt: string
    // date: string
    slug: string
    title: string
    description?: {
      description: string
    }
    // areas: string[]
    media: {
      title: string
      gatsbyImageData: IGatsbyImageData
    }[]
    video: string
  }
}

const Project: React.FC<
  React.PropsWithChildren<PageProps<EmiliaProjectProps>>
> = ({ data: { contentfulProject } }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const imageFade = useSpring({
    config: config.slow,
    delay: 800,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  const handlePreview = (index: number) => {
    setOpen(true)
    setIndex(index)
  }

  const handlePreviewClose = () => {
    setOpen(false)
    setIndex(0)
  }

  return (
    <Layout>
      <HeaderProject
        title={contentfulProject.title}
        description={contentfulProject.description?.description}
        // areas={contentfulProject.areas}
        // date={contentfulProject.date}
      />
      <Lightbox
        open={open}
        close={handlePreviewClose}
        index={index}
        slides={contentfulProject.media.map((image) => image)}
        render={{
          slide: ({
            slide,
          }: {
            slide: {
              title: string
              gatsbyImageData: IGatsbyImageData
            }
          }) => {
            return (
              <GatsbyImage image={slide.gatsbyImageData} alt={slide.title} />
            )
          },
        }}
      />
      <Container sx={{ mt: [`-6rem`, `-6rem`, `-8rem`] }}>
        {contentfulProject.video && (
          <Video url={contentfulProject.video} title="test" />
        )}
        <Container
          css={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "40px",
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          }}
        >
          {contentfulProject.media.map((image, index) => (
            <animated.div
              onClick={() => handlePreview(index)}
              key={image.title}
              style={{
                ...imageFade,
                flex: 1,
                flexBasis: "calc(50% - 20px)",
                maxWidth: "calc(50% - 20px)",
                cursor: "pointer",
              }}
            >
              <GatsbyImage
                image={image.gatsbyImageData}
                alt={image.title}
                sx={{ boxShadow: `xl` }}
              />
            </animated.div>
          ))}
        </Container>
      </Container>
    </Layout>
  )
}

export default Project

export const Head: HeadFC<EmiliaProjectProps> = ({
  data: { contentfulProject },
}) => (
  <Seo
    title={contentfulProject.title}
    // description={allContentfulProject.nodes[0].excerpt}
    pathname={contentfulProject.slug}
    image={
      contentfulProject.media?.[0].gatsbyImageData?.images?.sources?.[0].srcSet
    }
  />
)
