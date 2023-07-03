import { graphql, useStaticQuery } from "gatsby"

type UseEmiliaConfigProps = {
  emiliaConfig: {
    name: string
    location: string
    socialMedia: {
      href: string
      title: string
    }[]
    showThemeAuthor: boolean
    assetsPath: string
  }
}

const useEmiliaConfig = () => {
  const { allContentfulSocialMedia } = useStaticQuery(graphql`
    query {
      allContentfulSocialMedia {
        nodes {
          url
          title
        }
      }
    }
  `)

  // return data.emiliaConfig

  return {
    name: "Laura Gerlier",
    location: "Lyon",
    socialMedia: [
      {
        href: allContentfulSocialMedia?.nodes[0]?.url,
        title: allContentfulSocialMedia?.nodes[0]?.title,
      },
    ],
    showThemeAuthor: false,
    assetsPath: "",
  }
}

export default useEmiliaConfig
