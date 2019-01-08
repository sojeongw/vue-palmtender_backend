import React from "react"
import PageTemplate from "components/common/PageTemplate"
import Header from "components/common/Header"
import Footer from "components/common/Footer"
import RestrMap from "components/map/RestrMap/restrMap"
import CurrenList from "components/restrList/CurrentList"

const MapPage = () => {
  return (
    <PageTemplate
      header={<Header />}
      restrMap={<RestrMap />}
      restrList={<CurrenList />}
      footer={<Footer />}
    >
      test
    </PageTemplate>
  )
}

export default MapPage
