'use client'

import { useState, useEffect } from "react"
// import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = ({params}) => {
   const [posts, setPosts] = useState('')
   
  // const searchParams = useSearchParams();
  // const userName = searchParams.get("name");
  //  console.log(userName);

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(`/api/user/${params?.id}/posts`);
         const data = await response.json();
         setPosts(data);
      }
      fetchData();
   }, [params.id]);

   return (
      <Profile
         name={posts[0]?.creator.username}
         desc="Welcome to your personalized profile page"
         data={posts}
      />
   )
}

export default UserProfile