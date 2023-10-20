import React, { useEffect,useState,useRef } from 'react';
import './index.css'
 
const Car = (props: any) => {

  const {imgList} = props
  
  const clsRef = useRef<string[]>([])
  // const clsRef = useRef(imgList.map((_:any, idx:number)=>{return idx === 0?"toShow":"toHide" }))
  // console.log(clsRef.current, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

  const [cls,setCls]= useState([''])
 
  useEffect(()=> {
    clsRef.current = imgList.map((_:any, idx:number)=>{return idx === 0?"toShow":"toHide" })
    setCls([...clsRef.current])
    const time = setInterval(()=>{
      const clsTmp:string[] = [...clsRef.current]
      let tmp = String(clsTmp.pop())
      clsTmp.unshift(tmp)
      setCls(clsTmp)
      clsRef.current = clsTmp
      // console.log('begin to run')
    },4000)
    return () => clearInterval(time)
  },[])
 
  return (
    <div className="box">
      <ul className='imgs'>
        {
          imgList.map((item: string, idx: number) => {
            return <li className={cls[idx]}>
            <img src={item} />
           </li>
          })
        }

       {/* <li className={cls[0]}>
        <img  src="https://i.etsystatic.com/32950390/r/il/63673b/3560516200/il_1588xN.3560516200_f74v.jpg" />
       </li>
        <li className={cls[1]}>
          <img  src="https://www.earthtouchnews.com/media/1951732/bigpicture_black-grouse_2019-05-02.jpg" />
        </li>
        <li className={cls[2]}>
          <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf2J48SKVzm8avnAciFVnJaVPzyWHYwsGajw&usqp=CAU" />
        </li>
        <li className={cls[3]}>
          <img  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-08%2F5a52d7086f955.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668222101&t=7bf70e9c24841950ca4453594a143876" />
        </li> */}
      </ul>
 

    </div>
  )
}
 
export default Car;