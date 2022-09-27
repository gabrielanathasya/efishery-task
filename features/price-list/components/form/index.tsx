import React, { useState, useEffect } from "react"
import { useAppState, useActions } from "data/overmind"
import { useFormik } from "formik"
import { Button, Form, Row, Col } from "react-bootstrap"
import Select from "react-select"
import { epochToDate } from "utils/date"
import validationSchema from "./validationSchema"
import SpinnerComponent from "components/Spinner"
const moment = require("moment")

type ContactFormProps = {
  id: number | string | null
  handleSubmitForm: () => void
}

const FormComponent = ({ id, handleSubmitForm }: ContactFormProps) => {
  const state: any = useAppState()
  const overmindActions: any = useActions()
  const [initialValue, setInitialValue] = useState({
    komoditas: "",
    areaKota: "",
    areaProvinsi: "",
    size: 0,
    price: 0,
    tanggal: epochToDate(Date.now()),
  })
  const { detailData, areaOption, areaMap, sizeOption } = state.list
  const { isRequesting } = state

  useEffect(() => {
    overmindActions.list.getAreaOption()
    overmindActions.list.getSizeOption()
  }, [])

  useEffect(() => {
    setInitialValue({
      komoditas: detailData?.komoditas || "",
      areaKota: detailData?.areaKota || "",
      areaProvinsi: detailData?.areaProvinsi || "",
      size: detailData?.size || 0,
      price: detailData?.price || 0,
      tanggal: moment(detailData?.tanggal).format("YYYY-MM-DD"),
    })
  }, [detailData])

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

  const handleSelectOnChange = (fieldName: any) => {
    let labels: any = { assignedToId: "assignedToName" }

    return (option: any) => {
      setFieldValue(labels[fieldName], option.label)
      setFieldValue(fieldName, option.value)
      if (fieldName !== "size") {
        setFieldValue("areaProvinsi", areaMap[option.value])
      }
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

  console.log({ areaOption, areaMap })

  return (
    <div className="form-component">
      {isRequesting && <SpinnerComponent />}
      <Form onSubmit={handleSubmit} className="work-form">
        <Row>
          <Col sm={12} md={6} className="mb-3">
            <Form.Label>Komoditas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Komoditas"
              name="komoditas"
              value={values?.komoditas}
              onChange={handleChange}
            />
            {errors?.komoditas && (
              <Form.Text className="text-danger">
                <>{errors?.komoditas}</>
              </Form.Text>
            )}
          </Col>

          <Col sm={12} md={6} className="mb-3">
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              name="tanggal"
              type="date"
              value={values?.tanggal}
              onChange={handleChange}
            />
            {errors?.tanggal && (
              <Form.Text className="text-danger">
                <>{errors?.tanggal}</>
              </Form.Text>
            )}
          </Col>
        </Row>

        <Row>
          <Col className="mb-3">
            <Form.Label>Area Kota</Form.Label>
            <Select
              name="areaKota"
              onChange={handleSelectOnChange("areaKota")}
              placeholder="Select Area Kota"
              options={areaOption}
              value={
                values.areaKota
                  ? { value: values.areaKota, label: values.areaKota }
                  : ""
              }
            />
            {errors.areaKota && (
              <Form.Text className="text-danger">{errors.areaKota}</Form.Text>
            )}
          </Col>

          <Col sm={12} md={6} className="mb-3">
            <Form.Label>Area Provinsi</Form.Label>
            <Form.Control
              disabled
              type="text"
              placeholder="Area Provinsi"
              name="areaProvinsi"
              value={values.areaProvinsi}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6} className="mb-3">
            <Form.Label>Size</Form.Label>
            <Select
              name="size"
              onChange={handleSelectOnChange("size")}
              placeholder="Select Size"
              options={sizeOption}
              value={
                values.size ? { value: values.size, label: values.size } : ""
              }
            />
            {errors?.size && (
              <Form.Text className="text-danger">
                <>{errors?.size}</>
              </Form.Text>
            )}
          </Col>
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
