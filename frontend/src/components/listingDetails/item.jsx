import Image from 'mui-image'
import { URL_BACKEND } from '../../constantes'
import ErrorImage from './errorCarousel'

export default function Item(props){
  return(
    <Image src={`${URL_BACKEND}/images/listing/`+ props?.item} alt={props.item.name} errorIcon={<ErrorImage/>} width='auto' height= "400px" sx={{border:'2px solid'}}></Image>
  )
}