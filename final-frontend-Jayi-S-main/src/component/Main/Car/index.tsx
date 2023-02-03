import React, { useEffect, useState, useRef } from "react";
import "./index.css";

const Car = (props: any) => {
  const { imgList } = props;

  const clsRef = useRef<string[]>([]);

  const [cls, setCls] = useState([""]);

  useEffect(() => {
    console.log(imgList,'[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
    clsRef.current = imgList.map((_: any, idx: number) => {
      return idx === 0 ? "toShow" : "toHide";
    });
    setCls([...clsRef.current]);
    const time = setInterval(() => {
      const clsTmp: string[] = [...clsRef.current];
      let tmp = String(clsTmp.pop());
      clsTmp.unshift(tmp);
      setCls(clsTmp);
      clsRef.current = clsTmp;
    }, 4000);
    return () => clearInterval(time);
  }, []);

  return (
    <div className="box">
      <ul className="imgs">
        {imgList.map((item: string, idx: number) => {
          return (
            <li className={cls[idx]} key={idx}>
              <img src={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Car;
