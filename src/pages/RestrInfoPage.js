import React from "react"
import RestrInfoTemplate from "components/restrInfo/RestrInfoTemplate"
import Header from "components/common/Header"
import RestrSection from "components/restrInfo/RestrSection"
import BottomWrapper from "components/restrInfo/BottomWrapper"
import MenuSection from "components/restrInfo/MenuSection"
import Footer from "components/common/Footer"

const RestrInfoPage = () => {
  return (
    <RestrInfoTemplate
      header={<Header />}
      restrSection={<RestrSection />}
      bottomSection={<BottomWrapper />}
      menuSection={<MenuSection />}
      footer={<Footer />}
    />
  )
}

export default RestrInfoPage
