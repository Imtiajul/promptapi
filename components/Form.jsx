import Link from 'next/link'
import React from 'react'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

   return (
      <section className="w-full max-w-full flex-start flex-col">
         <h1 className="head_text text-left">
            <span className="blue_gradient">{type} Post</span>
         </h1>
         <p className="desc max-w-md">{type} and share amazing prompts with the world, and let your imagination run build with an AI-powered platform.</p>

         <form onSubmit={handleSubmit}
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
            <level>
               <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompts</span>
               <textarea
                  value={post.prompt}
                  onChange={e => setPost({
                     ...post,
                     prompt: e.target.value,
                  })}
                  required
                  className="form_textarea"
                  placeholder="Write Your Prompt Text"
               >
               </textarea>
            </level>
            <level>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Tag {' '}
                  <span>(#product, #webdevelopment, #idea)</span>
               </span>
               <input
                  value={post.tag}
                  onChange={(e) => setPost({
                     ...post,
                     tag: e.target.value
                  })}
                  required
                  className="form_input"
                  placeholder='#tag'
               >
               </input>
            </level>
            <div className="flex-end mx-3 mb-5 gap-4">
               <Link href="/"
                  className="text-gray-500 text-sm">
                  Cancel
               </Link>

               <button
                  type='submit'
                  disabled={submitting}
                  className="px-5 py-1.5 text-sm bg-primary-orange text-white"
               >
                  {submitting ? `${type}...` : type}
               </button>
            </div>
         </form>
      </section>
   )
}
export default Form;