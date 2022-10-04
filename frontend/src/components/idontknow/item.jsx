

export default function Item(props){
  return(
    <img src={props.item.url} alt={props.item.name} style={{width: '40%', height: "400px", marginTop:'20px', borderRadius:'5%'}}></img>
  )
}