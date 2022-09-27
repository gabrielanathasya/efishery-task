import * as Yup from "yup"

const requiredText = "${label} cannot be empty"

const validationSchema = Yup.object().shape({
  komoditas: Yup.string().required(requiredText).label("Komoditas"),
  areaProvinsi: Yup.string().required(requiredText).label("Area Provinsi"),
  areaKota: Yup.string().required(requiredText).label("Area Kota"),
  size: Yup.number().required(requiredText).label("Size"),
  price: Yup.number().required(requiredText).label("Price"),
  tanggal: Yup.date().required(requiredText).label("Tanggal"),
})

export default validationSchema
