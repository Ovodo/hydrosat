"use client";

import Image from "next/image";
import { useState } from "react";

const InputWithHeader = ({
  title,
  holder,
  width,
  setValue,
  val,
  password = false,
  required = false,
}: {
  title: string;
  holder?: string;
  width: string;
  setValue: (e: string) => void;
  val: string | number;
  password?: boolean;
  required?: boolean;
}) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className={`flex ${width} flex-col items-start`}>
      <label htmlFor={title} className='mb-2 text-pakistan_green font-semibold'>
        {title}
      </label>
      <div className='relative w-full flex items-center'>
        <input
          id={title}
          required={required}
          placeholder={holder}
          type={!password ? "text" : show ? "text" : "password"}
          value={val}
          onChange={(e) => setValue(e.target.value)}
          className={`bg-cornsilk px-2 h-[58px] w-full text-pakistan_green text-lg self-center  focus:outline-none focus:ring-pakistan_green focus:ring-[2px]  placeholder:text-[#9A9A9A] border border-[#E5E5E5]`}
        />
        {password && (
          <button
            type='button'
            onClick={() => setShow(!show)}
            className='absolute  z-50 right-[5%]'
          >
            {show ? (
              <Image
                src={"/icons/eye-open.svg"}
                alt='show'
                width={20}
                height={20}
              />
            ) : (
              <Image
                src={"/icons/eye-closed.svg"}
                alt='not-show'
                width={20}
                height={20}
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputWithHeader;
