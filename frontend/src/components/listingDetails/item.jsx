import Image from 'mui-image'
import ErrorImage from './errorCarousel'

export default function Item(props){
  return(
    <Image src={"http://localhost:5000/images/listing/"+ props?.item} alt={props.item.name} errorIcon={<ErrorImage/>} width='auto' height= "400px" sx={{border:'2px solid'}}></Image>
  )
}