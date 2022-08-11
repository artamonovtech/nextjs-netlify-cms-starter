import fs from "fs"
import YAML from "yaml"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { CmsConfig } from "netlify-cms-core"

interface Props {
  config: CmsConfig
}

const Admin: NextPage<Props> = ({ config }) => {
  const CMS = dynamic(() => import("netlify-cms-app").then((cms: any) => cms.init({ config })), {
    ssr: false,
    loading: () => <p>Loading...</p>
  })

  return <CMS />
}

export const getStaticProps = async () => {
  const pageFile = fs.readFileSync("./netlify.config.yaml", "utf-8")
  const config = YAML.parse(pageFile)

  return {
    props: { config }
  }
}

export default Admin
