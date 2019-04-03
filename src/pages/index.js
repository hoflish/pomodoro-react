import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Timer from "../components/Timer"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Timer initialPomodoro={1500} />
  </Layout>
)

export default IndexPage
