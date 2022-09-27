import { listService } from "data/services"

export const services = {
  getList(params: any) {
    return listService.get(params)
  },
  create(spec: any) {
    return listService.create(spec)
  },
  update({ id, spec }: any) {
    return listService.update({ id, spec })
  },
  delete({ id }: any) {
    return listService.deleteData({ id })
  },
}
