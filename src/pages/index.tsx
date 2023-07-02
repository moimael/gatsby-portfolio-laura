import * as React from "react"
import { graphql } from "gatsby"
import Projects from "../components/projects"
import SEOHead from "../components/head"

export default function Homepage(props: any) {
  const { allContentfulProject } = props.data

  return <Projects projects={allContentfulProject.nodes} {...props} />
}
export const Head = (props: any) => {
  const { homepage } = props.data
  return <SEOHead {...homepage} />
}

export const query = graphql`
  {
    allContentfulProject(sort: { date: DESC }) {
      nodes {
        id
        title
        slug
        media {
          id
          gatsbyImageData(aspectRatio: 1.77777777778)
        }
      }
    }
  }
`
