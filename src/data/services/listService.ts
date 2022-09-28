export const listHTTPService = ({
  baseGet,
  basePost,
  basePut,
  baseDelete,
}: any) => {
  const path = "list"

  const get = (params: any, search: any) => {
    let queryParams = new URLSearchParams(params).toString()

    let pathUrl = path + "?" + queryParams
    if (search) {
      pathUrl = pathUrl + "&search=" + search
    }
    console.log({ pathUrl, search })
    return baseGet(pathUrl)
  }

  const create = (spec: any) => {
    const pathUrl = path + "/"
    return basePost(pathUrl, spec)
  }

  const update = (spec: any) => {
    const pathUrl = path + "/"
    return basePut(pathUrl, spec)
  }

  const deleteData = (spec: any) => {
    const pathUrl = path + "/"
    return baseDelete(pathUrl, spec)
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
