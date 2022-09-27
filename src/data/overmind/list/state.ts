export const state = {
  detailData: null,
  listData: {
    tableHead: ["Product Name", "Location", "Price"],
    tableBody: [
      {
        id: 1,
        rowData: ["Kakap", "Aceh", 120000],
      },
      {
        id: 2,
        rowData: ["Bawal", "Banten", 150000],
      },
      {
        id: 3,
        rowData: ["Udang", "Lampung", 10000],
      },
      {
        id: 4,
        rowData: ["Cumi-cumi", "Bengkulu", 15000],
      },
    ],
    tablePaging: {
      page: 1, //current
      totalPage: 1,
    },
  },
}
