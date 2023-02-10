/** @jsx jsx */
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import { jsx, Container } from "theme-ui"
import { animated, useSpring, config } from "react-spring"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import Layout from "../components/layout"
import HeaderProject from "../components/header-project"
import ProjectPagination from "../components/project-pagination"
import Seo from "../components/seo"
import Video from "../components/video"

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
    // areas: string[]
    media: {
      title: string
      gatsbyImageData: IGatsbyImageData
    }[]
    video: string
  }
}

export type EmiliaProjectPageContext = {
  prev: {
    slug: string
    contentFilePath: string
    title: string
    media: {
      gatsbyImageData: IGatsbyImageData
    }[]
  }
  next: {
    slug: string
    contentFilePath: string
    title: string
    media: {
      gatsbyImageData: IGatsbyImageData
    }[]
  }
}

const Project: React.FC<
  React.PropsWithChildren<
    PageProps<EmiliaProjectProps, EmiliaProjectPageContext>
  >
> = ({
  data: { contentfulProject },
  pageContext: { prev, next },
  children,
}) => {
  const imageFade = useSpring({
    config: config.slow,
    delay: 800,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <HeaderProject
        title={contentfulProject.title}
        description={children}
        // areas={contentfulProject.areas}
        // date={contentfulProject.date}
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
          {contentfulProject.media.map((image) => (
            <animated.div
              key={image.title}
              style={{
                ...imageFade,
                flex: 1,
                flexBasis: "calc(50% - 20px)",
                maxWidth: "calc(50% - 20px)",
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

        <ProjectPagination prev={prev} next={next} />
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
