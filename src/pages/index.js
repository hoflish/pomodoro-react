import React from "react"

import { ThemeProvider } from "../contexts/theme"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Pomodoro } from "../components/Pomodoro"

const IndexPage = () => {
  return (
    <ThemeProvider>
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `pomodoro`, `react`]} />
        <Pomodoro defaultPomodoro={1500} />
      </Layout>
    </ThemeProvider>
  )
}

export default IndexPage
