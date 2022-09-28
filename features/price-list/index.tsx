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
  const [searchBy, setSearchBy] = useState("komoditas")
  const size = 10
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [editId, setEditId] = useState<any>(null)
  const limit = 10

  const { isRequesting } = state
  const { listData } = state.list

  useEffect(() => {
    overmindActions.list.getTotalList(limit).then(() => {
      fetchListData(listData.tablePaging.page || 1, searchTerm, searchBy)
    })
  }, [searchTerm, searchBy])

  useEffect(() => {
    if (listData?.tableBody?.length === 0) {
      handlePrev()
    }
  }, [listData?.tableBody])

  const fetchListData = (
    page: any = undefined,
    searchTerm: string | undefined = undefined,
    searchBy: string | undefined = undefined
  ) => {
    const current = page || listData?.tablePaging?.page

    const params: any = {
      limit,
      offset: (current - 1) * limit,
    }

    if (searchBy && searchTerm) {
      const search: any = {}
      search[searchBy] = searchTerm
      params["search"] = JSON.stringify(search)
    }

    overmindActions.list.getList({
      params,
      current,
    })
  }

  const handlePrev = () => {
    const current = listData.tablePaging.page
    if (current > 1) {
      fetchListData(current - 1)
    }
  }
  const handleNext = () => {
    const current = listData.tablePaging.page
    if (current !== listData.tablePaging.totalPage) {
      fetchListData(current + 1)
    }
  }
  const handleClick = (current: number) => {
    fetchListData(current)
  }

  const handleAddList = () => {
    setEditId(null)
    setIsOpenForm(true)
  }

  const handleSubmitForm = () => {
    setIsOpenForm(false)
    overmindActions.list.resetDetailData()
    fetchListData()
  }

  const handleDelete = (id: any) => {
    setEditId(id)
    setIsOpenModalDelete(true)
  }

  const handleConfirmDelete = (id: any) => {
    console.log({ id })
    overmindActions.list.deleteById(id).then(() => {
      fetchListData()
    })
  }

  const handleEdit = (id: any) => {
    console.log("handleEdit", { id })
    setEditId(id)
    setIsOpenForm(true)
  }

  const renderForm = () => {
    return <FormComponent handleSubmitForm={handleSubmitForm} id={editId} />
  }

  return (
    <Container className="px-md-5 py-md-5 mt-3">
      {isRequesting && <SpinnerComponent />}

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
                placeholder="Search keyword..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomTable
                tableHead={listData?.tableHead}
                tableBody={listData?.tableBody}
                totalPage={listData?.tablePaging?.totalPage}
                current={listData?.tablePaging?.page}
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
          onCancel={() => {
            setIsOpenForm(false)
            overmindActions.list.resetDetailData()
          }}
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
