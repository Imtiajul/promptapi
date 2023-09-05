'use client'

import { useState, useEffect } from 'react';
import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';

const EditPrompt = () => {
   const [submitting, setSubmitting] = useState(false);
   const [post, setPost] = useState({
      prompt: '',
      tag: '',
   })

   const router = useRouter();
   const searchParams = useSearchParams();
   const paramsId = searchParams.get('id');

   useEffect(() => {
      const getPromptData = async () => {
         const response = await fetch(`/api/prompt/${paramsId}`);
         const data = await response.json();

         setPost({
            prompt: data.prompt,
            tag: data.tag,
         })
      }
      if (paramsId) getPromptData();
   }, [paramsId])

   // console.log(post);

   const updatePrompt = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      if (!paramsId) return alert('Prompt ID is not found');
      console.log(post);
      try {
         const response = await fetch(`/api/prompt/${paramsId}`, {
            method: 'PATCH',
            body: JSON.stringify({
               prompt: post.prompt,
               tag: post.tag
            })
         })
         if (response.ok) {
            router.push('/');
         }
      } catch (error) {
         console.error(error);
      } finally {
         setSubmitting(false);
      }
   }

   return (
      <Form
         type="Edit"
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={updatePrompt}
      />
   )
}

export default EditPrompt;