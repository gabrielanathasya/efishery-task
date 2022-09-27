import { Button, Form, Container, Row, Col } from "react-bootstrap"
import { CustomTable } from "components/CustomTable"
import { useEffect, useState } from "react"
import { useAppState, useActions, overmind } from "data/overmind"
import ModalComponent from "components/Modal"
import SpinnerComponent from "components/Spinner"
import FormComponent from "./components/form"
import { debounce } from "utils/debounce"

const List = () => {
  const state: any = useAppState()
  const overmindActions: any = useActions()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const size = 10
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [editId, setEditId] = useState<any>(null)

  const { listData } = state.list

  useEffect(() => {
    if (listData?.tableBody?.length === 0) {
      handlePrev()
    }
  }, [listData?.tableBody])

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  const handleNext = () => {
    const totalPage = Math.ceil(listData?.tableBody?.length / size)
    if (page !== totalPage) {
      setPage(page + 1)
    }
  }
  const handleClick = (current: number) => {
    setPage(current)
  }

  const handleAddList = () => {
    setEditId(null)
    setIsOpenForm(true)
  }

  const handleSubmitForm = () => {
    setIsOpenForm(false)
  }

  const handleDelete = (id: any) => {
    setEditId(id)
    setIsOpenModalDelete(true)
  }

  const handleConfirmDelete = (id: any) => {}

  const handleEdit = (id: any) => {
    setEditId(id)
    setIsOpenForm(true)
  }

  const renderForm = () => {
    return <FormComponent handleSubmitForm={handleSubmitForm} id={editId} />
  }

  return (
    <Container className="px-md-5 py-md-5 mt-3">
      {/* {(loading || loadingDelete) && <SpinnerComponent />} */}

      <Row>
        <Col>
          <Row className="align-items-center mb-3">
            <Col>
              <h1>Fish Price List</h1>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button onClick={handleAddList}>Add</Button>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" lg={6} md={6} sm={12}>
              <Form.Control
                type="text"
                onChange={debounce((e: any) => {
                  setSearchTerm(e.target.value)
                }, 800)}
                placeholder="Search product name..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomTable
                tableHead={listData.tableHead}
                tableBody={listData.tableBody}
                totalPage={Math.ceil(listData?.tableBody?.length / size)}
                current={page}
                pageSize={size}
                handlePrev={() => handlePrev()}
                handleNext={() => handleNext()}
                setCurrentPage={(current) => handleClick(current)}
                detailButton={true}
                children={undefined}
                useManualPagination={false}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {isOpenForm && (
        <ModalComponent
          title={`${editId ? "Edit" : "Add"} Item`}
          isShow={isOpenForm}
          fnCustomBody={renderForm}
          onCancel={() => setIsOpenForm(false)}
          cancelButtonText={undefined}
          confirmButtonText={undefined}
          onConfirm={() => {}}
          body={undefined}
          isShowFooter={false}
        />
      )}
      {isOpenModalDelete && (
        <ModalComponent
          title="Delete Item"
          isShow={isOpenModalDelete}
          body="Are you sure you want to delete this item?"
          onCancel={() => setIsOpenModalDelete(false)}
          onConfirm={() => {
            setIsOpenModalDelete(false)
            handleConfirmDelete(editId)
          }}
          cancelButtonText="Cancel"
          confirmButtonText="Confirm"
          fnCustomBody={undefined}
          isShowFooter={true}
        />
      )}
    </Container>
  )
}

export default List
