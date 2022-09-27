import { baseUrl } from "./api"
import { HttpClient } from "./httpClient"
import { baseService } from "./baseService"
import { listHTTPService } from "./listService"

const httpClient = HttpClient(baseUrl)
const baseServiceFunc = baseService(httpClient)

const listService = listHTTPService(baseServiceFunc)

export { listService }
