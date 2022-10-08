import Image from 'mui-image'

export default function Item(props){
  return(
    <Image src={props.item.url} alt={props.item.name} width='auto' height= "400px"></Image>
  )
}