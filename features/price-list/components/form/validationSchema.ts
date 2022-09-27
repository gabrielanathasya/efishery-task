import * as Yup from "yup"

const requiredText = "${label} cannot be empty"

const validationSchema = Yup.object().shape({
  productName: Yup.string().required(requiredText).label("Product name"),
  location: Yup.string().required(requiredText).label("Location"),
  price: Yup.number().required(requiredText).label("Price"),
})

export default validationSchema
