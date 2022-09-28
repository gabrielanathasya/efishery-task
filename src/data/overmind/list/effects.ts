import { listService } from "data/services"

export const services = {
  getList(params: any) {
    return listService.get(params)
  },
  create(spec: any) {
    return listService.create(spec)
  },
  update(spec: any) {
    return listService.update(spec)
  },
  delete({ id }: any) {
    return listService.deleteData({ id })
  },
  getAreaOption() {
    return listService.getAreaOption()
  },
  getSizeOption() {
    return listService.getSizeOption()
  },
}
