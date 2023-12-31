'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("")

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => { setCopied("") }, 5000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={() => router.push(`/profile/${post.creator._id}`)}>
          <Image
            src={post.creator.image}
            alt={`${post.creator.username} image`}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-santoshi font-semibold text-gray-400">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copied_btn cursor-pointer" onClick={handleCopy}>
          <Image
            src={copied === post.prompt
              ? '/assets/images/tick-50-orange.png'
              : '/assets/images/copy-50-orange.png'}
            alt='copy-thik icon'
            width={15}
            height={15}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm- blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName == '/profile' || pathName==`/profile/${session?.user.id}` && (
        <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}>Edit</p>

          <p className="font-inter text-sm orange_gradient cursor-pointer bg-fuchsia-500 px-3 py-5"
            onClick={() => handleDelete && handleDelete(post)}>Delete</p>
        </div>
      )
      }

    </div>
  )
}

export default PromptCard
