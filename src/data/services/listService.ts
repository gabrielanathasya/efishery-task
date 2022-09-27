export const listHTTPService = ({
  baseGet,
  basePost,
  basePut,
  baseDelete,
}: any) => {
  const path = "list"

  const get = (params: any) => {
    let queryParams = new URLSearchParams(params).toString()

    const pathUrl = path + "?" + queryParams
    return baseGet(pathUrl)
  }

  const create = (spec: any) => {
    const pathUrl = path + "/"
    return basePost(pathUrl, spec)
  }

  const update = ({ id, spec }: any) => {
    const pathUrl = path + "/" + id
    return basePut(pathUrl, spec)
  }

  const deleteData = ({ id }: any) => {
    const pathUrl = path + "/" + id
    return baseDelete(pathUrl)
  }

  const getAreaOption = () => {
    const pathUrl = "option_area"
    return baseGet(pathUrl)
  }

  const getSizeOption = () => {
    const pathUrl = "option_size"
    return baseGet(pathUrl)
  }

  return { get, create, update, deleteData, getAreaOption, getSizeOption }
}
