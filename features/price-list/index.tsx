import { Button, Form, Container, Row, Col } from "react-bootstrap"
import { CustomTable } from "components/CustomTable"
import { useEffect, useState } from "react"
import Select from "react-select"
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
  const [sortBy, setSortBy] = useState("komoditas")
  const [searchBySelect, setSearchBySelect] = useState({
    value: "komoditas",
    label: "Komoditas",
  })
  const [sortBySelect, setSortBySelect] = useState({
    value: "komoditas",
    label: "Komoditas",
  })
  const size = 10
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [editId, setEditId] = useState<any>(null)
  const limit = 10
  const searchByOption: any = [
    {
      value: "komoditas",
      label: "Komoditas",
    },
    {
      value: "area_provinsi",
      label: "Area Provinsi",
    },
    {
      value: "area_kota",
      label: "Area Kota",
    },
    {
      value: "size",
      label: "Size",
    },
    {
      value: "price",
      label: "Price",
    },
    {
      value: "tgl_parsed",
      label: "Tanggal",
    },
  ]
  const { isRequesting } = state
  const { listData } = state.list

  useEffect(() => {
    overmindActions.list.getTotalList(limit).then(() => {
      fetchListData(
        listData.tablePaging.page || 1,
        searchTerm,
        searchBy,
        sortBy
      )
    })
  }, [searchTerm, searchBy, sortBy])

  useEffect(() => {
    if (listData?.tableBody?.length === 0) {
      handlePrev()
    }
  }, [listData?.tableBody])

  const fetchListData = (
    page: any = undefined,
    searchTerm: string | undefined = undefined,
    searchBy: string | undefined = undefined,
    sortBy: string | undefined = undefined
  ) => {
    const current = page || listData?.tablePaging?.page
    let search: any

    const params: any = {
      limit,
      offset: (current - 1) * limit,
    }

    if (searchBy && searchTerm) {
      search = {}
      search[searchBy] = searchTerm
      search = JSON.stringify(search)
    }

    overmindActions.list.getList({
      params,
      search,
      current,
      sortBy,
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
    overmindActions.list.deleteById(id).then(() => {
      fetchListData()
    })
  }

  const handleEdit = (id: any) => {
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
            <Col lg={3} md={12} sm={12}>
              <Row>
                <Form.Label>Sort by</Form.Label>
                <Col className="mb-3" lg={12}>
                  <Select
                    onChange={(e: any) => {
                      setSortBy(e.value)
                      setSortBySelect(e)
                    }}
                    placeholder="Sort by"
                    options={searchByOption}
                    value={sortBySelect}
                  />
                </Col>
              </Row>
            </Col>

            <Col lg={6} md={12} sm={12}>
              <Row>
                <Form.Label>Search by</Form.Label>
                <Col className="mb-3" lg={6} md={6} sm={12}>
                  <Select
                    onChange={(e: any) => {
                      setSearchBy(e.value)
                      setSearchBySelect(e)
                    }}
                    placeholder="Search by"
                    options={searchByOption}
                    value={searchBySelect}
                  />
                </Col>
                <Col className="mb-3" lg={6} md={6} sm={12}>
                  <Form.Control
                    type="text"
                    onChange={debounce((e: any) => {
                      setSearchTerm(e.target.value)
                    }, 800)}
                    placeholder="Search (case sensitive & exact)"
                  />
                </Col>
              </Row>
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
