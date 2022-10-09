import Image from 'mui-image'

export default function Item(props){
  return(
    <Image src={'https://images.hola.com/imagenes/mascotas/20180925130054/consejos-para-cuidar-a-un-gatito-recien-nacido-cs/0-601-526/cuidardgatito-t.jpg' || props.item} alt={props.item.name} width='auto' height= "400px" sx={{border:'2px solid'}}></Image>
  )
}