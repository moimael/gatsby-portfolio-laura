import { graphql, useStaticQuery } from "gatsby"

type UseSiteMetadataProps = {
  site: {
    siteMetadata: {
      title: string
      siteUrl: string
      description: string
      author: string
      [key: string]: unknown
    }
  }
}

const useSiteMetadata = () => {
  const data = useStaticQuery<UseSiteMetadataProps>(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
          author
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
