import React from "react"
import { Spinner } from "react-bootstrap"

const SpinnerComponent = () => {
  return (
    <div className="spinner">
      <Spinner animation="border" variant="primary" />
    </div>
  )
}

export default SpinnerComponent
