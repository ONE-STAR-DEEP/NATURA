'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const EventCard = ({ post,  handleEdit, handleDelete}) => {
  const {data: session }= useSession();
  const router= useRouter();
  const pathName = usePathname();

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (

    <div className='prompt_card'>

      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}> 
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={35}
            height={35}
            className="rounded-full object-contain"
          />
          <div className='flex flex-col'>
            Posted by<h3 className='inline font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
      </div>
      <div className="card">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
    ></path>
  </svg>
  <div className="card__content">
    <p className="card__title">Image not available</p>
    <p className="card__description">
      {post.desc}
    </p>
  </div>
</div>
      <p className='my-2 font-bold font-satoshi text-sm text-grey-700'>{`${post.name} | ${post.date}`}</p>
      <p className='my-2 font-bold font-satoshi text-sm text-grey-700'>Task: {post.task}</p>
      
      <div className='h-[165px] overflow-hidden'>
      <p className='my-2 font-satoshi text-sm text-grey-700'>
        Location: {`${post.street}, ${post.area}, ${post.city}, ${post.state}, ${post.country}`}
      </p>
      <p className='my-4 font-satoshi text-sm text-grey-700 h-[60px] overflow-hidden'>
        <span className="font-semibold">{post.creator.username} </span>
        <span className="overflow">{post.desc}</span>
      </p>
      </div>

      <button className='visit_map'> <span>VIEW ON MAP</span></button>

      {session?.user.id === post.creator._id && pathName ==='/profile' && (
      <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'
      onClick={handleEdit}>
      <p className='front-inter text-sm green_gradient cursor-pointer'
        onclick={handleEdit}
      >
        Edit
      </p>
      <p className='front-inter text-sm green_gradient cursor-pointer'
        onClick={handleDelete}
      >
        Delete
      </p>
      </div>
    )}
    </div>
  )
}

export default EventCard