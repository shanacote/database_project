// https://github.com/FortAwesome/vue-fontawesome
// https://halilyuce.com/web/how-to-add-font-awesome-to-your-vue-3-project-typescript/
// https://blog.logrocket.com/full-guide-to-using-font-awesome-icons-in-vue-js-apps-5574c74d9b2d/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons' //https://fontawesome.com/v5.15/icons?d=gallery&p=2&s=solid&m=free
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPencilAlt, faTrashAlt)

export default FontAwesomeIcon;