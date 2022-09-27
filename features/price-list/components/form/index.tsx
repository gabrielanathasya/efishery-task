import React, { useState, useEffect } from "react"
import { useAppState, useActions } from "data/overmind"
import { useFormik } from "formik"
import { Button, Form, Row, Col } from "react-bootstrap"
import validationSchema from "./validationSchema"
import SpinnerComponent from "components/Spinner"
type ContactFormProps = {
  id: number | string | null
  handleSubmitForm: () => void
}

const FormComponent = ({ id, handleSubmitForm }: ContactFormProps) => {
  const state: any = useAppState()
  const overmindActions: any = useActions()
  const [initialValue, setInitialValue] = useState({
    productName: "",
    location: "",
    price: [],
  })
  const { detailData: detailDataState } = state.list

  useEffect(() => {
    setInitialValue({
      productName: detailDataState?.productName || "",
      location: detailDataState?.location || "",
      price: detailDataState?.price || [],
    })
  }, [detailDataState])

  const onSubmitForm = (values: any, actions: any) => {
    if (values) {
      if (id) {
        // edit
      } else {
        //insert
      }
      handleSubmitForm()
    } else {
      alert("Please fill out the form")
    }
  }

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: onSubmitForm,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
  })

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = formik

  return (
    <div className="form-component">
      {/* {(loading || loadingDetail || loadingEdit || loadingAddPhone) && (
        <SpinnerComponent />
      )} */}
      <Form onSubmit={handleSubmit} className="work-form">
        <Row>
          <Col sm={12} md={6} className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="productName"
              value={values?.productName}
              onChange={handleChange}
            />
            {errors?.productName && (
              <Form.Text className="text-danger">
                <>{errors?.productName}</>
              </Form.Text>
            )}
          </Col>
          <Col sm={12} md={6} className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              name="location"
              value={values?.location}
              onChange={handleChange}
            />
            {errors?.location && (
              <Form.Text className="text-danger">
                <>{errors?.location}</>
              </Form.Text>
            )}
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6} className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price"
              name="price"
              value={values?.price}
              onChange={handleChange}
            />
            {errors?.price && (
              <Form.Text className="text-danger">
                <>{errors?.price}</>
              </Form.Text>
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-end">
            <Button className="submit-button" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default FormComponent
