import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Pomodoro } from "../components/Pomodoro"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Pomodoro defaultPomodoro={1500} />
  </Layout>
)

export default IndexPage
