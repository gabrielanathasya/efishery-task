export const getList = async (
  { state, effects }: any,
  { params, current }: any
) => {
  state.isRequesting = true
  await effects.list.services
    .getList(params)
    .then((res: any) => {
      const processedData = res.data?.map((item: any) => {
        return {
          id: item?.uuid,
          rowData: [
            item?.komoditas,
            item?.area_provinsi,
            item?.area_kota,
            item?.size,
            item?.price,
            item?.tgl_parsed,
          ],
        }
      })
      state.list.listData.tableBody = processedData
      state.list.listData.tablePaging.page = current
    })
    .catch((error: any) => {
      console.error("[FAIL GET DATA]", error)
      alert("Get List Failed")
    })
  state.isRequesting = false
}

export const getTotalList = async ({ state, effects }: any, limit: any) => {
  state.isRequesting = true
  await effects.list.services
    .getList()
    .then((res: any) => {
      state.list.listData.tablePaging.totalPage = Math.ceil(
        res?.data?.length / limit
      )
    })
    .catch((error: any) => {
      console.error("[FAIL GET DATA]", error)
      alert("Get List Failed")
    })
  state.isRequesting = false
}

export const getAreaOption = async ({ state, effects }: any) => {
  state.isRequesting = true
  await effects.list.services
    .getAreaOption()
    .then((res: any) => {
      const areaMap: any = {}
      const processedData = res.data?.map((item: any) => {
        if (item.city) {
          areaMap[item.city] = item.province
          return {
            value: item.city,
            label: item.city,
          }
        }
      })
      state.list.areaOption = processedData.filter((e: any) => e !== undefined)
      state.list.areaMap = areaMap
    })
    .catch((error: any) => {
      console.error("[FAIL GET DATA]", error)
      alert("Get Area Option Failed")
    })
  state.isRequesting = false
}

export const getSizeOption = async ({ state, effects }: any) => {
  state.isRequesting = true
  await effects.list.services
    .getSizeOption()
    .then((res: any) => {
      const processedData = res.data?.map((item: any) => {
        if (item.size) {
          return {
            value: item.size,
            label: item.size,
          }
        }
      })
      state.list.sizeOption = processedData.filter((e: any) => e !== undefined)
    })
    .catch((error: any) => {
      console.error("[FAIL GET DATA]", error)
      alert("Get Area Option Failed")
    })
  state.isRequesting = false
}

// export const getDetail = async ({ state, effects }, { id }) => {
//   state.isRequesting = true

//   await effects.cv.services
//     .detail({ id })
//     .then((res) => {
//       const detail = res.data
//       state.cv.detailData = detail ? detail[0] : null
//     })
//     .catch((error) => {
//       console.error("[FAIL GET DETAIL]", error)
//       alert("Get Detail Failed")
//     })

//   state.isRequesting = false
// }

export const create = async ({ state, effects }: any, reqPayload: any) => {
  state.isRequesting = true

  await effects.list.services.create(reqPayload).catch((error: any) => {
    console.error("[FAIL CREATE]", error)
    alert("Insert Failed")
  })

  state.isRequesting = false
}

// export const update = async ({ state, effects }, spec) => {
//   state.isRequesting = true

//   const id = spec.id
//   delete spec["id"]

//   await effects.cv.services.update({ id, spec }).catch((error) => {
//     console.error("[FAIL UPDATE]", error)
//     alert("Update Failed")
//   })

//   state.isRequesting = false
// }

// export const deleteById = async ({ state, effects }, { id }) => {
//   state.isRequesting = true

//   await effects.cv.services.delete({ id }).catch((error) => {
//     console.error("[FAIL DELETE]", error)
//     alert("Delete Failed")
//   })

//   state.isRequesting = false
// }
