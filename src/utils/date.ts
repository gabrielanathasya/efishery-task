import moment from "moment"

const dateToEpoch = (date: any) => {
  return date ? moment(date).valueOf() : 0
}

const epochToDate = (epoch: any, format = "YYYY-MM-DD") => {
  return epoch ? moment(epoch).format(format) : undefined
}

const epochToFormatted = (epoch: any, format = "YYYY") => {
  return epoch ? moment(epoch).format(format) : ""
}

const sortDate = (a: any, b: any) => {
  return b.startDate - a.startDate
}

export { dateToEpoch, epochToFormatted, epochToDate, sortDate }
