export const baseService = ({ get, post, put, deleteData }: any) => {
  const basePost = (pathUrl: string, spec: any = {}, config: any = {}) => {
    return post(pathUrl, spec, config)
  }

  const basePut = (pathUrl: string, spec: any = {}, config: any = {}) => {
    return put(pathUrl, spec, config)
  }

  const baseGet = (pathUrl: string, spec: any = {}, config: any = {}) => {
    return get(pathUrl, config)
  }

  const baseDelete = (pathUrl: string, spec: any = {}, config: any = {}) => {
    return deleteData(pathUrl, spec, config)
  }

  return { basePost, basePut, baseDelete, baseGet }
}
