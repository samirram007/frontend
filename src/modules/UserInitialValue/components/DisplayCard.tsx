import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
 
import { useUserInitialValueContext } from "../context/features/useUserInitialValueContext"
import Delete from "./Delete"
import Edit from "./Edit"
const DisplayCard = ({ data }) => {

  return (
    <BaseCard />
  )
}

export default DisplayCard

const BaseCard = () => {
  const { selectedUserInitialValue: data } = useUserInitialValueContext()
  return (
    data &&
    <Card className='w-[30rem] h-full  pt-2  
    bg-gradient-to-br from-transparent via-transparent/10 to-teal-500/10 
    backdrop-filter backdrop-blur-sm    
    shadow-lg
grid grid-rows-[1fr] 
     rounded-lg '>
       
      <CardContent className='relative grid grid-cols-[1fr_5px_1fr] gap-4  items-center p-0 px-6'>
        <div className="text-md whitespace-pre-wrap   truncate overflow-clip">{data.key}</div>
        <div>:</div>

        <div className="text-md text-teal-500 whitespace-pre-wrap   truncate overflow-clip">
        {data.value}
          
        </div>
        <div className="">
        {data &&
          <div className="absolute right-0 top-0 flex flex-row gap-4 items-center pr-2">
            <Edit />
            <Delete />
          </div>
        }
        </div>
      </CardContent>
      
    </Card>


  )
}



export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="./avatar-80-07.jpg" alt="Kelly King" />
      <AvatarFallback>KK</AvatarFallback>
    </Avatar>
  );
}

const InfoRow = ({ label, value }) => {
  return (
    <div className="text-sm text-gray-500 gap-1 grid grid-cols-[80px_5px_1fr]">
      <div>{label}</div>
      <div> : </div>
      <div className="pr-2 whitespace-normal truncate ">{value}</div>
    </div>
  );
}
