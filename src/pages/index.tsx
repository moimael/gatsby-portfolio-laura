import * as React from "react"
import { graphql } from "gatsby"
import Projects from "../components/projects"
import SEOHead from "../components/head"

export default function Homepage(props) {
  const { allContentfulProject } = props.data

  return <Projects projects={allContentfulProject.nodes} {...props} />
}
export const Head = (props) => {
  const { homepage } = props.data
  return <SEOHead {...homepage} />
}

export const query = graphql`
  {
    allContentfulProject(sort: { updatedAt: DESC }) {
      nodes {
        id
        title
        slug
        media {
          id
          gatsbyImageData
        }
      }
    }
  }
`
